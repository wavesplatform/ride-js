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
        const pk = `let pk = fromBase64String("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt5IE7IAnSq7uK8FknxfEm2OtPvFOQlVy4F9arLp0PmhIRkDMpk7nWu3aNn6NBYX4kiigOLBhRDwNAZTJXnCjS8FQ/trZRo7oANiCX9kKwJZKQQCjLS0KSRWQWunDF7l9EUhTwb3QzhdSvYJLy3lOk90ZPB+36YvHooFx8oLIJimJhgbPXL95Yk6i+wh32Zhda616+9q/EftA5I4emJZRFLareSXM/MR03IFjYdh4S7LH+OPr94IQY/26Pt5HmS0X4W500HjxEp1vF8Irx3GYiF6Abk7JK5Gyf6W8ApEfAofj0s8qfLfHhH4JHg/QwW4NSd1NrhRMov2H7v31BVsRgwIDAQAB")`
        const msg = `let msg = fromBase64String("aGVsbG8gd29ybGQ=")`

        const signatures = [
            {alg:"NOALG","sig":"eSYkQMhRYhSVCoJoulhT7Q5esRGMJS/9ztMjDbvCAI4zlZnuIJkFfT7BS5rvwQ1vAeBnWX1lmi+BrbJ8/6elUsavEd6ZTg9GHkKIVwXeh3LqnyChmRYRzwjk2s6+WD9S9M3YUpgoNL1e2rwegA7sE9QZ4FpZyLZAk0PW0vOjIC33DSB1M6nv0vSzlFkwj3EHf8/vrYprnvtsZYWjWhmxV3oh8dYdE5lNRTvnYRSfQCq9NpRNt/ErRphTTwhk78GcYptTvR6sdIQNGvncwDOUHVoxZF1+HmyxPuQztE9xPVeVHuo8lezLqmOh84Li48WfvjYNBfEqZNTKyht0CAegDg=="},
            {alg:"MD5",sig:"kHOfaGcMkCSaVBwwyg/yy0IrYM3wntSh6/AxfdXDWyGgtxlOoeMi45Btw71hk8a+M2xCQ4FgTu2s3lWbYSTk3qf+hDOgRqOoKDoehAwtMC+DH/d/kcgArtnf9g13D4gbpWrcjb5M9Q6fNcPUfZDT6U13exh6rbjKGdpNCun2DqHzpUUUn96Jkc7XYXQwyEN8IU0J5Ez38dqlyDEvuRykjz/ABd/tQxp1IivVZ9OgAJttVlfAmmYCHPSSQfXAQk1w4fLremHqolQJGZzDCfKkqucni/BdWnMXJikI63y0u1++3Jnipb93PrfmLlGxWinwybD3O9oKiZ2SigHy5/t6eA=="},
            {alg:"SHA1",sig:"r06p9Zmdx+tJQYS2rDq4XLY4TZFofovPsq94gAkI4yCCBIQg7I+pkuixOONisnJZmItUWF9vvo+AGBTSDHDQWcTiVWLXD49ynlEG0GOS/W9zsT7KWYRwaaulXL7PFHSDC87OcuS2n0KEivM3K20QhcC+X/cNR5c6vJ2nmuAE/3xU1qlnMm/bUQYicuQOD0gKLb1BuVqFAZ/KQfKiuzdOoX9Pkg135qAygGSRRFIhJ67kb2lRpqeFS4FgHqc6Cm3oINDxx9MZTZ/DZnaqAByABbAIQhPrZeekg3Ysj8FoOvoxZGpvzb5cbjO6akV+aHnqOcOKksl/h5EKy2BjfNJpWA=="},
            // {alg:"SHA224",sig:"ZYRap9zdQ8SUVHIJky4dXyen/TofgDBjLazxIs7Piz6a2CLyHL7cVZLBLbikIzP4rk9o+ZuzOdmaUCqfEWXzj97om6BdbvgDaXrv5IM92Q2Bd3EH1VoEpYQtDmAJOyJV9VSGkjMlOosR31jppQ0UUKHYkqo9dxnkLpTv6XkLtQNUP7NLazxP2KbT4gnffXf2opXvUNWpiiywVs8vilQmkL1EocjOopf9rclWcH2LkcXM3NHrk7wqKyDsvclh1LogWsNiNXmcnvKrpD5AEOxGw3k0F0tre/eFP915b4kBbozfs4RRwAqTkrEzNbfYp/Id4C8WB8a5MObUQPwglHu1Og=="},
            {alg:"SHA256",sig:"AD/Q/AjmUUYlEec3LbBBNA+R8A+hlHyZoQs5BUuawJRqF0ROeJZLXktSegO8q6v+/W5yBRwuSbVSTyb/vtvvM0Qr8ayhKNpcF0unYtILO6g0farJGMU21Ne0I5nNknRveLmXY6itatba+3OU510HtZWmXo+y8qXNEp2VRI6Qpz2hzl1xt9qg8/psuAPNpk1OpFqShyh9lHNkwFQYJ2lDnoMkDWFof4SojTYAvL01sRtFGwjMb+K71QvGH0RX1FdGId/tubmFQRfMJuVpZkGgyZ/8PD245MkxbIJCAKraFst5n0Wi6wx++CT31fU4qLGYdaW3MW3h9zPPUV9RLJfeDQ=="},
            {alg:"SHA384",sig:"RXjxfAhg4f4G/UkRoyxnCTTKkME2ceTjQJJEgtL7O19srM3yFFqY2cqVFIFpOJBEQ+4KdncGZeQZmsHQrXfq5U8O9rZi9ugURKnG07l/hjvU6UqUJfWYCY31rEQUpURcH00GNmIUu8wQwFmTJT1LHao0tByAP01N7VJ2JSTzHbpb/buQh27AyIKoH8JibT5qQMS8LAf/m+Jxr0nGFyLd0KwV+YAs1TUfmOPSR15VeyN3qmL5PVB4j5tHXpa0fVq9ALVrvKyIuQDVX0w1L6KMcy+Y6tz3eBZrs+V7Jf5dEYe2+JXTxnAZU1c55DMIBCvPly76wYpL8w8XUA5WyJCw8w=="},
            {alg:"SHA512",sig:"swZmWD0MEXOm+pR9Xf3vP674doW9HgLxK8ntVyhUmrKsWc9GoCeX5Q3PgvVhkQ2lOA8GXZ1tXdrx6syfF5DZqBEiBASYyozL/KOd8C2r7oKIXeS1S6JzdwWiTxSD+PBpiMwBEbxj91tLKjrvcTCfzByCfNZdYv+/mi5Dxs/0wS6rdj62m5diUTy5MuY1NwC5E0OKShie0olyikDTflSUNMmiYjmykKW0xuXKJXsdOCO2DsqPCihRN2CeHsWXZZRJc8mPWPfqBElVGzJGzOpGDT4sfi8c9EuwFPsjUafB/2yrb2es5IsueSg/scqGmAxYZ+DpUO3OCioXr8z/zt21PA=="},
            {alg:"SHA3224",sig:"UkOMw6DQHfALpkP6ChWYTPQmj/80YWL6DpkUJHaFQWhXFxuU/9JgpQ3qC6N/qZTHTwlpVlV+19gLrfhC2JJjCmNEM1zyuDd2Tln8Ny8MHK+aF4UD8JDOqQCn39uR6CLXpSHVFXP8RRzWo3YbmLI5WMZL087aKjcMQU7Yc7ebVFFcNJZrz7d8ZsSzUrTvxpuBypxDJT+Z2HfFDNQAty/pi1B6FetC3vbB/CWRXCk7NEqgZHavd/VsE4GixaM+PcQtVFjPRNTZir0aZfLey9hoYFOQ5oYVLM/RtmCTwQzRrcjUZv9EiPlZWqvokl1fFXD0ENRpDEFZ1Or2cqtV0zqdOg=="},
            {alg:"SHA3256",sig:"idpbJpjm3Yz2qgiqNuicDK4cR3VMzu12ny40lSGwAln5w38KJhWdjjlyHwEjDHg1hXKSNRwCrIeykPuIIP3Wn+8mo/CRBUgBHahuCb0YwdfeE0CjeAKsIWoR+VmY36Eeocbc+zCOKMfw6Ybs2BvVZlycJ3R3YkzrL6+fQqKyhtWjg/CgrIBZ0g7Uq0U2HR9vD94vFwdBT63Xcf1tRc5Wq1TaxgsfNLY7SPaHwdNwJvvi01YhCe5W2HCf7dpzP/hn5mxxdOSIfi+j1wtBy4v5jezCB7Nzf45ZQ7vdCmGP1SKjAHsTSdJxuQBMACselLOniDdCscIIAhTPx6cOdM6ZyQ=="},
            {alg:"SHA3384",sig:"L1TR8izeM0yRnMX7l6eKonHNGUmAsQi7GMOOmFQTFNZg9omVYYlgzCwq1LmR1R8DPAN40ZN9V0peEkocFT7zhLWLKAnE5YXBrm1iwMsIBK3WKLt2p7aknz1UwlGRZWlTlpPoOryYA0rgX4v8PnfYMjixck9Y5nPbl8+x/clnVzWEpCdeFw5wWFzskeFnXjAYaVVB0jtY3m8pKj+ZxCdU3sRtL3Ev8+wtRmW+h9BEicWYu98NqTAMH2TlGz/S3sq5IXl0XDau1ahwEj4QXp+B87JyR290yx87yi6KFcux7zkc+bfge9+pjZjDXO5LBao2jqvAuiDJ9PW96eUbbIq+XQ=="},
            {alg:"SHA3512",sig:"pvPNCpOhu3Ju0VRR0tW1rwb5E6Px39xKZQVxKxdNrboJKhUmkDxEq8mm1EynbS8KshsB5YsbGmSpaDX+THKxlllDl0gHWJu54MV+Bh/HegvdorkrbPBzivFdiLj/ecY6Vc1HMcUd9mGvYlQ//fcOKvs8oGOK1Z2TE2ojKyuC/8Bsx/M29uRnBRUIh9nXD7eSAiui92NkNfCXjes7RLed6jO/kYbQw7Tl6h1hWoYHCBU39qJTK0NKV8U4/wI9A7tGDXfEbA51ulYS0XaYOUf7EqT/Aq+GV5w7CxOsc8P2B0h6YVLzUUHSia7CB6DYWkhk/v3ZC5qHxT92VOnC9715ag=="},
        ]

        const sig = `let sig = fromBase64String("OXVKJwtSoenRmwizPtpjh3sCNmOpU1tnXUnyzl+PEI1P9Rx20GkxkIXlysFT2WdbPn/HsfGMwGJW7YhrVkDXy4uAQxUxSgQouvfZoqGSPp1NtM8iVJOGyKiepgB3GxRzQsev2G8Ik47eNkEDVQa47ct9j198Wvnkf88yjSkK0KxR057MWAi20ipNLirW4ZHDAf1giv68mniKfKxsPWahOA/7JYkv18sxcsISQqRXM8nGI1UuSLt9ER7kIzyAk2mgPCiVlj0hoPGUytmbiUqvEM4QaJfCpR0wVO4f/fob6jwKkGT6wbtia+5xCD7bESIHH8ISDrdexZ01QyNP2r4enw==")`
        const algs = ['NOALG', 'MD5', 'SHA1',
            // 'SHA224',//todo uncomment when implemented in ts-lib-crypto
            'SHA256', 'SHA384', 'SHA512',
            'SHA3224', 'SHA3256', 'SHA3384', 'SHA3512'
        ]
        await evaluate(pk)
        await evaluate(msg)
        await evaluate(sig)
        signatures.forEach(({alg, sig}) => {
            const rsaVerify = `rsaVerify(${alg}, msg, fromBase64String("${sig}"), pk)`
            evaluate(rsaVerify).then(res => {
                expect('result' in res).toEqual(true)
            })
        })
    });

    test.only('log', function () {
        const evaluate = compiler.repl().evaluate;
        const tests = [
            "pow(12, 1, 3456, 3, 2, DOWN)",
            "pow(12, 1, 3456, 3, 2, HALFUP)",
            "pow(0, 1, 3456, 3, 2, HALFUP)",
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
            "pow(2, 0, 62, 0, 0, HALFUP)",
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
        {-# STDLIB_VERSION 6 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

func userfunc() = {
    sigVerify(base58'', base58'', base58'')
}

@Callable(i)
func asd() = {
    [BooleanEntry("d",
    ${Array.from({length: 100}, () =>
            "sigVerify(base58'', base58'', base58'')").join(' &&\n')
        }
    )]
}
`;
        const flattenResult = compiler.flattenCompilationResult(compiler.compile(contract))
        expect(typeof flattenResult.verifierComplexity).toEqual('number')
        expect(typeof flattenResult.callableComplexities).toEqual('object')
        expect(typeof flattenResult.userFunctionComplexities).toEqual('object')
        expect(typeof flattenResult.error).toEqual('undefined')
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

    test.only('Imports and use libs', async () => {
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
        const compiled = compiler.compile(code,3, false, false, libMap)
        expect(compiled.error).toBeUndefined()
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


