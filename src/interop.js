const Base58 = require('./base58')
const keccak256 = require('./sha3').keccak256
const blake = require('./blake2b')

global.base58Encode = function (bytes) {
  return Base58.encode(new Uint8Array(bytes))
}
global.base58Decode = function (data) {
  return Base58.decode(data).buffer
}
global.keccak256 = function (bytes) {
  return Uint8Array.from(keccak(new Uint8Array(bytes))).buffer
}
global.blake2b256 = function (bytes) {
  return blake2b(new Uint8Array(bytes)).buffer
}

function blake2b(input) {
  return blake.blake2b(input, null, 32)
}

function keccak(input) {
  return keccak256.array(input)
}