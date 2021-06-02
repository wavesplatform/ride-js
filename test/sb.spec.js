const compiler = require('../src');
const {expect} = require('chai');
const getRide = require('./utils').getRide;

describe('Sandbox Test', function () {
    this.timeout(50000);

    it('Remove unused code and Compaction mode', () => {
        // source
        const source = getRide('./ride/compileCompaction.ride');

        // compile
        const baseRes = compiler.compile(source, 3, false, false);
        const compactionRes = compiler.compile(source, 3, true, false);
        const unusedRes = compiler.compile(source, 3, false, true);

        console.log(`\tBase: ${baseRes.result.size}. | Compaction: ${compactionRes.result.size} | Unused: ${unusedRes.result.size}`);
        expect(baseRes.result.size).to.not.equal(compactionRes.result.size);
        expect(baseRes.result.size).to.not.equal(unusedRes.result.size);
    });
});
