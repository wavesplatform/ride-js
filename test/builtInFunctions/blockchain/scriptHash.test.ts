import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('scriptHash',  () => {

    const defaultScriptHashFunction = `scriptHash(callerTestData)`;
    const incorrectFunction = `scriptHash()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias()],
    ])('positive: scriptHash script is as expected',
        (version, scriptResult, addressOrAlias) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAlias()],
    ])(`negative: Can't find a function scriptHash`, (version, scriptResult, addressOrAlias) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error).toContain("Can't find a function 'scriptHash'");
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias()],
    ])('negative: incorrect function args scriptHash',
        (version, scriptResult, addressOrAlias) => {
            const contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias, incorrectFunction);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Function 'scriptHash' requires 1 arguments, but 0 are provided`);
    });
});
