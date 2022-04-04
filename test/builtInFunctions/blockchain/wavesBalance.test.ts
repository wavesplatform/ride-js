import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('wavesBalance',  () => {

    const wavesBalance = `wavesBalance(callerTestData)`;

    let precondition = new GenerateContractForBuiltInFunctions(wavesBalance);
    precondition.setData("BalanceDetails");

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomAlias(), data.positiveTestType],
        // invalid arg by wavesBalance
        [data.STDLIB_VERSION_4, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i wavesBalance function compile', (version, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.positiveTestType],
        [data.STDLIB_VERSION_3, random.getRandomAlias(), data.positiveTestType],
        // invalid arg by wavesBalance
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i wavesBalance function compile', (version, byteVector, testType) => {
        precondition.setData("Int");
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });
})
