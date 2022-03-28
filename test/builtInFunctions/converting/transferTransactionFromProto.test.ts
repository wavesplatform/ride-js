import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('transferTransactionFromProto',  () => {

    const defaultTransferTransactionFromProtoFunction = `transferTransactionFromProto(callerTestData)`;
    const incorrectFunction = `transferTransactionFromProto()`

    const precondition =
        new GenerateContractForBuiltInFunctions
        (defaultTransferTransactionFromProtoFunction, incorrectFunction, 'TransferTransaction');

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: gets the transfer transaction data.', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });


    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
    ])(`negative: Can't find a function for ride v%i`, (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function 'transferTransactionFromProto'(ByteVector)`);
    });

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('negative: invalid arg by transferTransactionFromProto for ride v%i', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Non-matching types: expected: ByteVector`);
    });

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('negative: invalid function for ride v%i', (version, testData) => {
        let contract = precondition.generateOnlyMatcherContract(version, testData, incorrectFunction);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'transferTransactionFromProto' requires 1 arguments, but 0 are provided`);
    });
})
