import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('scriptHash',  () => {

    const scriptHashFunction = `scriptHash(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(scriptHashFunction);
    precondition.setData("ByteVector");

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.POSITIVE_TEST],
        // Can't find a function scriptHash
        [data.STDLIB_VERSION_3, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        // incorrect function args scriptHash
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i scriptHash function compile',(version, scriptResult, addressOrAlias, testType) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
            checkCompileResult(contract, testType);
    });
});
