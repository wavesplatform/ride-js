import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('dataEntry',  () => {

    test.only("invalid DataEntry", () => {
        let contract = `
        {-# STDLIB_VERSION ${data.STDLIB_VERSION_3} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            WriteSet([
                DataEntry("binaryValue")
            ])
        }`
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Function 'DataEntry' requires 2 arguments, but 1 are provided in`);
    });
});
