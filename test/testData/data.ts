
export const RideV3Result = `
        WriteSet([
            DataEntry("binaryValue", binValue)
        ])`;
export const GreaterV3Result =
    `[
            BinaryEntry("bin", binValue)
        ]`;

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

export const getRandomAddress = () => addressDataArray[Math.floor((Math.random()*addressDataArray.length))];
export const getRandomAlias = () => aliasDataArray[Math.floor((Math.random()*aliasDataArray.length))];