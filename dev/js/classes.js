import { ctx } from "./canvas";
import { GAME } from "./global";
import { pointRectCollision } from "./helperFunctions";

export class GameObject {
    constructor(x, y, w, h) {
        this.width = w
        this.height = h
        this.x = x
        this.y = y
        this.isMouseOver = 0
    };
    checkIfMouseOver() {
        if (pointRectCollision(GAME.mouse, this)) { this.isMouseOver = 1 } else { this.isMouseOver = 0 }
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    };
};

export class CastButton extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.color = 'darkred'
    };
    draw() {
        super.checkIfMouseOver();
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();


        if (GAME.invalidWords.length == 0 && GAME.validWords.length > 0) {
            this.color = 'darkgreen'

            if (this.isMouseOver && GAME.mouse.lmb) {
                console.log(`Damage the guy for ${GAME.points}`)
            }
        } else {
            this.color = 'darkred'
        }


    }
}

export class UI extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    };
};

export class BoardTile extends GameObject {
    constructor(x, y, w, h, id) {
        super(x, y, w, h);
        this.color = 'black';
        this.tile = null;
        this.id = id;
        this.checked = { h: 0, v: 0 };
    };
    draw() {
        super.checkIfMouseOver();
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        if (this.isMouseOver) {
            this.color = 'red'
        } else {
            this.color = 'black'
        };

        if (this.tile == null) {
            this.placeable = 1
        }

        if (this.tile != null) {
            this.tile.x = this.x
            this.tile.y = this.y
            if (GAME.selectedTile) {
                if (GAME.mouse.lmb == 1 && GAME.selectedTile.id == this.tile.id) {
                    this.tile = null
                };
            };
        };
    };
};

export class PlayerTile extends GameObject {
    constructor(tile) {
        super(tile);
        this.id = tile.id;
        this.Movable = 1;
        this.letter = tile.letter;
        this.points = tile.points;
        this.validWord = 0;
        this.color = 'white'
    };

    draw() {
        super.checkIfMouseOver();
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

        if (this.isMouseOver && GAME.selectedTile == null && this.Movable) {
            this.color = 'rgba(255, 234, 0, 0.75)';
            if (GAME.mouse.lmb) {
                console.log(this)
                GAME.selectedTile = {...this};
                GAME.selectedTile.draw = this.draw;
            }
        }  else {
            this.color = 'rgba(255, 255, 255, 1)';

        }
    };
};