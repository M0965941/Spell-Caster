import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { grid, XINITIAL, YINITIAL, BOARDWIDTH } from "./board";
import { playerHand } from "./playerHand";
import { mouse } from "./mouse";
import { pointRectCollision, rectRectCollision } from "./helperFunctions";

animate();

function handleMouseEvents() {
  if (!pointRectCollision(mouse, XINITIAL, YINITIAL, BOARDWIDTH, BOARDWIDTH)) { mouse.board = -1 };
  if (mouse.lmb == 0) {
    mouse.board = -1
    mouse.tile = -1
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  for (const i of UIArray) {
    i.draw();
  }

  for (const g of grid) {
    g.draw();
    g.draw2();
    const found = playerHand.some(el => el.loc === g.id);
    if(!found){
      g.tile = { 'letter': '', 'points': 0 , id: -1}
    }
  };
  for (const h of playerHand) {
    h.draw();
    if (h.loc != -1) {
      grid[h.loc].tile = h.tile;
      if(!rectRectCollision(h.x,h.y,h.width,h.height,XINITIAL, YINITIAL, BOARDWIDTH, BOARDWIDTH)){
        h.loc = -1
      }
    }
    // console.log(grid[0].tile)
  };
  mouse.mainBoard = grid;
  handleMouseEvents();
}