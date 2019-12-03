const fs = require("fs");
const loader = require("@assemblyscript/loader");

const myImports = {}; 
const testModule = loader.instantiateSync(
    fs.readFileSync(__dirname + "../../build/optimized.wasm"),
    myImports
)

let result; 

//const testModule = require('../index'); 

//Simple add
result = testModule.add(17,17);
console.log('add', result);

//Fast loop?
result = testModule.bigloop();
console.log('bigloop',result);

//Map property
result = testModule.foo();
console.log('foo',result);

//Testing low level results
result = testModule.__getArray(testModule.lowdown());
result = result.map((value) => 
    testModule.__getString(value)
);
console.log('lowdown',result);

//Global constants
result = testModule.magicnumber.value
console.log('magicnumber',result);

//Getting strings back
result = testModule.__getString(testModule.hello());
console.log('hello:',result);

