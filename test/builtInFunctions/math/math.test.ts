import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('math functions tests',  () => {

    let union = random.getRandomUnion();
    const fractionInt = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()})`;
    const fractionIntAndUnion = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const invalidFractionFunction = `fraction(callerTestData)`;

    union = random.getRandomUnion();
    const fractionBigInt = `fraction(callerTestData, callerTestData, callerTestData)`;
    const fractionBigIntAndUnion = `fraction(callerTestData, callerTestData, callerTestData, ${union})`;

    union = random.getRandomUnion();
    const logInt = `log(callerTestData, 6, ${random.getRandomInt()}, 4, 2, ${union})`;
    const logBigInt = `log(callerTestData, 6, callerTestData, 4, 2, ${union})`;
    const invalidLogInt = `log(callerTestData, 10, ${union})`;

    const medianInt = `median([callerTestData, 3, 77, 23])`;
    const medianBigInt = `median(callerTestData)`;
    const invalidMedianInt = `median()`;

    union = random.getRandomUnion();
    const powInt = `pow(callerTestData, 6, ${random.getRandomInt()}, 4, 2, ${union})`;
    const powBigInt = `pow(callerTestData, 6, callerTestData, 4, 2, ${union})`;
    const invalidPowInt = `pow(callerTestData, 10, ${random.getRandomInt()}, 15, 22, ${union})`;

    const sqrtIntAndUnion = `sqrt(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const sqrtBigIntAndUnion = `sqrt(callerTestData, callerTestData, callerTestData, ${union})`;
    const invalidSqrtFunction = `fraction(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(fractionInt);
    precondition.setData("Int");

    test.each([
        // positive tests fraction(Int, Int, Int): Int
        [data.STDLIB_VERSION_3, fractionInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fractionInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fractionInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionInt, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types or Can't find a function overload in fractionInt
        [data.STDLIB_VERSION_3, fractionInt, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, fractionInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid fraction Function 'fraction' requires 3 arguments, but 1 are provided
        [data.STDLIB_VERSION_3, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests fraction(Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_5, fractionIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        // function 'fraction' requires 3 arguments, but 4 are provided
        [data.STDLIB_VERSION_3, fractionIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        // Can't find a function overload in fractionIntAndUnion
        [data.STDLIB_VERSION_5, fractionIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],

        // positive tests log(Int, Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, logInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, logInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, logInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, logInt, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in log(Int, Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, logInt, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, logInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, logInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, logInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function log(Int, Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests median(List[Int]): Int
        [data.STDLIB_VERSION_4, medianInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, medianInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, medianInt, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in median(List[Int]): Int
        [data.STDLIB_VERSION_4, medianInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, medianInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, medianInt, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function median(List[Int]): Int
        [data.STDLIB_VERSION_4, invalidMedianInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMedianInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMedianInt, random.getRandomInt(), data.NEGATIVE_TEST],
        // can't find a function 'median'(List[Int])
        [data.STDLIB_VERSION_3, medianInt, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests pow(Int, Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, powInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, powInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, powInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, powInt, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in pow(Int, Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, powInt, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, powInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, powInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, powInt, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function powInt
        [data.STDLIB_VERSION_3, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testInt, testFunction);
        checkCompileResult(contract, testType);
    });


    test.each([
        // positive tests fraction(BigInt, BigInt, BigInt): BigInt
        [data.STDLIB_VERSION_5, fractionBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data in fractionBigInt
        [data.STDLIB_VERSION_5, fractionBigInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigInt, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function fractionBigInt
        [data.STDLIB_VERSION_5, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, fractionBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionBigInt, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests fraction(BigInt, BigInt, BigInt, Union): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        // function 'fraction' requires 3 arguments, but 4 are provided
        [data.STDLIB_VERSION_3, fractionBigIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionBigIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        // Non-matching types in fraction(BigInt, BigInt, BigInt, Union): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntAndUnion, random.getRandomAddress(), data.NEGATIVE_TEST],

        // positive tests log(BigInt, Int, BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_5, logBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, logBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, logBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, logBigInt, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests pow(BigInt, Int, BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_5, powBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, powBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, powBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, powBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s:BigInt compiles or failed', (version, testFunction, testInt, testType) => {
        const bigInt = `toBigInt(${testInt})`;
        precondition.setData('BigInt')
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive tests median(List[BigInt]): BigInt
        [data.STDLIB_VERSION_5, medianBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, medianBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, medianBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, medianBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s:BigInt compiles or failed', (version, testFunction, testInt, testType) => {
        const bigInt = `[toBigInt(${testInt}), toBigInt(33), toBigInt(${random.getRandomInt()})]`;
        precondition.setData('BigInt');
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });
});
