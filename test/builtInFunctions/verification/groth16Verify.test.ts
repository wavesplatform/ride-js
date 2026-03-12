import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('groth16Verify functions.', () => {

    const groth16Verify = `groth16Verify(callerTestData, callerTestData, callerTestData)`;
    const groth16VerifyArgBeforeFunc = `callerTestData.groth16Verify(callerTestData, callerTestData)`;
    const invalidn256Groth16Verify = `groth16Verify()`;
    const invalidGroth16VerifyArgBeforeFunc = `callerTestData.groth16Verify()`;

    const precondition = new GenerateContractForBuiltInFunctions(groth16Verify);
    precondition.setData("Boolean");

    test.each([
        // positive groth16Verify tests
        [data.STDLIB_VERSION_4, groth16Verify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, groth16Verify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, groth16Verify, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in groth16Verify
        [data.STDLIB_VERSION_4, groth16Verify, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, groth16Verify, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, groth16Verify, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function invalidn256Groth16Verify
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive groth16Verify tests argument before function
        [data.STDLIB_VERSION_4, groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in groth16Verify
        [data.STDLIB_VERSION_4, groth16VerifyArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, groth16VerifyArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, groth16VerifyArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function invalidn256Groth16Verify
        [data.STDLIB_VERSION_4, invalidGroth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGroth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGroth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // Can't find a function 'groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    // TODO доделать после https://jira.wavesplatform.com/browse/NODE-2481
    test.each([
        // positive tests groth16Verify_inputs 1-15 versions
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.POSITIVE_TEST],
    ])('check ride v%i positive tests groth16Verify_inputs 1-15 versions', (version, testString, testType) => {
        for (let i = 1; i <= 15; i++) {
            const groth16Verify_inputs = `groth16Verify_${i}inputs(callerTestData, callerTestData, callerTestData)`;
            const groth16Verify_inputsArgBeforeFunc = `callerTestData.groth16Verify_${i}inputs(callerTestData, callerTestData)`;

            const contract = precondition.generateOnlyMatcherContract(version, testString, groth16Verify_inputs);
            const contractArgBeforeFunc = precondition
                .generateOnlyMatcherContract(version, testString, groth16Verify_inputsArgBeforeFunc);

            checkCompileResult(contract, testType);
            checkCompileResult(contractArgBeforeFunc, testType);
        }
    });

    test.each([
        // invalid byteVector in groth16Verify
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), data.NEGATIVE_TEST],
        // Can't find a function 'groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i functions %s compiles', (version, testString, testType) => {
        for (let i = 1; i <= 15; i++) {
            const groth16Verify_inputs = `groth16Verify_${i}inputs(callerTestData, callerTestData, callerTestData)`;
            const groth16Verify_inputsArgBeforeFunc = `callerTestData.groth16Verify_${i}inputs(callerTestData, callerTestData)`;
            const invalidGroth16Verify_inputs = `groth16Verify_${i}inputs()`;
            const invalidGroth16Verify_inputsArgBeforeFunc = `callerTestData.groth16Verify_${i}inputs()`;

            const contract = precondition.generateOnlyMatcherContract(version, testString, groth16Verify_inputs);
            const contractArgBeforeFunc = precondition
                .generateOnlyMatcherContract(version, testString, groth16Verify_inputsArgBeforeFunc);
            const contractForInvalidGroth16Verify_inputs = precondition
                .generateOnlyMatcherContract(version, testString, invalidGroth16Verify_inputs);
            const contractForInvalidGroth16Verify_inputsArgBeforeFunc = precondition
                .generateOnlyMatcherContract(version, testString, invalidGroth16Verify_inputsArgBeforeFunc);

            checkCompileResult(contract, testType);
            checkCompileResult(contractArgBeforeFunc, testType);
            checkCompileResult(contractForInvalidGroth16Verify_inputs, testType);
            checkCompileResult(contractForInvalidGroth16Verify_inputsArgBeforeFunc, testType);
        }
    });
});
