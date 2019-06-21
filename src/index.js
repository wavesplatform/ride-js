require('./interop');
const base64 = require('base64-js');
const scalaJsCompiler = require('./lang-opt.js');

const api = {
    compile: function (code) {
        if (typeof code !== 'string') {
            return {
                error: 'Type error: contract should be string'
            }
        }

        try {
            const result = scalaJsCompiler.compile(code);

            if (result.error) {
                return result;
            } else {
                const bytes = new Uint8Array(result.result);


                return {
                    result: {
                        bytes,
                        base64: base64.fromByteArray(bytes),
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
    },
    get contractLimits(){
        return scalaJsCompiler.contractLimits()
    },
    scriptInfo: scalaJsCompiler.scriptInfo,
    getTypes: scalaJsCompiler.getTypes,
    getVarsDoc: scalaJsCompiler.getVarsDoc,
    getFunctionsDoc: scalaJsCompiler.getFunctionsDoc,
    decompile: scalaJsCompiler.decompile
}

global.RideJS = api;
module.exports = api;