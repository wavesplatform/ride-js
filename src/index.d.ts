export interface ICompilationResult {
    result: {
        ast: object
        base64: string
        bytes: Uint8Array
        size: number
        complexity: number
    }
}

export interface ICompilationError {
    error: string
}

export interface IDecompilationResult {
    result: string
}

export interface IDecompilationError {
    error: any
}

export type TType = TList | TStruct | TUnion | TPrimitive

export type TPrimitive = string;

export type TStructField = {name: string, type: TType};

export type TStruct = {
    typeName: string
    fields: TStructField[]
};

export type TList = {
    "listOf": TType
};

export type TUnionItem = TStruct | TPrimitive | TList
export type TUnion = TUnionItem[]

export type TFunction = {
    name: string
    doc: string
    resultType: TType
    args: TFunctionArgument[]
};

export type TFunctionArgument = {
    name: string
    type: TType
    doc: string
};

export interface IVarDoc {
    name: string
    type: any
    doc: string
}

export interface IScriptInfo {
    stdLibVersion: number,
    contentType: number,
    scriptType: number
}

export function compile(code: string): ICompilationResult | ICompilationError;
export function scriptInfo(code: string):  IScriptInfo;
export function getTypes(stdlibVersion?: number, isTokenContext?: boolean): TStructField[];
export function getVarsDoc(stdlibVersion?: number, isTokenContext?: boolean): IVarDoc[];
export function getFunctionsDoc(stdlibVersion?: number, isTokenContext?: boolean): TFunction[];
export function decompile(compiledCode: string): IDecompilationResult | IDecompilationError;

export const contractLimits: {
    MaxComplexityByVersion: (v:number) => number,
    MaxExprSizeInBytes: number,
    MaxContractSizeInBytes: number,
    MaxContractInvocationArgs: number,
    MaxContractInvocationSizeInBytes: number,
    MaxWriteSetSizeInBytes: number,
    MaxPaymentAmount: number
};

