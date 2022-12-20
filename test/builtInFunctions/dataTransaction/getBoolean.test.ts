import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dataTransaction - getBoolean / getBooleanValue',  () => {

    const getBooleanKey = `getBoolean(callerTestData, "key")`;
    const getBooleanIndex = `getBoolean(callerTestData, ${random.getRandomInt()})`;
    const getBooleanValueKey = `getBooleanValue(callerTestData, "key")`;
    const getBooleanValueIndex = `getBooleanValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions(getBooleanKey);
    precondition.setData("Boolean");

    test.each([
        // getBooleanKey - getBoolean(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBooleanKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanKey, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBooleanKey - invalid data for getBoolean(List[], key)
        [data.STDLIB_VERSION_3, getBooleanKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBooleanKey, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBooleanKey, data.GreaterV3ResultBooleanEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getBooleanIndex - getBoolean(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanIndex, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBooleanIndex - invalid data for getBoolean(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBooleanIndex, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBooleanIndex, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.negativeTestType],

        // getBooleanValueKey - getBooleanValue(callerTestData, "key")
        [data.STDLIB_VERSION_3, getBooleanValueKey, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBooleanValueKey - invalid data for getBooleanValueKey(List[], key)
        [data.STDLIB_VERSION_3, getBooleanValueKey, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBooleanValueKey, data.GreaterV3ResultBooleanEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // getBooleanValueIndex - getBooleanValue(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanValueIndex, data.RideV3Result, data.dataEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests, data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests, data.positiveTestType],
        // getBooleanValueIndex - invalid data for getBooleanValue(List[], Int)
        [data.STDLIB_VERSION_3, getBooleanValueIndex, data.RideV3Result, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, getBooleanValueIndex, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, caseForVersions, callerTestData, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData, testFunction);
            checkCompileResult(contract, testType);
    });
});
