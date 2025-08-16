import { BoardTile } from "./classes";
import { canvas } from "./canvas";
import { GAME } from "./global";

export const BOARDWIDTH = GAME.tilewidth * GAME.boardSize

export const XINITIAL = canvas.width/2 - BOARDWIDTH/2;
export const YINITIAL = 430;

let j = 0;

for (let i = 0; i < Math.pow(GAME.boardSize, 2); i++) {
    if (i % GAME.boardSize == 0) { j = 0; }
    let x = XINITIAL + (j * GAME.tilewidth)
    let y = YINITIAL + (Math.floor(i / GAME.boardSize) * GAME.tilewidth)
    GAME.board.push(new BoardTile(x, y, GAME.tilewidth, GAME.tilewidth, i));
    
    j++
};