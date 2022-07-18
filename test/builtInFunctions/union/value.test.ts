import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('value functions',  () => {

    const value = `value(callerTestData)`;
    const invalidValue = `value()`;
    const valueArgBeforeFunc = `callerTestData.value()`;
    const invalidValueArgBeforeFunc = `callerTestData.value(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(value);

    test.each([
        // value
        [data.STDLIB_VERSION_3, value, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, value, random.getRandomByteVector(), data.POSITIVE_TEST, "ByteVector"],
        [data.STDLIB_VERSION_5, value, random.getRandomString(), data.POSITIVE_TEST, "String"],
        [data.STDLIB_VERSION_6, value, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        // invalid data value
        [data.STDLIB_VERSION_3, value, random.getRandomAlias(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, value, random.getRandomUnion(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_5, value, random.getRandomAddress(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_6, value, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST, "Int"],
        // invalid function value
        [data.STDLIB_VERSION_3, invalidValue, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, invalidValue, random.getRandomByteVector(), data.NEGATIVE_TEST, "ByteVector"],
        [data.STDLIB_VERSION_5, invalidValue, random.getRandomString(), data.NEGATIVE_TEST, "String"],
        [data.STDLIB_VERSION_6, invalidValue, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],

        // value argument before function
        [data.STDLIB_VERSION_3, valueArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, valueArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST, "ByteVector"],
        [data.STDLIB_VERSION_5, valueArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST, "String"],
        [data.STDLIB_VERSION_6, valueArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        // invalid data value argument before function
        [data.STDLIB_VERSION_3, valueArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, valueArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_5, valueArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_6, valueArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST, "Int"],
        // invalid function value argument before function
        [data.STDLIB_VERSION_3, invalidValueArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_4, invalidValueArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST, "ByteVector"],
        [data.STDLIB_VERSION_5, invalidValueArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST, "String"],
        [data.STDLIB_VERSION_6, invalidValueArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType, dataType) => {
            precondition.setData(dataType);
            const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
            checkCompileResult(contract, testType);
        });
});
