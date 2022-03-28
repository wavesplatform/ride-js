import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('transactionHeightById',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: get the height of the transaction block.', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, ''],
    ])('negative: invalid arg by transactionHeightById', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        switch(version) {
            case data.STDLIB_VERSION_3:
            case data.STDLIB_VERSION_4: {
                expect(compiled.error)
                    .toContain(`Compilation failed: [Non-matching types: expected: ByteVector`);
                break;
            }
            case data.STDLIB_VERSION_5:
            {
                expect(compiled.error)
                    .toContain(`Function 'transactionHeightById' requires 1 arguments, but 0 are provided`);
                break;
            }
        }
    });

    const generateContract = (libVersion, byteVector) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        let x = match transactionHeightById(${byteVector}) {
            case h:Int => h
            case _ => throw("Can't find transaction")
        }`
    };
})