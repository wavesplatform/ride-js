
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

const issuesArray = [
    `Issue("superToken", "token for super humans", 1000, 2, true)`,
    `Issue("trueToken", "real token in real life", 5_000_000_000, 5, false)`,
    `Issue("oneMoreToken", "just one more token in this crypto world", 1_500_000_000, 5, true)`,
    `Issue("assetForAll", "asset for all peoples", 1_500_000_000, 5, true)`,
];

const stringArray = [
    `"3P3aScAJsxBGcJrTA5tstJfY95GqnNnHLGAlsadjbf87"`,
    `"8t38fWQhrYJsqxXtPpiRCEk1g5RJdq9bG5Rkr2N7mDFC"`,
    `"3MDaMwqLtwBGcJrTA5tstJfY95GqnNnDDASmsakmd091"`,
    `"3P3aScAJsxBGGqnNnHLGAlsadjbf87"`,
    `"8t38fWQhrYJsqxXtPpiRasdiuh32he98ddr2N7"`,
    `"091"`,
]

export const getRandomAddress = () => addressDataArray[Math.floor((Math.random() * addressDataArray.length))];
export const getRandomAlias = () => aliasDataArray[Math.floor((Math.random() * aliasDataArray.length))];
export const getRandomByteVector = () => byteVectorArray[Math.floor((Math.random() * byteVectorArray.length))];
export const getRandomIssuesArray = () => issuesArray[Math.floor((Math.random() * issuesArray.length))];
export const getRandomStringArray = () => stringArray[Math.floor((Math.random() * stringArray.length))];
export const getRandomInt = () => Math.floor(Math.random() * 1_000_000_000);


/**
 * @description entryListWithRandomData: generate List with entry
 * @description key - data types: BinaryEntry | BooleanEntry | IntegerEntry | StringEntry
 * @description dataForEntry - data for key data type
 *
 * */
export const entryListWithRandomData = (key: string, dataForEntry: any) : string => {
    const entryArray = {
        "DataEntry": `[DataEntry("key", ${dataForEntry})]`,
        "BinaryEntry": `[BinaryEntry("key", ${dataForEntry})]`,
        "IntegerEntry": `[IntegerEntry("key", ${dataForEntry})]`,
        "StringEntry": `[StringEntry("key", ${dataForEntry})]`,
        "BooleanEntry": `[BooleanEntry("key", ${dataForEntry})]`,
    };

    return entryArray[key];
}

