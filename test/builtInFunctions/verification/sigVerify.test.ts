import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('sigVerify functions.',  () => {

    const sigVerify = `sigVerify(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify = `sigVerify()`;
    const sigVerify_8Kb = `sigVerify_8Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_8Kb = `sigVerify_8Kb()`;
    const sigVerify_16Kb = `sigVerify_16Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_16Kb = `sigVerify_16Kb()`;
    const sigVerify_32Kb = `sigVerify_32Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_32Kb = `sigVerify_32Kb()`;
    const sigVerify_64Kb = `sigVerify_64Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_64Kb = `sigVerify_64Kb()`;
    const sigVerify_128Kb = `sigVerify_128Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_128Kb = `sigVerify_128Kb()`;

    const precondition = new GenerateContractForBuiltInFunctions(sigVerify);
    precondition.setData("Boolean");

    test.each([
        // positive sigVerify tests
        [data.STDLIB_VERSION_3, sigVerify, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, sigVerify, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sigVerify, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sigVerify
        [data.STDLIB_VERSION_3, sigVerify, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, sigVerify, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, sigVerify, random.getRandomInt(), data.negativeTestType],
        // invalid function sigVerify
        [data.STDLIB_VERSION_3, invalidSigVerify, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidSigVerify, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSigVerify, random.getRandomByteVector(), data.negativeTestType],

        // positive sigVerify_8Kb tests
        [data.STDLIB_VERSION_4, sigVerify_8Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sigVerify_8Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sigVerify_8Kb
        [data.STDLIB_VERSION_4, sigVerify_8Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, sigVerify_8Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sigVerify_8Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_8Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSigVerify_8Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sigVerify_16Kb tests
        [data.STDLIB_VERSION_4, sigVerify_16Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sigVerify_16Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sigVerify_16Kb
        [data.STDLIB_VERSION_4, sigVerify_16Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, sigVerify_16Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sigVerify_16Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_16Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSigVerify_16Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sigVerify_32Kb tests
        [data.STDLIB_VERSION_4, sigVerify_32Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sigVerify_32Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sigVerify_32Kb
        [data.STDLIB_VERSION_4, sigVerify_32Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, sigVerify_32Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sigVerify_32Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_32Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSigVerify_32Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sigVerify_64Kb tests
        [data.STDLIB_VERSION_4, sigVerify_64Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sigVerify_64Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sigVerify_64Kb
        [data.STDLIB_VERSION_4, sigVerify_64Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, sigVerify_64Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sigVerify_64Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_64Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSigVerify_64Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sigVerify_128Kb tests
        [data.STDLIB_VERSION_4, sigVerify_128Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sigVerify_128Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sigVerify_128Kb
        [data.STDLIB_VERSION_4, sigVerify_128Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, sigVerify_128Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sigVerify_128Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_128Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSigVerify_128Kb, random.getRandomByteVector(), data.negativeTestType],

        // negative Can't find a function sigVerify_8Kb, sigVerify_16Kb, sigVerify_32Kb, sigVerify_64Kb, sigVerify_128Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_8Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sigVerify_16Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sigVerify_32Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sigVerify_64Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sigVerify_128Kb, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
