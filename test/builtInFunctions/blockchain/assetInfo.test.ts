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
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.POSITIVE_TEST],
        //invalid data
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i assetInfo function compile', (version, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });
});