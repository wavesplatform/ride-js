import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('transferTransactionById',  () => {

    const defaultScriptHashFunction = `transferTransactionById(callerTestData)`;
    const incorrectFunction = `transferTransactionById()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultScriptHashFunction, incorrectFunction, 'TransferTransaction');

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: gets the transfer transaction data.', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, `"string"`],
    ])('negative: invalid arg by transferTransactionById', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Non-matching types: expected: ByteVector`);
    });
})
