import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('getBooleanValue',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])('positive: getBooleanValue - get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
    ])('positive: getBooleanValue - get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry],
    ])('positive: getBooleanValue - getting a boolean from your own data', (version, scriptResult) => {
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
        [data.STDLIB_VERSION_3, data.invalidGetBooleanValueV3, data.getRandomAddress(), `'getBooleanValue'(Address)`],
        [data.STDLIB_VERSION_3, data.invalidGetBooleanValueV3, data.getRandomAlias(), `'getBooleanValue'(Alias)`],
        [data.STDLIB_VERSION_4, data.InvalidGetBooleanValueGreaterV3, data.getRandomAddress(), `'getBooleanValue'(Address)`],
        [data.STDLIB_VERSION_5, data.InvalidGetBooleanValueGreaterV3, data.getRandomAlias(), `'getBooleanValue'(Alias)`],
    ])("negative: Can't find a function overload 'getBooleanValue'(Address) or 'getBooleanValue'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = generateContract(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBooleanValue'(String)", (version, scriptResult) => {
        let contract = generateContractForGetBooleanOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBooleanValue'(String)`);
    });

    const generateContract = (libVersion, caseForVersions, testData, getBooleanFunction = data.defaultGetBooleanValue) => {
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
            let boolValueOrUnit = getBooleanValue("LJKaSADfHH127gd")
            let boolValue = match(boolValueOrUnit) {
              case b:Boolean => b
              case _ => throw("not boolean")
            }
            ${caseForVersions}
        }`;
    };
});
