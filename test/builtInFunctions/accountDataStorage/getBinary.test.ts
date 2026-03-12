import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";
import {getRandomString} from "../../testData/random";

describe('getBinary', () => {
    // getBinary
    const getBinary = `getBinary(callerTestData, ${getRandomString()})`;
    const getBinaryArgBeforeFunc = `callerTestData.getBinary(${getRandomString()})`;
    const ownDataGetBinary = `getBinary(${getRandomString()})`;
    const ownDataGetBinaryArgBeforeFunc = `${getRandomString()}.getBinary()`;

    // getBinaryValue
    const getBinaryValue = `getBinaryValue(callerTestData, ${getRandomString()})`;
    const getBinaryValueArgBeforeFunc = `callerTestData.getBinaryValue(${getRandomString()})`;
    const ownDataGetBinaryValue = `getBinaryValue(${getRandomString()})`;
    const ownDataGetBinaryValueArgBeforeFunc = `${getRandomString()}.getBinaryValue()`;

    const invalidGetBinary = `getBinary(callerTestData)`;
    const invalidGetBinaryValue = `getBinaryValue(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (getBinary, ownDataGetBinary, 'ByteVector');

    test.each([
        // getBinary address
        [data.STDLIB_VERSION_3, getBinary, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBinary alias
        [data.STDLIB_VERSION_3, getBinary, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getBinary address arg before func
        [data.STDLIB_VERSION_3, getBinaryArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBinary alias arg before func
        [data.STDLIB_VERSION_3, getBinaryArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getBinaryValue address
        [data.STDLIB_VERSION_3, getBinaryValue, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBinaryValue alias
        [data.STDLIB_VERSION_3, getBinaryValue, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // getBinaryValue address arg before func
        [data.STDLIB_VERSION_3, getBinaryValueArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // getBinaryValue alias arg before func
        [data.STDLIB_VERSION_3, getBinaryValueArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValueArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValueArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getBinaryValueArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getBinary
        [data.STDLIB_VERSION_3, invalidGetBinary, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // negative: invalid function getBinaryValue
        [data.STDLIB_VERSION_3, invalidGetBinaryValue, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, ownDataGetBinary, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, ownDataGetBinary, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getBinary
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBinary, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBinaryArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, ownDataGetBinary, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getBinary own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryValue, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryValueArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryValueArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function overload getBinaryValue
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBinaryValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, ownDataGetBinaryValueArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryValue, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, ownDataGetBinaryValueArgBeforeFunc, data.NEGATIVE_TEST],
    ])('getBinaryValue own data tests', (version, scriptResult, func, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, func);
        checkCompileResult(contract, testType);
    });
});
