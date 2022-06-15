import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('getBinary',  () => {

    const getBinary = `getBinary(callerTestData, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
    const invalidGetBinaryV3 = `getBinary(callerTestData)`;
    const invalidGetBinaryGreaterV3 = `getBinary(callerTestData)`;
    const ownDataGetBinary = 'getBinary("LJKaSADfHH127gd")';

    const getBinaryValue = `getBinaryValue(callerTestData, "LJKaSADfHH782gd")`
    const invalidGetBinaryValueV3 = `getBinaryValue(callerTestData)`;
    const invalidGetBinaryValueGreaterV3 = `getBinaryValue(callerTestData)`;
    const ownDataGetBinaryValue = 'getBinaryValue("LJKaSADfHH127gd")';

    const precondition = new GenerateContractForBuiltInFunctions
    (getBinary, ownDataGetBinary, 'ByteVector');

    test.each([
        // getBinary
        [data.STDLIB_VERSION_3, getBinary, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, getBinary, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinary, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        // getBinaryValue
        [data.STDLIB_VERSION_3, getBinaryValue, data.RideV3Result, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, getBinaryValue, data.RideV3Result, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getBinaryValue, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],

        // negative: invalid function getBinary
        [data.STDLIB_VERSION_3, invalidGetBinaryV3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, invalidGetBinaryV3, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryGreaterV3, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBinaryGreaterV3, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],

        // negative: invalid function getBinaryValue
        [data.STDLIB_VERSION_3, invalidGetBinaryValueV3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, invalidGetBinaryValueV3, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetBinaryValueGreaterV3, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetBinaryValueGreaterV3, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.POSITIVE_TEST],
        // Can't find a function overload getBinary
        [data.STDLIB_VERSION_3, data.RideV3Result, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.NEGATIVE_TEST],
    ])('getBinary own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnData(version, scriptResult);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.POSITIVE_TEST,],
        // Can't find a function overload getBinaryValue
        [data.STDLIB_VERSION_3, data.RideV3Result, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.NEGATIVE_TEST],
    ])('getBinaryValue own data tests', (version, scriptResult, testType) => {
        const contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult, ownDataGetBinaryValue);
        checkCompileResult(contract, testType);
    });
});
