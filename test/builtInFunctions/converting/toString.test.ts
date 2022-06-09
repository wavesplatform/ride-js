import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toString & toUtf8String',  () => {

    const toString = `toString(callerTestData)`;
    const invalidToString = 'toString()';
    const toUtf8StringFunction = `toUtf8String(callerTestData)`;
    const invalidToUtf8String = 'toUtf8String()';

    const precondition = new GenerateContractForBuiltInFunctions(toString);
    precondition.setData("String");

    test.each([
        // toString
        [data.STDLIB_VERSION_3, toString, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, toString, false, data.positiveTestType],
        [data.STDLIB_VERSION_3, toString, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toString, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toString, true, data.positiveTestType],
        [data.STDLIB_VERSION_4, toString, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toString, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toString, false, data.positiveTestType],
        [data.STDLIB_VERSION_5, toString, random.getRandomInt(), data.positiveTestType],
        // invalid data in toString
        [data.STDLIB_VERSION_5, toString, random.getRandomAlias(), data.negativeTestType],
        // invalid function toString
        [data.STDLIB_VERSION_3, invalidToString, true, data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidToString, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidToString, random.getRandomInt(), data.negativeTestType],

        // toUtf8StringFunction
        [data.STDLIB_VERSION_3, toUtf8StringFunction, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toUtf8StringFunction, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toUtf8StringFunction, random.getRandomByteVector(), data.positiveTestType],
        // invalid data in toUtf8StringFunction
        [data.STDLIB_VERSION_3, toUtf8StringFunction, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, toUtf8StringFunction, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, toUtf8StringFunction, random.getRandomAlias(), data.negativeTestType],
        // invalid function toUtf8StringFunction
        [data.STDLIB_VERSION_3, invalidToUtf8String, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidToUtf8String, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidToUtf8String, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, toString, random.getRandomInt(), data.positiveTestType],
    ])('check ride v%i function %s compiles with bigInt', (version, testFunction, testInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${testInt})`, testFunction);
        checkCompileResult(contract, testType);
    });
});
