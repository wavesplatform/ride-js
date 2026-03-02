import * as data from "../testData/data";

import compiler from '../../src/index.cjs';

export const checkCompileResult = (contract, testType) => {
    const compiled = compiler.compile(contract);
    if(testType == data.positiveTestType) {
        expect(compiled.error).toBeUndefined();
    } else if(testType == data.negativeTestType) {
        expect(compiled.error).toBeDefined()
        console.log(compiled.error)
    }
}
