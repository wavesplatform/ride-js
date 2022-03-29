import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('blockInfoByHeight',  () => {

    const defaultScriptHashFunction = `blockInfoByHeight(callerTestData)`;
    const incorrectFunction = `blockInfoByHeight()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'BlockInfo');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: check block info by height', (version, num) => {
        let contract = precondition.generateOnlyMatcherContract(version, num);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, `"string"`],
    ])('negative: invalid arg by blockInfoByHeight', (version, num) => {
        let contract = precondition.generateOnlyMatcherContract(version, num);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: Int`);
    });
});