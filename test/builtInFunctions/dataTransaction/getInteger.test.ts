import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getInteger / getIntegerValue',  () => {

    const getIntegerKey = `getInteger(callerTestData, "key")`;
    const getIntegerIndex = `getInteger(callerTestData, ${random.getRandomInt()})`;
    const getIntegerValueKey = `getIntegerValue(callerTestData, "key")`;
    const getIntegerValueIndex = `getIntegerValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (getIntegerKey, null, 'Int');

    test.each([
        // getIntegerKey - getInteger(callerTestData, "key")
        [data.STDLIB_VERSION_3, getIntegerKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.positiveTestType],
        // getIntegerKey - invalid data for getInteger(List[], key)
        [data.STDLIB_VERSION_3, getIntegerKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getIntegerIndex - getInteger(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.positiveTestType],
        // getIntegerIndex - invalid data for getInteger(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.negativeTestType],

        // getIntegerValueKey - getIntegerValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getIntegerValueKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.positiveTestType],
        // getIntegerValueKey - invalid data for getIntegerValueKey(List[], key)
        [data.STDLIB_VERSION_3, getIntegerValueKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getIntegerValueIndex - getIntegerValue(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.positiveTestType],
        // getIntegerValueIndex - invalid data for getIntegerValue(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.negativeTestType],
    ])('positive: for ride v%i compiled %s',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
    });
});
