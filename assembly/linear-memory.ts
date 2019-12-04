memory.grow(1);

const index = 0;
const value = 24;
store<u8>(index, value);

export function readWasmMemoryAndReturnIndexOne(): i32 {
    // Read the value at indexOne
    let valueAtIndexOne = load<u8>(1);
    return valueAtIndexOne;
}