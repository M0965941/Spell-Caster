import { ctx, canvas } from "./canvas";

export class GameObject {
    constructor(x,y,w,h) {
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
    constructor(x,y,w,h){
        super(x,y,w,h);
    };
};

export class BoardTile extends GameObject {
        constructor(x,y,w,h,tile){
        super(x,y,w,h);
        tile: tile
    };
}