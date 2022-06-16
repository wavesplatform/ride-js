import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('blockInfoByHeight',  () => {

    const defaultScriptHashFunction = `blockInfoByHeight(callerTestData)`;
    const incorrectFunction = `blockInfoByHeight()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'BlockInfo');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid arg by blockInfoByHeight
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i blockInfoByHeight function compile', (version, num, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, num);
        checkCompileResult(contract, testType);
    });
});