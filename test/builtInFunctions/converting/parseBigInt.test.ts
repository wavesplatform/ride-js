import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('parseBigInt ',  () => {

    const parseBigInt = `parseBigInt(callerTestData)`;
    const invalidParseBigInt = `parseBigInt()`;
    const parseBigIntValue = `parseBigIntValue(callerTestData)`;
    const invalidParseBigIntValue = `parseBigIntValue()`;

    const precondition = new GenerateContractForBuiltInFunctions(parseBigInt);
    precondition.setData("BigInt");

    test.each([
        [data.STDLIB_VERSION_5, parseBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseBigIntValue, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, parseBigInt, random.getRandomDigestAlgorithmType(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, parseBigIntValue, random.getRandomInt(), data.POSITIVE_TEST],

        // Undefined type: `BigInt` for v3 and v4
        [data.STDLIB_VERSION_3, parseBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseBigIntValue, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_5, parseBigInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseBigIntValue, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, parseBigInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, parseBigIntValue, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_5, invalidParseBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseBigIntValue, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidParseBigInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidParseBigIntValue, random.getRandomUnion(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, int, testType) => {
        let intToStringForTest = `"${int}"`;
        const contract = precondition.generateOnlyMatcherContract(version, intToStringForTest, testFunction);
        checkCompileResult(contract, testType);
    });
});
