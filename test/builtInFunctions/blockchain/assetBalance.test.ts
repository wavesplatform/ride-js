import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('assetBalance',  () => {

    let defaultFunction;
    let precondition;

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress(), data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAddress(), data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAddress(), data.getRandomByteVector()],
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias(), data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAlias(), data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAlias(), data.getRandomByteVector()],
    ])('positive: Checking the address in a transfer transaction',
        (version, scriptResult, addressOrAlias, byteVector) => {

        defaultFunction = `assetBalance(${addressOrAlias}, ${byteVector})`;
        precondition = new GenerateContractForBuiltInFunctions(defaultFunction);

        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias, defaultFunction);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAlias()],
        ])('negative: incorrect function args assetBalance',
        (version, scriptResult, addressOrAlias) => {

            const incorrectFunction = `assetBalance(${addressOrAlias})`

            let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias, incorrectFunction);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Function 'assetBalance' requires 2 arguments, but 1 are provided in`);
        });
});