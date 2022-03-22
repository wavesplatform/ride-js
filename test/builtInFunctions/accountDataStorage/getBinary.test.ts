import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('getBinary',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBinaryEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.getRandomAddress()],
    ])('positive: get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBinaryEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.getRandomAlias()],
    ])('positive: get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry],
    ])('positive: getting a binary from your own data', (version, scriptResult) => {
        let contract = generateContractForGetBinaryOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBinaryEntry, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.invalidGetBinaryV3, data.getRandomAddress(), `'getBinary'(Address)`],
        [data.STDLIB_VERSION_3, data.invalidGetBinaryV3, data.getRandomAlias(), `'getBinary'(Alias)`],
        [data.STDLIB_VERSION_4, data.InvalidGetBinaryGreaterV3, data.getRandomAddress(), `'getBinary'(Address)`],
        [data.STDLIB_VERSION_5, data.InvalidGetBinaryGreaterV3, data.getRandomAlias(), `'getBinary'(Alias)`],
    ])("negative: Can't find a function overload 'getBinary'(Address) or 'getBinary'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3ResultBinaryEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBinary'(String)", (version, scriptResult) => {
        let contract = generateContractForGetBinaryOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBinary'(String)`);
    });

    const generateContract = (libVersion, caseForVersions, testData, getBinaryFunction = data.defaultGetBinary) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let callerAddressOrAlias = ${testData}
            let binValueOrUnit = ${getBinaryFunction}
            let binValue = match(binValueOrUnit) {
              case b:ByteVector => b
              case _ => throw("not binary")
            }
            ${caseForVersions}
        }`;
    }

    const generateContractForGetBinaryOwnData = (libVersion, caseForVersions) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func binary() = {
            let binValueOrUnit = getBinary("Ȣ瞱蛉㦎᠖꭛믳癚曉续")
            let binValue = match(binValueOrUnit) {
              case b:ByteVector => b
              case _ => throw("not binary")
            }
            ${caseForVersions}
        }`;
    }
});