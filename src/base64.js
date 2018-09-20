
export function encode(bytes){
    return Buffer.from(bytes).toString('base64')
}

export function decode(base64string){
    const result = Buffer.from(base64string, 'base64')
    if (encode(result) !== base64string)
        throw `Illegal base64 string "${base64string}"`
    return result
}