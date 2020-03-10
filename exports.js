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
    fs.readFileSync(__dirname + "/build/exports.wasm"),
    imports
)


const result = myModule.callMeFromJavascript(2,3);
console.log(`result: ${result}`);

console.log(`constant: ${myModule.GET_THIS_CONSTANT_FROM_JAVASCRIPT.valueOf()}`);

console.log(`private function: ${myModule.addIntegerWithConstant}`);

console.log('module dump');
console.dir(myModule);

