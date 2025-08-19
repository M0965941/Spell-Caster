import { CastButton, UI, EnemyHealth, Pouch } from "./classes";
import { GAME } from "./global";
import { BOARDWIDTH, YINITIAL } from "./setup";

export const UIArray = [
  new UI(canvas.width / 2 - 150, 400, 400, 15), // Player Health
  new CastButton(canvas.width / 2 - (GAME.tilewidth / 2), YINITIAL + BOARDWIDTH + GAME.tilewidth * 1.75, GAME.tilewidth, GAME.tilewidth * 0.6)
];