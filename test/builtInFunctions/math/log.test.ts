import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('log functions.',  () => {

    const union = random.getRandomUnionArray();
    const logInt = `log(callerTestData, 6, ${random.getRandomInt()}, 4, 2, ${union})`;
    const logBigInt = `log(callerTestData, 6, callerTestData, 4, 2, ${union})`;
    const invalidLogInt = `log(callerTestData, 10, ${random.getRandomInt()}, 15, 22, ${union})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (logInt, null, 'Int');

    test.each([
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
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testInt, testFunction);
        checkCompileResult(contract, testType);
    });


    test.each([
        // positive fractionBigInt tests
        [data.STDLIB_VERSION_5, logBigInt, random.getRandomInt(), data.positiveTestType],
        // compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, logBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, logBigInt, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i function %s:BigInt compiles or failed', (version, testFunction, testInt, testType) => {
        const bigInt = `toBigInt(${testInt})`;
        precondition.setData('BigInt');
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });
});
