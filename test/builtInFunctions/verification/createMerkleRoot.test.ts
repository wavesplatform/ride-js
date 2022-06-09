import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('createMerkleRoot functions',  () => {

    const createMerkleRoot = `createMerkleRoot([callerTestData], callerTestData, ${random.getRandomInt()})`;
    const invalidCreateMerkleRoot = `createMerkleRoot()`;

    const precondition = new GenerateContractForBuiltInFunctions(createMerkleRoot);
    precondition.setData("ByteVector")

    test.each([
        // createMerkleRoot
        [data.STDLIB_VERSION_4, createMerkleRoot, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, createMerkleRoot, random.getRandomByteVector(), data.positiveTestType],
        // invalid data createMerkleRoot
        [data.STDLIB_VERSION_4, createMerkleRoot, random.getRandomUnionArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, createMerkleRoot, random.getRandomAddress(), data.negativeTestType],
        // invalid function createMerkleRoot
        [data.STDLIB_VERSION_4, invalidCreateMerkleRoot, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidCreateMerkleRoot, random.getRandomStringArray(), data.negativeTestType],
        // can't find a function 'createMerkleRoot'
        [data.STDLIB_VERSION_3, createMerkleRoot, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
