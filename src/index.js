require('./interop');
const crypto = require('@waves/ts-lib-crypto');
const scalaJsCompiler = require('./lang-opt.js');

function wrappedCompile(code, libraries) {
    if (typeof code !== 'string') {
        return {
            error: 'Type error: contract should be string'
        }
    }
    try {
        const result = scalaJsCompiler.compile(code, libraries);
        if (result.error) {
            return result;
        } else {
            const bytes = new Uint8Array(result.result);
            return {
                result: {
                    bytes,
                    base64: crypto.base64Encode(bytes),
                    size: bytes.byteLength,
                    ast: result.ast,
                    complexity: result.complexity,
                }
            }
        }
    } catch (e) {
        return typeof e === 'object' ?
            {error: e.message} :
            {error: e}
    }
}

const api = {
    compile: wrappedCompile,
    get contractLimits() {
        return scalaJsCompiler.contractLimits()
    },
    get version() {
        const version = scalaJsCompiler.nodeVersion();
        return version && version.version
    },
    scriptInfo: scalaJsCompiler.scriptInfo,
    getTypes: scalaJsCompiler.getTypes,
    getVarsDoc: scalaJsCompiler.getVarsDoc,
    getFunctionsDoc: scalaJsCompiler.getFunctionsDoc,
    decompile: scalaJsCompiler.decompile,
    repl: scalaJsCompiler.repl
}

global.RideJS = api;
module.exports = api;
