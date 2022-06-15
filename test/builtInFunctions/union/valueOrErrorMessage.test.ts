import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('valueOrErrorMessage functions',  () => {

    const valueOrErrorMessage = `valueOrErrorMessage(callerTestData, "error message")`;
    const invalidValueOrErrorMessage = `valueOrErrorMessage()`;

    const precondition = new GenerateContractForBuiltInFunctions(valueOrErrorMessage);

    test.each([
        // valueOrErrorMessage
        [data.STDLIB_VERSION_3, valueOrErrorMessage, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, valueOrErrorMessage, random.getRandomByteVector(), data.POSITIVE_TEST, "ByteVector"],
        [data.STDLIB_VERSION_5, valueOrErrorMessage, random.getRandomString(), data.POSITIVE_TEST, "String"],
        // invalid data valueOrErrorMessage
        [data.STDLIB_VERSION_3, valueOrErrorMessage, random.getRandomAlias(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, valueOrErrorMessage, random.getRandomUnion(), data.NEGATIVE_TEST, "Boolean"],
        [data.STDLIB_VERSION_5, valueOrErrorMessage, random.getRandomAddress(), data.NEGATIVE_TEST, "ByteVector"],
        // invalid function valueOrErrorMessage
        [data.STDLIB_VERSION_3, invalidValueOrErrorMessage, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, invalidValueOrErrorMessage, random.getRandomByteVector(), data.NEGATIVE_TEST, "ByteVector"],
        [data.STDLIB_VERSION_5, invalidValueOrErrorMessage, random.getRandomString(), data.NEGATIVE_TEST, "String"],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType, dataType) => {
            precondition.setData(dataType);
            const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
            checkCompileResult(contract, testType);
        });
});
