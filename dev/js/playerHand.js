import { PlayerTile } from "./classes";
import { GAMESTATE } from "./global";

const LETTERS = [
    { 'letter': 'A', 'points': 1, 'dist': 9 },
    { 'letter': 'B', 'points': 3, 'dist': 2 },
    { 'letter': 'C', 'points': 3, 'dist': 2 },
    { 'letter': 'D', 'points': 2, 'dist': 4 },
    { 'letter': 'E', 'points': 1, 'dist': 12 },
    { 'letter': 'F', 'points': 4, 'dist': 2 },
    { 'letter': 'G', 'points': 2, 'dist': 3 },
    { 'letter': 'H', 'points': 4, 'dist': 2 },
    { 'letter': 'I', 'points': 1, 'dist': 9 },
    { 'letter': 'J', 'points': 8, 'dist': 1 },
    { 'letter': 'K', 'points': 5, 'dist': 1 },
    { 'letter': 'L', 'points': 1, 'dist': 4 },
    { 'letter': 'M', 'points': 3, 'dist': 2 },
    { 'letter': 'N', 'points': 1, 'dist': 6 },
    { 'letter': 'O', 'points': 1, 'dist': 8 },
    { 'letter': 'P', 'points': 3, 'dist': 2 },
    { 'letter': 'Q', 'points': 10, 'dist': 1 },
    { 'letter': 'R', 'points': 1, 'dist': 6 },
    { 'letter': 'S', 'points': 1, 'dist': 4 },
    { 'letter': 'T', 'points': 1, 'dist': 6 },
    { 'letter': 'U', 'points': 1, 'dist': 4 },
    { 'letter': 'V', 'points': 4, 'dist': 2 },
    { 'letter': 'W', 'points': 4, 'dist': 2 },
    { 'letter': 'X', 'points': 8, 'dist': 1 },
    { 'letter': 'Y', 'points': 4, 'dist': 2 },
    { 'letter': 'Z', 'points': 10, 'dist': 1 },
]
let tiles = [];
let count = 1;

for (const t of LETTERS) {
    for (let i = 0; i < t.dist; i++) {
        tiles.push({ letter: t.letter, points: t.points, id: count })
        count++
    }
}

GAMESTATE.pouch = tiles
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

for (let i = 0; i < GAMESTATE.maximumHand; i++) {
    GAMESTATE.playerHand.push(new PlayerTile(
        50 + (60 * i),
        590,
        50,
        50,
        GAMESTATE.pouch[0]
    ))
    GAMESTATE.pouch.shift();
}