import {getRandomAddress, getRandomAlias, GreaterV3Result, RideV3Result} from "../../testData/data";

const compiler = require('../../../src');
const scalaJsCompiler = require('../../../src/lang-opt.js');

describe('getBinary',  () => {

    test.each([
        [3, RideV3Result, getRandomAddress()],
        [4, GreaterV3Result, getRandomAddress()],
        [5, GreaterV3Result, getRandomAddress()],
    ])('get byte array by address', (version, scriptResult, address) => {
        console.log(address)
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    test.each([
        [3, RideV3Result, getRandomAlias()],
        [4, GreaterV3Result, getRandomAlias()],
        [5, GreaterV3Result, getRandomAlias()],
    ])('get byte array by alias', (version, scriptResult, alias) => {
        console.log(alias)
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    const generateContract = (libVersion, caseForVersions, testData) => {
            return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let callerAddressOrAlias = ${testData}
            let binValueOrUnit = getBinary(callerAddressOrAlias, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")
            let binValue = match(binValueOrUnit) {
              case b:ByteVector => b
              case _ => throw("not binary")
            }
            ${caseForVersions}
        }`;
    }
});