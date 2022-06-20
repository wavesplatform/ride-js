
import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";
import {getRandomString} from "../../testData/random";

describe('getBoolean',  () => {
    // getBoolean
    const getBoolean = `getBoolean(callerTestData, ${getRandomString()})`;
    const getBooleanArgBeforeFunc = `callerTestData.getBoolean(${getRandomString()})`;
    const ownDataGetBoolean = `getBoolean(${getRandomString()})`;
    const ownDataGetBooleanArgBeforeFunc = `${getRandomString()}.getBoolean()`;

    // getBooleanValue
    const getBooleanValue = `getBooleanValue(callerTestData, "LJKaSADfHH782gd")`;
    const getBooleanValueArgBeforeFunc = `callerTestData.getBooleanValue("LJKaSADfHH782gd")`;
    const ownDataGetBooleanValue = 'getBooleanValue("LJKaSADfHH127gd")';
    const ownDataGetBooleanValueArgBeforeFunc = `${getRandomString()}.getBooleanValue()`;

    const invalidGetBoolean = `getBoolean(callerTestData)`;
    const invalidGetBooleanValue = `getBooleanValue(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (getBoolean, ownDataGetBoolean, 'Boolean');

    test.each([
        // getBoolean address
        [data.STDLIB_VERSION_3, getBoolean, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBoolean alias
        [data.STDLIB_VERSION_3, getBoolean, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getBoolean address arg before func
        [data.STDLIB_VERSION_3, getBooleanArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBoolean alias arg before func
        [data.STDLIB_VERSION_3, getBooleanArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getBooleanValue address
        [data.STDLIB_VERSION_3, getBooleanValue, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBooleanValue alias
        [data.STDLIB_VERSION_3, getBooleanValue, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getBooleanValue address arg before func
        [data.STDLIB_VERSION_3, getBooleanValueArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBooleanValue alias arg before func
        [data.STDLIB_VERSION_3, getBooleanValueArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBooleanValueArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBooleanValueArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBooleanValueArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getBoolean
        [data.STDLIB_VERSION_3, invalidGetBoolean, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetBoolean, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // negative: invalid function getBooleanValue
        [data.STDLIB_VERSION_3, invalidGetBooleanValue, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetBooleanValue, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ownDataGetBoolean, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBooleanEntry, ownDataGetBoolean, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getBoolean
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBoolean, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBooleanArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ownDataGetBoolean, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getBoolean own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanValueArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanValueArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getBooleanValue
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBooleanValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBooleanValueArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ownDataGetBooleanValueArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getBooleanValue own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });
});
