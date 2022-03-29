import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('invoke',  () => {

    const precondition = new GenerateContractForBuiltInFunctions('invoke');

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), random.getRandomInt()],
    ])('positive: invoke func compiles for ride v%i', (version, byteVector, payment) => {
        const contract = precondition.generateContractForDAppInvocation(version, byteVector, payment);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), random.getRandomInt()],
    ])(`negative: can't find a function 'invoke' for ride v%i`, (version, byteVector, payment) => {
        const contract = precondition.generateContractForDAppInvocation(version, byteVector, payment);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function 'invoke'(Address, String, List[Int], List[AttachedPayment])`);
    });
});