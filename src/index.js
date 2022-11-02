require('./interop');
const crypto = require('@waves/ts-lib-crypto');
const scalaJsCompiler = require('./lang-opt.js');
const replJs = require('./repl-opt.js');

function wrappedCompile(code, estimatorVersion = 3, needCompaction = false, removeUnusedCode = false, libraries = {}) {
    if (typeof code !== 'string') {
        return {
            error: 'Type error: contract should be string'
        }
    }
    try {
        const result = scalaJsCompiler.compile(code, estimatorVersion, needCompaction, removeUnusedCode, libraries);
        if (result.error) {
            try {
                result.size = new Uint8Array(result.result).length;
            } catch (e) {
            }
            return result;
        } else {
            const bytes = new Uint8Array(result.result);
            const {
                ast,
                complexity,
                verifierComplexity,
                callableComplexities,
                userFunctionComplexities,
                globalVariableComplexities
            } = result;
            return {
                result: {
                    bytes,
                    base64: crypto.base64Encode(bytes),
                    size: bytes.byteLength,
                    ast,
                    complexity,
                    verifierComplexity,
                    callableComplexities,
                    userFunctionComplexities,
                    globalVariableComplexities
                }
            }
        }
    } catch (e) {
        console.log(e)
        return typeof e === 'object' ?
            {error: e.message} :
            {error: e}
    }
}

function wrappedRepl(opts) {
    const repl = (opts != null)
        ? replJs.repl(new replJs.NodeConnectionSettings(opts.nodeUrl, opts.chainId.charCodeAt(0), opts.address))
        : replJs.repl();

    const wrapReconfigure = (repl) => {
        let reconfigureFn = repl.reconfigure.bind(repl);
        return (opts) => {
            const settings = new replJs.NodeConnectionSettings(opts.nodeUrl, opts.chainId.charCodeAt(0), opts.address);
            const newRepl = reconfigureFn(settings);
            newRepl.reconfigure = wrapReconfigure(newRepl);
            return newRepl;
        }
    };

    repl.reconfigure = wrapReconfigure(repl);

    return repl
}

const flattenCompilationResult = (compiled) => {
    let result = {};
    if (compiled.error) {
        if (compiled.result) {
            const bytes = new Uint8Array(compiled.result);
            const base64 = crypto.base64Encode(bytes);
            result = {...compiled, base64};
            result.result && delete result.result
        }
    } else {
        result = compiled.result
    }
    return result
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
    flattenCompilationResult,
    parseAndCompile: scalaJsCompiler.parseAndCompile
}

global.RideJS = api;
module.exports = api;
