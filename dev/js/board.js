import { BoardTile } from "./classes";
import { canvas } from "./canvas";
import { TILEWIDTH, GAMESTATE } from "./global";

const BOARDSIZE = 3;
export const BOARDWIDTH = TILEWIDTH * BOARDSIZE

export const XINITIAL = canvas.width/2 - BOARDWIDTH/2;
export const YINITIAL = 430;

let j = 0;

for (let i = 0; i < Math.pow(BOARDSIZE, 2); i++) {
    if (i % BOARDSIZE == 0) { j = 0; }
    let x = XINITIAL + (j * TILEWIDTH)
    let y = YINITIAL + (Math.floor(i / BOARDSIZE) * TILEWIDTH)
    GAMESTATE.board.push(new BoardTile(x, y, TILEWIDTH, TILEWIDTH, i));
    
    j++
};