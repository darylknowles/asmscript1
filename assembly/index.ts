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

export function hello(): string {
  return "Hello World!";
}