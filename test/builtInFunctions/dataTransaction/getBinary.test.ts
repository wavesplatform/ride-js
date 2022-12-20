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
        [data.STDLIB_VERSION_3, getBinaryKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBinaryKey - invalid data for getBinary(List[], key)
        [data.STDLIB_VERSION_3, getBinaryKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBinaryKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getBinaryIndex - getBinary(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBinaryIndex - invalid data for getBinary(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBinaryIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.negativeTestType],

        // getBinaryValueKey - getBinaryValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBinaryValueKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBinaryValueKey - invalid data for getBinaryValueKey(List[], key)
        [data.STDLIB_VERSION_3, getBinaryValueKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBinaryValueKey, data.GreaterV3ResultBinaryEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getBinaryValueIndex - getBinaryValue(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBinaryValueIndex - invalid data for getBinaryValue(List[], Int)
        [data.STDLIB_VERSION_3, getBinaryValueIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBinaryValueIndex, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
        checkCompileResult(contract, testType);
    });
});
