import circleGroup from './circleGroup'
import Circle from './circle';

const colors = ['#ff0000', '#ffdd00', '#40ff00', '#00ff99', '#00d0ff', '#ee00ff'];

export default class Canvas {
    public step: number;
    public wavelenght: number;
    public readonly element: HTMLCanvasElement;
    public readonly width: number;
    public readonly height: number;
    public readonly diagonal: number;

    private ctx: CanvasRenderingContext2D;
    private gradient: CanvasGradient;
    public groups: Array<circleGroup>;
    private interval: NodeJS.Timeout;

    public constructor(width: number, height: number, step=1, wavelenght=100) {
        this.width = width;
        this.height = height;
        this.diagonal = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height,2))

        this.element = document.createElement('CANVAS') as HTMLCanvasElement;
        this.element.width = width;
        this.element.height = height;

        this.ctx = this.element.getContext('2d');
        this.gradient = this.ctx.createLinearGradient(0, 0, this.diagonal, this.diagonal);
        this.gradient.addColorStop(0.0, '#ff5500');
        this.gradient.addColorStop(0.5 ,"#ffee00");
        this.gradient.addColorStop(1.0, "#ff5500");

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

    public addCircle(x: number, y: number): void {
        let newCircle = new Circle(this.gradient, 1, x, y);

        for(let i=0; i<this.groups.length; i++) {
            if(this.groups[i].pointInside(x, y)) {
                continue;
            }
            this.groups[i].add(newCircle)
            return;
        }
        this.groups.push(new circleGroup(newCircle));
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
            if(this.groups[0].circles[0].radius >= this.diagonal) {
                this.groups.shift();
            }
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