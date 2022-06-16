import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toInt',  () => {

    const toIntFunction = `toInt(callerTestData)`;
    const toIntFromByteVectorOnIndex = `toInt(callerTestData, ${random.getRandomInt()})`;
    const invalidToInt = 'toInt()';

    const precondition = new GenerateContractForBuiltInFunctions(toIntFunction);
    precondition.setData("Int");

    test.each([
        [data.STDLIB_VERSION_3, toIntFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toIntFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toIntFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toIntFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        // toInt func compiles for ride v%i at ByteVector on index
        [data.STDLIB_VERSION_3, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toIntFromByteVectorOnIndex, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data in toInt for ride
        [data.STDLIB_VERSION_3, toIntFunction, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toIntFromByteVectorOnIndex, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toIntFunction, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toIntFromByteVectorOnIndex, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidToInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToInt, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testData, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, toIntFunction, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toIntFunction, random.getRandomInt(), data.POSITIVE_TEST],
        // Can't find a function 'toBigInt'
        [data.STDLIB_VERSION_3, toIntFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toIntFunction, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, intData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${intData})`, testFunction);
        checkCompileResult(contract, testType);
    });
});
