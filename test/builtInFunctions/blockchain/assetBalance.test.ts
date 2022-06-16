import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('assetBalance',  () => {

    let defaultFunction;
    let precondition;
    const incorrectFunction = `assetBalance()`;

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress(), random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), random.getRandomByteVector(), data.POSITIVE_TEST],

        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAlias(), random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), random.getRandomByteVector(), data.POSITIVE_TEST],
    ])('positive: Checking the address in a transfer transaction',
        (version, scriptResult, addressOrAlias, byteVector, testType) => {
        defaultFunction = `assetBalance(${addressOrAlias}, ${byteVector})`;
        precondition = new GenerateContractForBuiltInFunctions(defaultFunction);
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias, defaultFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        ])('negative: incorrect function args assetBalance',
        (version, scriptResult, addressOrAlias, testType) => {
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias, incorrectFunction);
        checkCompileResult(contract, testType);
    });
});