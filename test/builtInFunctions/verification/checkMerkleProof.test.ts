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
        [data.STDLIB_VERSION_3, checkMerkleProof, random.getRandomByteVector(), data.positiveTestType],
        // invalid data checkMerkleProof
        [data.STDLIB_VERSION_3, checkMerkleProof, random.getRandomAlias(), data.negativeTestType],
        // invalid function checkMerkleProof
        [data.STDLIB_VERSION_3, invalidCheckMerkleProof, random.getRandomByteVector(), data.negativeTestType],
        // can't find a function 'checkMerkleProof'
        [data.STDLIB_VERSION_4, checkMerkleProof, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, checkMerkleProof, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
