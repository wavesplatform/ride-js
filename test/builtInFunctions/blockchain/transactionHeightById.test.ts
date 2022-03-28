import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('transactionHeightById',  () => {

    const defaultTransactionHeightByIdFunction = `transactionHeightById(callerTestData)`;
    const incorrectFunction = `transactionHeightById()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultTransactionHeightByIdFunction, incorrectFunction, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: get the height of the transaction block.', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, `"string"`],
    ])('negative: invalid arg by transactionHeightById', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: ByteVector`);
    });
})