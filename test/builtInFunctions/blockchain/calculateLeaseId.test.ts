import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {checkCompileResult} from "../testResult";

describe('calculateLeaseId',  () => {
    const calcLeaseId = `calculateLeaseId(lease)`;
    const invalidCalcLeaseId = `calculateLeaseId()`;

    const calcLeaseIdArgBeforeFunc = `lease.calculateLeaseId()`;
    const invalidCalcLeaseIdArgBeforeFunc = `${random.getRandomByteVector()}.calculateLeaseId(lease)`;

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomAddress(), calcLeaseId, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), calcLeaseId, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), calcLeaseId, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), calcLeaseId, data.POSITIVE_TEST],
        // invalid address in calculateAssetId
        [data.STDLIB_VERSION_5, random.getRandomString(), calcLeaseId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), calcLeaseId, data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_5, random.getRandomAlias(), invalidCalcLeaseId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), invalidCalcLeaseId, data.NEGATIVE_TEST],

        // calculateLeaseId - argument before function
        [data.STDLIB_VERSION_5, random.getRandomAddress(), calcLeaseIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), calcLeaseIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), calcLeaseIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), calcLeaseIdArgBeforeFunc, data.POSITIVE_TEST],
        // invalid address in calculateAssetId
        [data.STDLIB_VERSION_5, random.getRandomString(), calcLeaseIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), calcLeaseIdArgBeforeFunc, data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_5, random.getRandomAddress(), invalidCalcLeaseIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), invalidCalcLeaseIdArgBeforeFunc, data.NEGATIVE_TEST],

        // calculateLeaseId function is missing in versions
        [data.STDLIB_VERSION_3, random.getRandomIssue(), calcLeaseId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, random.getRandomIssue(), calcLeaseIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomIssue(), calcLeaseId, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomIssue(), calcLeaseIdArgBeforeFunc, data.NEGATIVE_TEST],
    ])(`check ride v%i calculateLeaseId function compile`, (version, byteVector, func, testType) => {
        const contract = generateContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });

    const generateContract = (libVersion, addressOrAlias, func) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
          
        @Callable(i)
        func foo() = {
            let lease = Lease(${addressOrAlias},100000000)
            let id = ${func}
            (
                [
                    lease,
                    BinaryEntry("lease", id)
                ],
                unit
            )
        }`;
    };
});