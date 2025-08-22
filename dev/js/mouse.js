import { canvas } from "./canvas";
import { GAME } from "./global";

export let mouse = {
    x: 0,
    y: 0,
    lmb: 0,
}

canvas.addEventListener('mouseup', (e) => {
    GAME.mouse.lmb = 0;
    
    if(GAME.player.pouch.isMouseOver && GAME.player.pouch.widthrawable == 1){
        GAME.selectedTile = GAME.player.pouch.availableTiles[0]
        GAME.selectedTile.draw = GAME.player.pouch.availableTiles[0].draw;
        GAME.player.pouch.availableTiles.shift();
    }

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


        for (let t in GAME.player.hand) {
            if (GAME.selectedTile && GAME.player.hand[t] == '') {
                GAME.player.hand[t] = GAME.selectedTile;
                GAME.player.hand[t].draw = GAME.selectedTile.draw;
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