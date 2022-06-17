import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('assetInfo',  () => {

    const defaultScriptHashFunction = `assetInfo(callerTestData)`;
    const incorrectFunction = `assetInfo()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'Asset');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.positiveTestType],
        //invalid data
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i assetInfo function compile', (version, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });
});