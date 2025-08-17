import { canvas } from "./canvas";
import { GAME } from "./global";

export let mouse = {
    x: 0,
    y: 0,
    lmb: 0,
}

canvas.addEventListener('mouseup', (e) => {
    GAME.mouse.lmb = 0;
    console.log(GAME.board)
    if (GAME.selectedTile !== null) {
        for (const b of GAME.board) {
            if (b.isMouseOver && b.tile == null) {
                b.tile = GAME.selectedTile;
                b.tile.draw = GAME.selectedTile.draw;
                b.checked = { h: 0, v: 0 };
                GAME.selectedTile = null;
                break;
            };
        };

        for (const h of GAME.playerHand) {
            if (GAME.selectedTile && h.length == 0) {
                h.push(GAME.selectedTile);
                h[0].draw = GAME.selectedTile.draw;
                GAME.selectedTile = null;
                break;
            };
        };
    };
});

canvas.addEventListener('mousedown', (e) => { GAME.mouse.lmb = 1 });

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    GAME.mouse.x = e.clientX - rect.left;
    GAME.mouse.y = e.clientY - rect.top;

    if (GAME.selectedTile) {
        GAME.selectedTile.x = GAME.mouse.x - GAME.tilewidth / 2
        GAME.selectedTile.y = GAME.mouse.y - GAME.tilewidth / 2
    }
});