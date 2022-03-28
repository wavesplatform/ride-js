import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('blockInfoByHeight',  () => {

    const defaultScriptHashFunction = `blockInfoByHeight(testData)`;
    const incorrectFunction = `blockInfoByHeight()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'BlockInfo');

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomInt()],
        [data.STDLIB_VERSION_4, data.getRandomInt()],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('positive: check block info by height', (version, num) => {
        let contract = precondition.generateOnlyMatcherContract(version, num);
        const compiled = compiler.compile(contract);
        console.log(contract)
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, `"string"`],
    ])('negative: invalid arg by blockInfoByHeight', (version, num) => {
        let contract = precondition.generateOnlyMatcherContract(version, num);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: Int`);
    });
});