import { PlayerTile, BoardTile } from "./classes";
import { GAME } from "./global";

export const BOARDWIDTH = GAME.tilewidth * GAME.boardSize;
export const XINITIAL = canvas.width / 2 - BOARDWIDTH / 2;
export const YINITIAL = 430;

const LETTERS = [
    { 'letter': 'A', 'points': 1, 'dist': 2 },
    { 'letter': 'B', 'points': 3, 'dist': 1 },
    { 'letter': 'C', 'points': 3, 'dist': 2 },
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

GAME.pouch = tiles
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

for (let i = 0; i < GAME.maximumHand; i++) {
    GAME.playerHand.push([])
}

for (const tile of GAME.playerHand) {
    tile.push(new PlayerTile(GAME.pouch[0]));
    GAME.pouch.shift();
};

for (let i = 0; i < Math.pow(GAME.boardSize, 2); i++) {
    if (i % GAME.boardSize == 0) { j = 0; }
    let x = XINITIAL + (j * GAME.tilewidth)
    let y = YINITIAL + (Math.floor(i / GAME.boardSize) * GAME.tilewidth)
    GAME.board.push(new BoardTile(x, y, GAME.tilewidth, GAME.tilewidth, i));

    j++
};
