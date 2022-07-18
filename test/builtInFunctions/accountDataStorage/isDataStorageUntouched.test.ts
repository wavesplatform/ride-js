import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('isDataStorageUntouched', () => {

    const isDataStorageUntouched = `isDataStorageUntouched(callerTestData)`;
    const isDataStorageUntouchedArgBeforeFunc = `callerTestData.isDataStorageUntouched()`;

    const invalidFunction = `isDataStorageUntouched()`;

    const precondition = new GenerateContractForBuiltInFunctions(isDataStorageUntouched);
    precondition.setData("Int");

    test.each([
        [data.STDLIB_VERSION_5, isDataStorageUntouched, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, isDataStorageUntouched, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, isDataStorageUntouched, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, isDataStorageUntouched, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        // isDataStorageUntouched can't find
        [data.STDLIB_VERSION_3, isDataStorageUntouched, data.RideV3Result, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, isDataStorageUntouched, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, isDataStorageUntouched, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, isDataStorageUntouched, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        [data.STDLIB_VERSION_5, isDataStorageUntouchedArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, isDataStorageUntouchedArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, isDataStorageUntouchedArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, isDataStorageUntouchedArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        // isDataStorageUntouched can't find
        [data.STDLIB_VERSION_3, isDataStorageUntouchedArgBeforeFunc, data.RideV3Result, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, isDataStorageUntouchedArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, isDataStorageUntouchedArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, isDataStorageUntouchedArgBeforeFunc, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],

        // invalid functions isDataStorageUntouched
        [data.STDLIB_VERSION_5, invalidFunction, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFunction, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFunction, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFunction, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, address, testType) => {
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, address, testFunction);
        checkCompileResult(contract, testType);
    });
});
