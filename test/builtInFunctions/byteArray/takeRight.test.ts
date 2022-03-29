import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('takeRight',  () => {

    const defaultTakeRightFunc = `takeRight(callerTestData, 2)`;
    const invalidTakeRightFunc = `takeRight(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(defaultTakeRightFunc);

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector()],
    ])('positive: takeRight func compiles. v%i',
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
        expect(compiled.error).toContain(`Can't find a function overload 'takeRight'(Address, Int)`);
    });

    test.each([
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAlias()],
    ])('negative: invalid data Alias', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'takeRight'(Alias, Int)`);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomIssuesArray()],
    ])('negative: invalid data Issue', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher(version, caseForVersions, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'takeRight'(Issue, Int)`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomInt()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomInt()],
    ])('negative: invalid function for v%i', (version, caseForVersions, invalidData) => {
        let contract = precondition.generateContractWithoutMatcher
        (version, caseForVersions, invalidData, invalidTakeRightFunc);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'takeRight'(Int)`);
    });
});