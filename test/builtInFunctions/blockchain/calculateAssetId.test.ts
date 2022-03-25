import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('calculateAssetId',  () => {

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomIssuesArray()],
        [data.STDLIB_VERSION_5, data.getRandomIssuesArray()],
    ])(`positive: calculate asset id for ride v%i`, (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomIssuesArray()],
    ])('negative: calculateAssetId function is missing in version v%i', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain("Can't find a function 'calculateAssetId");
    });

    test.each([
        [data.STDLIB_VERSION_4, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.getRandomAddress()],
    ])('negative: invalid issue in calculateAssetId', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: Issue, actual:`);
    });

    const generateContract = (libVersion, issue) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(inv)
        func issueAndId() = {
          let issue = ${issue}
          let id = calculateAssetId(issue)
            (
                [
                    issue,
                    ScriptTransfer(inv.caller, issue.quantity, id),
                    BinaryEntry("id", id)
                ]
            )
        }`;
    };
});