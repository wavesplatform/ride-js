export const STDLIB_VERSION_3 = 3;
export const STDLIB_VERSION_4 = 4;
export const STDLIB_VERSION_5 = 5;
export const STDLIB_INVALID_VERSION = 44;

// Binary functions
export const defaultGetBinary = `getBinary(callerAddressOrAlias, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")`;
export const invalidGetBinaryV3 = `getBinary(callerAddressOrAlias)`;
export const InvalidGetBinaryGreaterV3 = `getBinary(callerAddressOrAlias)`;

export const defaultGetBinaryValue = `getBinaryValue(callerAddressOrAlias, "LJKaSADfHH782gd")`
export const invalidGetBinaryValueV3 = `getBinaryValue(callerAddressOrAlias)`;
export const InvalidGetBinaryValueGreaterV3 = `getBinaryValue(callerAddressOrAlias)`;

// Boolean functions
export const defaultGetBoolean = `getBoolean(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetBooleanV3 = `getBoolean(callerAddressOrAlias)`;
export const InvalidGetBooleanGreaterV3 = `getBoolean(callerAddressOrAlias)`;

export const defaultGetBooleanValue = `getBooleanValue(callerAddressOrAlias, "LGd042RGb27")`
export const invalidGetBooleanValueV3 = `getBooleanValue(callerAddressOrAlias)`;
export const InvalidGetBooleanValueGreaterV3 = `getBooleanValue(callerAddressOrAlias)`;

// Integer functions
export const defaultGetInteger = `getInteger(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetIntegerV3 = `getInteger(callerAddressOrAlias)`;
export const InvalidGetIntegerGreaterV3 = `getInteger(callerAddressOrAlias)`;

export const defaultGetIntegerValue = `getIntegerValue(callerAddressOrAlias, "LtKaSADfaH127gd")`
export const invalidGetIntegerValueV3 = `getIntegerValue(callerAddressOrAlias)`;
export const InvalidGetIntegerValueGreaterV3 = `getIntegerValue(callerAddressOrAlias)`;

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

export const RideV3ResultBinaryEntry = `
        WriteSet([
            DataEntry("bin", binValue)
        ])`;

export const GreaterV3ResultBinaryEntry = `
        [
            BinaryEntry("bin", binValue)
        ]`;

export const RideV3ResultBooleanEntry = `
        WriteSet([
            DataEntry("boolean", boolValue)
        ])`;

export const GreaterV3ResultBooleanEntry = `
        [
            BooleanEntry("boolean", boolValue)
        ]`;

export const RideV3ResultIntEntry = `
        WriteSet([
            DataEntry("integer", intValue)
        ])`;

export const GreaterV3ResultIntEntry = `
        [
            IntegerEntry("integer", intValue)
        ]`;