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
        [data.STDLIB_VERSION_3, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.positiveTestType],
        // invalid arg by blockInfoByHeight
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i blockInfoByHeight function compile', (version, num, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, num);
        checkCompileResult(contract, testType);
    });
});