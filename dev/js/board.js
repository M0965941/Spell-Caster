import { BoardTile } from "./classes";
import { canvas } from "./canvas";

export const TILEWIDTH = 50;
const BOARDSIZE = 3;
const BOARDWIDTH = TILEWIDTH * BOARDSIZE

const XINITIAL = canvas.width/2 - BOARDWIDTH/2;
const YINITIAL = 450;

let j = 0;

export let grid = [];

for (let i = 0; i < Math.pow(BOARDSIZE, 2); i++) {
    if (i % BOARDSIZE == 0) { j = 0; }
    let x = XINITIAL + (j * TILEWIDTH)
    let y = YINITIAL + (Math.floor(i / BOARDSIZE) * TILEWIDTH)
    grid.push(new BoardTile(x, y, 50, 50, { 'letter': '', 'points': 0 }));
    j++
};