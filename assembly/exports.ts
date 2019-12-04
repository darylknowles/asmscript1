export function callMeFromJavascript(a: i32, b: i32): i32 {
    return addIntegerWithConstant(a, b);
}

export const GET_THIS_CONSTANT_FROM_JAVASCRIPT: i32 = 2424;

function addIntegerWithConstant(a: i32, b: i32): i32 {
    return a + b + ADD_CONSTANT;
}

const ADD_CONSTANT: i32 = 1;


