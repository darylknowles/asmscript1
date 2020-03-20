const runGraphicsWasm = async () => {

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

    const results = await WebAssembly.instantiateStreaming(fetch('./graphics.wasm'), imports);

    const exports = results.instance.exports;
    const memory = exports.memory;

    const wasmByteMemoryArray = new Uint8Array(memory.buffer);

    const canvasElement = document.querySelector("canvas");

    const canvasContext = canvasElement.getContext("2d");
    const canvasImageData = canvasContext.createImageData(
        canvasElement.width,
        canvasElement.height
    );

    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const getDarkValue = () => {
        return Math.floor(Math.random() * 100);
    };

    const getLightValue = () => {
        return Math.floor(Math.random() * 127) + 127;
    };

    const drawCheckerBoard = () => {

        // Generate a new checkboard in wasm
        exports.generateCheckerBoard(
            getDarkValue(),
            getDarkValue(),
            getDarkValue(),
            getLightValue(),
            getLightValue(),
            getLightValue()
        );

        // Pull out the RGBA values from Wasm memory, the we wrote to in wasm,
        // starting at the checkerboard pointer (memory array index)
        const imageDataArray = wasmByteMemoryArray.slice(
            exports.CHECKERBOARD_BUFFER_POINTER.valueOf(),
            exports.CHECKERBOARD_BUFFER_SIZE.valueOf()
        );

        // Set the values to the canvas image data
        canvasImageData.data.set(imageDataArray);

        // Clear the canvas
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Place the new generated checkerboard onto the canvas
        canvasContext.putImageData(canvasImageData, 0, 0);
    };

    drawCheckerBoard();
    setInterval(() => {
        drawCheckerBoard();
    }, 2000);



}

runGraphicsWasm();