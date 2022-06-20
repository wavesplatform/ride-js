
import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";
import {getRandomString} from "../../testData/random";

describe('getString',  () => {
    // getString
    const getString = `getString(callerTestData, ${getRandomString()})`;
    const getStringArgBeforeFunc = `callerTestData.getString(${getRandomString()})`;
    const ownDataGetString = `getString(${getRandomString()})`;
    const ownDataGetStringArgBeforeFunc = `${getRandomString()}.getString()`;

    // getStringValue
    const getStringValue = `getStringValue(callerTestData, "LJKaSADfHH782gd")`;
    const getStringValueArgBeforeFunc = `callerTestData.getStringValue("LJKaSADfHH782gd")`;
    const ownDataGetStringValue = 'getStringValue("LJKaSADfHH127gd")';
    const ownDataGetStringValueArgBeforeFunc = `${getRandomString()}.getStringValue()`;

    const invalidGetString = `getString(callerTestData)`;
    const invalidGetStringValue = `getStringValue(callerTestData)`;

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

        // getString address arg before func
        [data.STDLIB_VERSION_3, getStringArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getStringArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getString alias arg before func
        [data.STDLIB_VERSION_3, getStringArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getStringArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],

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

        // getStringValue address arg before func
        [data.STDLIB_VERSION_3, getStringValueArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getStringValueArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getStringValue alias arg before func
        [data.STDLIB_VERSION_3, getStringValueArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getStringValueArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getStringValueArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getStringValueArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getString
        [data.STDLIB_VERSION_3, invalidGetString, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetString, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetString, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // negative: invalid function getStringValue
        [data.STDLIB_VERSION_3, invalidGetStringValue, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetStringValue, data.GreaterV3ResultStringEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetStringValue, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, ownDataGetString, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, ownDataGetStringArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultStringEntry, ownDataGetString, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultStringEntry, ownDataGetStringArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getString
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetString, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetStringArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, ownDataGetString, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, ownDataGetStringArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getString own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, ownDataGetStringValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, ownDataGetStringValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultStringEntry, ownDataGetStringValueArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultStringEntry, ownDataGetStringValueArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getStringValue
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetStringValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetStringValueArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, ownDataGetStringValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, ownDataGetStringValueArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getStringValue own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });
});
