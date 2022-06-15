import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getInteger / getIntegerValue',  () => {

    const getIntegerKey = `getInteger(callerTestData, "key")`;
    const getIntegerIndex = `getInteger(callerTestData, ${random.getRandomInt()})`;
    const getIntegerValueKey = `getIntegerValue(callerTestData, "key")`;
    const getIntegerValueIndex = `getIntegerValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions(getIntegerKey);
    precondition.setData("Int");

    test.each([
        // getIntegerKey - getInteger(callerTestData, "key")
        [data.STDLIB_VERSION_3, getIntegerKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerKey - invalid data for getInteger(List[], key)
        [data.STDLIB_VERSION_3, getIntegerKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getIntegerIndex - getInteger(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerIndex - invalid data for getInteger(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // getIntegerValueKey - getIntegerValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getIntegerValueKey, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerValueKey - invalid data for getIntegerValueKey(List[], key)
        [data.STDLIB_VERSION_3, getIntegerValueKey, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueKey, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // getIntegerValueIndex - getIntegerValue(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndex, data.RideV3Result, data.dataEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests, data.POSITIVE_TEST],
        // getIntegerValueIndex - invalid data for getIntegerValue(List[], Int)
        [data.STDLIB_VERSION_3, getIntegerValueIndex, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueIndex, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
    });
});
