import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('blockInfoByHeight',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomInt()],
        [data.STDLIB_VERSION_4, data.getRandomInt()],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
        [data.STDLIB_VERSION_3, data.getRandomInt()],
        [data.STDLIB_VERSION_4, data.getRandomInt()],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('positive: check block info by height', (version, num) => {
        let contract = generateContract(version, num);
        const compiled = compiler.compile(contract);
        console.log(contract)
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, ''],
    ])('negative: invalid arg by blockInfoByHeight', (version, num) => {
        let contract = generateContract(version, num);
        const compiled = compiler.compile(contract);
        switch(version) {
            case data.STDLIB_VERSION_3:
            case data.STDLIB_VERSION_4: {
                expect(compiled.error)
                    .toContain(`Compilation failed: [Non-matching types: expected: Int, actual: Address`);
                break;
            }
            case data.STDLIB_VERSION_5:
            {
                expect(compiled.error)
                    .toContain(`Compilation failed: [Function 'blockInfoByHeight' requires 1 arguments, but 0`);
                break;
            }
        }
    });

    const generateContract = (libVersion, number) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        let x = match blockInfoByHeight(${number}) {
            case block:BlockInfo =>
                block.generator.toString()
            case _ => throw("Can't find block")
        }`
    };
});