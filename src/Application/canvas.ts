import circleGroup from './circleGroup'
import Circle from './circle';

function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow( x1 - x2, 2) + Math.pow(y1 - y2, 2));
}


export default class Canvas {
    public step: number;
    public wavelenght: number;
    public readonly element: HTMLCanvasElement;
    public readonly width: number;
    public readonly height: number;
    public readonly halfWidth: number;
    public readonly halfHeight: number;
    public readonly diagonal: number;

    private ctx: CanvasRenderingContext2D;
    private gradient: CanvasGradient;
    public groups: Array<circleGroup>;
    private interval: NodeJS.Timeout;

    public constructor(width: number, height: number, step=1, wavelenght=100) {
        this.width = width;
        this.height = height;
        this.halfWidth = Math.floor(this.width/2);
        this.halfHeight = Math.floor(this.height/2);
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
            this.ctx.drawImage(group.getImage(), 0, 0);
        });
    }

    public addCircle(x: number, y: number): void {
        let maxRadius = this.calculateDistanceToFurthestCorner(x, y);
        let newCircle = new Circle(1, maxRadius, x, y);

        for(let i=0; i<this.groups.length; i++) {
            if(this.groups[i].pointInside(x, y)) {
                continue;
            }
            this.groups[i].add(newCircle)
            return;
        }
        let newCircleGroup = new circleGroup(newCircle, this.width, this.height);
        newCircleGroup.ctx.strokeStyle = this.gradient;
        newCircleGroup.ctx.lineWidth = 5;
        this.groups.push(newCircleGroup);
    }

    private calculateDistanceToFurthestCorner(x: number, y: number) {
        if (x < this.halfWidth) 
        {
            if (y < this.halfHeight)
            {
                return distance(x, y, this.width, this.height);
            }
            else
            {
                return distance(x, y, this.width, 0);
            }
        }
        else
        {
            if (y < this.halfHeight)
            {
                return distance(x, y, 0, this.height);
            }
            else
            {
                return distance(x, y, 0, 0);
            }
        }
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
            if(this.groups.length > 0){
                let firstCircle = this.groups[0].circles[0];
                if(firstCircle.radius >= firstCircle.maxRadius) {
                    this.groups.shift();
                }
            }
            this.clearCanvas();
            this.drawFrame();
        }, this.wavelenght);
    }

    public stopDrawing(): void 
    {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}