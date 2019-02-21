const Base58 = require('./base58');
const base64 = require('base64-js');
const keccak256module = require('./sha3').keccak256;
const blake = require('./blake2b');

global.base58Encode = function (bytes) {
    return Base58.encode(new Uint8Array(bytes))
};
global.base58Decode = function (data) {
    return Base58.decode(data).buffer
};
global.base64Encode = function (bytes) {
    return base64.fromByteArray(bytes);
};
global.base64Decode = function (data) {
    return base64.toByteArray(data);
};
global.keccak256 = function (bytes) {
    return Uint8Array.from(keccak(new Uint8Array(bytes))).buffer
};
global.blake2b256 = function (bytes) {
    return blake2b(new Uint8Array(bytes)).buffer
};

function blake2b(input) {
    return blake.blake2b(input, null, 32)
}

function keccak(input) {
    return keccak256module.array(input)
}

