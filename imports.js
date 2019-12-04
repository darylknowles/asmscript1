const fs = require("fs");
const loader = require("@assemblyscript/loader");

const imports = {
    env: {
        abort(_msg, _file, line, column) {
            console.error("abort called at:" + line + ":" + column);
        }
    },
    imports: {
        consoleLog: value => console.log(value)
    }
};

const myModule = loader.instantiateSync(
    fs.readFileSync(__dirname + "/build/imports.wasm"),
    imports
)


