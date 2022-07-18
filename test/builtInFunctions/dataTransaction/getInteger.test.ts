import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getInteger / getIntegerValue', () => {
    const getIntegerKey = `getInteger(callerTestData, "key")`;
    const getIntegerIndex = `getInteger(callerTestData, ${random.getRandomInt()})`;
    const getIntegerValueKey = `getIntegerValue(callerTestData, "key")`;
    const getIntegerValueIndex = `getIntegerValue(callerTestData, ${random.getRandomInt()})`;
    const invalidGetIntegerKey = `getInteger()`;

    const getIntegerKeyArgBeforeFunc = `callerTestData.getInteger("key")`;
    const getIntegerIndexArgBeforeFunc = `callerTestData.getInteger(${random.getRandomInt()})`;
    const getIntegerValueKeyArgBeforeFunc = `callerTestData.getIntegerValue("key")`;
    const getIntegerValueIndexArgBeforeFunc = `callerTestData.getIntegerValue(${random.getRandomInt()})`;
    const invalidGetIntegerArgBeforeFunc = `callerTestData.getInteger()`;

    const precondition = new GenerateContractForBuiltInFunctions(getIntegerKey);
    precondition.setData("Int");

    test.each([
        // getIntegerKey - getInteger(callerTestData, "key")
        [data.STDLIB_VERSION_3, getIntegerKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        // getIntegerKey - invalid data for getInteger(List[], key)
        [data.STDLIB_VERSION_3, getIntegerKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getIntegerIndex - getInteger(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerIndex - invalid data for getInteger(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getIntegerValueKey - getIntegerValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getIntegerValueKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerValueKey - invalid data for getIntegerValueKey(List[], key)
        [data.STDLIB_VERSION_3, getIntegerValueKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getIntegerValueIndex - getIntegerValue(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerValueIndex - invalid data for getIntegerValue(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidGetIntegerKey, data.RideV3Result, data.dataEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetIntegerKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
        });

    test.each([
        // getIntegerKey - callerTestData.getInteger("key")
        [data.STDLIB_VERSION_3, getIntegerKeyArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        // getIntegerKeyArgBeforeFunc - invalid data for List[].getInteger(key)
        [data.STDLIB_VERSION_3, getIntegerKeyArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getIntegerIndexArgBeforeFunc - List[].getInteger(Int)
        [data.STDLIB_VERSION_3, getIntegerIndexArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerIndexArgBeforeFunc - invalid data for List[].getInteger(Int)
        [data.STDLIB_VERSION_3, getIntegerIndexArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getIntegerValueKeyArgBeforeFunc - callerTestData.getIntegerValue("key")
        [data.STDLIB_VERSION_3, getIntegerValueKeyArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerValueKeyArgBeforeFunc - invalid data for List[].getIntegerValueKey(key)
        [data.STDLIB_VERSION_3, getIntegerValueKeyArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueKeyArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getIntegerValueIndexArgBeforeFunc - List[].getIntegerValue(Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndexArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerValueIndexArgBeforeFunc - invalid data for List[].getIntegerValue(Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndexArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueIndexArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidGetIntegerArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.NEGATIVE_TEST],
    ])('check ride v%i function (arg first) %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
        });
});
