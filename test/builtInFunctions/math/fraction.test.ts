import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('fraction functions',  () => {

    const union = random.getRandomUnionArray();
    const fractionInt = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()})`;
    const fractionIntAndUnion = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const invalidFractionInt = `fraction(callerTestData)`;

    const fractionBigInt = `fraction(callerTestData, callerTestData, callerTestData)`;
    const fractionBigIntAndUnion = `fraction(callerTestData, callerTestData, callerTestData, ${union})`;
    const invalidFractionBigInt = `fraction(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (fractionInt, null, 'Int');

    test.each([
        // positive fractionInt tests
        [data.STDLIB_VERSION_3, fractionInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, fractionInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, fractionInt, random.getRandomInt(), data.positiveTestType],
        // invalid byteVector in fractionInt
        [data.STDLIB_VERSION_3, fractionInt, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, fractionInt, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, fractionInt, random.getRandomStringArray(), data.negativeTestType],
        // invalid function fractionInt
        [data.STDLIB_VERSION_3, invalidFractionInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidFractionInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidFractionInt, random.getRandomByteVector(), data.negativeTestType],

        // positive fractionIntAndUnion tests
        [data.STDLIB_VERSION_5, fractionIntAndUnion, random.getRandomInt(), data.positiveTestType],
        // function 'fraction' requires 3 arguments, but 4 are provided
        [data.STDLIB_VERSION_3, fractionIntAndUnion, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, fractionIntAndUnion, random.getRandomInt(), data.negativeTestType],
        // invalid byteVector in fractionIntAndUnion
        [data.STDLIB_VERSION_5, fractionIntAndUnion, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testInt, testFunction);
        checkCompileResult(contract, testType);
    });


    test.each([
        // positive fractionBigInt tests
        [data.STDLIB_VERSION_5, fractionBigInt, random.getRandomInt(), data.positiveTestType],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, fractionBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, fractionBigInt, random.getRandomInt(), data.negativeTestType],
        // invalid data in fractionBigInt
        [data.STDLIB_VERSION_3, fractionBigInt, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, fractionBigInt, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, fractionBigInt, random.getRandomStringArray(), data.negativeTestType],
        // invalid function fractionBigInt
        [data.STDLIB_VERSION_3, invalidFractionBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidFractionBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidFractionBigInt, random.getRandomInt(), data.negativeTestType],

        // positive fractionBigIntAndUnion tests
        [data.STDLIB_VERSION_5, fractionBigIntAndUnion, random.getRandomInt(), data.positiveTestType],
        // function 'fraction' requires 3 arguments, but 4 are provided
        [data.STDLIB_VERSION_3, fractionBigIntAndUnion, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, fractionBigIntAndUnion, random.getRandomInt(), data.negativeTestType],
        // invalid byteVector in fractionBigIntAndUnion
        [data.STDLIB_VERSION_5, fractionBigIntAndUnion, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s:BigInt compiles or failed', (version, testFunction, testInt, testType) => {
        const bigInt = `toBigInt(${testInt})`;
        precondition.setData('BigInt')
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });
});
