import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toBaseString',  () => {

    const toBase58String = `toBase58String(callerTestData)`;
    const toBase16String = `toBase16String(callerTestData)`;
    const toBase64String = `toBase64String(callerTestData)`;

    const invalidToBase16String = `toBase16String()`;
    const invalidToBase58String = `toBase58String()`;
    const invalidToBase64String = `toBase64String()`;

    const precondition = new GenerateContractForBuiltInFunctions(toBase58String);
    precondition.setData("String");

    test.each([
        [data.STDLIB_VERSION_3, toBase16String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toBase16String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toBase16String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_3, toBase58String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toBase58String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toBase58String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_3, toBase64String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, toBase64String, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toBase64String, random.getRandomByteVector(), data.positiveTestType],
        // negative: invalid byteVector
        [data.STDLIB_VERSION_3, toBase16String, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, toBase58String, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, toBase64String, random.getRandomInt(), data.negativeTestType],
        // negative: invalid function
        [data.STDLIB_VERSION_3, invalidToBase16String, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidToBase58String, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidToBase64String, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
