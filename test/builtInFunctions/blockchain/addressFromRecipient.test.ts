import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('addressFromRecipient',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress(), data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAddress(), data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.getRandomAddress(), data.getRandomAddress()],
        [data.STDLIB_VERSION_3, data.getRandomAlias(), data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias(), data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.getRandomAlias(), data.getRandomAddress()],
    ])('positive: Checking the address in a transfer transaction', (version, addressOrAlias, address) => {
        let contract = generateContract(version, addressOrAlias, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, 'invalid address', data.getRandomAddress()],
        [data.STDLIB_VERSION_4, 'invalid address', data.getRandomAddress()],
        [data.STDLIB_VERSION_5, 'invalid address', data.getRandomAddress()],
    ])('negative: invalid address', (version, invalidAddress, address) => {
        let contract = generateContract(version, invalidAddress, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Parsed.Failure`);
    });

    const generateContract = (libVersion, addressOrAlias, address) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE EXPRESSION #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        match (tx) {
            case t: TransferTransaction => addressFromRecipient(${addressOrAlias}) == ${address}
            case _ => false
        }`;
    };
});