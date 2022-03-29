import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('size',  () => {

    const defaultSizeFunc = `size(callerTestData)`;
    const invalidSizeFunc = `size()`;

    const precondition = new GenerateContractForBuiltInFunctions(defaultSizeFunc);

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, random.getRandomByteVector()],
    ])('positive: size func compiles. v%i',
        (version, caseForVersions, byteVector) => {
            let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, byteVector);
            const compiled = compiler.compile(contract);
            expect(compiled.error).toBeUndefined();
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress()],
    ])('negative: invalid data Address', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'size'(Address)`);
    });

    test.each([
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, random.getRandomAlias()],
    ])('negative: invalid data Alias', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'size'(Alias)`);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, random.getRandomIssuesArray()],
    ])('negative: invalid data Issue', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'size'(Issue)`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, random.getRandomInt()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, random.getRandomInt()],
    ])('negative: invalid function for v%i', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, invalidData, invalidSizeFunc);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'size'()`);
    });
});