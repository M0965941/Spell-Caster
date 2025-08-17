import { GAME } from "./global";

export function drawBoard() {
    for (const g of GAME.board) {
        g.draw();
        if (g.tile) { g.tile.draw();}
    };
};