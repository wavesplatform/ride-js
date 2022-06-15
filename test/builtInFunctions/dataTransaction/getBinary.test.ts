import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getBinary / getBinaryValue',  () => {

    const getBinaryKey = `getBinary(callerTestData, "key")`;
    const getBinaryIndex = `getBinary(callerTestData, ${random.getRandomInt()})`;
    const getBinaryValueKey = `getBinaryValue(callerTestData, "key")`;
    const getBinaryValueIndex = `getBinaryValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions(getBinaryKey);
    precondition.setData("ByteVector");

    test.each([
        // getBinaryKey - getBinary(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBinaryKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryKey - invalid data for getBinary(List[], key)
        [data.STDLIB_VERSION_3, getBinaryKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBinaryIndex - getBinary(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryIndex - invalid data for getBinary(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getBinaryValueKey - getBinaryValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBinaryValueKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryValueKey - invalid data for getBinaryValueKey(List[], key)
        [data.STDLIB_VERSION_3, getBinaryValueKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getBinaryValueIndex - getBinaryValue(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getBinaryValueIndex - invalid data for getBinaryValue(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
        checkCompileResult(contract, testType);
    });
});
