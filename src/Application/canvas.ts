import circleGroup from './circleGroup'
import Circle from './circle';

const colors = ['#ff0000', '#ffdd00', '#40ff00', '#00ff99', '#00d0ff', '#ee00ff'];

export default class Canvas {
    public step: number;
    public wavelenght: number;
    public readonly element: HTMLCanvasElement;
    public readonly width: number;
    public readonly height: number;

    private ctx: CanvasRenderingContext2D;
    public groups: Array<circleGroup>;
    private interval: NodeJS.Timeout;

    public constructor(width: number, height: number, step=1, wavelenght=100) {
        this.width = width;
        this.height = height;

        this.element = document.createElement('CANVAS') as HTMLCanvasElement;
        this.element.width = width;
        this.element.height = height;

        this.ctx = this.element.getContext('2d');

        this.groups = new Array<circleGroup>();

        this.step = step;
        this.wavelenght = wavelenght;
    }

    private clearCanvas(): void {
        const data = this.ctx.getImageData(0, 0, this.width, this.height);
        const dataLenght = data.data.length;
        for( let i=3; i<dataLenght; i+=4 ) {
            data.data[i] *= 0.65;
        }
        this.ctx.putImageData(data,0 ,0);
    }

    public drawFrame(): void {
        this.groups.forEach(group => {
            this.ctx.drawImage(group.getImage(this.width, this.height), 0, 0);
        });
    }

    public addCircle(x: number, y: number) {
        let newCircle = new Circle(colors[Math.floor(Math.random() * 6)], 20, x, y);
    }

    public startDrawing(): void {
        if(this.interval) {
            return;
        }
        this.ctx.globalCompositeOperation = 'source-over';
        this.interval = setInterval(() => {
            this.groups.forEach(group => {
                group.circles.forEach(circle => {
                    circle.radius += this.step;
                });
            });
            this.clearCanvas();
            this.drawFrame();
        }, this.wavelenght);
    }

    public dispose(): void {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }
}