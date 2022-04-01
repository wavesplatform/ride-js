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
        [data.STDLIB_VERSION_3, valueOrErrorMessage, random.getRandomInt(), data.positiveTestType, "Int"],
        [data.STDLIB_VERSION_4, valueOrErrorMessage, random.getRandomByteVector(), data.positiveTestType, "ByteVector"],
        [data.STDLIB_VERSION_5, valueOrErrorMessage, random.getRandomStringArray(), data.positiveTestType, "String"],
        // invalid data valueOrErrorMessage
        [data.STDLIB_VERSION_3, valueOrErrorMessage, random.getRandomAlias(), data.negativeTestType, "Int"],
        [data.STDLIB_VERSION_4, valueOrErrorMessage, random.getRandomUnionArray(), data.negativeTestType, "Boolean"],
        [data.STDLIB_VERSION_5, valueOrErrorMessage, random.getRandomAddress(), data.negativeTestType, "ByteVector"],
        // invalid function valueOrErrorMessage
        [data.STDLIB_VERSION_3, invalidValueOrErrorMessage, random.getRandomInt(), data.negativeTestType, "Int"],
        [data.STDLIB_VERSION_4, invalidValueOrErrorMessage, random.getRandomByteVector(), data.negativeTestType, "ByteVector"],
        [data.STDLIB_VERSION_5, invalidValueOrErrorMessage, random.getRandomStringArray(), data.negativeTestType, "String"],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType, dataType) => {
            precondition.setData(dataType);
            const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
            checkCompileResult(contract, testType);
        });
});
