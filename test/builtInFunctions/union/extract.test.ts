import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('extract functions',  () => {

    const extract = `extract(callerTestData)`;
    const invalidExtract = `extract()`;

    const precondition = new GenerateContractForBuiltInFunctions(extract);

    test.each([
        // extract
        [data.STDLIB_VERSION_3, extract, random.getRandomInt(), data.positiveTestType, "Int"],
        //Can't find a function 'extract'
        [data.STDLIB_VERSION_4, extract, random.getRandomInt(), data.negativeTestType, "Int"],
        [data.STDLIB_VERSION_5, extract, random.getRandomStringArray(), data.negativeTestType, "String"],
        // invalid data extract
        [data.STDLIB_VERSION_3, extract, random.getRandomAlias(), data.negativeTestType, "Int"],
        // invalid function extract
        [data.STDLIB_VERSION_3, invalidExtract, random.getRandomInt(), data.negativeTestType, "Int"],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType, dataType) => {
        precondition.setData(dataType);
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
