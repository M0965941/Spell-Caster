import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { } from "./playerHand";
import { } from "./board";
import { } from "./mouse";
import { GAME } from "./global";
import { wordList } from "./wordslist";

function checkBoard() {
  for (let i = 0; i < GAME.board.length; i++) {
    if (GAME.board[i].tile) {
      if (GAME.board[i].checked.h == 0) {
        wordCheck('h', i);
      };

      if (GAME.board[i].checked.v == 0) {
        wordCheck('v', i);
      };
    };
  };

  GAME.points = 0;
  if (GAME.wordsToCheck.length > 0) {
    for (const c of GAME.wordsToCheck) {
      if (wordList.includes(`|${c.w.toLowerCase()}|`)) {
        GAME.validWords.push(c.w)
        for (const j of c.p) {

          let o = GAME.playerHand.find((e) => e.linkedID == j);
          if (o) {
            o.validWord = 1
            GAME.points += o.points
          }
        }
      } else {GAME.invalidWords.push(c.w)}
    }
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  GAME.wordsToCheck = [];
  GAME.validWords = [];
  GAME.invalidWords = [];
  for (const i of UIArray) {
    i.draw();
  }
  checkBoard();
  for (const g of GAME.board) {
    g.draw();
    g.checked.h = 0;
    g.checked.v = 0;
  };
  for (const h of GAME.playerHand) {
    h.draw();
  };
};
animate();

function wordCheck(direction, i) {
  let myString = { w: '', p: [], pts: 0 };
  let upperBound;
  let iterable;

  if (direction == 'h') {
    iterable = 1;
    upperBound = GAME.boardSize * (Math.floor(GAME.board[i].id / (GAME.boardSize) + 1));
  } else if (direction == 'v') {
    iterable = GAME.boardSize;
    upperBound = Math.pow(GAME.boardSize, 2);
  }

  GAME.board[i].checked[direction] = 1;

  for (let j = i; j < upperBound; j += iterable) {
    if (GAME.board[j]) {
      if (GAME.board[j].tile) {
        myString.w += GAME.board[j].tile.letter;
        myString.p.push(GAME.board[j].id);
        myString.pts += GAME.board[j].tile.points
        GAME.board[j].checked[direction] = 1;
      } else { break }
    }
  }

  if (myString.w.length >= 2) {
    GAME.wordsToCheck.push(myString)
  }

  if (myString.w.length < 2) {
    let o = GAME.playerHand.find((e) => e.linkedID == i);
    if (o) {
      o.validWord = 0
    }
  }
}