import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {checkCompileResult} from "../testResult";

describe('calculateAssetId', () => {
    const calculateAssetId = `calculateAssetId(issue)`;
    const invalidCalculateAssetId = `calculateAssetId()`;

    const calculateAssetIdArgBeforeFunc = `issue.calculateAssetId()`;
    const invalidCalculateAssetIdArgBeforeFunc = `issue.calculateAssetId(${random.getRandomDigestAlgorithmType()})`;


    test.each([
        [data.STDLIB_VERSION_4, random.getRandomIssue(), calculateAssetId, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomIssue(), calculateAssetId, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), calculateAssetId, data.POSITIVE_TEST],
        // negative: invalid issue in calculateAssetId
        [data.STDLIB_VERSION_4, random.getRandomAlias(), calculateAssetId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), calculateAssetId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), calculateAssetId, data.NEGATIVE_TEST],
        // negative: invalid func
        [data.STDLIB_VERSION_4, random.getRandomIssue(), invalidCalculateAssetId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomIssue(), invalidCalculateAssetId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), invalidCalculateAssetId, data.NEGATIVE_TEST],

        // arg before func calculateAssetId()
        [data.STDLIB_VERSION_4, random.getRandomIssue(), calculateAssetIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomIssue(), calculateAssetIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), calculateAssetIdArgBeforeFunc, data.POSITIVE_TEST],
        // negative: invalid issue in calculateAssetIdArgBeforeFunc
        [data.STDLIB_VERSION_4, random.getRandomAlias(), calculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), calculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), calculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
        // negative: invalid func
        [data.STDLIB_VERSION_4, random.getRandomIssue(), invalidCalculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomIssue(), invalidCalculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), invalidCalculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
        // negative: calculateAssetIdArgBeforeFunc function is missing
        [data.STDLIB_VERSION_3, random.getRandomIssue(), calculateAssetId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, random.getRandomIssue(), calculateAssetIdArgBeforeFunc, data.NEGATIVE_TEST],
    ])(`check ride v%i calculateAssetId function compile`, (version, data, func, testType) => {
        const contract = generateContract(version, data, func);
        checkCompileResult(contract, testType);
    });

    const generateContract = (libVersion, data, func) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(inv)
        func issueAndId() = {
          let issue = ${data}
          let id = ${func}
            (
                [
                    issue,
                    ScriptTransfer(inv.caller, issue.quantity, id),
                    BinaryEntry("id", id)
                ]
            )
        }`;
    };
});