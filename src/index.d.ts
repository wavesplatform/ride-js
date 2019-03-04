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

export interface IVarsDoc {
    name: string
    type: any
    doc: string
}

export interface IFunctionsDoc {
    name: string
    doc: string
    resultType: string
    args: any

}
export function compile(code: string): ICompilationResult | ICompilationError;

export function getTypes(): IType[];
export function getVarsDoc(): IVarsDoc[];
export function getFunctionsDoc(): IFunctionsDoc[];
