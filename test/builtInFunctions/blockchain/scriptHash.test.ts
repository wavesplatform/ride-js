import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('scriptHash',  () => {

    const defaultScriptHashFunction = `scriptHash(callerAddressOrAlias)`;
    const incorrectFunction = `scriptHash()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.getRandomAlias()],
    ])('positive: scriptHash script is as expected',
        (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.GreaterV3ResultBinaryEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.getRandomAlias()],
    ])(`negative: Can't find a function scriptHash`, (version, scriptResult, addressOrAlias) => {
            let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error).toContain("Can't find a function 'scriptHash'");
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.getRandomAlias()],
    ])('negative: incorrect function args scriptHash',
        (version, scriptResult, addressOrAlias) => {
            let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias, incorrectFunction);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Function 'scriptHash' requires 1 arguments, but 0 are provided`);
    });
});
