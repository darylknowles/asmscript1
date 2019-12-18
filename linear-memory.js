const fs = require("fs");
const loader = require("@assemblyscript/loader");

console.log(`*** ${__filename} ***`); 

const imports = {
    env: {
        abort(_msg, _file, line, column) {
            console.error("abort called at:" + line + ":" + column);
        }
    }
};

const myModule = loader.instantiateSync(
    fs.readFileSync(__dirname + "/build/linear-memory.wasm"),
    imports
)

const memory = myModule.memory; 

const wasmByteMemoryArray = new Uint8Array(memory.buffer);

console.log(wasmByteMemoryArray[0]); // Should Log "24".

wasmByteMemoryArray[1] = 25;
console.log(myModule.readWasmMemoryAndReturnIndexOne()); // Should Log "25"

