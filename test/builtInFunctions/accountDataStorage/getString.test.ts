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
        // getString address
        [data.STDLIB_VERSION_3, getString, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getString alias
        [data.STDLIB_VERSION_3, getString, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getString, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getString, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getString, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        // getStringValue address
        [data.STDLIB_VERSION_3, getStringValue, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getStringValue alias
        [data.STDLIB_VERSION_3, getStringValue, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getString
        [data.STDLIB_VERSION_3, invalidGetStringV3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetStringGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetStringGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetStringGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        // negative: invalid function getStringValue
        [data.STDLIB_VERSION_3, invalidGetStringValueV3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetStringValueGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetStringValueGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetStringValueGreaterV3, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.POSITIVE_TEST],
        // Can't find a function overload getString
        [data.STDLIB_VERSION_3, data.RideV3Result, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.NEGATIVE_TEST],
    ])('getString own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.POSITIVE_TEST,],
        // Can't find a function overload getStringValue
        [data.STDLIB_VERSION_3, data.RideV3Result, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.NEGATIVE_TEST],
    ])('getStringValue own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, ownDataGetStringValue);
        checkCompileResult(contract, testType);
    });
});