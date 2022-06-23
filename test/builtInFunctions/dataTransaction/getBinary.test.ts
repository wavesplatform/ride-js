import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getBinary / getBinaryValue', () => {
    const getBinaryKey = `getBinary(callerTestData, "key")`;
    const getBinaryIndex = `getBinary(callerTestData, ${random.getRandomInt()})`;
    const getBinaryValueKey = `getBinaryValue(callerTestData, "key")`;
    const getBinaryValueIndex = `getBinaryValue(callerTestData, ${random.getRandomInt()})`;
    const invalidGetBinaryKey = `getBinary()`;

    const getBinaryKeyArgBeforeFunc = `callerTestData.getBinary("key")`;
    const getBinaryIndexArgBeforeFunc = `callerTestData.getBinary(${random.getRandomInt()})`;
    const getBinaryValueKeyArgBeforeFunc = `callerTestData.getBinaryValue("key")`;
    const getBinaryValueIndexArgBeforeFunc = `callerTestData.getBinaryValue(${random.getRandomInt()})`;
    const invalidGetBinaryArgBeforeFunc = `callerTestData.getBinary()`;

    const precondition = new GenerateContractForBuiltInFunctions(getBinaryKey);
    precondition.setData("ByteVector");

    test.each([
        // getBinaryKey - getBinary(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBinaryKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        // getBinaryKey - invalid data for getBinary(List[], key)
        [data.STDLIB_VERSION_3, getBinaryKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBinaryIndex - getBinary(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryIndex - invalid data for getBinary(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getBinaryValueKey - getBinaryValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBinaryValueKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryValueKey - invalid data for getBinaryValueKey(List[], key)
        [data.STDLIB_VERSION_3, getBinaryValueKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBinaryValueIndex - getBinaryValue(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryValueIndex - invalid data for getBinaryValue(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidGetBinaryKey, data.RideV3Result, data.dataEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBinaryKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
        });

    test.each([
        // getBinaryKey - callerTestData.getBinary("key")
        [data.STDLIB_VERSION_3, getBinaryKeyArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        // getBinaryKeyArgBeforeFunc - invalid data for List[].getBinary(key)
        [data.STDLIB_VERSION_3, getBinaryKeyArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBinaryIndexArgBeforeFunc - List[].getBinary(Int)
        [data.STDLIB_VERSION_3, getBinaryIndexArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryIndexArgBeforeFunc - invalid data for List[].getBinary(Int)
        [data.STDLIB_VERSION_3, getBinaryIndexArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getBinaryValueKeyArgBeforeFunc - callerTestData.getBinaryValue("key")
        [data.STDLIB_VERSION_3, getBinaryValueKeyArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryValueKeyArgBeforeFunc - invalid data for List[].getBinaryValueKey(key)
        [data.STDLIB_VERSION_3, getBinaryValueKeyArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueKeyArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBinaryValueIndexArgBeforeFunc - List[].getBinaryValue(Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndexArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryValueIndexArgBeforeFunc - invalid data for List[].getBinaryValue(Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndexArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueIndexArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidGetBinaryArgBeforeFunc, data.RideV3Result, data.dataEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.NEGATIVE_TEST],
    ])('check ride v%i function (arg first) %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
        });
});
