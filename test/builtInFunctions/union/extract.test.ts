import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('extract functions',  () => {

    const extract = `extract(callerTestData)`;
    const invalidExtract = `extract()`;

    const extractArgBeforeFunc = `callerTestData.extract()`;
    const invalidExtractArgBeforeFunc = `callerTestData.extract(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(extract);

    test.each([
        // extract
        [data.STDLIB_VERSION_3, extract, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        //Can't find a function 'extract'
        [data.STDLIB_VERSION_4, extract, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_5, extract, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_6, extract, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        // invalid data extract
        [data.STDLIB_VERSION_3, extract, random.getRandomAlias(), data.NEGATIVE_TEST, "Int"],
        // invalid function extract
        [data.STDLIB_VERSION_3, invalidExtract, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],

        // extract, arg before function
        [data.STDLIB_VERSION_3, extractArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST, "Int"],
        //Can't find a function 'extractArgBeforeFunc'
        [data.STDLIB_VERSION_4, extractArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_5, extractArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        [data.STDLIB_VERSION_6, extractArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
        // invalid data extractArgBeforeFunc
        [data.STDLIB_VERSION_3, extractArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST, "Int"],
        // invalid function extractArgBeforeFunc
        [data.STDLIB_VERSION_3, invalidExtractArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST, "Int"],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType, dataType) => {
        precondition.setData(dataType);
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
