import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('wavesBalance',  () => {

    const defaultScriptHashFunction = `wavesBalance(callerTestData)`;
    const incorrectFunction = `wavesBalance()`

    let precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'BalanceDetails');

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, random.getRandomAlias()],
    ])('positive: wavesBalance gets all types of WAVES balances. for v%i', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_3, random.getRandomAlias()],
    ])('positive: wavesBalance gets all types of WAVES balances. for v%i', (version, byteVector) => {
        precondition.setData("Int");
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
    ])('negative: invalid arg by wavesBalance for v%i', (version, invalidData) => {
        precondition.setData("Int");
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Non-matching types: expected: Address|Alias`);
    });

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomIssuesArray()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid arg by wavesBalance for v%i', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Non-matching types: expected: Address|Alias`);
    });
})
