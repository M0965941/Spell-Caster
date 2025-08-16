import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { } from "./playerHand"
import { } from "./board";
import { } from "./mouse";
import { GAMESTATE } from "./global";
import { wordList } from "./wordslist";

function checkBoard() {
  for (let i = 0; i < GAMESTATE.board.length; i++) {
    if (GAMESTATE.board[i].tile) {
      if (GAMESTATE.board[i].checked.h == 0) {
        wordCheck('h', i)
      }

      if (GAMESTATE.board[i].checked.v == 0) {
        wordCheck('v', i)
      }
    }
  };

  GAMESTATE.points = 0;
  if (GAMESTATE.wordsToCheck.length > 0) {
    for (const c of GAMESTATE.wordsToCheck) {
      if (wordList.includes(`|${c.w.toLowerCase()}|`)) {
        GAMESTATE.validWords.push(c.w)
        for (const j of c.p) {

          let o = GAMESTATE.playerHand.find((e) => e.linkedID == j);
          if (o) {
            o.validWord = 1
            GAMESTATE.points += o.points
          }
        }
      }
    }
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  GAMESTATE.wordsToCheck = [];
  GAMESTATE.validWords = [];
  for (const i of UIArray) {
    i.draw();
  }
  checkBoard();
  for (const g of GAMESTATE.board) {
    g.draw();
    g.checked.h = 0;
    g.checked.v = 0;
  };
  for (const h of GAMESTATE.playerHand) {
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
    upperBound = GAMESTATE.boardSize * (Math.floor(GAMESTATE.board[i].id / (GAMESTATE.boardSize) + 1));
  } else if (direction == 'v') {
    iterable = GAMESTATE.boardSize;
    upperBound = Math.pow(GAMESTATE.boardSize, 2);
  }

  GAMESTATE.board[i].checked[direction] = 1;

  for (let j = i; j < upperBound; j += iterable) {
    if (GAMESTATE.board[j]) {
      if (GAMESTATE.board[j].tile) {
        myString.w += GAMESTATE.board[j].tile.letter;
        myString.p.push(GAMESTATE.board[j].id);
        myString.pts += GAMESTATE.board[j].tile.points
        GAMESTATE.board[j].checked[direction] = 1;
      } else { break }
    }
  }

  if (myString.w.length >= 2) {
    GAMESTATE.wordsToCheck.push(myString)
  }

  if (myString.w.length < 2) {
    let o = GAMESTATE.playerHand.find((e) => e.linkedID == i);
    if (o) {
      o.validWord = 0
    }
  }
}