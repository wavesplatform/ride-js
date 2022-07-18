import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('dappToDappInvocation functions', () => {

    const invoke = `invoke(addressFromStringValue(dapp2),"bar",[a],[AttachedPayment(byteVector, payment)])`;
    const invalidInvoke = `invoke("bar",[a],[AttachedPayment(byteVector, payment)])`;
    const invokeArgBeforeFunc = `addressFromStringValue(dapp2).invoke("bar",[a],[AttachedPayment(byteVector, payment)])`;
    const invalidInvokeArgBeforeFunc = `addressFromStringValue(dapp2).invoke([AttachedPayment(byteVector, payment)])`;

    const reentrantInvoke = `reentrantInvoke(addressFromStringValue(dapp2),"bar",[a],[AttachedPayment(byteVector, payment)])`;
    const invalidReentrantInvoke = `reentrantInvoke()`;
    const reentrantInvokeArgBeforeFunc = `addressFromStringValue(dapp2).reentrantInvoke("bar",[a],[AttachedPayment(byteVector, payment)])`;
    const invalidReentrantInvokeArgBeforeFunc = `addressFromStringValue(dapp2).reentrantInvoke()`;

    const precondition = new GenerateContractForBuiltInFunctions(invoke);

    test.each([
        // invoke
        [data.STDLIB_VERSION_5, invoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, invoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        // can't find a function 'invoke' for ride v3 & v4
        [data.STDLIB_VERSION_3, invoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid invoke
        [data.STDLIB_VERSION_5, invalidInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],

        // invoke argument before function
        [data.STDLIB_VERSION_5, invokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, invokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        // can't find a function 'invoke' for ride v3 & v4
        [data.STDLIB_VERSION_3, invokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid invoke argument before function
        [data.STDLIB_VERSION_5, invalidInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],

        // reentrantInvoke
        [data.STDLIB_VERSION_5, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        // can't find a function 'reentrantInvoke' for ride v3 & v4
        [data.STDLIB_VERSION_3, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, reentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid reentrantInvoke
        [data.STDLIB_VERSION_5, invalidReentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidReentrantInvoke, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],

        // reentrantInvoke argument before function
        [data.STDLIB_VERSION_5, reentrantInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, reentrantInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.POSITIVE_TEST],
        // can't find a function 'reentrantInvoke' for ride v3 & v4
        [data.STDLIB_VERSION_3, reentrantInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, reentrantInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid reentrantInvoke argument before function
        [data.STDLIB_VERSION_5, invalidReentrantInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidReentrantInvokeArgBeforeFunc, random.getRandomByteVector(), random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, payment, testType) => {
        const contract = precondition.generateContractForDAppInvocation(version, byteVector, payment, testFunction);
        checkCompileResult(contract, testType);
    });
});