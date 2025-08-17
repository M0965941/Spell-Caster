import { CastButton, UI } from "./classes";

export const UIArray = [
  // new UI(0, 407.5, 400, 1000), // Play area bg
  new UI(canvas.width / 2 - 125, 50, 250, 15), // Enemy Health
  new UI(canvas.width / 2 - 150, 400, 400, 15), // Player Health
  new UI(0, 400-25+7, 50, 50), // Left Pouch
  new CastButton(canvas.width / 2 - 50/2, 50,50,50)
];