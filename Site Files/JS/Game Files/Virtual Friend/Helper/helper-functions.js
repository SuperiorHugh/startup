/*-- helper functions --*/

export function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

export function lerp(current, goto, amount) {
    return current + amount * (goto - current);
}