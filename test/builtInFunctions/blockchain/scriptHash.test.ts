import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('scriptHash', () => {

    const scriptHashFunction = `scriptHash(callerTestData)`;
    const scriptHashInvalidFunction = `scriptHash()`;
    const scriptHashArgBeforeFunc = `callerTestData.scriptHash()`;
    const invalidScriptHashArgBeforeFunc = `callerTestData.scriptHash(${random.getRandomByteVector()})`;

    const precondition = new GenerateContractForBuiltInFunctions(scriptHashFunction);
    precondition.setData("ByteVector");

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashFunction, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashFunction, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashFunction, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashFunction, data.POSITIVE_TEST],
        // Can't find a function scriptHash
        [data.STDLIB_VERSION_3, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashFunction, data.NEGATIVE_TEST],
        // incorrect args scriptHash
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomString(), scriptHashFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), scriptHashFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomString(), scriptHashFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), scriptHashFunction, data.NEGATIVE_TEST],
        // incorrect function
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashInvalidFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashInvalidFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashInvalidFunction, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashInvalidFunction, data.NEGATIVE_TEST],

        // argument before function
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashArgBeforeFunc, data.POSITIVE_TEST],
        // Can't find a function scriptHash
        [data.STDLIB_VERSION_3, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), scriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), scriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        // incorrect args scriptHash
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomString(), scriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), scriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomString(), scriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), scriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        // incorrect function scriptHash
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), invalidScriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), invalidScriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), invalidScriptHashArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultBinaryEntry, random.getRandomAddress(), invalidScriptHashArgBeforeFunc, data.NEGATIVE_TEST],
    ])('check ride v%i scriptHash function compile', (version, scriptResult, addressOrAlias, func, testType) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias, func);
        checkCompileResult(contract, testType);
    });
});
