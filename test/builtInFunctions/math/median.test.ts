import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('median functions',  () => {

    const medianInt = `median([callerTestData, 3, 77, 23])`;
    const medianBigInt = `median(callerTestData)`;
    const invalidMedianInt = `median()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (medianInt, null, 'Int');

    test.each([
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
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testInt, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive fractionBigInt tests
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
