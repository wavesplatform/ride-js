import * as data from "../testData/data";

const compiler = require('../../src');

export const checkCompileResult = (contract, testType) => {
    const compiled = compiler.compile(contract);
    if(testType == data.POSITIVE_TEST) {
        expect(compiled.error).toBeUndefined();
    } else if(testType == data.NEGATIVE_TEST) {
        expect(compiled.error).toBeDefined()
        console.log(compiled.error)
    }
}