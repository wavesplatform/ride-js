
import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";
import {getRandomString} from "../../testData/random";

describe('getInteger',  () => {
    // getInteger
    const getInteger = `getInteger(callerTestData, ${getRandomString()})`;
    const getIntegerArgBeforeFunc = `callerTestData.getInteger(${getRandomString()})`;
    const ownDataGetInteger = `getInteger(${getRandomString()})`;
    const ownDataGetIntegerArgBeforeFunc = `${getRandomString()}.getInteger()`;

    // getIntegerValue
    const getIntegerValue = `getIntegerValue(callerTestData, "LJKaSADfHH782gd")`;
    const getIntegerValueArgBeforeFunc = `callerTestData.getIntegerValue("LJKaSADfHH782gd")`;
    const ownDataGetIntegerValue = 'getIntegerValue("LJKaSADfHH127gd")';
    const ownDataGetIntegerValueArgBeforeFunc = `${getRandomString()}.getIntegerValue()`;

    const invalidGetInteger = `getInteger(callerTestData)`;
    const invalidGetIntegerValue = `getIntegerValue(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (getInteger, ownDataGetInteger, 'Int');

    test.each([
        // getInteger address
        [data.STDLIB_VERSION_3, getInteger, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getInteger alias
        [data.STDLIB_VERSION_3, getInteger, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getInteger address arg before func
        [data.STDLIB_VERSION_3, getIntegerArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getInteger alias arg before func
        [data.STDLIB_VERSION_3, getIntegerArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getIntegerValue address
        [data.STDLIB_VERSION_3, getIntegerValue, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getIntegerValue alias
        [data.STDLIB_VERSION_3, getIntegerValue, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getIntegerValue address arg before func
        [data.STDLIB_VERSION_3, getIntegerValueArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getIntegerValue alias arg before func
        [data.STDLIB_VERSION_3, getIntegerValueArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getIntegerValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getInteger
        [data.STDLIB_VERSION_3, invalidGetInteger, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // negative: invalid function getIntegerValue
        [data.STDLIB_VERSION_3, invalidGetIntegerValue, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, ownDataGetInteger, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, ownDataGetInteger, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getInteger
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetInteger, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetIntegerArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, ownDataGetInteger, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getInteger own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerValueArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerValueArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getIntegerValue
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetIntegerValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetIntegerValueArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, ownDataGetIntegerValueArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getIntegerValue own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });
});
