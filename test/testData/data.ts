export const STDLIB_VERSION_3 = 3;
export const STDLIB_VERSION_4 = 4;
export const STDLIB_VERSION_5 = 5;
export const STDLIB_INVALID_VERSION = 44;

// Binary functions
export const defaultGetBinary = `getBinary(callerAddressOrAlias, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
export const invalidGetBinaryV3 = `getBinary(callerAddressOrAlias)`;
export const invalidGetBinaryGreaterV3 = `getBinary(callerAddressOrAlias)`;

export const defaultGetBinaryValue = `getBinaryValue(callerAddressOrAlias, "LJKaSADfHH782gd")`
export const invalidGetBinaryValueV3 = `getBinaryValue(callerAddressOrAlias)`;
export const invalidGetBinaryValueGreaterV3 = `getBinaryValue(callerAddressOrAlias)`;

// Boolean functions
export const defaultGetBoolean = `getBoolean(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetBooleanV3 = `getBoolean(callerAddressOrAlias)`;
export const invalidGetBooleanGreaterV3 = `getBoolean(callerAddressOrAlias)`;

export const defaultGetBooleanValue = `getBooleanValue(callerAddressOrAlias, "LGd042RGb27")`
export const invalidGetBooleanValueV3 = `getBooleanValue(callerAddressOrAlias)`;
export const invalidGetBooleanValueGreaterV3 = `getBooleanValue(callerAddressOrAlias)`;

// Integer functions
export const defaultGetInteger = `getInteger(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetIntegerV3 = `getInteger(callerAddressOrAlias)`;
export const invalidGetIntegerGreaterV3 = `getInteger(callerAddressOrAlias)`;

export const defaultGetIntegerValue = `getIntegerValue(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetIntegerValueV3 = `getIntegerValue(callerAddressOrAlias)`;
export const invalidGetIntegerValueGreaterV3 = `getIntegerValue(callerAddressOrAlias)`;

// String functions
export const defaultGetString = `getString(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetStringV3 = `getString(callerAddressOrAlias)`;
export const invalidGetStringGreaterV3 = `getString(callerAddressOrAlias)`;

export const defaultGetStringValue = `getStringValue(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetStringValueV3 = `getStringValue(callerAddressOrAlias)`;
export const invalidGetStringValueGreaterV3 = `getStringValue(callerAddressOrAlias)`;

export const defaultIsDataStorageUntouched = `isDataStorageUntouched(callerAddressOrAlias)`;

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