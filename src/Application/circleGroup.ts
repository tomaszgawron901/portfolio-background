import Circle from './circle'

const PI2 = Math.PI*2;

export default class CircleGroup {
    public circles: Array<Circle>;
    public largesCircle: Circle;

    public constructor(firstCircle: Circle) {
        this.circles = new Array<Circle>();
        this.circles.push(firstCircle);
        this.largesCircle = firstCircle;
    }

    public add(circle: Circle) {
        this.circles.push(circle);
    }

    public getImage(width: number, height: number) {
        let canvas = document.createElement('CANVAS') as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = 5;

        ctx.globalCompositeOperation = 'screen';
        this.circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            ctx.closePath();
            ctx.strokeStyle = circle.color;
            ctx.stroke();
        });

        ctx.globalCompositeOperation = 'destination-out';
        this.circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            ctx.closePath();
            ctx.fill();
        });
        return canvas;
    }
}