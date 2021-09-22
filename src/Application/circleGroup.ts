import { ArcPath } from './arcPath';
import Circle from './circle'
import { Point } from './point';

const PI2 = Math.PI*2;

export default class CircleGroup {
    public circles: Circle[];
    public largesCircle: Circle;
    public maxRadius:  number;
    public color: string;

    public constructor(firstCircle: Circle, maxRadius: number) {
        this.circles = [firstCircle];
        this.largesCircle = firstCircle;
        this.maxRadius = maxRadius;
    }

    public pointInside(point: Point): boolean {
        for(let i=0; i<this.circles.length; i++) {
            if(this.circles[i].pointInside(point)) {
                return true;
            }
        }
        return false;
    }

    public add(circle: Circle) {
        this.circles.push(circle);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color;
        this.createArcPaths().forEach(arcPath => {
            ctx.beginPath();
            arcPath.go(ctx);
            ctx.closePath();
        });
        ctx.stroke();
    }

    private createArcPaths(): ArcPath[] {
        const paths: ArcPath[] = [];
        this.circles.map(circle => new ArcPath(circle)).forEach(newPath => {
            let isPathAdded = false;
            paths.map(existingPath => {
                return existingPath.tryAddArcPath(newPath);
            });
            if(!isPathAdded) {
                //paths.push(...newPaths);
            }
        });

        return paths;
    }

    // public getImage() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //     this.ctx.globalCompositeOperation = 'source-over';
    //     this.circles.forEach(circle => {
    //         this.ctx.beginPath();
    //         this.ctx.arc(circle.point.x, circle.point.y, circle.radius, 0, PI2);
    //         this.ctx.closePath();
    //         this.ctx.stroke();
    //     });

    //     this.ctx.globalCompositeOperation = 'destination-out';
    //     this.circles.forEach(circle => {
    //         this.ctx.beginPath();
    //         this.ctx.arc(circle.point.x, circle.point.y, circle.radius, 0, PI2);
    //         this.ctx.closePath();
    //         this.ctx.fill();
    //     });
    //     return this.canvas;
    // }
}