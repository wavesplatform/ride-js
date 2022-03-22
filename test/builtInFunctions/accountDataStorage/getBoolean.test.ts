import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('getBoolean',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])('positive: getBoolean - get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
    ])('positive: getBoolean - get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry],
    ])('positive: getBoolean - getting a boolean from your own data', (version, scriptResult) => {
        let contract = generateContractForGetBooleanOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.invalidGetBooleanV3, data.getRandomAddress(), `'getBoolean'(Address)`],
        [data.STDLIB_VERSION_3, data.invalidGetBooleanV3, data.getRandomAlias(), `'getBoolean'(Alias)`],
        [data.STDLIB_VERSION_4, data.InvalidGetBooleanGreaterV3, data.getRandomAddress(), `'getBoolean'(Address)`],
        [data.STDLIB_VERSION_5, data.InvalidGetBooleanGreaterV3, data.getRandomAlias(), `'getBoolean'(Alias)`],
    ])("negative: Can't find a function overload 'getBoolean'(Address) or 'getBoolean'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = generateContract(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBoolean'(String)", (version, scriptResult) => {
        let contract = generateContractForGetBooleanOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBoolean'(String)`);
    });

    const generateContract = (libVersion, caseForVersions, testData, getBooleanFunction = data.defaultGetBoolean) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func bool() = {
            let callerAddressOrAlias = ${testData}
            let boolValueOrUnit = ${getBooleanFunction}
            let boolValue = match(boolValueOrUnit) {
              case b:Boolean => b
              case _ => throw("not boolean")
            }
            ${caseForVersions}
        }`;
    };

    const generateContractForGetBooleanOwnData = (libVersion, caseForVersions) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func bool() = {
            let boolValueOrUnit = getBoolean("LJKaSADfHH127gd")
            let boolValue = match(boolValueOrUnit) {
              case b:Boolean => b
              case _ => throw("not boolean")
            }
            ${caseForVersions}
        }`;
    };
});
