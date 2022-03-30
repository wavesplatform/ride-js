import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('getBoolean',  () => {

    const getBoolean = `getBoolean(callerTestData, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
    const invalidGetBooleanV3 = `getBoolean(callerTestData)`;
    const invalidGetBooleanGreaterV3 = `getBoolean(callerTestData)`;
    const ownDataGetBoolean = 'getBoolean("LJKaSADfHH127gd")';

    const getBooleanValue = `getBooleanValue(callerTestData, "LJKaSADfHH782gd")`
    const invalidGetBooleanValueV3 = `getBooleanValue(callerTestData)`;
    const invalidGetBooleanValueGreaterV3 = `getBooleanValue(callerTestData)`;
    const ownDataGetBooleanValue = 'getBooleanValue("LJKaSADfHH127gd")';

    const precondition = new GenerateContractForBuiltInFunctions
    (getBoolean, ownDataGetBoolean, 'Boolean');

    test.each([
        // getBoolean
        [data.STDLIB_VERSION_3, getBoolean, data.RideV3Result, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, getBoolean, data.RideV3Result, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.positiveTestType],
        // getBooleanValue
        [data.STDLIB_VERSION_3, getBooleanValue, data.RideV3Result, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, getBooleanValue, data.RideV3Result, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.positiveTestType],

        // negative: invalid function getBoolean
        [data.STDLIB_VERSION_3, invalidGetBooleanV3, data.RideV3Result, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_3, invalidGetBooleanV3, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidGetBooleanGreaterV3, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGetBooleanGreaterV3, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.negativeTestType],

        // negative: invalid function getBooleanValue
        [data.STDLIB_VERSION_3, invalidGetBooleanValueV3, data.RideV3Result, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_3, invalidGetBooleanValueV3, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidGetBooleanValueGreaterV3, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGetBooleanValueGreaterV3, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.negativeTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.positiveTestType],
        // Can't find a function overload getBoolean
        [data.STDLIB_VERSION_3, data.RideV3Result, data.negativeTestType],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.negativeTestType],
    ])('getBoolean own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.positiveTestType,],
        // Can't find a function overload getBooleanValue
        [data.STDLIB_VERSION_3, data.RideV3Result, data.negativeTestType],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.negativeTestType],
    ])('getBooleanValue own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, ownDataGetBooleanValue);
        checkCompileResult(contract, testType);
    });
});