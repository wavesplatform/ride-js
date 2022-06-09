import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('valueOrElse functions',  () => {

    const valueOrElse = `valueOrElse(foo, bar)`;
    const invalidValueOrElse = `valueOrElse(bar)`;

    const precondition = new GenerateContractForBuiltInFunctions(valueOrElse);

    test.each([
        // valueOrElse
        [data.STDLIB_VERSION_3, valueOrElse, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, valueOrElse, random.getRandomUnionArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, valueOrElse, random.getRandomAddress(), data.positiveTestType],
        // invalid data valueOrElse
        [data.STDLIB_VERSION_3, valueOrElse, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_4, valueOrElse, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, valueOrElse, "null", data.negativeTestType],
        // invalid function valueOrElse
        [data.STDLIB_VERSION_3, invalidValueOrElse, random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidValueOrElse, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidValueOrElse, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, testType) => {
        const contract = precondition.generateContract(version, randomData, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
