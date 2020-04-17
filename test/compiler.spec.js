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
        expect(result.error).to.eql('Compilation failed: [A definition of \'x\' is not found in 33-34]')
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

    it(' ba.sha256 is not a function', async () => {
        const eval = compiler.repl().evaluate;
        const res = await eval("sha256(base58'qwe')");
        expect(res.result).to.eq('res1: ByteVector = base58\'Fyru2hk6gk2e7mqLDbvuafEiAQSiTYJGRcL3s8kDkAhp\'')
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

    it('Should sign and verify via global curve25519verify', async function () {
        const res = await compiler.repl().evaluate(`sigVerify(
       base58'59Su1K4KSU',
       base58'CGNGZ6G4tuYsW9AbBZPvhTvtVQYAnE8w22UMWLpLM8bGMiys4psATG7sX58p2aFe9uysYyrwnuP2GwT7NAJe737',
       base58'D6HmGZqpXCyAqpz8mCAfWijYDWsPKncKe5v3jq1nTpf5'
       )`)

        expect(res.result).to.eq('res1: Boolean = true')
    });

    it('rsa verify', async function () {
        const {evaluate} = compiler.repl();
        const pk = `let pk = fromBase64String("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkDg8m0bCDX7fTbBlHZm+BZIHVOfC2I4klRbjSqwFi/eCdfhGjYRYvu/frpSO0LIm0beKOUvwat6DY4dEhNt2PW3UeQvT2udRQ9VBcpwaJlLreCr837sn4fa9UG9FQFaGofSww1O9eBBjwMXeZr1jOzR9RBIwoL1TQkIkZGaDXRltEaMxtNnzotPfF3vGIZZuZX4CjiitHaSC0zlmQrEL3BDqqoLwo3jq8U3Zz8XUMyQElwufGRbZqdFCeiIs/EoHiJm8q8CVExRoxB0H/vE2uDFK/OXLGTgfwnDlrCa/qGt9Zsb8raUSz9IIHx72XB+kOXTt/GOuW7x2dJvTJIqKTwIDAQAB")`
        const msg = `let msg = fromBase64String("REIiN2hDQUxIJVQzdk1zQSpXclRRelExVWd+YGQoOyx0KHduPzFmcU8zUWosWiA7aFloOWplclAxPCU=")`
        const sig = `let sig = fromBase64String("OXVKJwtSoenRmwizPtpjh3sCNmOpU1tnXUnyzl+PEI1P9Rx20GkxkIXlysFT2WdbPn/HsfGMwGJW7YhrVkDXy4uAQxUxSgQouvfZoqGSPp1NtM8iVJOGyKiepgB3GxRzQsev2G8Ik47eNkEDVQa47ct9j198Wvnkf88yjSkK0KxR057MWAi20ipNLirW4ZHDAf1giv68mniKfKxsPWahOA/7JYkv18sxcsISQqRXM8nGI1UuSLt9ER7kIzyAk2mgPCiVlj0hoPGUytmbiUqvEM4QaJfCpR0wVO4f/fob6jwKkGT6wbtia+5xCD7bESIHH8ISDrdexZ01QyNP2r4enw==")`
        const algs = ['NOALG', 'MD5', 'SHA1',
            // 'SHA224',//todo uncomment when implemented in ts-lib-crypto
            'SHA256', 'SHA384', 'SHA512',
            'SHA3224', 'SHA3256', 'SHA3384', 'SHA3512'
        ]
        await evaluate(pk)
        await evaluate(msg)
        await evaluate(sig)
        algs.forEach((alg) => {
            const rsaVerify = `rsaVerify(${alg}, msg, sig, pk)`
            evaluate(rsaVerify).then(res => {
                expect('result' in res).to.eq(true)
            })
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
        tests.forEach(async test => expect('result' in await eval(test)).to.eq(true))
    });

    it('checkMerkleProof', async () => {
        const {evaluate} = compiler.repl();
        const code = "let rootHash = base64'eh9fm3HeHZ3XA/UfMpC9HSwLVMyBLgkAJL0MIVBIoYk='\n" +
            "let leafData = base64'AAAm+w=='\n" +
            "let merkleProof = base64'ACBSs2di6rY+9N3mrpQVRNZLGAdRX2WBD6XkrOXuhh42XwEgKhB3Aiij6jqLRuQhrwqv6e05kr89tyxkuFYwUuMCQB8AIKLhp/AFQkokTe/NMQnKFL5eTMvDlFejApmJxPY6Rp8XACAWrdgB8DwvPA8D04E9HgUjhKghAn5aqtZnuKcmpLHztQAgd2OG15WYz90r1WipgXwjdq9WhvMIAtvGlm6E3WYY12oAIJXPPVIdbwOTdUJvCgMI4iape2gvR55vsrO2OmJJtZUNASAya23YyBl+EpKytL9+7cPdkeMMWSjk0Bc0GNnqIisofQ=='\n" +
            "checkMerkleProof(rootHash, merkleProof, leafData)";
        const compiled = await evaluate(code);
        expect(compiled.error).to.be.undefined;
        expect(compiled.result.slice(-4)).to.eq('true')
    });

    it('testHttp', async () => {
        expect((await httpGet({url: 'https://nodes.wavesplatform.com/transactions/info/asd'})).body === undefined)
            .to.eq(false)
    });

    it('connect blockchain - transactionHeightById', async () => {
        const
            nodeUrl = 'https://nodes-testnet.wavesnodes.com/',
            chainId = 'T',
            address = '3N4S7xqHfGvePCGduvzAp7bgUM3j59MZdhB';

        const {evaluate} = compiler.repl({nodeUrl, chainId, address});
        const res = await evaluate('transactionHeightById(base58\'GgjvCxoDP2FtNrKMqsWrUqJZfMGTiWB1tF2RyYHk6u9w\')');
        expect('result' in res).to.eq(true);
        expect(res.result).to.eq("res1: Int|Unit = 661401");
    })


    it('reconfigure', async () => {
        let
            nodeUrl = 'https://nodes-testnet.wavesnodes.com/',
            chainId = 'T',
            address = '3N4S7xqHfGvePCGduvzAp7bgUM3j59MZdhB';

        let repl = compiler.repl({nodeUrl, chainId, address});
        let res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).to.eq(true);

        address = '3N5hQm6twVhFgf8mKBkJpNhxwcBnpZsPyni';
        repl = repl.reconfigure({nodeUrl, chainId, address});
        res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).to.eq(true);

        address = '3N77yhDrPTdLFjzNPZcBQPZLDg11EHAB7xF';
        repl = repl.reconfigure({nodeUrl, chainId, address});
        res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).to.eq(true);

        address = '3Mzrrp6SCrDz7bUQThWoYvbwkFSjTDcRtCv';
        repl = repl.reconfigure({nodeUrl, chainId, address});
        res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).to.eq(true);
    })

    it('v', async () => {
        console.log(compiler.version)
    })
});

