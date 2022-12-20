import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {checkCompileResult} from "../testResult";

describe('calculateAssetId',  () => {

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomIssuesArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray(), data.positiveTestType],
        // negative: calculateAssetId function is missing
        [data.STDLIB_VERSION_3, random.getRandomIssuesArray(), data.negativeTestType],
        // negative: invalid issue in calculateAssetId
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), data.negativeTestType],
    ])(`check ride v%i calculateAssetId function compile`, (version, byteVector, testType) => {
        const contract = generateContract(version, byteVector);
        checkCompileResult(contract, testType);
    });

    const generateContract = (libVersion, issue) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(inv)
        func issueAndId() = {
          let issue = ${issue}
          let id = calculateAssetId(issue)
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