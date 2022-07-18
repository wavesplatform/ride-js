import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String indexOf and lastIndexOf functions', () => {
    const indexOf = `indexOf(bar, foo)`;
    const indexOfWithOffset = `indexOf(bar, foo, ${random.getRandomInt()})`;
    const invalidIndexOf = `indexOf(foo)`;
    const lastIndexOf = `lastIndexOf(bar, foo)`;
    const lastIndexOfWithOffset = `lastIndexOf(bar, foo, ${random.getRandomInt()})`;
    const invalidLastIndexOf = `lastIndexOf(foo)`;


    const indexOfArgBeforeFunc = `bar.indexOf(foo)`;
    const indexOfWithOffsetArgBeforeFunc = `bar.indexOf(foo, ${random.getRandomInt()})`;
    const invalidIndexOfArgBeforeFunc = `foo.indexOf()`;
    const lastIndexOfArgBeforeFunc = `bar.lastIndexOf(foo)`;
    const lastIndexOfWithOffsetArgBeforeFunc = `bar.lastIndexOf(foo, ${random.getRandomInt()})`;
    const invalidLastIndexOfArgBeforeFunc = `foo.lastIndexOf()`;

    const precondition = new GenerateContractForBuiltInFunctions(indexOf);

    test.each([
        // indexOf
        [data.STDLIB_VERSION_3, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data indexOf
        [data.STDLIB_VERSION_3, indexOf, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, indexOf, random.getRandomString(), random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomString(), random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, indexOf, random.getRandomString(), random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // indexOfWithOffset
        [data.STDLIB_VERSION_3, indexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, indexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, indexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, indexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data indexOfWithOffset
        [data.STDLIB_VERSION_3, indexOfWithOffset, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, indexOfWithOffset, random.getRandomString(), random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, indexOfWithOffset, random.getRandomString(), random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, indexOfWithOffset, random.getRandomString(), random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function indexOf
        [data.STDLIB_VERSION_3, invalidIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // lastIndexOf
        [data.STDLIB_VERSION_3, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data lastIndexOf
        [data.STDLIB_VERSION_3, lastIndexOf, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomIssue(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOf, random.getRandomString(), random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // lastIndexOfWithOffset
        [data.STDLIB_VERSION_3, lastIndexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOfWithOffset, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data lastIndexOfWithOffset
        [data.STDLIB_VERSION_3, lastIndexOfWithOffset, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOfWithOffset, random.getRandomInt(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOfWithOffset, random.getRandomString(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOfWithOffset, random.getRandomInt(), random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function lastIndexOf
        [data.STDLIB_VERSION_3, invalidLastIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidLastIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLastIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidLastIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomIndexInt, randomString, testType) => {
            const contract = precondition.generateContract(version, randomIndexInt, randomString, testFunction);
            checkCompileResult(contract, testType);
        });


    test.each([
        // indexOf argument before function
        [data.STDLIB_VERSION_3, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data indexOf
        [data.STDLIB_VERSION_3, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, indexOfArgBeforeFunc, random.getRandomString(), random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // indexOfWithOffset
        [data.STDLIB_VERSION_3, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data indexOfWithOffset
        [data.STDLIB_VERSION_3, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, indexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function indexOf
        [data.STDLIB_VERSION_3, invalidIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // lastIndexOf
        [data.STDLIB_VERSION_3, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data lastIndexOf
        [data.STDLIB_VERSION_3, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOfArgBeforeFunc, random.getRandomIssue(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // lastIndexOfWithOffset
        [data.STDLIB_VERSION_3, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data lastIndexOfWithOffset
        [data.STDLIB_VERSION_3, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomInt(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomString(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOfWithOffsetArgBeforeFunc, random.getRandomInt(), random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function lastIndexOf
        [data.STDLIB_VERSION_3, invalidLastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidLastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidLastIndexOfArgBeforeFunc, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function (arg first) %s compiles or failed',
        (version, testFunction, randomIndexInt, randomString, testType) => {
            const contract = precondition.generateContract(version, randomIndexInt, randomString, testFunction);
            checkCompileResult(contract, testType);
        });
});
