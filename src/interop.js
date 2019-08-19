const Base58 = require('./base58');
const base64 = require('base64-js');
const keccak256module = require('./sha3').keccak256;
const sha256 = require('./sha256').sha256;
const blake = require('./blake2b');
const verify = require('curve25519-js').verify;

// import crypto from 'crypto';

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
global.curve25519verify = function (bytes1, bytes2, bytes3) {
    return verify(new Uint8Array(bytes1), new Uint8Array(bytes2), new Uint8Array(bytes3))
};
global.sha256 = function (bytes) {
    return Buffer.from((sha256(bytes)), 'hex');
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

