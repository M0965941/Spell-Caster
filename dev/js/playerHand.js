import { canvas } from "./canvas";
import { GAME } from "./global";
import { BOARDWIDTH, YINITIAL} from "./setup";

export function handlePlayerHand() {
    let y = YINITIAL + BOARDWIDTH + GAME.tilewidth/3;
    let x = ((canvas.width/2) - (GAME.tilewidth * GAME.maximumHand * 1.1)/2) - (GAME.tilewidth * 1.1);

    for (const t of GAME.playerHand) {
        x += GAME.tilewidth * 1.1

        if (t[0]) {
            t[0].x = x;
            t[0].y = y;
            t[0].width = GAME.tilewidth;
            t[0].height = GAME.tilewidth;
            t[0].draw();
        }

        if (GAME.selectedTile && t[0]) {
            if (GAME.selectedTile.id == t[0].id) {
                t.shift();
            };
        };
    };
};