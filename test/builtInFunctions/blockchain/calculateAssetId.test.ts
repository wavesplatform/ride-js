import * as data from "../../testData/data";
import * as random from "../../testData/random";

const compiler = require('../../../src');

describe('calculateAssetId',  () => {

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomIssuesArray()],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray()],
    ])(`positive: calculate asset id for ride v%i`, (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomIssuesArray()],
    ])('negative: calculateAssetId function is missing in version v%i', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain("Can't find a function 'calculateAssetId'");
    });

    test.each([
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, random.getRandomAddress()],
    ])('negative: invalid issue in calculateAssetId', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: Issue`);
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