import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toString & toUtf8String',  () => {

    const toString = `toString(callerTestData)`;
    const invalidToString = 'toString()';

    const toUtf8StringFunction = `toUtf8String(callerTestData)`;
    const invalidToUtf8String = 'toUtf8String(callerTestData, callerTestData)';

    const toStringArgBeforeFunc = `callerTestData.toString()`;
    const invalidToStringArgBeforeFunc = 'callerTestData.toString(callerTestData, callerTestData)';

    const toUtf8StringFunctionArgBeforeFunc = `callerTestData.toUtf8String()`;
    const invalidToUtf8StringArgBeforeFunc = 'callerTestData.toUtf8String(callerTestData, callerTestData)';

    const precondition = new GenerateContractForBuiltInFunctions(toString);
    precondition.setData("String");

    test.each([
        // toString
        [data.STDLIB_VERSION_3, toString, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toString, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toString, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toString, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toString, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toString, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toString, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toString, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toString, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toString, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toString, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toString, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data in toString
        [data.STDLIB_VERSION_5, toString, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toString, random.getRandomAlias(), data.NEGATIVE_TEST],
        // invalid function toString
        [data.STDLIB_VERSION_3, invalidToString, true, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToString, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToString, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToString, random.getRandomInt(), data.NEGATIVE_TEST],

        // toUtf8StringFunction
        [data.STDLIB_VERSION_3, toUtf8StringFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toUtf8StringFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toUtf8StringFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toUtf8StringFunction, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data in toUtf8StringFunction
        [data.STDLIB_VERSION_3, toUtf8StringFunction, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toUtf8StringFunction, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toUtf8StringFunction, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toUtf8StringFunction, random.getRandomAlias(), data.NEGATIVE_TEST],
        // invalid function toUtf8StringFunction
        [data.STDLIB_VERSION_3, invalidToUtf8String, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToUtf8String, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToUtf8String, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToUtf8String, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // toString argument before functions
        [data.STDLIB_VERSION_3, toStringArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toStringArgBeforeFunc, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toStringArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toStringArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toStringArgBeforeFunc, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toStringArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toStringArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toStringArgBeforeFunc, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toStringArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toStringArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toStringArgBeforeFunc, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toStringArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data in toString
        [data.STDLIB_VERSION_5, toStringArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toStringArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        // invalid function toString
        [data.STDLIB_VERSION_3, invalidToStringArgBeforeFunc, true, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToStringArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToStringArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToStringArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],

        // toUtf8StringFunction argument before functions
        [data.STDLIB_VERSION_3, toUtf8StringFunctionArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toUtf8StringFunctionArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toUtf8StringFunctionArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toUtf8StringFunctionArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data in toUtf8StringFunction
        [data.STDLIB_VERSION_3, toUtf8StringFunctionArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toUtf8StringFunctionArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toUtf8StringFunctionArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toUtf8StringFunctionArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        // invalid function toUtf8StringFunction
        [data.STDLIB_VERSION_3, invalidToUtf8StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToUtf8StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToUtf8StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToUtf8StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function (arg first) %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });


    test.each([
        [data.STDLIB_VERSION_5, toString, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toString, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toStringArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toStringArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
    ])('check ride v%i function %s compiles with bigInt', (version, testFunction, testInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${testInt})`, testFunction);
        checkCompileResult(contract, testType);
    });
});
