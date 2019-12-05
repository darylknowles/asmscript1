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
    fs.readFileSync(__dirname + "/build/graphics.wasm"),
    imports
)

const memory = myModule.memory; 

const wasmByteMemoryArray = new Uint8Array(memory.buffer);

const canvasElement = document.querySelector("canvas");

const canvasContext = canvasElement.getContext("2d");
const canvasImageData = canvasContext.createImageData(
  canvasElement.width,
  canvasElement.height
);

canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

