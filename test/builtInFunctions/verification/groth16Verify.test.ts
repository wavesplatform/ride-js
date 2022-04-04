import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('groth16Verify functions.',  () => {

    const groth16Verify = `groth16Verify(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify = `groth16Verify()`;

    const groth16Verify_1inputs = `groth16Verify_1inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_1inputs = `groth16Verify_1inputs()`;

    const groth16Verify_2inputs = `groth16Verify_2inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_2inputs = `groth16Verify_2inputs()`;

    const groth16Verify_3inputs = `groth16Verify_3inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_3inputs = `groth16Verify_3inputs()`;

    const groth16Verify_4inputs = `groth16Verify_4inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_4inputs = `groth16Verify_4inputs()`;

    const groth16Verify_5inputs = `groth16Verify_5inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_5inputs = `groth16Verify_5inputs()`;

    const groth16Verify_6inputs = `groth16Verify_6inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_6inputs = `groth16Verify_6inputs()`;

    const groth16Verify_7inputs = `groth16Verify_7inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_7inputs = `groth16Verify_7inputs()`;

    const groth16Verify_8inputs = `groth16Verify_8inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_8inputs = `groth16Verify_8inputs()`;

    const groth16Verify_9inputs = `groth16Verify_9inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_9inputs = `groth16Verify_9inputs()`;

    const groth16Verify_10inputs = `groth16Verify_10inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_10inputs = `groth16Verify_10inputs()`;

    const groth16Verify_11inputs = `groth16Verify_11inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_11inputs = `groth16Verify_11inputs()`;

    const groth16Verify_12inputs = `groth16Verify_12inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_12inputs = `groth16Verify_12inputs()`;

    const groth16Verify_13inputs = `groth16Verify_13inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_13inputs = `groth16Verify_13inputs()`;

    const groth16Verify_14inputs = `groth16Verify_14inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_14inputs = `groth16Verify_14inputs()`;

    const groth16Verify_15inputs = `groth16Verify_15inputs(callerTestData, callerTestData, callerTestData)`;
    const invalidGroth16Verify_15inputs = `groth16Verify_15inputs()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (groth16Verify, null, 'Boolean');

    test.each([
        // positive groth16Verify tests
        [data.STDLIB_VERSION_4, groth16Verify, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify
        [data.STDLIB_VERSION_4, groth16Verify, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify
        [data.STDLIB_VERSION_4, invalidGroth16Verify, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_1inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_1inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_1inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_1inputs
        [data.STDLIB_VERSION_4, groth16Verify_1inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_1inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_1inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_1inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_1inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_2inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_2inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_2inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_2inputs
        [data.STDLIB_VERSION_4, groth16Verify_2inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_2inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidgroth16Verify_2inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_2inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_2inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_3inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_3inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_3inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_3inputs
        [data.STDLIB_VERSION_4, groth16Verify_3inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_3inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidgroth16Verify_3inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_3inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_3inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_4inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_4inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_4inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_4inputs
        [data.STDLIB_VERSION_4, groth16Verify_4inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_4inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_4inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_4inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_4inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_5inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_5inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_5inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_5inputs
        [data.STDLIB_VERSION_4, groth16Verify_5inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_5inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_5inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_5inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_5inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_6inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_6inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_6inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_6inputs
        [data.STDLIB_VERSION_4, groth16Verify_6inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_6inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_6inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_6inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_6inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_7inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_7inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_7inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_7inputs
        [data.STDLIB_VERSION_4, groth16Verify_7inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_7inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_7inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_7inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_7inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_8inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_8inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_8inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_8inputs
        [data.STDLIB_VERSION_4, groth16Verify_8inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_8inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_8inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_8inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_8inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_9inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_9inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_9inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_9inputs
        [data.STDLIB_VERSION_4, groth16Verify_9inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_9inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_9inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_9inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_9inputs, random.getRandomByteVector(), data.negativeTestType],


        // positive groth16Verify_10inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_10inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_10inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_10inputs
        [data.STDLIB_VERSION_4, groth16Verify_10inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_10inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_10inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_10inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_10inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_11inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_11inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_11inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_11inputs
        [data.STDLIB_VERSION_4, groth16Verify_11inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_11inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_11inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_11inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_11inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_12inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_12inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_12inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_12inputs
        [data.STDLIB_VERSION_4, groth16Verify_12inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_12inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_12inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_12inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_12inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_13inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_13inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_13inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_13inputs
        [data.STDLIB_VERSION_4, groth16Verify_13inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_13inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_13inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_13inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_13inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_14inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_14inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_14inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_14inputs
        [data.STDLIB_VERSION_4, groth16Verify_14inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_14inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_14inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_14inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_14inputs, random.getRandomByteVector(), data.negativeTestType],

        // positive groth16Verify_15inputs tests
        [data.STDLIB_VERSION_4, groth16Verify_15inputs, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, groth16Verify_15inputs, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in groth16Verify_15inputs
        [data.STDLIB_VERSION_4, groth16Verify_15inputs, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, groth16Verify_15inputs, random.getRandomInt(), data.negativeTestType],
        // invalid function invalidGroth16Verify_15inputs
        [data.STDLIB_VERSION_4, invalidGroth16Verify_15inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGroth16Verify_15inputs, random.getRandomByteVector(), data.negativeTestType],

        // Can't find a function 'groth16Verify' for ride v3
        [data.STDLIB_VERSION_3, groth16Verify, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_1inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_2inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_3inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_4inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_5inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_6inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_7inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_8inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_9inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_10inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_11inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_12inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_13inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_14inputs, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, groth16Verify_15inputs, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
