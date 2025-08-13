import { GameObject } from "./classes";
import { canvas, ctx } from "./canvas";

let gameObjectArray = [new GameObject()];

canvas.addEventListener('mouseup', (e) => {
  console.log('Do something with the left mouse button');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    console.log('Do something with the right key');
  }

  if (e.key === 'ArrowLeft') {
    console.log('Do something with the left key');
  }

  if (e.key === 'ArrowDown') {
    console.log('Do something with the down key');
  }

  if (e.key === 'ArrowUp') {
    console.log('Do something with the up key');
  }
});

animate();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  for (const i of gameObjectArray) {
    i.draw();
  }
}