require('./interop.cjs');
import { encode64 } from 'node-forge/lib/util'
import scalaJsCompiler from '@waves/ride-lang';
import replJs from '@waves/ride-repl';

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
                    base64: base64Encode(bytes),
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

export const flattenCompilationResult = (compiled) => {
    let result = {};
    if (compiled.error) {
        if (compiled.result) {
            const bytes = new Uint8Array(compiled.result);
            const base64 = base64Encode(bytes);
            result = {...compiled, base64};
            result.result && delete result.result
        }
    } else {
        result = compiled.result
    }
    return result
}

export const compile = wrappedCompile;
export const repl = wrappedRepl;
export const contractLimits = scalaJsCompiler.contractLimits();
export const version = scalaJsCompiler.nodeVersion() && version.version;
export const scriptInfo = scalaJsCompiler.scriptInfo;
export const getTypes = scalaJsCompiler.getTypes;
export const getVarsDoc = scalaJsCompiler.getVarsDoc;
export const getFunctionsDoc = scalaJsCompiler.getFunctionsDoc;
export const decompile = scalaJsCompiler.decompile;
export const parseAndCompile = scalaJsCompiler.parseAndCompile;

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

global.RideJS = api
module.exports = api
