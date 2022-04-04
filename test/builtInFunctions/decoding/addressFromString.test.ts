import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('addressFromString',  () => {

    const addressFromString = `addressFromString(callerTestData)`;
    const addressFromStringValue = `addressFromStringValue(callerTestData)`;

    const invalidAddressFromString = `addressFromString()`;
    const invalidAddressFromStringValue = `addressFromStringValue()`;

    const precondition = new GenerateContractForBuiltInFunctions(addressFromString);
    precondition.setData("Address");

    test.each([
        [data.STDLIB_VERSION_3, addressFromString, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, addressFromString, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, addressFromString, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_3, addressFromStringValue, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, addressFromStringValue, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, addressFromStringValue, random.getRandomStringArray(), data.positiveTestType],
        // negative: invalid byteVector
        [data.STDLIB_VERSION_3, invalidAddressFromStringValue, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidAddressFromString, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidAddressFromStringValue, random.getRandomInt(), data.negativeTestType],
        // negative: invalid function
        [data.STDLIB_VERSION_3, invalidAddressFromString, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidAddressFromStringValue, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidAddressFromString, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
