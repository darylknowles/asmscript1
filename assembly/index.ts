// The entry file of your WebAssembly module.

export const magicnumber = 2181970; 

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function floatadd(a: f64, b: f64): f64 {
  return a + b; 
}

export function bigloop(): f64 {
  let sum: f64 = 0; 
  for (let i: i32 = 0; i < 1_000_000; i++) {
    sum += 1; 
  }
  return sum; 
}

export function foo(): Map<string, string> {
  var a = new Map<string,string>()
  a.set("prop", "hello world")  
  return a; 
}

export function hello(): string {
  return "Hello World!";
}

export function lowMath(): string[] {
  
  let results:string[] = []; 

  results.push(clz<i32>(1).toString());

  results.push(ctz<i32>(2).toString());

  results.push(popcnt<i32>(3).toString());  

  results.push(rotl<i32>(2,1).toString());  

  results.push(rotr<i32>(128,1).toString());  

  results.push(abs<f64>(-23.3).toString());  

  results.push(max<f64>(-2,2).toString());  

  results.push(min<f64>(-2,2).toString());  

  results.push(ceil<f64>(3.2).toString());  

  results.push(floor<f64>(3.6).toString());  

  results.push(copysign<f64>(3,-1).toString());  

  results.push(nearest<f64>(3.3).toString());  
  
  results.push(reinterpret<i32>(1).toString());  

  results.push(sqrt<f32>(81).toString());  

  results.push(trunc<f32>(-4.4).toString());  

  return results; 
}

export function lowMemory(): string[] {
  let results:string[] = []; 

  //store and load
  results.push("load and store");
  results.push(load<i32>(0).toString())
  store<i32>(0,777);  
  results.push(load<i32>(0).toString())

  //Get total size
  results.push("Memory size");
  results.push(memory.size().toString());

  //Grow memory
  results.push("...after grow");
  memory.grow(1); 
  results.push(memory.size().toString());

  //Fill memory
  results.push("Fill");
  let offsetA = 0; 
  memory.fill(offsetA,255, 100);   
  results.push(load<u8>(offsetA).toString());
  results.push(load<u8>(offsetA+1).toString());
  results.push(load<u8>(offsetA+98).toString());
  results.push(load<u8>(offsetA+99).toString());
  results.push(load<u8>(offsetA+100).toString());

  results.push("Copy");
  let offsetB = offsetA+1024; 
  memory.copy(offsetB, offsetA, 50); 
  results.push(load<u8>(offsetB).toString());
  results.push(load<u8>(offsetB+1).toString());
  results.push(load<u8>(offsetB+98).toString());
  results.push(load<u8>(offsetB+99).toString());
  results.push(load<u8>(offsetB+100).toString());

  results.push("Compare");
  results.push(memory.compare(offsetA, offsetB, 50).toString());
  results.push(memory.compare(offsetA, offsetB, 100).toString());
  results.push(memory.compare(offsetB, offsetA, 100).toString());
  return results;  
}