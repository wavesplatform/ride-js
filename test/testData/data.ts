export const STDLIB_VERSION_3 = 3;
export const STDLIB_VERSION_4 = 4;
export const STDLIB_VERSION_5 = 5;
export const STDLIB_INVALID_VERSION = 44;

export const defaultGetBinary = `getBinary(callerAddressOrAlias, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
export const invalidGetBinaryV3 = `getBinary(callerAddressOrAlias)`;
export const InvalidGetBinaryGreaterV3 = `getBinary(callerAddressOrAlias)`;

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

export const getRandomAddress = () => addressDataArray[Math.floor((Math.random() * addressDataArray.length))];
export const getRandomAlias = () => aliasDataArray[Math.floor((Math.random() * aliasDataArray.length))];

export const RideV3Result = `
        WriteSet([
            DataEntry("binaryValue", binValue)
        ])`;

export const GreaterV3Result = `
        [
            BinaryEntry("bin", binValue)
        ]`;

export const InvalidDataEntryV3Result = `
        WriteSet([
            DataEntry("binaryValue")
        ])`;

export const InvalidBinaryEntryGreaterV3Result = `
        [
            BinaryEntry(binValue)
        ]`;