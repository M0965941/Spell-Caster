import { canvas, ctx } from "./canvas";
import { UIArray } from "./UI";
import { grid } from "./board";

canvas.addEventListener('mouseup', (e) => {
  console.log('Do something with the left mouse button');
});

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
}