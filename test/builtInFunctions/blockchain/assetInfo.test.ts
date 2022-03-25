import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('addressFromRecipient',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: Checking the address in a transfer transaction', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        console.log(contract)
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, 1],
    ])('negative: invalid asset in assetInfo', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        switch(version) {
            case data.STDLIB_VERSION_3: {
                expect(compiled.error)
                    .toContain(`Compilation failed: [Non-matching types: expected: ByteVector, actual: Address`);
                break;
            }
            case data.STDLIB_VERSION_4:
            {
                expect(compiled.error)
                    .toContain(`Compilation failed: [Non-matching types: expected: ByteVector, actual: Alias`);
                break;
            }
            case data.STDLIB_VERSION_5:
            {
                expect(compiled.error)
                    .toContain(`Compilation failed: [Non-matching types: expected: ByteVector, actual: Int`);
                break;
            }
        }
    });

    const generateContract = (libVersion, byteVector) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        let x = match assetInfo(${byteVector}) {
            case asset:Asset =>
                asset.decimals # 8
            case _ => throw("Can't find asset")
        }`;
    };
});