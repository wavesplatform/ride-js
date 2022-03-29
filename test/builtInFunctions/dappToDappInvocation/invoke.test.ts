import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('invoke',  () => {

    const precondition = new GenerateContractForBuiltInFunctions('invoke');

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomByteVector(), data.getRandomInt()],
    ])('positive: invoke func compiles for ride v%i', (version, byteVector, payment) => {
        const contract = precondition.generateContractForDAppInvocation(version, byteVector, payment);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector(), data.getRandomInt()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector(), data.getRandomInt()],
    ])(`negative: can't find a function 'invoke' for ride v%i`, (version, byteVector, payment) => {
        const contract = precondition.generateContractForDAppInvocation(version, byteVector, payment);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function 'invoke'(Address, String, List[Int], List[AttachedPayment])`);
    });
});