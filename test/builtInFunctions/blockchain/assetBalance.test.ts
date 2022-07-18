import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('assetBalance', () => {

    const address = random.getRandomAddress();
    const alias = random.getRandomAlias();
    const byteVector = random.getRandomByteVector();

    const assetBalanceAtAddress = `assetBalance(${address}, ${byteVector})`;
    const assetBalanceAtAddressArgBeforeFunc = `${address}.assetBalance(${byteVector})`;
    const invalidFuncWithAddress = `${address}.assetBalance()`;

    const assetBalanceAtAlias = `assetBalance(${alias}, ${byteVector})`;
    const assetBalanceAtAliasArgBeforeFunc = `${alias}.assetBalance(${byteVector})`;
    const invalidFuncWithAsset = `${alias}.assetBalance()`;
    const invalidFunc = `assetBalance()`;

    let precondition;

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, assetBalanceAtAddress, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, assetBalanceAtAddress, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, assetBalanceAtAddress, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, assetBalanceAtAddress, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, assetBalanceAtAlias, alias, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, assetBalanceAtAlias, alias, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, assetBalanceAtAlias, alias, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, assetBalanceAtAlias, alias, data.POSITIVE_TEST],
        // arg before function
        [data.STDLIB_VERSION_3, data.RideV3Result, assetBalanceAtAddressArgBeforeFunc, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, assetBalanceAtAddressArgBeforeFunc, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, assetBalanceAtAddressArgBeforeFunc, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, assetBalanceAtAddressArgBeforeFunc, address, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, assetBalanceAtAliasArgBeforeFunc, alias, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, assetBalanceAtAliasArgBeforeFunc, alias, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, assetBalanceAtAliasArgBeforeFunc, alias, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, assetBalanceAtAliasArgBeforeFunc, alias, data.POSITIVE_TEST],
    ])('positive: Checking the address in a transfer transaction',
        (version, scriptResult, func, addressOrAlias, testType) => {
            precondition = new GenerateContractForBuiltInFunctions(func);
            const contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias, func);
            checkCompileResult(contract, testType);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, address, invalidFuncWithAddress, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, address, invalidFuncWithAddress, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, address, invalidFuncWithAddress, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, address, invalidFuncWithAddress, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, alias, invalidFuncWithAsset, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, alias, invalidFuncWithAsset, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, alias, invalidFuncWithAsset, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, alias, invalidFuncWithAsset, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, data.RideV3Result, alias, invalidFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, alias, invalidFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, alias, invalidFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, data.GreaterV3ResultIntegerEntry, alias, invalidFunc, data.NEGATIVE_TEST],
    ])('negative: incorrect function args assetBalance',
        (version, scriptResult, addressOrAlias, func, testType) => {
            const contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias, func);
            checkCompileResult(contract, testType);
        });
});