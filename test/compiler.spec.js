const compiler = require('../src');
const {expect} = require('chai');

describe('Compiler', function () {
    this.timeout(50000);
    it('Should compile multisig contract', () => {
        const contract = `
# alice { private:EUzwt3buFVEyWAQQpt8ZXxDiEG51W7DhW6Hft54UHFfk,public:5AzfA9UfpWVYiwFwvdr77k6LWupSTGLb14b24oVdEpMM }
# bob { private:7V13MftX7mbcZpEkzyUgsj5S7CwgvCyqqFc2ire7X7WC,public:2KwU4vzdgPmKyf7q354H9kSyX9NZjNiq4qbnH2wi2VDF }
# cooper { private:F2rWD6xPVjm2B8BwJfrS41wgjUPHghYPbafVWsKFojPF,public:GbrUeGaBfmyFJjSQb9Z8uTCej5GzjXfRDVGJGrmgt5cD }
#define public keys
let alicePubKey  = base58'5AzfA9UfpWVYiwFwvdr77k6LWupSTGLb14b24oVdEpMM'
let bobPubKey    = base58'2KwU4vzdgPmKyf7q354H9kSyX9NZjNiq4qbnH2wi2VDF'
let cooperPubKey = base58'GbrUeGaBfmyFJjSQb9Z8uTCej5GzjXfRDVGJGrmgt5cD'

#check whoever provided the valid proof
let aliceSigned  = if(sigVerify(tx.bodyBytes, tx.proofs[0], alicePubKey  )) then 1 else 0
let bobSigned    = if(sigVerify(tx.bodyBytes, tx.proofs[1], bobPubKey    )) then 1 else 0
let cooperSigned = if(sigVerify(tx.bodyBytes, tx.proofs[2], cooperPubKey )) then 1 else 0

#sum up every valid proof to get at least 2
aliceSigned + bobSigned + cooperSigned >= 2
            `;
        const result = compiler.compile(contract);
        expect(result.error).to.be.undefined
    });


    it('Should compile notary contract', () => {
        const contract = `
let king = extract(addressFromString("kingAddress"))
let company = extract(addressFromString("companyAddress"))
let notary1 = addressFromPublicKey(extract(getBinary(king,"notary1PK")))
let txIdBase58String = toBase58String(tx.id)
let notary1Agreement = getBoolean(notary1,txIdBase58String)
let isNotary1Agreed = if(isDefined(notary1Agreement)) then extract(notary1Agreement) else false
match tx { 
  case t:TransferTransaction =>
    let recipientAddress = addressFromRecipient(t.recipient)
    let recipientAgreement = getBoolean(recipientAddress,txIdBase58String)
    let isRecipientAgreed = if(isDefined(recipientAgreement)) then extract(recipientAgreement) else false
    let senderAddress = addressFromPublicKey(t.senderPublicKey)
    senderAddress.bytes == company.bytes || (isNotary1Agreed && isRecipientAgreed)
  case _ => false
}
            `;
        const result = compiler.compile(contract);
        expect(result.error).to.be.undefined
    });

    it('Should not compile invalid contract', () => {
        const contract = `
let a = {
    let x = 1
    1
}
x
            `;
        const result = compiler.compile(contract);
        expect(result.error).to.eql('Compilation failed: A definition of \'x\' is not found in 33-34')
    });

    it('Should give sensible error on nulls and undefined', () => {
        const contract1 = null;
        const contract2 = undefined;
        const result1 = compiler.compile(contract1);
        const result2 = compiler.compile(contract2);
        expect(result1.error).to.eql('Type error: contract should be string')
        expect(result2.error).to.eql('Type error: contract should be string')
    });

    it('Should compile contract with base64 literals', () => {
        const contract = `
let a = base64'AAA=' 
true`;

        const result = compiler.compile(contract);
        expect(result.error).to.be.undefined
    });

    it('Should return estimate', () => {
        const contract = `
let a = base64'AAA=' 
true`;
        const result = compiler.compile(contract);
        expect(result.result.complexity).to.be.a('number')

    });

    it('Should decompile code', () => {
        const contract = `
let a = base64'AAA=' 
true`;
        const contractBase64 = compiler.compile(contract).result.base64;
        expect(compiler.decompile(contractBase64).result).to.be.a('string')

    });

    it('Should compile dApp', () => {
        const contract = `{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

func foo() = 3

@Callable(i)
func bar() = WriteSet([])`;
        const compiled = compiler.compile(contract);
        expect(compiled.error).to.be.undefined
    });

    it('Should get MaxComplexityByVersion', () => {
        expect(compiler.contractLimits.MaxComplexityByVersion(2)).to.eq(2000);
        expect(compiler.contractLimits.MaxComplexityByVersion(3)).to.eq(4000)
    });

    it(' ba.sha256 is not a function', () => {
        const eval = compiler.repl().evaluate;
        const res = eval("sha256(base58'qwe')");
        expect(res.result).to.eq('res1: ByteVector = Fyru2hk6gk2e7mqLDbvuafEiAQSiTYJGRcL3s8kDkAhp')
    })

    it('Imports', () => {
        const script = `
{-# STDLIB_VERSION 3 #-}
{-# SCRIPT_TYPE ACCOUNT #-}
{-# IMPORT lib2,lib1,lib3 #-}
let a = 5
multiply(inc(a), dec(a)) == (5 + 1) * (5 - 1)
            `;

        const info = compiler.scriptInfo(script);
        expect(info.imports.toString()).to.eq('lib2,lib1,lib3');
        const files = [
            {
                name: "lib1",
                content: `
{-# SCRIPT_TYPE  ACCOUNT #-}
{-# CONTENT_TYPE LIBRARY #-}
{-# STDLIB_VERSION 3 #-}
func inc(a: Int) = a + 1
`
            },
            {
                name: "lib2",
                content: `
{-# SCRIPT_TYPE  ACCOUNT #-}
{-# CONTENT_TYPE LIBRARY #-}
{-# STDLIB_VERSION 3 #-}
func dec(a: Int) = a - 1
`
            },
            {
                name: "lib3",
                content: `
{-# SCRIPT_TYPE  ACCOUNT #-}
{-# CONTENT_TYPE LIBRARY #-}
{-# STDLIB_VERSION 3 #-}
func multiply(a: Int, b: Int) = a * b
`
            }
        ];

        const libs = files.filter(({name}) => info.imports.includes(name)).reduce((acc, val) => ({
            ...acc,
            [val.name]: val.content
        }), {});
        let res = compiler.compile(script, libs);
        if ('error' in res) console.log(res.error);
        expect(res.error).to.be.undefined
    })

    it('Should sign and verify via global curve25519verify', function () {
        const res = compiler.repl().evaluate(`sigVerify(
       base58'D6HmGZqpXCyAqpz8mCAfWijYDWsPKncKe5v3jq1nTpf5',
       base58'59Su1K4KSU',
       base58'CGNGZ6G4tuYsW9AbBZPvhTvtVQYAnE8w22UMWLpLM8bGMiys4psATG7sX58p2aFe9uysYyrwnuP2GwT7NAJe737'
       )`)

        expect(res.result).to.eq('res1: Boolean = true')
    });

    it('rsa verify', function () {
        const {evaluate} = compiler.repl();
        const pk = `let pk = fromBase64String("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkDg8m0bCDX7fTbBlHZm+BZIHVOfC2I4klRbjSqwFi/eCdfhGjYRYvu/frpSO0LIm0beKOUvwat6DY4dEhNt2PW3UeQvT2udRQ9VBcpwaJlLreCr837sn4fa9UG9FQFaGofSww1O9eBBjwMXeZr1jOzR9RBIwoL1TQkIkZGaDXRltEaMxtNnzotPfF3vGIZZuZX4CjiitHaSC0zlmQrEL3BDqqoLwo3jq8U3Zz8XUMyQElwufGRbZqdFCeiIs/EoHiJm8q8CVExRoxB0H/vE2uDFK/OXLGTgfwnDlrCa/qGt9Zsb8raUSz9IIHx72XB+kOXTt/GOuW7x2dJvTJIqKTwIDAQAB")`
        const msg = `let msg = fromBase64String("REIiN2hDQUxIJVQzdk1zQSpXclRRelExVWd+YGQoOyx0KHduPzFmcU8zUWosWiA7aFloOWplclAxPCU=")`
        const sig = `let sig = fromBase64String("OXVKJwtSoenRmwizPtpjh3sCNmOpU1tnXUnyzl+PEI1P9Rx20GkxkIXlysFT2WdbPn/HsfGMwGJW7YhrVkDXy4uAQxUxSgQouvfZoqGSPp1NtM8iVJOGyKiepgB3GxRzQsev2G8Ik47eNkEDVQa47ct9j198Wvnkf88yjSkK0KxR057MWAi20ipNLirW4ZHDAf1giv68mniKfKxsPWahOA/7JYkv18sxcsISQqRXM8nGI1UuSLt9ER7kIzyAk2mgPCiVlj0hoPGUytmbiUqvEM4QaJfCpR0wVO4f/fob6jwKkGT6wbtia+5xCD7bESIHH8ISDrdexZ01QyNP2r4enw==")`
        const algs = ['NOALG', 'MD5', 'SHA1',
            // 'SHA224',//todo uncomment when implemented in ts-lib-crypto
            'SHA256', 'SHA384', 'SHA512',
            'SHA3224', 'SHA3256', 'SHA3384', 'SHA3512'
        ]
        evaluate(pk)
        evaluate(msg)
        evaluate(sig)
        algs.forEach(alg => {
            const rsaVerify = `rsaVerify(${alg}, msg, sig, pk)`
            const res = evaluate(rsaVerify)
            expect('result' in res).to.eq(true)
        })
    });

    it('log', function () {
        const eval = compiler.repl().evaluate;
        const tests = [
            "pow(12, 1, 3456, 3, 2, DOWN)",
            "pow(12, 1, 3456, 3, 2, UP)",
            "pow(0, 1, 3456, 3, 2, UP)",
            "pow(20, 1, -1, 0, 4, DOWN)",
            "pow(-20, 1, -1, 0, 4, DOWN)",
            // "pow(0, 1, -1, 0, 4, DOWN)",//fixme
            "log(16, 0, 2, 0, 0, CEILING)",
            // "log(16, 0, -2, 0, 0, CEILING)",//fixme
            // "log(-16, 0, 2, 0, 0, CEILING)",//fixme
            // "pow(2,  0, 2, 9, 0, UP)",//fixme
            // "log(2,  0, 2, 9, 0, UP)",//fixme
            // "pow(2, -2, 2, 0, 5, UP)",//fixme
            // "log(2, -2, 2, 0, 5, UP)",//fixme
            "pow(2, 0, 62, 0, 0, UP)",
            // "pow(2, 0, 63, 0, 0, UP)",//fixme
            "pow(10, 0, -8, 0, 8, HALFUP)",
            "pow(10, 0, -9, 0, 8, HALFUP)"
        ];
        tests.forEach(test => expect('result' in eval(test)).to.eq(true))
    });

    it('checkMerkleProof', () => {
        const {evaluate} = compiler.repl();
        const code = "let rootHash = base64'eh9fm3HeHZ3XA/UfMpC9HSwLVMyBLgkAJL0MIVBIoYk='\n" +
            "let leafData = base64'AAAm+w=='\n" +
            "let merkleProof = base64'ACBSs2di6rY+9N3mrpQVRNZLGAdRX2WBD6XkrOXuhh42XwEgKhB3Aiij6jqLRuQhrwqv6e05kr89tyxkuFYwUuMCQB8AIKLhp/AFQkokTe/NMQnKFL5eTMvDlFejApmJxPY6Rp8XACAWrdgB8DwvPA8D04E9HgUjhKghAn5aqtZnuKcmpLHztQAgd2OG15WYz90r1WipgXwjdq9WhvMIAtvGlm6E3WYY12oAIJXPPVIdbwOTdUJvCgMI4iape2gvR55vsrO2OmJJtZUNASAya23YyBl+EpKytL9+7cPdkeMMWSjk0Bc0GNnqIisofQ=='\n" +
            "checkMerkleProof(rootHash, merkleProof, leafData)";
        const compiled = evaluate(code);
        expect(compiled.error).to.be.undefined;
        expect(compiled.result.slice(-4)).to.eq('true')
    })


    it('connect blockchain', () => {
        const
            url = 'https://testnodes.wavesnodes.com/',
            chainId = 'T',
            address = '3N4S7xqHfGvePCGduvzAp7bgUM3j59MZdhB',
            obj = {url, chainId, address},
            map = new Map([['url', url], ['chainId', chainId], ['address', address]]);

        const {evaluate} = compiler.repl(url, chainId, address);
        console.log(evaluate('height'))

        // expect(compiled.error).to.be.undefined;
        // expect(compiled.result.slice(-4)).to.eq('true')
    })
    it('connect test',  () => {
        const
            url = 'https://testnodes.wavesnodes.com/',
            chainId = 'T',
            address = '3N4S7xqHfGvePCGduvzAp7bgUM3j59MZdhB',
            obj = {url, chainId, address},
            map = new Map([['url', url], ['chainId', chainId], ['address', address]]);

        const repl = compiler.repl();
        repl.test('test')
    })

    it('testHttp', () => {
        const res =  httpGet('https://goeeqweogle.com')
        console.log(res)

    })

});

