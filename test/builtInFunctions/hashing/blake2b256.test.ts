import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('blake2b256 Range of functions.',  () => {

    const blake2b256 = `blake2b256(callerTestData)`;
    const invalidBlake2b256 = `blake2b256()`;
    const blake2b256_16Kb = `blake2b256_16Kb(callerTestData)`;
    const invalidBlake2b256_16Kb = `blake2b256_16Kb()`;
    const blake2b256_32Kb = `blake2b256_32Kb(callerTestData)`;
    const invalidBlake2b256_32Kb = `blake2b256_32Kb()`;
    const blake2b256_64Kb = `blake2b256_64Kb(callerTestData)`;
    const invalidBlake2b256_64Kb = `blake2b256_64Kb()`;
    const blake2b256_128Kb = `blake2b256_128Kb(callerTestData)`;
    const invalidBlake2b256_128Kb = `blake2b256_128Kb()`;

    const precondition = new GenerateContractForBuiltInFunctions(blake2b256);
    precondition.setData("ByteVector");

    test.each([
        // positive blake2b256 tests
        [data.STDLIB_VERSION_3, blake2b256, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, blake2b256, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, blake2b256, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in blake2b256
        [data.STDLIB_VERSION_3, invalidBlake2b256, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidBlake2b256, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256, random.getRandomInt(), data.negativeTestType],
        // invalid function blake2b256
        [data.STDLIB_VERSION_3, invalidBlake2b256, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidBlake2b256, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256, random.getRandomByteVector(), data.negativeTestType],

        // positive blake2b256_16Kb tests
        [data.STDLIB_VERSION_4, blake2b256_16Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, blake2b256_16Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in blake2b256_16Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_16Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_16Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function blake2b256_16Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_16Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_16Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive blake2b256_32Kb tests
        [data.STDLIB_VERSION_4, blake2b256_32Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, blake2b256_32Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in blake2b256_32Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_32Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_32Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function Blake2b256_32Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_32Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_32Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive blake2b256_64Kb tests
        [data.STDLIB_VERSION_4, blake2b256_64Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, blake2b256_64Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in blake2b256_64Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_64Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_64Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function blake2b256_64Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_64Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_64Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive blake2b256_128Kb tests
        [data.STDLIB_VERSION_4, blake2b256_128Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, blake2b256_128Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in blake2b256_128Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_128Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_128Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function blake2b256_128Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_128Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidBlake2b256_128Kb, random.getRandomByteVector(), data.negativeTestType],

        // negative Can't find a function blake2b256_16Kb, blake2b256_32Kb, blake2b256_64Kb, blake2b256_128Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_16Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, blake2b256_32Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, blake2b256_64Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, blake2b256_128Kb, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
