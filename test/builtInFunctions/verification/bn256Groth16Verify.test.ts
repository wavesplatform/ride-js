import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('bn256Groth16Verify functions.',  () => {

    const bn256Groth16Verify = `bn256Groth16Verify(callerTestData, callerTestData, callerTestData)`;
    const bn256Groth16VerifyArgBeforeFunc = `callerTestData.bn256Groth16Verify(callerTestData, callerTestData)`;
    const invalidn256Groth16Verify = `bn256Groth16Verify()`;
    const invalidBn256Groth16VerifyArgBeforeFunc = `callerTestData.bn256Groth16Verify()`;

    const precondition = new GenerateContractForBuiltInFunctions(bn256Groth16Verify);
    precondition.setData("Boolean");

    test.each([
        // positive bn256Groth16Verify tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, bn256Groth16Verify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, bn256Groth16Verify, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in bn256Groth16Verify
        [data.STDLIB_VERSION_4, bn256Groth16Verify, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, bn256Groth16Verify, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, bn256Groth16Verify, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function invalidn256Groth16Verify
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // Can't find a function 'bn256Groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, bn256Groth16Verify, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive bn256Groth16Verify tests
        [data.STDLIB_VERSION_4, bn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, bn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, bn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid byteVector in bn256Groth16Verify
        [data.STDLIB_VERSION_4, bn256Groth16VerifyArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, bn256Groth16VerifyArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, bn256Groth16VerifyArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function invalidn256Groth16Verify
        [data.STDLIB_VERSION_4, invalidBn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // Can't find a function 'bn256Groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, bn256Groth16VerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    // TODO доделать после https://jira.wavesplatform.com/browse/NODE-2481
    test.each([
        // positive tests bn256Groth16Verify_inputs 1-15 versions
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.POSITIVE_TEST],
    ])('check ride v%i positive tests bn256Groth16Verify_inputs 1-15 versions', (version, testString, testType) => {
        for (let i = 1; i <= 15; i++) {
            const bn256Groth16Verify_inputs = `bn256Groth16Verify_${i}inputs(callerTestData, callerTestData, callerTestData)`;
            const bn256Groth16Verify_inputsArgBeforeFunc = `callerTestData.bn256Groth16Verify_${i}inputs(callerTestData, callerTestData)`;

            const contract = precondition.generateOnlyMatcherContract(version, testString, bn256Groth16Verify_inputs);
            const contractArgBeforeFunc = precondition
                .generateOnlyMatcherContract(version, testString, bn256Groth16Verify_inputsArgBeforeFunc);

            checkCompileResult(contract, testType);
            checkCompileResult(contractArgBeforeFunc, testType);
        }
    });

    test.each([
        // invalid byteVector in bn256Groth16Verify
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), data.NEGATIVE_TEST],
        // Can't find a function 'bn256Groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i functions %s compiles', (version, testString, testType) => {
        for (let i = 1; i <= 15; i++) {
            const bn256Groth16Verify_inputs = `bn256Groth16Verify_${i}inputs(callerTestData, callerTestData, callerTestData)`;
            const bn256Groth16Verify_inputsArgBeforeFunc = `callerTestData.bn256Groth16Verify_${i}inputs(callerTestData, callerTestData)`;
            const invalidBn256Groth16Verify_inputs = `bn256Groth16Verify_${i}inputs()`;
            const invalidBn256Groth16Verify_inputsArgBeforeFunc = `callerTestData.bn256Groth16Verify_${i}inputs()`;

            const contract = precondition.generateOnlyMatcherContract(version, testString, bn256Groth16Verify_inputs);
            const contractArgBeforeFunc = precondition
                .generateOnlyMatcherContract(version, testString, bn256Groth16Verify_inputsArgBeforeFunc);
            const contractForInvalidBn256Groth16Verify_inputs = precondition
                .generateOnlyMatcherContract(version, testString, invalidBn256Groth16Verify_inputs);
            const contractForInvalidBn256Groth16Verify_inputsArgBeforeFunc = precondition
                .generateOnlyMatcherContract(version, testString, invalidBn256Groth16Verify_inputsArgBeforeFunc);

            checkCompileResult(contract, testType);
            checkCompileResult(contractArgBeforeFunc, testType);
            checkCompileResult(contractForInvalidBn256Groth16Verify_inputs, testType);
            checkCompileResult(contractForInvalidBn256Groth16Verify_inputsArgBeforeFunc, testType);
        }
    });
});
