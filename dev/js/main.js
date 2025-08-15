import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { } from "./playerHand"
import { } from "./board";
import { } from "./mouse";
import { rectRectCollision } from "./helperFunctions"
import { GAMESTATE } from "./global";


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  for (const i of UIArray) {
    i.draw();
  }

  for (const g of GAMESTATE.board) {
    g.draw();
  };

  for (const h of GAMESTATE.playerHand) {
    h.draw();
  };

};
animate();