import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dappToDappInvocation functions',  () => {

    const invoke = 'invoke';
    const reentrantInvoke = 'reentrantInvoke';
    const precondition = new GenerateContractForBuiltInFunctions(invoke);

    test.each([
        // invoke
        [data.STDLIB_VERSION_5, invoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, invoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        // can't find a function 'invoke' for ride v3 & v4
        [data.STDLIB_VERSION_3, invoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        // reentrantInvoke
        [data.STDLIB_VERSION_5, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        // can't find a function 'reentrantInvoke' for ride v3 & v4
        [data.STDLIB_VERSION_3, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, payment, testType) => {
        const contract = precondition.generateContractForDAppInvocation(version, byteVector, payment, testFunction);
        checkCompileResult(contract, testType);
    });
});