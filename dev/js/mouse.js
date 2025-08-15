import { canvas } from "./canvas";
import { GAMESTATE } from "./global";


export let mouse = {
    x: 0,
    y: 0,
    lmb: 0,
}

canvas.addEventListener('mouseup', (e) => {
    GAMESTATE.mouse.lmb = 0;
    GAMESTATE.selectedTile = null;
    console.log(GAMESTATE.board);
});

canvas.addEventListener('mousedown', (e) => {GAMESTATE.mouse.lmb = 1});

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    GAMESTATE.mouse.x = e.clientX - rect.left;
    GAMESTATE.mouse.y = e.clientY - rect.top;
});