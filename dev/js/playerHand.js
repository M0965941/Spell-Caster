import { canvas } from "./canvas";
import { GAME } from "./global";
import { BOARDWIDTH, YINITIAL } from "./setup";

export function handlePlayerHand() {
    let y = YINITIAL + BOARDWIDTH + GAME.tilewidth / 3;
    let x = ((canvas.width / 2) - (GAME.tilewidth * GAME.maximumHand * 1.1) / 2) - (GAME.tilewidth * 1.1);

    for (let t in GAME.player.hand) {
        x += GAME.tilewidth * 1.1

        if (GAME.selectedTile) {
            if (GAME.selectedTile.id == GAME.player.hand[t].id) {
                GAME.player.hand[t] = ''
            };
        };

        if (GAME.player.hand[t] != '') {
            GAME.player.hand[t].x = x;
            GAME.player.hand[t].y = y;
            GAME.player.hand[t].width = GAME.tilewidth;
            GAME.player.hand[t].height = GAME.tilewidth;
            GAME.player.hand[t].draw();
            GAME.player.hand[t].validWord = -1;
        };
    };
};