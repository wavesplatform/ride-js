export interface ICompilationResult {
    result: {
        ast: object
        base64: string
        bytes: Uint8Array
        size: number
    }
}

export interface ICompilationError {
    error: string
}

export interface IType {
    name: string
    type: any
}

export interface IVarDoc {
    name: string
    type: any
    doc: string
}

export interface IFuncDoc {
    name: string
    doc: string
    resultType: string
    args: any

}
export function compile(code: string): ICompilationResult | ICompilationError;
export function scriptInfo(code: string): { stdLibVersion: number, contentType: number, scriptType: number };
export function getTypes(stdlibVersion?: number, isTokenContext?: boolean): IType[];
export function getVarsDoc(stdlibVersion?: number, isTokenContext?: boolean): IVarDoc[];
export function getFunctionsDoc(stdlibVersion?: number, isTokenContext?: boolean): IFuncDoc[];

export const contractLimits: {
    MaxExprComplexity: number,
    MaxExprSizeInBytes: number,
    MaxContractComplexity: number,
    MaxContractSizeInBytes: number,
    MaxContractInvocationArgs: number,
    MaxContractInvocationSizeInBytes: number,
    MaxWriteSetSizeInBytes: number,
    MaxPaymentAmount: number
};