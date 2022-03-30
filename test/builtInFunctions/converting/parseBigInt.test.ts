import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('parseBigInt ',  () => {

    const parseBigInt = `parseBigInt(callerTestData)`;
    const invalidParseBigInt = `parseBigInt()`;
    const parseBigIntValue = `parseBigIntValue(callerTestData)`;
    const invalidParseBigIntValue = `parseBigIntValue()`;

    const precondition = new GenerateContractForBuiltInFunctions
        (parseBigInt, null, 'BigInt');

    test.each([
        [data.STDLIB_VERSION_5, parseBigInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, parseBigIntValue, random.getRandomInt(), data.positiveTestType],

        // Undefined type: `BigInt` for v3 and v4
        [data.STDLIB_VERSION_3, parseBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, parseBigIntValue, random.getRandomInt(), data.negativeTestType],
        // invalid data
        [data.STDLIB_VERSION_5, parseBigInt, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, parseBigIntValue, random.getRandomIssuesArray(), data.negativeTestType],
        // invalid function
        [data.STDLIB_VERSION_5, invalidParseBigInt, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidParseBigIntValue, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, int, testType) => {
        let intToStringForTest = `"${int}"`;
        const contract = precondition.generateOnlyMatcherContract(version, intToStringForTest, testFunction);
        checkCompileResult(contract, testType);
    });
});
