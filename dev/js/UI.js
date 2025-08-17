import { CastButton, UI, EnemyHealth } from "./classes";
import { GAME } from "./global";
import { BOARDWIDTH, YINITIAL } from "./setup";

export const UIArray = [
  new EnemyHealth(canvas.width / 2 - 125, 50, 250, 10), // Enemy Health
  new UI(canvas.width / 2 - 150, 400, 400, 15), // Player Health
  new UI(0, 400 - 25 + 7, 50, 50), // Left Pouch
  new CastButton(canvas.width / 2 - (GAME.tilewidth / 2), YINITIAL + BOARDWIDTH + GAME.tilewidth * 1.75, GAME.tilewidth, GAME.tilewidth * 0.6)
];