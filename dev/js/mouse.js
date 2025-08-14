import { canvas } from "./canvas";

export let mouse =  {
    x: 0,
    y: 0,
    lmb: 0,
}

canvas.addEventListener('mouseup', (e) => {
  mouse.lmb = 0
});
canvas.addEventListener('mousedown', (e) => {
  
    mouse.lmb = 1
});

canvas.addEventListener('mousemove', (e) => {
  let rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});