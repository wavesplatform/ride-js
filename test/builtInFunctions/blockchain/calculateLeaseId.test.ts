import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {checkCompileResult} from "../testResult";

describe('calculateLeaseId',  () => {

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), data.positiveTestType],
        // calculateLeaseId function is missing in versions
        [data.STDLIB_VERSION_3, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, random.getRandomIssuesArray(), data.negativeTestType],
        // invalid address in calculateAssetId
        [data.STDLIB_VERSION_5, random.getRandomStringArray(), data.negativeTestType],
    ])(`check ride v%i calculateLeaseId function compile`, (version, byteVector, testType) => {
        const contract = generateContract(version, byteVector);
        checkCompileResult(contract, testType);
    });

    const generateContract = (libVersion, addressOrAlias) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
          
        @Callable(i)
        func foo() = {
            let lease = Lease(${addressOrAlias},100000000)
            let id = calculateLeaseId(lease)
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