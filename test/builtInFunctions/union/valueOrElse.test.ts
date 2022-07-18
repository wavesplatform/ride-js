import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('valueOrElse functions',  () => {

    const valueOrElse = `valueOrElse(foo, bar)`;
    const invalidValueOrElse = `valueOrElse(bar)`;
    const valueOrElseArgBeforeFunc = `valueOrElse(foo, bar)`;
    const invalidValueOrElseArgBeforeFunc = `valueOrElse(bar)`;

    const precondition = new GenerateContractForBuiltInFunctions(valueOrElse);

    test.each([
        // valueOrElse
        [data.STDLIB_VERSION_4, valueOrElse, random.getRandomUnion(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, valueOrElse, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, valueOrElse, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, valueOrElse, random.getRandomDigestAlgorithmType(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, valueOrElse, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, valueOrElse, random.getRandomIssue(), data.POSITIVE_TEST],
        // invalid data valueOrElse
        [data.STDLIB_VERSION_4, valueOrElse, undefined, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, valueOrElse, null, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, valueOrElse, "null", data.NEGATIVE_TEST],
        // invalid function valueOrElse
        [data.STDLIB_VERSION_4, invalidValueOrElse, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidValueOrElse, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidValueOrElse, random.getRandomUnion(), data.NEGATIVE_TEST],
        // Can't find a function 'valueOrElse'
        [data.STDLIB_VERSION_3, valueOrElse, random.getRandomUnion(), data.NEGATIVE_TEST],

        // valueOrElse argument before function
        [data.STDLIB_VERSION_4, valueOrElseArgBeforeFunc, random.getRandomUnion(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, valueOrElseArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, valueOrElseArgBeforeFunc, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, valueOrElseArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, valueOrElseArgBeforeFunc, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, valueOrElseArgBeforeFunc, random.getRandomIssue(), data.POSITIVE_TEST],
        // invalid data valueOrElse
        [data.STDLIB_VERSION_4, valueOrElseArgBeforeFunc, undefined, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, valueOrElseArgBeforeFunc, null, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, valueOrElseArgBeforeFunc, "null", data.NEGATIVE_TEST],
        // invalid function valueOrElse
        [data.STDLIB_VERSION_4, invalidValueOrElseArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidValueOrElseArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidValueOrElseArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // Can't find a function 'valueOrElse'
        [data.STDLIB_VERSION_3, valueOrElseArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateContract(version, randomData, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
