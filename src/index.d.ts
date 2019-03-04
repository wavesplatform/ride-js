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
export function scriptInfo(code: string): any;
export function getTypes(): IType[];
export function getVarsDoc(): IVarDoc[];
export function getFunctionsDoc(): IFuncDoc[];

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