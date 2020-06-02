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
            try {
                result.size = new Uint8Array(result.result).length;
            } catch (e) {
            }
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
                    complexityByFunc: result.complexityByFunc,
                }
            }
        }
    } catch (e) {
        return typeof e === 'object' ?
            {error: e.message} :
            {error: e}
    }
}

function wrappedRepl(opts) {
    const repl = (opts != null)
        ? scalaJsCompiler.repl(new scalaJsCompiler.NodeConnectionSettings(opts.nodeUrl, opts.chainId.charCodeAt(0), opts.address))
        : scalaJsCompiler.repl();

    const wrapReconfigure = (repl) => {
        let reconfigureFn = repl.reconfigure.bind(repl);
        return (opts) => {
            const settings = new scalaJsCompiler.NodeConnectionSettings(opts.nodeUrl, opts.chainId.charCodeAt(0), opts.address);
            const newRepl = reconfigureFn(settings);
            newRepl.reconfigure = wrapReconfigure(newRepl);
            return newRepl;
        }
    };

    repl.reconfigure = wrapReconfigure(repl);

    return repl
}

const api = {
    compile: wrappedCompile,
    repl: wrappedRepl,
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
}

global.RideJS = api;
module.exports = api;
