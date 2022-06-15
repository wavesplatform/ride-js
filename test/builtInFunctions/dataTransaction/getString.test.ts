import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getString / getStringValue',  () => {

    const getStringKey = `getString(callerTestData, "key")`;
    const getStringIndex = `getString(callerTestData, ${random.getRandomInt()})`;
    const getStringValueKey = `getStringValue(callerTestData, "key")`;
    const getStringValueIndex = `getStringValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions(getStringKey);
    precondition.setData("String");

    test.each([
        // getStringKey - getString(callerTestData, "key")
        [data.STDLIB_VERSION_3, getStringKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringKey, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringKey, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringKey, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringKey, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getStringKey - invalid data for getString(List[], key)
        [data.STDLIB_VERSION_3, getStringKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getStringKey, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getStringKey, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getStringIndex - getString(List[], Int)
        [data.STDLIB_VERSION_3, getStringIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringIndex, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringIndex, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringIndex, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringIndex, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getStringIndex - invalid data for getString(List[], Int)
        [data.STDLIB_VERSION_3, getStringIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getStringIndex, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getStringIndex, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getStringValueKey - getStringValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getStringValueKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueKey, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueKey, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueKey, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueKey, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getStringValueKey - invalid data for getStringValueKey(List[], key)
        [data.STDLIB_VERSION_3, getStringValueKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueKey, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueKey, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getStringValueIndex - getStringValue(List[], Int)
        [data.STDLIB_VERSION_3, getStringValueIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueIndex, data.GreaterV3ResultStringEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueIndex, data.GreaterV3ResultStringEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueIndex, data.GreaterV3ResultStringEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueIndex, data.GreaterV3ResultStringEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getStringValueIndex - invalid data for getStringValue(List[], Int)
        [data.STDLIB_VERSION_3, getStringValueIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueIndex, data.GreaterV3ResultStringEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueIndex, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
    });
});
