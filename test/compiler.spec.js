const compiler = require('../src');
const {expect} = require('chai');
const crypto = require('crypto');
const axlsign = require('curve25519-js');


describe('Compiler', () => {
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
    })
    it(' ba.sha256 is not a function', () => {
        try {

            const {evaluate} = compiler.repl();

            const keys = 'base64\'hell\'';
            const msg = 'base64\'hell\'';
            const sig = 'base64\'hell\'';
            console.log(evaluate(`sigVerify(${keys}, ${msg}, ${sig}  )`))

        } catch (e) {
            console.error('running error', e)
        }
    })

    it('1234', () => {
        console.log(compiler.version);

        const script = `
            {-# STDLIB_VERSION 3 #-}
            {-# SCRIPT_TYPE ACCOUNT #-}
            {-# IMPORT lib2,lib1,lib3 #-}
            let a = 5
            multiply(inc(a), dec(a)) == (5 + 1) * (5 - 1)
            `;

        const info = compiler.scriptInfo(script);
        console.log(info.imports)
        const files = [

            {
                name: "lib1",
                content: `
             {-# SCRIPT_TYPE  ACCOUNT #-}
             {-# CONTENT_TYPE LIBRARY #-}
             func inc(a: Int) = a + 1
             `
            },
            {
                name: "lib2",
                content: `
             {-# SCRIPT_TYPE  ACCOUNT #-}
             {-# CONTENT_TYPE LIBRARY #-}
             func dec(a: Int) = a - 1
             `
            },
            {
                name: "lib3",
                content: `
             {-# SCRIPT_TYPE  ACCOUNT #-}
             {-# CONTENT_TYPE LIBRARY #-}
             func multiply(a: Int, b: Int) = a * b
             `
            },
            {
                name: "lib4",
                content: `
             {-# SCRIPT_TYPE  ACCOUNT #-}
             {-# CONTENT_TYPE LIBRARY #-}
             func dec(a: Int) = a - 1
             `
            },
            {
                name: "lib5",
                content: `
             {-# SCRIPT_TYPE  ACCOUNT #-}
             {-# CONTENT_TYPE LIBRARY #-}
             func multiply(a: Int, b: Int) = a * b
             }`
            }];

        const libs = files.filter(({name}) => info.imports.includes(name)).reduce((acc, val) => ({
            ...acc,
            [val.name]: val.content
        }), {})
        let res = compiler.compile(script, libs);
        if (res.error) console.error(res.error);
        if (res.result) console.log('\x1b[32msuccess');
    })

    it('should sign and verify', function () {
        compiler.repl().evaluate(`sigVerify(
       base58'D6HmGZqpXCyAqpz8mCAfWijYDWsPKncKe5v3jq1nTpf5',
       base58'59Su1K4KSU',
       base58'CGNGZ6G4tuYsW9AbBZPvhTvtVQYAnE8w22UMWLpLM8bGMiys4psATG7sX58p2aFe9uysYyrwnuP2GwT7NAJe737'
       )`)
    });


});

