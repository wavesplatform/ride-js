import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toInt',  () => {

    const toIntFunction = `toInt(callerTestData)`;
    const toIntFromByteVectorOnIndex = `toInt(callerTestData, 2)`;
    const invalidToInt = 'toInt()';

    const precondition = new GenerateContractForBuiltInFunctions
    (toIntFunction, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, toIntFunction, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toIntFunction, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toIntFunction, random.getRandomByteVector(), data.positiveTestType],
        // toInt func compiles for ride v%i at ByteVector on index
        [data.STDLIB_VERSION_3, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.positiveTestType],
        // invalid data in toInt for ride
        [data.STDLIB_VERSION_3, toIntFunction, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_4, toIntFromByteVectorOnIndex, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, toIntFunction, random.getRandomIssuesArray(), data.negativeTestType],
        // invalid function
        [data.STDLIB_VERSION_3, invalidToInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidToInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidToInt, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, testData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testData, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, toIntFunction, random.getRandomInt(), data.positiveTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, intData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${intData})`, testFunction);
        checkCompileResult(contract, testType);
    });
});
