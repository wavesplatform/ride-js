import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getBoolean / getBooleanValue', () => {
    const getBooleanKey = `getBoolean(callerTestData, "key")`;
    const getBooleanIndex = `getBoolean(callerTestData, ${random.getRandomInt()})`;
    const getBooleanValueKey = `getBooleanValue(callerTestData, "key")`;
    const getBooleanValueIndex = `getBooleanValue(callerTestData, ${random.getRandomInt()})`;
    const invalidGetBooleanKey = `getBoolean()`;

    const getBooleanKeyArgBeforeFunc = `callerTestData.getBoolean("key")`;
    const getBooleanIndexArgBeforeFunc = `callerTestData.getBoolean(${random.getRandomInt()})`;
    const getBooleanValueKeyArgBeforeFunc = `callerTestData.getBooleanValue("key")`;
    const getBooleanValueIndexArgBeforeFunc = `callerTestData.getBooleanValue(${random.getRandomInt()})`;
    const invalidGetBooleanArgBeforeFunc = `callerTestData.getBoolean()`;

    const precondition = new GenerateContractForBuiltInFunctions(getBooleanKey);
    precondition.setData("Boolean");

    test.each([
        // getBooleanKey - getBoolean(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBooleanKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        // getBooleanKey - invalid data for getBoolean(List[], key)
        [data.STDLIB_VERSION_3, getBooleanKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanKey, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanKey, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanKey, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBooleanIndex - getBoolean(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBooleanIndex - invalid data for getBoolean(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanIndex, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanIndex, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanIndex, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getBooleanValueKey - getBooleanValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBooleanValueKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBooleanValueKey - invalid data for getBooleanValueKey(List[], key)
        [data.STDLIB_VERSION_3, getBooleanValueKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBooleanValueIndex - getBooleanValue(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanValueIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBooleanValueIndex - invalid data for getBooleanValue(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanValueIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidGetBooleanKey, data.RideV3Result, data.dataEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBooleanKey, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBooleanKey, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBooleanKey, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
        });

    test.each([
        // getBooleanKey - callerTestData.getBoolean("key")
        [data.STDLIB_VERSION_3, getBooleanKeyArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        // getBooleanKeyArgBeforeFunc - invalid data for List[].getBoolean(key)
        [data.STDLIB_VERSION_3, getBooleanKeyArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBooleanIndexArgBeforeFunc - List[].getBoolean(Int)
        [data.STDLIB_VERSION_3, getBooleanIndexArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBooleanIndexArgBeforeFunc - invalid data for List[].getBoolean(Int)
        [data.STDLIB_VERSION_3, getBooleanIndexArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getBooleanValueKeyArgBeforeFunc - callerTestData.getBooleanValue("key")
        [data.STDLIB_VERSION_3, getBooleanValueKeyArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBooleanValueKeyArgBeforeFunc - invalid data for List[].getBooleanValueKey(key)
        [data.STDLIB_VERSION_3, getBooleanValueKeyArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueKeyArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBooleanValueIndexArgBeforeFunc - List[].getBooleanValue(Int)
        [data.STDLIB_VERSION_3, getBooleanValueIndexArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBooleanValueIndexArgBeforeFunc - invalid data for List[].getBooleanValue(Int)
        [data.STDLIB_VERSION_3, getBooleanValueIndexArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueIndexArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidGetBooleanArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.NEGATIVE_TEST],
    ])('check ride v%i function (arg first) %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
        });
});
