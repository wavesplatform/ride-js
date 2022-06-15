import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('checkMerkleProof functions',  () => {

    const checkMerkleProof = `checkMerkleProof(callerTestData, callerTestData, callerTestData)`;
    const invalidCheckMerkleProof = `checkMerkleProof()`;

    const precondition = new GenerateContractForBuiltInFunctions(checkMerkleProof);
    precondition.setData("Boolean")

    test.each([
        // checkMerkleProof
        [data.STDLIB_VERSION_3, checkMerkleProof, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data checkMerkleProof
        [data.STDLIB_VERSION_3, checkMerkleProof, random.getRandomAlias(), data.NEGATIVE_TEST],
        // invalid function checkMerkleProof
        [data.STDLIB_VERSION_3, invalidCheckMerkleProof, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // can't find a function 'checkMerkleProof'
        [data.STDLIB_VERSION_4, checkMerkleProof, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, checkMerkleProof, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
