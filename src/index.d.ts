export interface ICompilationResult {
    ast?: object,
    result?: ArrayBuffer,
    error?: string
}
export function compile(code:string): ICompilationResult;