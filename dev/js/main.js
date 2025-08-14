import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { grid } from "./board";
import { mouse } from "./mouse";

animate();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  for (const i of UIArray) {
    i.draw();
  }

  for (const g of grid) {
    g.draw();
  }

  console.log(mouse)
}