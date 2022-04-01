import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('value functions',  () => {

    const value = `value(callerTestData)`;
    const invalidValue = `value()`;

    const precondition = new GenerateContractForBuiltInFunctions(value);

    test.each([
        // value
        [data.STDLIB_VERSION_3, value, random.getRandomInt(), data.positiveTestType, "Int"],
        [data.STDLIB_VERSION_4, value, random.getRandomByteVector(), data.positiveTestType, "ByteVector"],
        [data.STDLIB_VERSION_5, value, random.getRandomStringArray(), data.positiveTestType, "String"],
        // invalid data value
        [data.STDLIB_VERSION_3, value, random.getRandomAlias(), data.negativeTestType, "Int"],
        [data.STDLIB_VERSION_4, value, random.getRandomUnionArray(), data.negativeTestType, "Int"],
        [data.STDLIB_VERSION_5, value, random.getRandomAddress(), data.negativeTestType, "Int"],
        // invalid function value
        [data.STDLIB_VERSION_3, invalidValue, random.getRandomInt(), data.negativeTestType, "Int"],
        [data.STDLIB_VERSION_4, invalidValue, random.getRandomByteVector(), data.negativeTestType, "ByteVector"],
        [data.STDLIB_VERSION_5, invalidValue, random.getRandomStringArray(), data.negativeTestType, "String"],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType, dataType) => {
            precondition.setData(dataType);
            const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
            checkCompileResult(contract, testType);
        });
});
