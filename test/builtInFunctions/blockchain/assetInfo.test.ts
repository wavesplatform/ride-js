import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('assetInfo',  () => {

    const defaultScriptHashFunction = `assetInfo(callerTestData)`;
    const incorrectFunction = `assetInfo()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'Asset');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('positive: Checking asset info', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, 1],
    ])('negative: invalid asset in assetInfo', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: ByteVector`);
    });
});