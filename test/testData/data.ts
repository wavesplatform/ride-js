export const STDLIB_VERSION_3 = 3;
export const STDLIB_VERSION_4 = 4;
export const STDLIB_VERSION_5 = 5;
export const STDLIB_INVALID_VERSION = 44;

const addressDataArray = [
    "Address(base58'')",
    "Address(base58'3MDaMwqLtwBGcJrTA5tstJfY95GqnNnDDAS')",
    "Address(base58'3PDaScqLtwBGcJrTA5tstJfY95GqnNnLxGA')",
    "Address(base58'3P3aScAJsxBGcJrTA5tstJfY95GqnNnHLGA')",
];

const aliasDataArray = [
    'Alias("merry_1312@pro")',
    'Alias("four")',
    'Alias("1111this_alias_30@long-symbols")',
    'Alias("")',
];

const byteVectorArray = [
    "base16'52696465'",
    "base58'8t38fWQhrYJsqxXtPpiRCEk1g5RJdq9bG5Rkr2N7mDFC'",
    "base64'UmlkZQ=='"
];

export const RideV3Result = `
        WriteSet([
            DataEntry("dataType", val)
        ])`;

export const GreaterV3ResultBinaryEntry = `
        [
            BinaryEntry("bin", val)
        ]`;

export const GreaterV3ResultBooleanEntry = `
        [
            BooleanEntry("boolean", val)
        ]`;

export const GreaterV3ResultIntEntry = `
        [
            IntegerEntry("integer", val)
        ]`;

export const GreaterV3ResultStringEntry = `
        [
            StringEntry("String", val)
        ]`;

export const getRandomAddress = () => addressDataArray[Math.floor((Math.random() * addressDataArray.length))];
export const getRandomAlias = () => aliasDataArray[Math.floor((Math.random() * aliasDataArray.length))];
export const getRandomByteVector = () => byteVectorArray[Math.floor((Math.random() * byteVectorArray.length))];