import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('addressFromString',  () => {

    const defaultAddressFromString = `addressFromString(callerTestData)`;
    const invalidAddressFromString = `addressFromString()`;

    const defaultAddressFromStringValue = `addressFromStringValue(callerTestData)`;
    const invalidAddressFromStringValue = `addressFromStringValue()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultAddressFromString, null, 'Address');

    test.each([
        [data.STDLIB_VERSION_3, defaultAddressFromString, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, defaultAddressFromString, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, defaultAddressFromString, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_3, defaultAddressFromStringValue, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, defaultAddressFromStringValue, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, defaultAddressFromStringValue, random.getRandomStringArray(), data.positiveTestType],
        // negative: invalid byteVector
        [data.STDLIB_VERSION_3, invalidAddressFromStringValue, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidAddressFromString, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidAddressFromStringValue, random.getRandomInt(), data.negativeTestType],
        // negative: invalid function
        [data.STDLIB_VERSION_3, invalidAddressFromString, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidAddressFromStringValue, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidAddressFromString, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
