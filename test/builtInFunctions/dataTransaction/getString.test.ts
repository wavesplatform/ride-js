import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getString / getStringValue',  () => {

    const getStringKey = `getString(callerTestData, "key")`;
    const getStringIndex = `getString(callerTestData, ${random.getRandomInt()})`;
    const getStringValueKey = `getStringValue(callerTestData, "key")`;
    const getStringValueIndex = `getStringValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (getStringKey, null, 'String');

    test.each([
        // getStringKey - getString(callerTestData, "key")
        [data.STDLIB_VERSION_3, getStringKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringKey, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringKey, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringKey, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringKey, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.positiveTestType],
        // getStringKey - invalid data for getString(List[], key)
        [data.STDLIB_VERSION_3, getStringKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getStringKey, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getStringKey, data.GreaterV3ResultStringEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getStringIndex - getString(List[], Int)
        [data.STDLIB_VERSION_3, getStringIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringIndex, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringIndex, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringIndex, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringIndex, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.positiveTestType],
        // getStringIndex - invalid data for getString(List[], Int)
        [data.STDLIB_VERSION_3, getStringIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getStringIndex, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getStringIndex, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.negativeTestType],

        // getStringValueKey - getStringValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getStringValueKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringValueKey, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringValueKey, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringValueKey, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringValueKey, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.positiveTestType],
        // getStringValueKey - invalid data for getStringValueKey(List[], key)
        [data.STDLIB_VERSION_3, getStringValueKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getStringValueKey, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getStringValueKey, data.GreaterV3ResultStringEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getStringValueIndex - getStringValue(List[], Int)
        [data.STDLIB_VERSION_3, getStringValueIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringValueIndex, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringValueIndex, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringValueIndex, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringValueIndex, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.positiveTestType],
        // getStringValueIndex - invalid data for getStringValue(List[], Int)
        [data.STDLIB_VERSION_3, getStringValueIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getStringValueIndex, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getStringValueIndex, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.negativeTestType],
    ])('positive: for ride v%i compiled %s',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
    });
});
