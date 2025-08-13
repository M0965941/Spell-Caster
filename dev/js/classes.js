import { ctx, canvas } from "./canvas";

export class GameObject {
    constructor() {
        this.dx = 1
        this.dy = 0
        this.width = 50
        this.height = 50
        this.x = canvas.width / 2
        this.y = canvas.height / 2 - this.height/2
    }

    draw() {
        this.x += this.dx
        this.y += this.dy
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        if(this.x > canvas.width){
            this.x = -this.height
        }
    }
}