const fs = require("fs");
const loader = require("@assemblyscript/loader");

const imports = {
    env: {
        abort(_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        }
    }
};

const myModule = loader.instantiateSync(
    fs.readFileSync(__dirname + "/build/optimized.wasm"),
    imports
)


const addResult = myModule.add(24, 24);
console.log(`Hello World! addResult: ${addResult}`);