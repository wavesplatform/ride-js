import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('getInteger',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultIntEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
    ])('positive: getInteger - get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultIntEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAlias()],
    ])('positive: getInteger - get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry],
    ])('positive: getInteger - getting a boolean from your own data', (version, scriptResult) => {
        let contract = generateContractForGetBooleanOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultIntEntry, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.invalidGetIntegerV3, data.getRandomAddress(), `'getInteger'(Address)`],
        [data.STDLIB_VERSION_3, data.invalidGetIntegerV3, data.getRandomAlias(), `'getInteger'(Alias)`],
        [data.STDLIB_VERSION_4, data.InvalidGetIntegerGreaterV3, data.getRandomAddress(), `'getInteger'(Address)`],
        [data.STDLIB_VERSION_5, data.InvalidGetIntegerGreaterV3, data.getRandomAlias(), `'getInteger'(Alias)`],
    ])("negative: Can't find a function overload 'getInteger'(Address) or 'getInteger'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = generateContract(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultIntEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getInteger'(String)", (version, scriptResult) => {
        let contract = generateContractForGetBooleanOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getInteger'(String)`);
    });

    const generateContract = (libVersion, caseForVersions, testData, getIntegerFunction = data.defaultGetInteger) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func int() = {
            let callerAddressOrAlias = ${testData}
            let intValueOrUnit = ${getIntegerFunction}
            let intValue = match(intValueOrUnit) {
              case b:Int => b
              case _ => throw("not integer")
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
        func int() = {
            let intValueOrUnit = getInteger("LJKaSADfHH127gd")
            let intValue = match(intValueOrUnit) {
              case b:Int => b
              case _ => throw("not integer")
            }
            ${caseForVersions}
        }`;
    };
});
