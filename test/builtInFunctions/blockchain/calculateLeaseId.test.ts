import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('calculateLeaseId',  () => {

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.getRandomAlias()],
    ])(`positive: calculate lease id for ride v%i`, (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomIssuesArray()],
        [data.STDLIB_VERSION_4, data.getRandomIssuesArray()],
    ])('negative: calculateLeaseId function is missing in version v%i', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain("Can't find a function 'calculateLeaseId'");
    });

    test.each([
        [data.STDLIB_VERSION_5, ''],
    ])('negative: invalid address in calculateAssetId', (version, byteVector) => {
        let contract = generateContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    const generateContract = (libVersion, addressOrAlias) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
          
        @Callable(i)
        func foo() = {
          let lease = Lease(${addressOrAlias},100000000)
          let id = calculateLeaseId(lease)
          (
            [
              lease,
              BinaryEntry("lease", id)
            ],
            unit
          )
        }`;
    };
});