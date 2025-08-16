import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { } from "./playerHand"
import { } from "./board";
import { } from "./mouse";
import { GAMESTATE } from "./global";
import { wordList } from "./wordslist";

function checkBoard() {
  for (let i = 0; i < GAMESTATE.board.length; i++) {
    if (GAMESTATE.board[i].tile && GAMESTATE.board[i].checked.h == 0) {
      let myString = { w: '', p: [] };
      GAMESTATE.board[i].checked.h = 1
      let upperBound = GAMESTATE.boardSize * (Math.floor(GAMESTATE.board[i].id / (GAMESTATE.boardSize) + 1));

      for (let j = i; j < upperBound; j++) {
        if (GAMESTATE.board[j]) {
          if (GAMESTATE.board[j].tile) {
            myString.w += GAMESTATE.board[j].tile.letter;
            myString.p.push(GAMESTATE.board[j].id)
            GAMESTATE.board[j].checked.h = 1;
          } else { break }
        }
      }

      if (myString.w.length >= 2) {
        GAMESTATE.wordsToCheck.push(myString)
      }
    }

    if (GAMESTATE.board[i].tile && GAMESTATE.board[i].checked.v == 0) {
      let myString = '';
      GAMESTATE.board[i].checked.v = 1
      let upperBound = Math.pow(GAMESTATE.boardSize, 2);

      for (let j = i; j < upperBound; j += GAMESTATE.boardSize) {
        if (GAMESTATE.board[j]) {
          if (GAMESTATE.board[j].tile) {
            myString += GAMESTATE.board[j].tile.letter;
            GAMESTATE.board[j].checked.v = 1;
          } else { break }
        }
      }

      if (myString.length >= 2) {
        GAMESTATE.wordsToCheck.push(myString)
      }
    }
  }

  if (GAMESTATE.wordsToCheck.length > 0) {
    for (const c of GAMESTATE.wordsToCheck) {
      if (wordList.includes(c.w.toLowerCase())) {
       
      }
    }
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  GAMESTATE.wordsToCheck = [];

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