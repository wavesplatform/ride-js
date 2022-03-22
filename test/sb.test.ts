const compiler = require('../src');
const getRide = require('./utils').getRide;

describe('Sandbox Test', function () {

    test.only('Remove unused code and Compaction mode', () => {
        // source
        const source = getRide('./ride/compileCompaction.ride');

        // compile
        const baseRes = compiler.compile(source, 3, false, false);
        const compactionRes = compiler.compile(source, 3, true, false);
        const unusedRes = compiler.compile(source, 3, false, true);

        console.log(`\tBase: ${baseRes.result.size}. | Compaction: ${compactionRes.result.size} | Unused: ${unusedRes.result.size}`);
        expect(baseRes.result.size).not.toEqual(compactionRes.result.size);
        expect(baseRes.result.size).not.toEqual(unusedRes.result.size);

        // console.log(compiler.decompile(baseRes.result.base64));
        // console.log(compiler.decompile(unusedRes.result.base64));
    });
});
