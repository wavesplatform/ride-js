import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('blockInfoByHeight',  () => {

    const blockInfoByHeight = `blockInfoByHeight(callerTestData)`;

    const blockInfoByHeightArgBeforeFunc = `callerTestData.blockInfoByHeight()`;
    const invalidBlockInfoByHeight = `blockInfoByHeight()`;
    const invalidBlockInfoByHeightArg = `${random.getRandomDigestAlgorithmType()}.blockInfoByHeight()`;

    const precondition =
        new GenerateContractForBuiltInFunctions
        (blockInfoByHeight, invalidBlockInfoByHeight, 'BlockInfo');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeight],
        [data.STDLIB_VERSION_4, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeight],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeight],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeight],
        // invalid data
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST, blockInfoByHeight],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST, blockInfoByHeight],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.NEGATIVE_TEST, blockInfoByHeight],
        [data.STDLIB_VERSION_6, random.getRandomString(), data.NEGATIVE_TEST, blockInfoByHeight],
        // invalid function
        [data.STDLIB_VERSION_3, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeight],
        [data.STDLIB_VERSION_4, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeight],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeight],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeight],

        // argument before function
        [data.STDLIB_VERSION_3, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeightArgBeforeFunc],
        [data.STDLIB_VERSION_4, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeightArgBeforeFunc],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeightArgBeforeFunc],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.POSITIVE_TEST, blockInfoByHeightArgBeforeFunc],
        //invalid data
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST, blockInfoByHeightArgBeforeFunc],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST, blockInfoByHeightArgBeforeFunc],
        [data.STDLIB_VERSION_5, random.getRandomAddress(), data.NEGATIVE_TEST, blockInfoByHeightArgBeforeFunc],
        [data.STDLIB_VERSION_6, random.getRandomUnion(), data.NEGATIVE_TEST, blockInfoByHeightArgBeforeFunc],
        // invalid function
        [data.STDLIB_VERSION_3, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeightArg],
        [data.STDLIB_VERSION_4, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeightArg],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeightArg],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.NEGATIVE_TEST, invalidBlockInfoByHeightArg],
    ])('check ride v%i blockInfoByHeight function compile', (version, byteVector, testType, func) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });
});