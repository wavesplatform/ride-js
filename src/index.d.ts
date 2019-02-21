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

export function compile(code: string): ICompilationResult | ICompilationError;