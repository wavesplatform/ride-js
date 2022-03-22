import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('getBinaryValue',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, data.getRandomAddress()],
    ])('positive: getBinaryValue - get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, data.getRandomAlias()],
    ])('positive: getBinaryValue - get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3Result],
    ])('positive: getBinaryValue - getting a binary from your own data', (version, scriptResult) => {
        let contract = generateContractForGetBinaryOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.invalidGetBinaryValueV3, data.getRandomAddress(), `'getBinaryValue'(Address)`],
        [data.STDLIB_VERSION_3, data.invalidGetBinaryValueV3, data.getRandomAlias(), `'getBinaryValue'(Alias)`],
        [data.STDLIB_VERSION_4, data.InvalidGetBinaryValueGreaterV3, data.getRandomAddress(), `'getBinaryValue'(Address)`],
        [data.STDLIB_VERSION_5, data.InvalidGetBinaryValueGreaterV3, data.getRandomAlias(), `'getBinaryValue'(Alias)`],
    ])("negative: Can't find a function overload 'getBinaryValue'(Address) or 'getBinaryValue'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = generateContract(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBinaryValue'(String)", (version, scriptResult) => {
        let contract = generateContractForGetBinaryOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBinaryValue'(String)`);
    });

    const generateContract = (libVersion, caseForVersions, testData, getBinaryFunction = data.defaultGetBinaryValue) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let callerAddressOrAlias = ${testData}
            let binValue = ${getBinaryFunction}
            ${caseForVersions}
        }`;
    };

    const generateContractForGetBinaryOwnData = (libVersion, caseForVersions) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func binary() = {
            let binValue = getBinaryValue("LJKaSADfHH127gd")
            ${caseForVersions}
        }`;
    };
});
