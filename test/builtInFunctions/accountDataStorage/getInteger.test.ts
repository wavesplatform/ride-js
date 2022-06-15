import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('getInteger',  () => {

    const getInteger = `getInteger(callerTestData, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
    const invalidGetIntegerV3 = `getInteger(callerTestData)`;
    const invalidGetIntegerGreaterV3 = `getInteger(callerTestData)`;
    const ownDataGetInteger = 'getInteger("LJKaSADfHH127gd")';

    const getIntegerValue = `getIntegerValue(callerTestData, "LJKaSADfHH782gd")`
    const invalidGetIntegerValueV3 = `getIntegerValue(callerTestData)`;
    const invalidGetIntegerValueGreaterV3 = `getIntegerValue(callerTestData)`;
    const ownDataGetIntegerValue = 'getIntegerValue("LJKaSADfHH127gd")';

    const precondition = new GenerateContractForBuiltInFunctions
    (getInteger, ownDataGetInteger, 'Int');

    test.each([
        // getInteger
        [data.STDLIB_VERSION_3, getInteger, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, getInteger, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getInteger, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        // getIntegerValue
        [data.STDLIB_VERSION_3, getIntegerValue, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, getIntegerValue, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getIntegerValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getInteger
        [data.STDLIB_VERSION_3, invalidGetIntegerV3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, invalidGetIntegerV3, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerGreaterV3, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetIntegerGreaterV3, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],

        // negative: invalid function getIntegerValue
        [data.STDLIB_VERSION_3, invalidGetIntegerValueV3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, invalidGetIntegerValueV3, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetIntegerValueGreaterV3, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetIntegerValueGreaterV3, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.POSITIVE_TEST],
        // Can't find a function overload getInteger
        [data.STDLIB_VERSION_3, data.RideV3Result, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.NEGATIVE_TEST],
    ])('getInteger own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.POSITIVE_TEST,],
        // Can't find a function overload getIntegerValue
        [data.STDLIB_VERSION_3, data.RideV3Result, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.NEGATIVE_TEST],
    ])('getIntegerValue own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, ownDataGetIntegerValue);
        checkCompileResult(contract, testType);
    });
});