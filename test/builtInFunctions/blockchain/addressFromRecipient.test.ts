import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {checkCompileResult} from "../testResult";

describe('addressFromRecipient',  () => {

    const addressFromRecipient = `addressFromRecipient(addressOrAlias)`;
    const addressFromRecipientArgBeforeFunc = `addressOrAlias.addressFromRecipient()`;
    const invalidFunc = `addressFromRecipient(addressOrAlias)`;

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAddress(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, random.getRandomAlias(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), addressFromRecipient, random.getRandomAddress(), data.POSITIVE_TEST],
        //invalid address
        [data.STDLIB_VERSION_3, random.getRandomInt(), addressFromRecipient, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), addressFromRecipient, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomDigestAlgorithmType(), addressFromRecipient, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), addressFromRecipient, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // address from recipient argument before function
        [data.STDLIB_VERSION_3, random.getRandomAddress(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAddress(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAddress(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, random.getRandomAlias(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomAlias(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        //invalid address
        [data.STDLIB_VERSION_3, random.getRandomInt(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), addressFromRecipientArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomDigestAlgorithmType(), addressFromRecipientArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), addressFromRecipientArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],

        //invalid func
        [data.STDLIB_VERSION_3, random.getRandomInt(), invalidFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), invalidFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomDigestAlgorithmType(), invalidFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomIssue(), invalidFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i addressFromRecipient function compiles or failed', (version, addressOrAlias, func, address, testType) => {
        const contract = generateContract(version, func, addressOrAlias, address);
        checkCompileResult(contract, testType);
    });

    const generateContract = (libVersion, func, addressOrAlias, address) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE EXPRESSION #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        let addressOrAlias = ${addressOrAlias};
        match (tx) {
            case t: TransferTransaction => ${func} == ${address}
            case _ => false
        }`;
    };
});