/*-- helper functions --*/

//clamps value to the given range
export function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

//lerps value to goto by specific amount
export function lerp(current, goto, amount) {
    return current + amount * (goto - current);
}

//gets a random value from array
export function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

//lerps value to goto by specific amount, and will teleport to goto if within tp range
export function tpLerp(current, goto, amount, tp) {
    let lerped = current + amount * (goto - current);
    return Math.abs(lerped - current) <= tp ? goto : lerped;
}