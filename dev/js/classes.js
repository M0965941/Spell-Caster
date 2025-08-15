import { ctx } from "./canvas";
import { GAMESTATE } from "./global";
import { pointRectCollision, rectRectCollision } from "./helperFunctions";

export class GameObject {
    constructor(x, y, w, h) {
        this.width = w
        this.height = h
        this.x = x
        this.y = y
    };

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    };
};

export class UI extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    };
};

export class BoardTile extends GameObject {
    constructor(x, y, w, h, id) {
        super(x, y, w, h);
        this.active = 0;
        this.color = 'black';
        this.tile = null;
        this.placeable = 1;
        this.id = id;
    };
    draw() {
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        if (GAMESTATE.selectedTile !== null && pointRectCollision(GAMESTATE.mouse, this) && (this.tile == null || this.tile.active == 1)) {
            this.color = 'red'
        } else {
            this.color = 'black'
        };

        if (this.tile == null) {
            this.placeable = 1
        }

        if (this.tile != null) {
            if (GAMESTATE.mouse.lmb == 0) {
                this.placeable = 0;
            }

            if (GAMESTATE.selectedTile) {
                if (GAMESTATE.mouse.lmb == 1 && GAMESTATE.selectedTile.id == this.tile.id) {
                    this.tile = null
                }

            }
        }
    }
}

export class PlayerTile extends GameObject {
    constructor(x, y, w, h, tile) {
        super(x, y, w, h, tile);
        this.id = tile.id;
        this.xo = x;
        this.yo = y;
        this.active = 1;
        this.letter = tile.letter;
        this.points = tile.points;
        this.linkedID = -1;
    };

    draw() {
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        if (pointRectCollision(GAMESTATE.mouse, this) && GAMESTATE.selectedTile == null) {
            this.color = 'rgba(255, 234, 0, 0.75)';
            if (GAMESTATE.mouse.lmb) {
                GAMESTATE.selectedTile = structuredClone(this);
                GAMESTATE.selectedTile.draw = this.draw;
            }
        } else {
            this.color = 'rgba(255, 255, 255, 1)';
        }

        if (GAMESTATE.selectedTile !== null) {
            if (GAMESTATE.selectedTile.id === this.id) {
                this.color = 'rgba(225,225,225,0.25)';

                this.x = GAMESTATE.mouse.x - this.width / 2;
                this.y = GAMESTATE.mouse.y - this.height / 2;

                let boardTile = GAMESTATE.board.find((e) => pointRectCollision(GAMESTATE.mouse, e) && e.placeable);

                if (boardTile) {
                    this.x = boardTile.x;
                    this.y = boardTile.y;
                    GAMESTATE.board[boardTile.id].tile = GAMESTATE.selectedTile;
                    this.linkedID = boardTile.id;
                } else {
                    this.linkedID = -1;
                }
            };
        };
        
        if (this.linkedID == -1 && GAMESTATE.mouse.lmb == 0) {
            this.x = this.xo;
            this.y = this.yo;
        };
    };
};