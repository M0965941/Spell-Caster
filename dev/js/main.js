import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { handlePlayerHand } from "./playerHand";
import { drawBoard } from "./board";
import { } from "./mouse";
import { } from "./setup";
import { GAME } from "./global";
import { wordList } from "./wordslist";

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  GAME.wordsToCheck = [];

  for (const i of UIArray) {i.draw();}
  handlePlayerHand();
  drawBoard();

  if (GAME.selectedTile) {GAME.selectedTile.draw();}

  GAME.validWords = [];
  GAME.invalidWords = [];
};
animate();