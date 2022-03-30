import * as random from "./random";

export const positiveTestType = 'positive';
export const negativeTestType = 'negative';

export const STDLIB_VERSION_3 = 3;
export const STDLIB_VERSION_4 = 4;
export const STDLIB_VERSION_5 = 5;
export const STDLIB_INVALID_VERSION = 44;

export const dataEntryForTests = random.entryListWithRandomData('DataEntry', random.getRandomByteVector());
export const binaryEntryForTests = random.entryListWithRandomData('BinaryEntry', random.getRandomByteVector());
export const integerEntryForTests = random.entryListWithRandomData('IntegerEntry', random.getRandomInt());
export const stringEntryForTests = random.entryListWithRandomData('StringEntry', `"string"`);
export const booleanEntryForTests = random.entryListWithRandomData('BooleanEntry', false);

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

export const GreaterV3ResultIntegerEntry = `
[
    IntegerEntry("integer", val)
]`;

export const GreaterV3ResultStringEntry = `
[
    StringEntry("String", val)
]`;