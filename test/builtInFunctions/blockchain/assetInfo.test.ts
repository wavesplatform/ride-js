import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('assetInfo', () => {

    const assetInfo = `assetInfo(callerTestData)`;

    const assetInfoArgBeforeFunc = `callerTestData.assetInfo()`;
    const invalidAssetInfo = `assetInfo()`;
    const invalidAssetInfoArg = `${random.getRandomInt()}.assetInfo()`;

    const precondition =
        new GenerateContractForBuiltInFunctions
        (assetInfo, invalidAssetInfo, 'Asset');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfo],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfo],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfo],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfo],
        // invalid data
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST, assetInfo],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST, assetInfo],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST, assetInfo],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.NEGATIVE_TEST, assetInfo],
        // invalid function
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfo],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfo],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfo],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfo],

        // argument before function
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfoArgBeforeFunc],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfoArgBeforeFunc],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfoArgBeforeFunc],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.POSITIVE_TEST, assetInfoArgBeforeFunc],
        //invalid data
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST, assetInfoArgBeforeFunc],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST, assetInfoArgBeforeFunc],
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.NEGATIVE_TEST, assetInfoArgBeforeFunc],
        [data.STDLIB_VERSION_6, random.getRandomInt(), data.NEGATIVE_TEST, assetInfoArgBeforeFunc],
        // invalid function
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfoArg],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfoArg],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfoArg],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.NEGATIVE_TEST, invalidAssetInfoArg],
    ])('check ride v%i assetInfo function compile', (version, byteVector, testType, func) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });
});