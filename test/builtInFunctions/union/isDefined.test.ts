import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('isDefined functions',  () => {

    const isDefined = `isDefined(callerTestData)`;
    const invalidIsDefined = `isDefined()`;

    const precondition = new GenerateContractForBuiltInFunctions(isDefined, null, "Boolean");

    test.each([
        // isDefined
        [data.STDLIB_VERSION_3, isDefined, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, isDefined, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, isDefined, random.getRandomByteVector(), data.positiveTestType],
        // invalid function isDefined
        [data.STDLIB_VERSION_3, invalidIsDefined, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidIsDefined, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidIsDefined, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
    (version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
