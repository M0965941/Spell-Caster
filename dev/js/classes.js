import { ctx } from "./canvas";
import { GAME } from "./global";
import { pointRectCollision } from "./helperFunctions";

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
        this.checked = { h: 0, v: 0 };
    };
    draw() {
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        if (GAME.selectedTile !== null && pointRectCollision(GAME.mouse, this) && (this.tile == null || this.tile.active == 1)) {
            this.color = 'red'
        } else {
            this.color = 'black'
        };

        if (this.tile == null) {
            this.placeable = 1
        }

        if (this.tile != null) {
            if (GAME.mouse.lmb == 0) {
                this.placeable = 0;
            }

            if (GAME.selectedTile) {
                if (GAME.mouse.lmb == 1 && GAME.selectedTile.id == this.tile.id) {
                    this.tile = null
                };
            };
        };
    };
};

export class PlayerTile extends GameObject {
    constructor(x, y, w, h, tile) {
        super(x, y, w, h, tile);
        this.id = tile.id;
        this.xo = x;
        this.yo = y;
        this.Movable = 1;
        this.letter = tile.letter;
        this.points = tile.points
        this.linkedID = -1;
        this.validWord = 0;
    };

    draw() {
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'black';
        ctx.font = "20px serif";
        ctx.fillText(this.letter, this.x + this.width / 3, this.y + this.height / 1.5);
        ctx.restore();

        if (pointRectCollision(GAME.mouse, this) && GAME.selectedTile == null && this.Movable) {
            this.color = 'rgba(255, 234, 0, 0.75)';
            if (GAME.mouse.lmb) {
                GAME.selectedTile = structuredClone(this);
                GAME.selectedTile.draw = this.draw;
            }
        } else {
            if (this.validWord) {
                this.color = 'rgba(0, 255, 51, 1)';
            } else {
                this.color = 'rgba(255, 255, 255, 1)';
            }
        }

        if (GAME.selectedTile !== null) {
            if (GAME.selectedTile.id === this.id) {
                this.color = 'rgba(225,225,225,0.25)';

                this.x = GAME.mouse.x - this.width / 2;
                this.y = GAME.mouse.y - this.height / 2;

                let boardTile = GAME.board.find((e) => pointRectCollision(GAME.mouse, e) && e.placeable);

                if (boardTile) {
                    this.x = boardTile.x;
                    this.y = boardTile.y;
                    GAME.board[boardTile.id].tile = GAME.selectedTile;
                    this.linkedID = boardTile.id;
                } else {
                    this.linkedID = -1;
                }
            };
        };

        if (this.linkedID == -1 && GAME.mouse.lmb == 0) {
            this.x = this.xo;
            this.y = this.yo;
            this.validWord = 0;
        };
    };
};