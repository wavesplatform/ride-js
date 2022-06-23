import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('addressFromPublicKey',  () => {

    const addressFromPublicKey = `addressFromPublicKey(callerTestData)`;
    const invalidAddressFromPublicKey = `addressFromPublicKey()`;

    const addressFromPublicKeyArgBeforeFunc = `callerTestData.addressFromPublicKey()`;
    const invalidAddressFromPublicKeyArgBeforeFunc = `addressFromPublicKey()`;

    const precondition = new GenerateContractForBuiltInFunctions(addressFromPublicKey);
    precondition.setData("Address");

    test.each([
        [data.STDLIB_VERSION_3, addressFromPublicKey, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromPublicKey, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromPublicKey, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromPublicKey, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, addressFromPublicKey, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromPublicKey, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromPublicKey, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromPublicKey, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidAddressFromPublicKey, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidAddressFromPublicKey, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidAddressFromPublicKey, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidAddressFromPublicKey, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // argument before function
        [data.STDLIB_VERSION_3, addressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, addressFromPublicKeyArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, addressFromPublicKeyArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, addressFromPublicKeyArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, addressFromPublicKeyArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidAddressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidAddressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidAddressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidAddressFromPublicKeyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });
});
