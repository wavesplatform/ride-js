import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('math functions tests',  () => {

    let union = random.getRandomUnion();
    const fractionInt = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()})`;
    const fractionIntArgBeforeFunc = `callerTestData.fraction(${random.getRandomInt()}, ${random.getRandomInt()})`;
    const fractionIntAndUnion = `fraction(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const fractionIntAndUnionArgBeforeFunc = `callerTestData.fraction(${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const invalidFractionFunction = `fraction(callerTestData)`;
    const invalidFractionFunctionArgBeforeFunc = `callerTestData.fraction()`;

    union = random.getRandomUnion();
    const fractionBigInt = `fraction(callerTestData, callerTestData, callerTestData)`;
    const fractionBigIntArgBeforeFunc = `callerTestData.fraction(callerTestData, callerTestData)`;
    const fractionBigIntAndUnion = `fraction(callerTestData, callerTestData, callerTestData, ${union})`;
    const fractionBigIntAndUnionArgBeforeFunc = `callerTestData.fraction(callerTestData, callerTestData, ${union})`;

    union = random.getRandomUnion();
    const logInt = `log(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, 4, 2, ${union})`;
    const logIntArgBeforeFunc = `callerTestData.log(${random.getRandomInt()}, ${random.getRandomInt()}, 4, 2, ${union})`;
    const logBigInt = `log(callerTestData, 6, callerTestData, ${random.getRandomInt()}, 2, ${union})`;
    const logBigIntArgBeforeFunc = `callerTestData.log(6, callerTestData, ${random.getRandomInt()}, 2, ${union})`;

    const invalidLogInt = `log(callerTestData, 10, ${union})`;
    const invalidLogIntArgBeforeFunc = `callerTestData.log(10, ${union})`;

    const medianInt = `median([callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}])`;
    const medianIntArgBeforeFunc = `[callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}].median()`;
    const medianBigInt = `median(callerTestData)`;
    const medianBigIntArgBeforeFunc = `callerTestData.median()`;
    const invalidMedianInt = `median()`;

    union = random.getRandomUnion();
    const powInt = `pow(callerTestData, 6, ${random.getRandomInt()}, 4, ${random.getRandomInt()}, ${union})`;
    const powIntArgBeforeFunc = `callerTestData.pow(6, ${random.getRandomInt()}, ${random.getRandomInt()}, 2, ${union})`;
    const powBigInt = `pow(callerTestData, 6, callerTestData, 4, 2, ${union})`;
    const powBigIntArgBeforeFunc = `callerTestData.pow(${random.getRandomInt()}, callerTestData, 4, 2, ${union})`;
    const invalidPowInt = `pow(callerTestData, 10, ${random.getRandomInt()}, 15, 22, ${union})`;
    const invalidPowIntArgBeforeFunc = `pow(callerTestData, 10, ${random.getRandomInt()}, 15, 22, ${union})`;

    const sqrtIntAndUnion = `sqrt(callerTestData, ${random.getRandomInt()}, ${random.getRandomInt()}, ${union})`;
    const sqrtIntAndUnionArgBeforeFunc = `callerTestData.sqrt(${random.getRandomInt()}, 3, ${union})`;
    const invalidSqrtFunction = `sqrt(callerTestData)`;
    const invalidSqrtFunctionArgBeforeFunc = `sqrt(callerTestData)`;

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

        // positive tests Int.fraction(Int, Int): Int
        [data.STDLIB_VERSION_3, fractionIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fractionIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fractionIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types or Can't find a function overload in fractionIntArgBeforeFunc
        [data.STDLIB_VERSION_3, fractionIntArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionIntArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, fractionIntArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid fraction Function 'fraction' requires 3 arguments, but 1 are provided
        [data.STDLIB_VERSION_3, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid fraction Function 'fraction' requires 3 arguments, but 1 are provided
        [data.STDLIB_VERSION_3, invalidFractionFunctionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidFractionFunctionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFractionFunctionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFractionFunctionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        // positive tests fraction(Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_5, fractionIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        // positive tests Int.fraction(Int, Int, Union): Int
        [data.STDLIB_VERSION_5, fractionIntAndUnionArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntAndUnionArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // function 'fraction' requires 3 arguments, but 4 are provided
        [data.STDLIB_VERSION_3, fractionIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        // Can't find a function overload in fraction
        [data.STDLIB_VERSION_5, fractionIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, fractionIntAndUnionArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionIntAndUnionArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],

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

        // positive tests Int.log(Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, logIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, logIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, logIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, logIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in Int.log(Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, logIntArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, logIntArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, logIntArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, logIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function log(Int, Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidLogInt, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function Int.log(Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, invalidLogIntArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidLogIntArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLogIntArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidLogIntArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests median(List[Int]): Int
        [data.STDLIB_VERSION_4, medianInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, medianInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, medianInt, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in median(List[Int]): Int
        [data.STDLIB_VERSION_4, medianInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, medianInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, medianInt, random.getRandomUnion(), data.NEGATIVE_TEST],

        // positive tests List[Int].median(): Int
        [data.STDLIB_VERSION_4, medianIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, medianIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, medianIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in List[Int].median(): Int
        [data.STDLIB_VERSION_4, medianIntArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, medianIntArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, medianIntArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
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

        // positive tests Int.pow(Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, powIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, powIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, powIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, powIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in Int.pow(Int, Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_3, powIntArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, powIntArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, powIntArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, powIntArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],

        // invalid function powInt
        [data.STDLIB_VERSION_3, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidPowInt, random.getRandomByteVector(), data.NEGATIVE_TEST],

        [data.STDLIB_VERSION_3, invalidPowIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidPowIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidPowIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidPowIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive tests sqrt(Int, Int, Int, Union): Int
        [data.STDLIB_VERSION_6, sqrtIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        // positive tests Int.sqrt(Int, Int, Union): Int
        [data.STDLIB_VERSION_6, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Can't find a function
        [data.STDLIB_VERSION_6, sqrtIntAndUnion, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sqrtIntAndUnionArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],

        [data.STDLIB_VERSION_3, sqrtIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sqrtIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sqrtIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],

        [data.STDLIB_VERSION_3, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function sqrt
        [data.STDLIB_VERSION_6, invalidSqrtFunction, random.getRandomByteVector(), data.NEGATIVE_TEST],
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


        // positive tests BigInt.fraction(BigInt, BigInt): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data in fractionBigIntArgBeforeFunc
        [data.STDLIB_VERSION_5, fractionBigIntArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function fractionBigInt
        [data.STDLIB_VERSION_5, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFractionFunction, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests fraction(BigInt, BigInt, BigInt, Union): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        // function 'fraction' requires 3 arguments, but 4 are provided
        [data.STDLIB_VERSION_3, fractionBigIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fractionBigIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        // Non-matching types in fraction(BigInt, BigInt, BigInt, Union): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntAndUnion, random.getRandomAddress(), data.NEGATIVE_TEST],

        // positive tests BigInt.fraction(BigInt, BigInt, Union): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntAndUnionArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntAndUnionArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in fraction(BigInt, BigInt, BigInt, Union): BigInt
        [data.STDLIB_VERSION_5, fractionBigIntAndUnionArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fractionBigIntAndUnionArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        // positive tests log(BigInt, Int, BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_5, logBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, logBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // positive tests BigInt.log(Int, BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_5, logBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, logBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, logBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, logBigInt, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests: pow(BigInt, Int, BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_5, powBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, powBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // positive tests: BigInt.pow(Int, BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_5, powBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, powBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, powBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, powBigInt, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests sqrt(BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_6, sqrtIntAndUnion, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in sqrt(BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_6, sqrtIntAndUnion, random.getRandomString(), data.NEGATIVE_TEST],
        // Can't find a function sqrt(BigInt, Int, Int, Union): BigInt
        [data.STDLIB_VERSION_3, sqrtIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sqrtIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sqrtIntAndUnion, random.getRandomInt(), data.NEGATIVE_TEST],

        // positive tests BigInt.sqrt(Int, Int, Union): BigInt
        [data.STDLIB_VERSION_6, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // Non-matching types in BigInt.sqrt(Int, Int, Union): BigInt
        [data.STDLIB_VERSION_6, sqrtIntAndUnionArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // Can't find a function BigInt.sqrt(Int, Int, Union): BigInt
        [data.STDLIB_VERSION_3, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sqrtIntAndUnionArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        // Can't find a function overload 'fraction'(ByteVector)
        [data.STDLIB_VERSION_6, invalidSqrtFunction, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSqrtFunctionArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
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
        // positive tests List[BigInt].median(): BigInt
        [data.STDLIB_VERSION_5, medianBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, medianBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
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
