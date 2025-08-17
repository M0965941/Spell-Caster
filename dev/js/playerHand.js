import { GAME } from "./global";

export function handlePlayerHand() {
    let x = -10;
    let y = 590;
    let size = GAME.tilewidth;

    for (const t of GAME.playerHand) {
        x += 60
        if (t[0]) {
            t[0].x = x;
            t[0].y = y;
            t[0].width = size;
            t[0].height = size;
            t[0].draw();
        }

        if (GAME.selectedTile && t[0]) {
            if (GAME.selectedTile.id == t[0].id) {
                t.shift();
            };
        };
    };
};