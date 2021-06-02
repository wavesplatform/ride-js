
const fs = require('fs');
const path = require('path');

const getRideSrc = function(filename) {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
}

module.exports.getRide = getRideSrc;
