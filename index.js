const fs = require("fs");
const loader = require("@assemblyscript/loader");

const imports = {
    env: {
        abort(_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        }
    }
};

const testModule = loader.instantiateSync(
    fs.readFileSync(__dirname + "/build/optimized.wasm"),
    imports
)

let result;

//Simple add
result = testModule.add(17, 17);
console.log('add', result);

//Float add
console.log('js add', .1 + .2)
console.log('wasm add', testModule.floatadd(0.1, 0.2))

//Fast loop?
result = testModule.bigloop();
console.log('bigloop', result);

//Map property
result = testModule.foo();
console.log('foo', result);

//Global constants
result = testModule.magicnumber.value
console.log('magicnumber', result);

//Getting strings back
result = testModule.__getString(testModule.hello());
console.log('hello:', result);

//Testing low level results
result = testModule.__getArray(testModule.lowMath());
result = result.map((value) =>
    testModule.__getString(value)
);
console.log('lowMath', result);

result = testModule.__getArray(testModule.lowMemory());
result = result.map((value) =>
    testModule.__getString(value)
);
console.log('lowMemory', result);

