import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('math functions tests',  () => {

    let union = random.getRandomUnionArray();
    const fractionInt = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()})`;
    const fractionIntAndUnion = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const invalidFractionInt = `fraction(callerTestData)`;

    union = random.getRandomUnionArray();
    const fractionBigInt = `fraction(callerTestData, callerTestData, callerTestData)`;
    const fractionBigIntAndUnion = `fraction(callerTestData, callerTestData, callerTestData, ${union})`;
    const invalidFractionBigInt = `fraction(callerTestData)`;

    union = random.getRandomUnionArray();
    const logInt = `log(callerTestData, 6, ${random.getRandomInt()}, 4, 2, ${union})`;
    const logBigInt = `log(callerTestData, 6, callerTestData, 4, 2, ${union})`;
    const invalidLogInt = `log(callerTestData, 10, ${random.getRandomInt()}, 15, 22, ${union})`;

    const medianInt = `median([callerTestData, 3, 77, 23])`;
    const medianBigInt = `median(callerTestData)`;
    const invalidMedianInt = `median()`;

    union = random.getRandomUnionArray();
    const powInt = `pow(callerTestData, 6, ${random.getRandomInt()}, 4, 2, ${union})`;
    const powBigInt = `pow(callerTestData, 6, callerTestData, 4, 2, ${union})`;
    const invalidPowInt = `pow(callerTestData, 10, ${random.getRandomInt()}, 15, 22, ${union})`;

    const precondition = new GenerateContractForBuiltInFunctions(fractionInt);
    precondition.setData("Int");

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

        // positive logInt tests
        [data.STDLIB_VERSION_3, logInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, logInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, logInt, random.getRandomInt(), data.positiveTestType],
        // invalid byteVector in logInt
        [data.STDLIB_VERSION_3, logInt, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, logInt, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, logInt, random.getRandomStringArray(), data.negativeTestType],
        // invalid function logInt
        [data.STDLIB_VERSION_3, invalidLogInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidLogInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidLogInt, random.getRandomByteVector(), data.negativeTestType],

        // positive medianInt tests
        [data.STDLIB_VERSION_4, medianInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, medianInt, random.getRandomInt(), data.positiveTestType],
        // invalid byteVector in medianInt
        [data.STDLIB_VERSION_4, medianInt, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, medianInt, random.getRandomStringArray(), data.negativeTestType],
        // invalid function medianInt
        [data.STDLIB_VERSION_4, invalidMedianInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidMedianInt, random.getRandomByteVector(), data.negativeTestType],
        // can't find a function 'median'(List[Int])
        [data.STDLIB_VERSION_3, medianInt, random.getRandomInt(), data.negativeTestType],

        // positive powInt tests
        [data.STDLIB_VERSION_3, powInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, powInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, powInt, random.getRandomInt(), data.positiveTestType],
        // invalid byteVector in powInt
        [data.STDLIB_VERSION_3, powInt, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, powInt, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, powInt, random.getRandomStringArray(), data.negativeTestType],
        // invalid function powInt
        [data.STDLIB_VERSION_3, invalidPowInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidPowInt, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidPowInt, random.getRandomByteVector(), data.negativeTestType],
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

        // positive logBigInt tests
        [data.STDLIB_VERSION_5, logBigInt, random.getRandomInt(), data.positiveTestType],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, logBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, logBigInt, random.getRandomInt(), data.negativeTestType],

        // positive powBigInt tests
        [data.STDLIB_VERSION_5, powBigInt, random.getRandomInt(), data.positiveTestType],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, powBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, powBigInt, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i function %s:BigInt compiles or failed', (version, testFunction, testInt, testType) => {
        const bigInt = `toBigInt(${testInt})`;
        precondition.setData('BigInt')
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive medianBigInt tests
        [data.STDLIB_VERSION_5, medianBigInt, random.getRandomInt(), data.positiveTestType],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_4, medianBigInt, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i function %s:BigInt compiles or failed', (version, testFunction, testInt, testType) => {
        const bigInt = `[toBigInt(${testInt}), toBigInt(33), toBigInt(${random.getRandomInt()})]`;
        precondition.setData('BigInt');
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });
});
