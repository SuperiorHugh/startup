/*-- helper functions --*/

//clamps value to the given range
export function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

//lerps value to goto by specific amount
export function lerp(current, goto, amount) {
    return current + amount * (goto - current);
}