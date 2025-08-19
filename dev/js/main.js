import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { handlePlayerHand } from "./playerHand";
import { drawBoard } from "./board";
import { } from "./mouse";
import { } from "./setup";
import { GAME } from "./global";

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  GAME.points = 0
  GAME.hasInvalidWords = 0;

  handlePlayerHand();
  drawBoard();
  for (const i of UIArray) { i.draw(); }
  if (GAME.selectedTile) { GAME.selectedTile.draw(); }

  GAME.validWords = [];
  GAME.enemy.draw();
  GAME.pouch.draw();
};
animate();