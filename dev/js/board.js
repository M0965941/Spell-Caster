import { GAME } from "./global";

export function drawBoard() {
    for (const g of GAME.board) {
        g.draw();
        if (g.tile) {
            checkTiles(g);
            g.tile.draw();
        };
    };
};

function checkTiles(g) {
    let wordToCheck = { word: g.tile.letter, pos: [g.id] };
    if (g.checked.h == 0) {
        recursiveRightCheck(wordToCheck);
    };
};

function recursiveRightCheck(t) {
    let upperBound = GAME.boardSize * (Math.floor(t.pos[0] / (GAME.boardSize) + 1));
    let toCheck = t.pos[t.pos.length - 1] + 1;
    if (toCheck > upperBound || toCheck > Math.pow(GAME.boardSize, 2) || !GAME.board[toCheck] || GAME.board[toCheck].tile == null) {
        return t;
    };
    t.word += GAME.board[toCheck].tile.letter;
    t.pos.push(toCheck);
    GAME.board[toCheck].checked.h = 1;
    
    return recursiveRightCheck(t);
};