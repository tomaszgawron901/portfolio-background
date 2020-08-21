import Circle from './circle'

const PI2 = Math.PI*2;

export default class CircleGroup {
    public circles: Array<Circle>;
    public largesCircle: Circle;

    private canvas: HTMLCanvasElement;
    
    private _ctx : CanvasRenderingContext2D;
    public get ctx() : CanvasRenderingContext2D {
        return this._ctx;
    }

    public constructor(firstCircle: Circle, canvasWidh: number, canvasHeight: number) {
        this.canvas = document.createElement('CANVAS') as HTMLCanvasElement;
        this.canvas.width = canvasWidh;
        this.canvas.height = canvasHeight;
        this._ctx = this.canvas.getContext('2d');
        
        this.circles = new Array<Circle>();
        this.circles.push(firstCircle);
        this.largesCircle = firstCircle;
    }

    public pointInside(x: number, y: number): boolean {
        for(let i=0; i<this.circles.length; i++) {
            if(this.circles[i].pointInside(x, y)) {
                return true;
            }
        }
        return false;
    }

    public add(circle: Circle) {
        this.circles.push(circle);
    }

    public getImage() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.globalCompositeOperation = 'screen';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            this.ctx.closePath();
            this.ctx.stroke();
        });

        this.ctx.globalCompositeOperation = 'destination-out';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            this.ctx.closePath();
            this.ctx.fill();
        });
        return this.canvas;
    }
}