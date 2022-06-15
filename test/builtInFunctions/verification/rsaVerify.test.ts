import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('rsaVerify functions.',  () => {

    const rsaVerify =
        `rsaVerify(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify = `rsaVerify()`;
    const rsaVerify_16Kb =
        `rsaVerify_16Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_16Kb = `rsaVerify_16Kb()`;
    const rsaVerify_32Kb =
        `rsaVerify_32Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_32Kb = `rsaVerify_32Kb()`;
    const rsaVerify_64Kb =
        `rsaVerify_64Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_64Kb = `rsaVerify_64Kb()`;
    const rsaVerify_128Kb =
        `rsaVerify_128Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_128Kb = `rsaVerify_128Kb()`;

    const precondition = new GenerateContractForBuiltInFunctions(rsaVerify);
    precondition.setData("Boolean");

    test.each([
        // positive rsaVerify tests
        [data.STDLIB_VERSION_3, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in rsaVerify
        [data.STDLIB_VERSION_3, rsaVerify, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, rsaVerify, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function rsaVerify
        [data.STDLIB_VERSION_3, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_16Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in rsaVerify_16Kb
        [data.STDLIB_VERSION_4, rsaVerify_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_16Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_16Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_32Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in rsaVerify_32Kb
        [data.STDLIB_VERSION_4, rsaVerify_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_32Kb, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_32Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_64Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in rsaVerify_64Kb
        [data.STDLIB_VERSION_4, rsaVerify_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_64Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_64Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_128Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in rsaVerify_128Kb
        [data.STDLIB_VERSION_4, rsaVerify_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_128Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_128Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // negative Can't find a function rsaVerify_16Kb, rsaVerify_32Kb, rsaVerify_64Kb, rsaVerify_128Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, rsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, rsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, rsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
