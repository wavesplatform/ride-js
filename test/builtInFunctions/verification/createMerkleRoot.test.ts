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
        [data.STDLIB_VERSION_4, createMerkleRoot, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, createMerkleRoot, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data createMerkleRoot
        [data.STDLIB_VERSION_4, createMerkleRoot, random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, createMerkleRoot, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function createMerkleRoot
        [data.STDLIB_VERSION_4, invalidCreateMerkleRoot, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidCreateMerkleRoot, random.getRandomString(), data.NEGATIVE_TEST],
        // can't find a function 'createMerkleRoot'
        [data.STDLIB_VERSION_3, createMerkleRoot, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});