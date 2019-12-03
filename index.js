const fs = require("fs");

const imports = {
  env: {
    abort(_msg, _file, line, column) {
       console.error("abort called at index.ts:" + line + ":" + column);
    }
  }
};

const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + "/build/optimized.wasm"));

Object.defineProperty(module, "exports", {
  get: () => new WebAssembly.Instance(compiled, imports).exports
});

