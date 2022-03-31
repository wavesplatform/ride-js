import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('addressFromPublicKey',  () => {

    const addressFromPublicKey = `addressFromPublicKey(callerTestData)`;
    const invalidAddressFromPublicKey = `addressFromPublicKey()`;

    const precondition = new GenerateContractForBuiltInFunctions
        (addressFromPublicKey, null, 'Address');

    test.each([
        [data.STDLIB_VERSION_3, addressFromPublicKey, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, addressFromPublicKey, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, addressFromPublicKey, random.getRandomByteVector(), data.positiveTestType],
        // invalid data
        [data.STDLIB_VERSION_3, addressFromPublicKey, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, addressFromPublicKey, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, addressFromPublicKey, random.getRandomInt(), data.negativeTestType],
        // invalid function
        [data.STDLIB_VERSION_3, invalidAddressFromPublicKey, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidAddressFromPublicKey, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidAddressFromPublicKey, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });
});
