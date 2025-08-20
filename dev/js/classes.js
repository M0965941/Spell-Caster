import { canvas, ctx } from "./canvas";
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

export class EnemyHealth extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.HP = 100;
        this.maxHP = 100;
        this.isMoving = 0;
        this.dy = 1;
        this.dx = -5;
        this.spriteY = canvas.height * 0.35 - 10
        this.spriteX = canvas.width * 0.8 - GAME.tilewidth
        this.yo = canvas.height * 0.35
        this.MoveSpeed = 1
    };
    draw() {
        super.draw();
        this.drawEnemySprite();
        if (this.isMoving) { this.move() } else { this.spriteY = canvas.height * 0.35 - 10 };
        
        if (GAME.isPlayerTurn == 0) { this.attackPlayer() } else {this.spriteX = canvas.width * 0.8 - GAME.tilewidth}
        let hpDisplay = `${this.HP}/${this.maxHP}`
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.font = "20px serif";
        ctx.fillText(hpDisplay, canvas.width / 2 - ctx.measureText(hpDisplay).width / 2, this.y + 30);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, (this.HP / this.maxHP) * this.width, this.height);
        ctx.restore();
    }
    drawEnemySprite() {
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.spriteX, this.spriteY, GAME.tilewidth * 1.5, GAME.tilewidth * 1.5);
        ctx.restore();
    }
    move() {
        if (this.spriteY > this.yo) { this.dy = -this.MoveSpeed }
        if (this.spriteY < canvas.height * 0.35 - 10) { this.dy = this.MoveSpeed }
        this.spriteY += this.dy
    }
    attackPlayer() {
        if (this.spriteX < canvas.width * 0.8 - GAME.tilewidth - 10) { GAME.isPlayerTurn = 1}
        this.spriteX += this.dx
    }
};

export class CastButton extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    };
    draw() {
        super.checkIfMouseOver();
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        if (GAME.hasInvalidWords == 1 || GAME.points == 0) {

            this.color = 'darkred'
        } else {
            this.color = 'green'
            if (this.isMouseOver && GAME.mouse.lmb) {
                let temp = GAME.points;
                GAME.points = 0;
                GAME.enemy.HP -= temp;
                for (const b of GAME.board) {
                    if (b.tile) {
                        b.tile.Movable = 0;
                        b.tile.validWord = -1;
                    };
                };

                GAME.isPlayerTurn = 0
            };
        };
    };
};

export class UI extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    };
};

export class PlayerHealth extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.currentHealth = 50
        this.maximumHealth = 50
    };
    draw() {
        let hpDisplay = `${this.currentHealth}/${this.maximumHealth}`
        ctx.save();
        ctx.fillStyle = 'darkGreen';
        ctx.fillRect(this.x, this.y, (this.currentHealth / this.maximumHealth) * this.width, this.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = "20px serif";
        ctx.fillText(hpDisplay, canvas.width / 2 - ctx.measureText(hpDisplay).width / 3, this.y + 15);
        ctx.restore();
    };
};

export class Pouch extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.color = 'darkgreen';
        this.availableTiles = [];
    };
    draw() {
        super.checkIfMouseOver();
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        if (this.availableTiles.length <= 0 || GAME.currentActiveTile >= GAME.maximumHand || GAME.isPlayerTurn == 0) {
            this.color = 'darkred'
            this.widthrawable = 0
        } else {
            this.color = 'darkgreen'

            if (this.isMouseOver && GAME.mouse.lmb == 1) {
                this.widthrawable = 1
            };
        };
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

        if (this.isMouseOver && GAME.selectedTile) {
            this.color = 'red'
        } else {
            this.color = 'black'
        };

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
        super();
        this.id = tile.id;
        this.Movable = 1;
        this.letter = tile.letter;
        this.points = tile.points;
        this.validWord = -1;
    };

    draw() {
        super.checkIfMouseOver();
        let opacity;
        if (this.Movable) { opacity = 1; GAME.currentActiveTile++ } else { opacity = 0.75 }
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'black';
        ctx.font = "15px serif";
        ctx.fillText(`${this.letter}-${this.points}`, this.x + this.width / 3, this.y + this.height / 1.5);
        ctx.restore();

        if (this.isMouseOver && GAME.selectedTile == null && this.Movable) {
            this.color = 'rgba(255, 234, 0, 0.75)';
            if (GAME.mouse.lmb) {
                GAME.selectedTile = { ...this };
                GAME.selectedTile.draw = this.draw;
            }
        } else {
            if (this.validWord == 1) {
                this.color = `rgba(60, 255, 0, ${opacity})`;
            } else if (this.validWord == 0) {
                this.color = `rgba(255, 0, 0, ${opacity})`;
            } else {
                this.color = `rgba(255, 255, 255, ${opacity})`;
            }
        };
    };
};