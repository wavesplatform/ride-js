import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('wavesBalance', () => {

    const wavesBalance = `wavesBalance(callerTestData)`;
    const invalidWavesBalance = `wavesBalance(callerTestData, callerTestData)`;
    const wavesBalanceArgBeforeFunc = `callerTestData.wavesBalance()`;
    const invalidWavesBalanceArgBeforeFunc = `callerTestData.wavesBalance(callerTestData)`;

    let precondition = new GenerateContractForBuiltInFunctions(wavesBalance);
    precondition.setData("BalanceDetails");

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomAddress(), wavesBalance, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), wavesBalance, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), wavesBalance, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), wavesBalance, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), wavesBalance, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), wavesBalance, data.POSITIVE_TEST],
        // invalid arg by wavesBalance
        [data.STDLIB_VERSION_4, random.getRandomIssue(), wavesBalance, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomInt(), wavesBalance, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomInt(), wavesBalance, data.NEGATIVE_TEST],
        // invalid function wavesBalance
        [data.STDLIB_VERSION_4, random.getRandomAddress(), invalidWavesBalance, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), invalidWavesBalance, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), invalidWavesBalance, data.NEGATIVE_TEST],

        // wavesBalance argument before function
        [data.STDLIB_VERSION_4, random.getRandomAddress(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        // invalid arg by wavesBalance
        [data.STDLIB_VERSION_4, random.getRandomIssue(), wavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomInt(), wavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomInt(), wavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
        // invalid function wavesBalance
        [data.STDLIB_VERSION_4, random.getRandomAddress(), invalidWavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), invalidWavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), invalidWavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
    ])('check ride v%i wavesBalance function compile', (version, byteVector, func, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress(), wavesBalance, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, random.getRandomAlias(), wavesBalance, data.POSITIVE_TEST],
        // invalid arg by wavesBalance
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), wavesBalance, data.NEGATIVE_TEST],
        // invalid function by wavesBalance
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), invalidWavesBalance, data.NEGATIVE_TEST],

        // wavesBalance argument before function
        [data.STDLIB_VERSION_3, random.getRandomAddress(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, random.getRandomAlias(), wavesBalanceArgBeforeFunc, data.POSITIVE_TEST],
        // invalid arg by wavesBalance
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), wavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
        // invalid function wavesBalance
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), invalidWavesBalanceArgBeforeFunc, data.NEGATIVE_TEST],
    ])('check ride v%i wavesBalance function compile', (version, byteVector, func, testType) => {
        precondition.setData("Int");
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });
})
