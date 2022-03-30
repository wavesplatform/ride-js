import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('getString',  () => {

    const getString = `getString(callerTestData, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
    const invalidGetStringV3 = `getString(callerTestData)`;
    const invalidGetStringGreaterV3 = `getString(callerTestData)`;
    const ownDataGetString = 'getString("LJKaSADfHH127gd")';

    const getStringValue = `getStringValue(callerTestData, "LJKaSADfHH782gd")`
    const invalidGetStringValueV3 = `getStringValue(callerTestData)`;
    const invalidGetStringValueGreaterV3 = `getStringValue(callerTestData)`;
    const ownDataGetStringValue = 'getStringValue("LJKaSADfHH127gd")';

    const precondition = new GenerateContractForBuiltInFunctions
    (getString, ownDataGetString, 'String');

    test.each([
        // getString
        [data.STDLIB_VERSION_3, getString, data.RideV3Result, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, getString, data.RideV3Result, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getString, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getString, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.positiveTestType],
        // getStringValue
        [data.STDLIB_VERSION_3, getStringValue, data.RideV3Result, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, getStringValue, data.RideV3Result, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_4, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_5, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.positiveTestType],

        // negative: invalid function getString
        [data.STDLIB_VERSION_3, invalidGetStringV3, data.RideV3Result, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_3, invalidGetStringV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidGetStringGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGetStringGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.negativeTestType],

        // negative: invalid function getStringValue
        [data.STDLIB_VERSION_3, invalidGetStringValueV3, data.RideV3Result, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_3, invalidGetStringValueV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidGetStringValueGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGetStringValueGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.negativeTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.positiveTestType],
        // Can't find a function overload getString
        [data.STDLIB_VERSION_3, data.RideV3Result, data.negativeTestType],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.negativeTestType],
    ])('getString own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.positiveTestType,],
        // Can't find a function overload getStringValue
        [data.STDLIB_VERSION_3, data.RideV3Result, data.negativeTestType],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.negativeTestType],
    ])('getStringValue own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, ownDataGetStringValue);
        checkCompileResult(contract, testType);
    });
});