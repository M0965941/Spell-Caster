import { ctx } from "./canvas";
import { pointRectCollision } from "./helperFunctions";
import { mouse } from "./mouse";

export class GameObject {
    constructor(x, y, w, h) {
        this.width = w
        this.height = h
        this.x = x
        this.y = y
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}

export class UI extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    };
};

export class BoardTile extends GameObject {
    constructor(x, y, w, h, tile, i) {
        super(x, y, w, h);
        this.tile = tile
        this.active = 0;
        this.color = 'black';
        this.id = i;
    };
    draw() {
        ctx.save();
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;        
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();


    }
    draw2(){
        if (mouse.tile !== -1 && pointRectCollision(mouse, this.x, this.y, this.width, this.height)) {
            this.color = 'blue'
            mouse.board = this
         } else {
            this.color = 'black';
         }
    }
}

export class PlayerTile extends BoardTile {
    constructor(x, y, w, h, tile) {
        super(x, y, w, h, tile);
        this.id = tile.id
        this.loc = -1
        this.xo = x;
        this.yo = y;
    };
    draw() {
        super.draw();
        if (mouse.lmb && pointRectCollision(mouse, this.x, this.y, this.width, this.height)) {
            if (mouse.tile == -1) {
                mouse.tile = this;
            }
        }
        if (this.id == mouse.tile.id) {
            mouse.tile = this;
            this.x = mouse.x - this.width / 2
            this.y = mouse.y - this.height / 2
            this.color = 'red'
        }

        if (mouse.lmb == 0) {
            if(mouse.board != -1 && this.id == mouse.tile.id && mouse.mainBoard[mouse.board.id].tile.id == -1){
                this.x = mouse.board.x
                this.y = mouse.board.y
                this.loc = mouse.board.id
            } 
            
            if(this.loc === -1){
                this.x = this.xo;
                this.y = this.yo;
            }
            this.color = 'rgba(255,255,255,0.5)'
        }

    }
}