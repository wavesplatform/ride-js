import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('transactionHeightById', () => {

    const transactionHeightById = `transactionHeightById(callerTestData)`;
    const invalidTransactionHeightById = `transactionHeightById()`;
    const transactionHeightByIdArgBeforeFunc = `callerTestData.transactionHeightById()`;
    const invalidTransactionHeightByIdArgBeforeFunc = `callerTestData.transactionHeightById(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(transactionHeightById);
    precondition.setData("Int");

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), transactionHeightById, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), transactionHeightById, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), transactionHeightById, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), transactionHeightById, data.POSITIVE_TEST],
        // invalid arg by transactionHeightById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), transactionHeightById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), transactionHeightById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomString(), transactionHeightById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomString(), transactionHeightById, data.NEGATIVE_TEST],
        // invalid function by transactionHeightById
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), invalidTransactionHeightById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), invalidTransactionHeightById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), invalidTransactionHeightById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), invalidTransactionHeightById, data.NEGATIVE_TEST],

        // transactionHeightById argument before function
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), transactionHeightByIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), transactionHeightByIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), transactionHeightByIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), transactionHeightByIdArgBeforeFunc, data.POSITIVE_TEST],
        // invalid arg by transactionHeightById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), transactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), transactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomString(), transactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomString(), transactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        // invalid function by transactionHeightById
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), invalidTransactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), invalidTransactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), invalidTransactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), invalidTransactionHeightByIdArgBeforeFunc, data.NEGATIVE_TEST],
    ])('check ride v%i transactionHeightById function compile', (version, byteVector, func, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });
})