import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('transferTransactionFromProto',  () => {

    const transferTransactionFromProto = `transferTransactionFromProto(callerTestData)`;
    const incorrectFunction = `transferTransactionFromProto()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (transferTransactionFromProto, incorrectFunction, 'TransferTransaction');

    test.each([
        [data.STDLIB_VERSION_4, transferTransactionFromProto, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, transferTransactionFromProto, random.getRandomByteVector(), data.positiveTestType],
        // Can't find a function for v3
        [data.STDLIB_VERSION_3, transferTransactionFromProto, random.getRandomByteVector(), data.negativeTestType],
        // invalid arg by transferTransactionFromProto
        [data.STDLIB_VERSION_4, transferTransactionFromProto, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, transferTransactionFromProto, random.getRandomInt(), data.negativeTestType],
        // invalid function
        [data.STDLIB_VERSION_4, incorrectFunction, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, incorrectFunction, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });
})
