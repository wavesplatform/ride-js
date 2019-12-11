const crypto = require('@waves/ts-lib-crypto');
const axios = require('axios');

global.base58Encode = function (bytes) {
    return crypto.base58Encode(new Uint8Array(bytes))
};
global.base58Decode = function (data) {
    return crypto.base58Decode(data).buffer
};
global.base64Encode = function (bytes) {
    return crypto.base64Encode(new Uint8Array(bytes))
};
global.base64Decode = function (data) {
    return crypto.base64Decode(data)
};
global.keccak256 = function (bytes) {
    return Uint8Array.from(crypto.keccak(new Uint8Array(bytes))).buffer
};
global.sha256 = function (bytes) {
    return Buffer.from((crypto.sha256(new Uint8Array(bytes))), 'hex');
};
global.blake2b256 = function (bytes) {
    return crypto.blake2b(new Uint8Array(bytes)).buffer
};
global.curve25519verify = function (msg, sig, key) {
    return crypto.verifySignature(new Uint8Array(key), new Uint8Array(msg), new Uint8Array(sig))
};
global.merkleVerify = function (rootHash, merkleProof, leafData) {
    return crypto.merkleVerify(new Uint8Array(rootHash), new Uint8Array(merkleProof), new Uint8Array(leafData))
};
global.rsaVerify = function (digest, msg, sig, key) {
    let alg = digest.toString();
    switch (digest.toString()) {
        case   'SHA3224':
            alg = "SHA3-224";
            break;
        case   'SHA3256':
            alg = "SHA3-256";
            break;
        case   'SHA3384':
            alg = "SHA3-384";
            break;
        case   'SHA3512':
            alg = "SHA3-512";
            break;
        case   "NONE":
            alg = undefined;
            break;
    }//fixme
    return crypto.rsaVerify(new Uint8Array(key), new Uint8Array(msg), new Uint8Array(sig), alg)
};
global.httpGet = async function (data) {
    if (!data.url) return {...data, status: 404, body: 'url is undefined'};
    let
        resp = await axios.get(data.url, {validateStatus: () => true}),
        status = resp.status,
        body = await resp.data;
    if (typeof body !== 'string') body = JSON.stringify(body);
    return {...data, status, body}
};
