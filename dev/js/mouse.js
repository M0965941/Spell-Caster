import { canvas } from "./canvas";
import { GAME } from "./global";


export let mouse = {
    x: 0,
    y: 0,
    lmb: 0,
}

canvas.addEventListener('mouseup', (e) => {
    GAME.mouse.lmb = 0;
    GAME.selectedTile = null;
});

canvas.addEventListener('mousedown', (e) => {GAME.mouse.lmb = 1});

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    GAME.mouse.x = e.clientX - rect.left;
    GAME.mouse.y = e.clientY - rect.top;
});