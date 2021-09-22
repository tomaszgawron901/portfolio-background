import { SolidArcAngles } from "./arcAngles";
import Circle from "./circle";

export class ArcPath extends SolidArcAngles{
    circle: Circle
    next: ArcPath;

    constructor(circle: Circle, startAngle: number = 0, endAngle: number = 2*Math.PI) {
        super(startAngle, endAngle);
        this.circle = circle;
        this.next = this;
    }

    public forEach(callbackfn: (value: ArcPath) => void): void {
        let path: ArcPath = this;
        do{
            callbackfn(path);
            path = path.next;
        }
        while(path != this);
    }

    public go(ctx: CanvasRenderingContext2D) {
        let path: ArcPath = this;
        do{
            ctx.arc(path.circle.center.x, path.circle.center.y, path.circle.radius, path.startAngle, path.endAngle);
            path = path.next;
        }
        while(path != this);
    }

    // ony if you know that this colides
    public findNextWithColidingCircle(circle: Circle): ArcPath{
        let path: ArcPath = this.next;
        while(path != this) {
            if(path.circle.colideWith(circle)) {
                return path;
            }
            path = path.next;
        }
        return this;
    }

    public findNextIntersecting


    public findLastIntersecting(circle: Circle){
        let path: ArcPath = this.next; 
        while(path != this) {
            if(path.circle.colideWith(circle)) {
                return
            }
            path = path.next;
        }
        return this;
    }


    public static tryAddCircleToArcPaths(newCircle: Circle, existingPaths: ArcPath[]): boolean {
        let isAdded = false;
        const newPaths: ArcPath[] = [new ArcPath(newCircle)];


        for(let i = 0; i < existingPaths.length; i++) {

            let path: ArcPath = existingPaths[i];
            const firstPath = path;
            do{
                if(path.circle !== newCircle && path.circle.colideWith(newCircle)) {
                    const intersectionAngles = path.circle.getIntersectionAngles(newCircle);
                    const pathCircleIntersections = intersectionAngles.selfIntersectionAngles;
                    const newCircleIntersections = intersectionAngles.otherIntersectionAngles;
                    if(path.containsAngle(pathCircleIntersections.startAngle)) {
                        if(path.containsAngle(pathCircleIntersections.endAngle)) {
                            // split up path
                        } else {
                            // remove end
                        }
                    }
                    else if(path.containsAngle(pathCircleIntersections.endAngle)) {
                        // remove begining
                    }
                    else if(pathCircleIntersections.containsIntersectionAngles(path)) {
                        // path is inside newCircle
                    }

                }
                path = path.next;
            }
            while(path != firstPath);

        }
        if(!isAdded) {
            existingPaths.push(newPaths[0]);
        }
        return isAdded;
    }
}