import { BoardTile } from "./classes";
import { canvas } from "./canvas";
import { GAMESTATE } from "./global";

export const BOARDWIDTH = GAMESTATE.tilewidth * GAMESTATE.boardSize

export const XINITIAL = canvas.width/2 - BOARDWIDTH/2;
export const YINITIAL = 430;

let j = 0;

for (let i = 0; i < Math.pow(GAMESTATE.boardSize, 2); i++) {
    if (i % GAMESTATE.boardSize == 0) { j = 0; }
    let x = XINITIAL + (j * GAMESTATE.tilewidth)
    let y = YINITIAL + (Math.floor(i / GAMESTATE.boardSize) * GAMESTATE.tilewidth)
    GAMESTATE.board.push(new BoardTile(x, y, GAMESTATE.tilewidth, GAMESTATE.tilewidth, i));
    
    j++
};