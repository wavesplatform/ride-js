import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('bn256Groth16Verify functions.',  () => {

    const bn256Groth16Verify = `bn256Groth16Verify(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify = `bn256Groth16Verify()`;

    const bn256Groth16Verify_1inputs = `bn256Groth16Verify_1inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_1inputs = `bn256Groth16Verify_1inputs()`;

    const bn256Groth16Verify_2inputs = `bn256Groth16Verify_2inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidBn256Groth16Verify_2inputs = `bn256Groth16Verify_2inputs()`;

    const bn256Groth16Verify_3inputs = `bn256Groth16Verify_3inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_3inputs = `bn256Groth16Verify_3inputs()`;

    const bn256Groth16Verify_4inputs = `bn256Groth16Verify_4inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_4inputs = `bn256Groth16Verify_4inputs()`;

    const bn256Groth16Verify_5inputs = `bn256Groth16Verify_5inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_5inputs = `bn256Groth16Verify_5inputs()`;

    const bn256Groth16Verify_6inputs = `bn256Groth16Verify_6inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_6inputs = `bn256Groth16Verify_6inputs()`;

    const bn256Groth16Verify_7inputs = `bn256Groth16Verify_7inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_7inputs = `bn256Groth16Verify_7inputs()`;

    const bn256Groth16Verify_8inputs = `bn256Groth16Verify_8inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_8inputs = `bn256Groth16Verify_8inputs()`;

    const bn256Groth16Verify_9inputs = `bn256Groth16Verify_9inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_9inputs = `bn256Groth16Verify_9inputs()`;

    const bn256Groth16Verify_10inputs = `bn256Groth16Verify_10inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_10inputs = `bn256Groth16Verify_10inputs()`;

    const bn256Groth16Verify_11inputs = `bn256Groth16Verify_11inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_11inputs = `bn256Groth16Verify_11inputs()`;

    const bn256Groth16Verify_12inputs = `bn256Groth16Verify_12inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_12inputs = `bn256Groth16Verify_12inputs()`;

    const bn256Groth16Verify_13inputs = `bn256Groth16Verify_13inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_13inputs = `bn256Groth16Verify_13inputs()`;

    const bn256Groth16Verify_14inputs = `bn256Groth16Verify_14inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_14inputs = `bn256Groth16Verify_14inputs()`;

    const bn256Groth16Verify_15inputs = `bn256Groth16Verify_15inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidn256Groth16Verify_15inputs = `bn256Groth16Verify_15inputs()`;

    const precondition = new GenerateContractForBuiltInFunctions(bn256Groth16Verify);
    precondition.setData("Boolean");

    test.each([
        // positive bn256Groth16Verify tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify
        [data.STDLIB_VERSION_4, bn256Groth16Verify, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_1inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_1inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_1inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_1inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_1inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_1inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_1inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_1inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_1inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_2inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_2inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_2inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_2inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_2inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_2inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidBn256Groth16Verify_2inputs
        [data.STDLIB_VERSION_4, invalidBn256Groth16Verify_2inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBn256Groth16Verify_2inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_3inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_3inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_3inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_3inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_3inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_3inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidBn256Groth16Verify_3inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_3inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_3inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_4inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_4inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_4inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_4inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_4inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_4inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_4inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_4inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_4inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_5inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_5inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_5inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_5inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_5inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_5inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_5inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_5inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_5inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_6inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_6inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_6inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_6inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_6inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_6inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_6inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_6inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_6inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_7inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_7inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_7inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_7inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_7inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_7inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_7inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_7inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_7inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_8inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_8inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_8inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_8inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_8inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_8inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_8inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_8inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_8inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_9inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_9inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_9inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_9inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_9inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_9inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_9inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_9inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_9inputs, random.getRandomByteVector(), data.negativeTestType],


        // positive bn256Groth16Verify_10inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_10inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_10inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_10inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_10inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_10inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_10inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_10inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_10inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_11inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_11inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_11inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_11inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_11inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_11inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_11inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_11inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_11inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_12inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_12inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_12inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_12inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_12inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_12inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_12inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_12inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_12inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_13inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_13inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_13inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_13inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_13inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_13inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_13inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_13inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_13inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_14inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_14inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_14inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_14inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_14inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_14inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_14inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_14inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_14inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive bn256Groth16Verify_15inputs tests
        [data.STDLIB_VERSION_4, bn256Groth16Verify_15inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_15inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in bn256Groth16Verify_15inputs
        [data.STDLIB_VERSION_4, bn256Groth16Verify_15inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, bn256Groth16Verify_15inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidn256Groth16Verify_15inputs
        [data.STDLIB_VERSION_4, invalidn256Groth16Verify_15inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidn256Groth16Verify_15inputs, random.getRandomByteVector(), data.negativeTestType],

        // Can't find a function 'bn256Groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, bn256Groth16Verify, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_1inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_2inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_3inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_4inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_5inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_6inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_7inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_8inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_9inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_10inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_11inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_12inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_13inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_14inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, bn256Groth16Verify_15inputs, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
