import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('wavesBalance',  () => {

    const defaultScriptHashFunction = `wavesBalance(testData)`;
    const incorrectFunction = `wavesBalance()`

    let precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'BalanceDetails');

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.getRandomAlias()],
    ])('positive: wavesBalance gets all types of WAVES balances. for v%i', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_3, data.getRandomAlias()],
    ])('positive: wavesBalance gets all types of WAVES balances. for v%i', (version, byteVector) => {
        precondition.setData("Int");
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
    ])('negative: invalid arg by wavesBalance for v%i', (version, invalidData) => {
        precondition.setData("Int");
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Non-matching types: expected: Address|Alias`);
    });

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomIssuesArray()],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('negative: invalid arg by wavesBalance for v%i', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Non-matching types: expected: Address|Alias`);
    });
})
