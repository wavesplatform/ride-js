import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('addressFromString',  () => {

    const addressFromString = `addressFromString(callerTestData)`;
    const addressFromStringArgBeforeFunc = `callerTestData.addressFromString()`;
    const addressFromStringValue = `addressFromStringValue(callerTestData)`;
    const addressFromStringValueArgBeforeFunc = `callerTestData.addressFromStringValue()`;

    const invalidAddressFromString = `addressFromString()`;
    const invalidAddressFromStringValue = `addressFromStringValue()`;

    const precondition = new GenerateContractForBuiltInFunctions(addressFromString);
    precondition.setData("Address");

    test.each([
        // addressFromString && addressFromStringValue
        [data.STDLIB_VERSION_3, addressFromString, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromString, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromString, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromString, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, addressFromStringValue, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromStringValue, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromStringValue, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromStringValue, random.getRandomString(), data.POSITIVE_TEST],
        // addressFromString && addressFromStringValue argument before functions
        [data.STDLIB_VERSION_3, addressFromStringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromStringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromStringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromStringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, addressFromStringValueArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromStringValueArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromStringValueArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromStringValueArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],

        // negative: invalid byteVector
        [data.STDLIB_VERSION_3, invalidAddressFromStringValue, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidAddressFromString, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidAddressFromStringValue, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidAddressFromString, random.getRandomInt(), data.NEGATIVE_TEST],
        // negative: invalid function
        [data.STDLIB_VERSION_3, invalidAddressFromString, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidAddressFromStringValue, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidAddressFromString, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidAddressFromStringValue, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
