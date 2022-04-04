import * as https from "https";
import * as data from "./testData/data";

const compiler = require('../src');

describe('Compiler', function () {

        test.only('Should compile multisig contract', () => {
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
        expect(result.error).toBeUndefined()
    });


    test.only('Should compile notary contract', () => {
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
        expect(result.error).toBeUndefined()
    });

    test.only('Should not compile invalid contract', () => {
        const contract = `
let a = {
    let x = 1
    1
}
x
            `;
        const result = compiler.compile(contract);
        expect(result.error).toEqual('Compilation failed: [A definition of \'x\' is not found in 33-34]')
    });

    test.only('Should give sensible error on nulls and undefined', () => {
        const contract1 = null;
        const contract2 = undefined;
        const result1 = compiler.compile(contract1);
        const result2 = compiler.compile(contract2);
        expect(result1.error).toEqual('Type error: contract should be string')
        expect(result2.error).toEqual('Type error: contract should be string')
    });

    test.only('Should compile contract with base64 literals', () => {
        const contract = `
let a = base64'AAA=' 
true`;

        const result = compiler.compile(contract);
        expect(result.error).toBeUndefined()
    });

    test.only('Should return estimate', () => {
        const contract = `
let a = base64'AAA=' 
true`;
        const result = compiler.compile(contract);
        expect(typeof result.result.complexity).toBe('number')
    });

    test.only('Should decompile code', () => {
        const contract = `
let a = base64'AAA=' 
true`;
        const contractBase64 = compiler.compile(contract).result.base64;
        expect(typeof compiler.decompile(contractBase64).result).toBe('string')

    });

    test.only('Should compile dApp', () => {
        const contract = `{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

func foo() = 3

@Callable(i)
func bar() = WriteSet([])`;
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined()
    });

    test.only('Should get MaxComplexityByVersion', () => {
        expect(compiler.contractLimits.MaxComplexityByVersion(2)).toEqual(2000);
        expect(compiler.contractLimits.MaxComplexityByVersion(3)).toEqual(4000)
    });

    test.only(' ba.sha256 is not a function', async () => {
        const evaluation = compiler.repl().evaluate;
        const res = await evaluation("sha256(base58'qwe')");
        expect(res.result).toEqual('res1: ByteVector = base58\'Fyru2hk6gk2e7mqLDbvuafEiAQSiTYJGRcL3s8kDkAhp\'')
    })

    test.only('Imports', () => {
        const script = `
{-# STDLIB_VERSION 3 #-}
{-# SCRIPT_TYPE ACCOUNT #-}
{-# IMPORT lib2,lib1,lib3 #-}
let a = 5
multiply(inc(a), dec(a)) == (5 + 1) * (5 - 1)
            `;

        const info = compiler.scriptInfo(script);
        expect(info.imports.toString()).toEqual('lib2,lib1,lib3');
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
        console.log('libs', libs)
        let res = compiler.compile(script, 3, libs);
        console.log('res', res)
        if ('error' in res) console.log(res.error);
        expect(res.error).toBeUndefined()
    })

    test.only('Should sign and verify via global curve25519verify', async function () {
        const res = await compiler.repl().evaluate(`sigVerify(
       base58'59Su1K4KSU',
       base58'CGNGZ6G4tuYsW9AbBZPvhTvtVQYAnE8w22UMWLpLM8bGMiys4psATG7sX58p2aFe9uysYyrwnuP2GwT7NAJe737',
       base58'D6HmGZqpXCyAqpz8mCAfWijYDWsPKncKe5v3jq1nTpf5'
       )`)

        expect(res.result).toEqual('res1: Boolean = true')
    });

    test.only('rsa verify', async function () {
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
                expect('result' in res).toEqual(true)
            })
        })
    });

    test.only('log', function () {
        const evaluate = compiler.repl().evaluate;
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
        tests.forEach(async test => expect('result' in await evaluate(test)).toEqual(true))
    });

    test.only('testHttp', async () => {
        expect((await https.get( 'https://nodes.wavesplatform.com/transactions/info/asd')
            .getHeader("body")))
            .toBeUndefined()
    });

    test.only('connect blockchain - transactionHeightById', async () => {
        const
            nodeUrl = 'https://nodes-testnet.wavesnodes.com/',
            chainId = 'T',
            address = '3N4S7xqHfGvePCGduvzAp7bgUM3j59MZdhB';

        const {evaluate} = compiler.repl({nodeUrl, chainId, address});
        const res = await evaluate('transactionHeightById(base58\'GgjvCxoDP2FtNrKMqsWrUqJZfMGTiWB1tF2RyYHk6u9w\')');
        expect('result' in res).toEqual(true);
        expect(res.result).toEqual("res1: Int|Unit = 661401");
    })


    test.only('reconfigure', async () => {
        let
            nodeUrl = 'https://nodes-testnet.wavesnodes.com/',
            chainId = 'T',
            address = '3N4S7xqHfGvePCGduvzAp7bgUM3j59MZdhB';

        let repl = compiler.repl({nodeUrl, chainId, address});
        let res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).toEqual(true);

        address = '3N5hQm6twVhFgf8mKBkJpNhxwcBnpZsPyni';
        repl = repl.reconfigure({nodeUrl, chainId, address});
        res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).toEqual(true);

        address = '3N77yhDrPTdLFjzNPZcBQPZLDg11EHAB7xF';
        repl = repl.reconfigure({nodeUrl, chainId, address});
        res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).toEqual(true);

        address = '3Mzrrp6SCrDz7bUQThWoYvbwkFSjTDcRtCv';
        repl = repl.reconfigure({nodeUrl, chainId, address});
        res = await repl.evaluate('this');
        expect('result' in res && res.result.includes(address)).toEqual(true);
    })

    test.only('complexity', () => {
        const contract = `
        {-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

func userfunc() = {
    sigVerify(base58'', base58'', base58'')
}

@Callable(i)
func asd() = {
    WriteSet([DataEntry("d",
    ${Array.from({length: 100}, () =>
            "sigVerify(base58'', base58'', base58'')").join(' &&\n')
        }
    )])
}
`;
        const flattenResult = compiler.flattenCompilationResult(compiler.compile(contract))
        expect(typeof flattenResult.verifierComplexity).toEqual('number')
        expect(typeof flattenResult.callableComplexities).toEqual('object')
        expect(typeof flattenResult.userFunctionComplexities).toEqual('object')
        expect(typeof flattenResult.error).toEqual('string')
        expect(typeof flattenResult.complexity).toEqual('number')

    })


    test.only('complexity by funcs', () => {
        const contract = `
        {-# STDLIB_VERSION 3 #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
        
        @Callable(i)
        func foo() = {
            WriteSet([])
        }
        
        @Verifier(tx)
        func standardVerifier() = sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPublicKey)
        `

        const flattenResult = compiler.flattenCompilationResult(compiler.compile(contract))
        expect(typeof flattenResult.verifierComplexity).toEqual('number')
        expect(typeof flattenResult.callableComplexities).toEqual('object')
        expect(typeof flattenResult.userFunctionComplexities).toEqual('object')
        expect(typeof flattenResult.error).toEqual('undefined')
        expect(typeof flattenResult.complexity).toEqual('number')

    });

    test.only('presence of errors ride v5', () => {
        const contract = `
        {-# STDLIB_VERSION 5 #-}
        {-# CONTENT_TYPE DAPP #-}
        {-#SCRIPT_TYPE ACCOUNT#-}
        @Verifier(tx)
        func verify() = sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPublicKey)

        @Callable(i)
        func foo() = {
            let nextDAppAddr = Address(base58'')
        
            strict invResult = invoke(nextDAppAddr, "bar", [], [])
        
            if invResult == 42
            then
              ([], unit)
            else
              throw("Internal invoke state update error")
        }
        
        @Callable(i)
        func foo1() = {
            let nextDAppAddr = Address(base58'')
        
            strict invResult = invoke(nextDAppAddr, "bar", [], [])
        
            if invResult == 42
            then
              ([], unit)
            else
              throw("Internal invoke state update error")
        }
        `

        const result = compiler.compile(contract)
        expect(result.error).toBeUndefined()
    });

    test.only('imports', () => {
        const scriptec = `
        {-# STDLIB_VERSION 4 #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
        {-# IMPORT lib1,lib2 #-}
    
        let a = 5
    
        multiply(inc(a), dec(a)) == (5 + 1) * (5 - 1)
        `

        const result = compiler.scriptInfo(scriptec)
        console.log(result)
        expect(result.imports.toString()).toEqual('lib1,lib2')
    });

    test.only('use libs', async () => {
        const lib1 = `
{-# SCRIPT_TYPE  ACCOUNT #-}
{-# CONTENT_TYPE LIBRARY #-}
 
func inc(a: Int) = a + 1
`
        const lib2 = `
{-# SCRIPT_TYPE  ACCOUNT #-}
{-# CONTENT_TYPE LIBRARY #-}
 
func dec(a: Int) = a - 1
`
        const lib3 = `
{-# SCRIPT_TYPE  ACCOUNT #-}
{-# CONTENT_TYPE LIBRARY #-}

func multiply(a: Int, b: Int) = a * b
`
        const code = `
{-# STDLIB_VERSION 4 #-}
{-# SCRIPT_TYPE ACCOUNT #-}
{-# IMPORT lib1.ride,lib-2.ride,lib.3.ride #-}
 
let a = 5
 
multiply(inc(a), dec(a)) == (5 + 1) * (5 - 1)
`
        let libMap = {
            'lib1.ride': lib1,
            'lib-2.ride': lib2,
            'lib.3.ride': lib3
        }
        const res = compiler.compile(code,3, false, false, libMap)
    })

    test.only('compiler version', () => {
        console.log(compiler.version)
    })

    test.only("negative: invalid lib version", () => {
        let contract = `
            {-# STDLIB_VERSION ${data.STDLIB_INVALID_VERSION} #-}
            {-# CONTENT_TYPE DAPP #-}
            {-# SCRIPT_TYPE ACCOUNT #-}
        `
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toEqual(`Illegal directive value ${data.STDLIB_INVALID_VERSION} for key STDLIB_VERSION`);
    })
});


