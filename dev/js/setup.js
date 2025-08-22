import { PlayerTile, BoardTile, Pouch, PlayerHealth, Enemy1 } from "./classes";
import { GAME } from "./global";

export const BOARDWIDTH = GAME.tilewidth * GAME.boardSize;
export const XINITIAL = canvas.width / 2 - BOARDWIDTH / 2;
export const YINITIAL = canvas.height * 0.61;

GAME.enemies.push(new Enemy1(canvas.width / 2 - 125, 50, 250, 10)) 
GAME.player.pouch = new Pouch(0, 400 - 25 + 7, 50, 50);
GAME.playerHealth = new PlayerHealth(canvas.width / 2 - 150, 400, 400, 15)

const LETTERS = [
    { 'letter': 'A', 'points': 1, 'dist': 2 },
    { 'letter': 'B', 'points': 3, 'dist': 1 },
    { 'letter': 'C', 'points': 3, 'dist': 3 },
]

let tiles = [];
let count = 1;
let j = 0;

for (const t of LETTERS) {
    for (let i = 0; i < t.dist; i++) {
        tiles.push({ letter: t.letter, points: t.points, id: count })
        count++;
    };
};

let randomTiles = tiles
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

for (const t of randomTiles) {
    GAME.player.pouch.availableTiles.push(new PlayerTile(t));
};

for (let i = 0; i < GAME.maximumHand; i++) {
    GAME.player.hand.push(new PlayerTile(GAME.player.pouch.availableTiles[0]));    
    GAME.player.pouch.availableTiles.shift();
}

for (let i = 0; i < Math.pow(GAME.boardSize, 2); i++) {
    if (i % GAME.boardSize == 0) { j = 0; }
    let x = XINITIAL + (j * GAME.tilewidth)
    let y = YINITIAL + (Math.floor(i / GAME.boardSize) * GAME.tilewidth)
    GAME.board.push(new BoardTile(x, y, GAME.tilewidth, GAME.tilewidth, i));

    j++
};
