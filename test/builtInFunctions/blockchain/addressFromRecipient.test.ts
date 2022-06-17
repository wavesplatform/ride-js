import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {checkCompileResult} from "../testResult";

describe('addressFromRecipient',  () => {

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress(), random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomAddress(), random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, random.getRandomAlias(), random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), random.getRandomAddress(), data.positiveTestType],

        //invalid address
        [data.STDLIB_VERSION_3, random.getRandomInt(), random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray(), random.getRandomAddress(), data.negativeTestType],
    ])('check ride v%i addressFromRecipient function compiles or failed', (version, addressOrAlias, address, testType) => {
        const contract = generateContract(version, addressOrAlias, address);
        checkCompileResult(contract, testType);
    });

    const generateContract = (libVersion, addressOrAlias, address) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE EXPRESSION #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        match (tx) {
            case t: TransferTransaction => addressFromRecipient(${addressOrAlias}) == ${address}
            case _ => false
        }`;
    };
});