import { ArcAngles, SolidArcAngles } from "./arcAngles";
import Circle from "./circle";
import { IntersectionAnglesPair } from "./intersectionAnglesPair";

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


    public findFirstColidingWithCircle(circle: Circle): ArcPath{
        let path: ArcPath = this;
        do {
            if(path.circle.colideWith(circle)) {
                return path;
            }
            path = path.next;
        } while(path != this);
        return null;
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

    public findNextIntersectingPath(other: ArcPath): {path: ArcPath, intersectionAngles: ArcAngles} {
        let path: ArcPath = this.next;
        while(path != this) {
            if(path.circle.colideWith(other.circle)) {
                const intersectionAngles = path.circle.getIntersectionAnglesPair(other.circle);
                if (path.haveCommonPart(intersectionAngles.selfIntersectionAngles)) {
                    return {path: path, intersectionAngles: intersectionAngles.selfIntersectionAngles};
                }
            }
            path = path.next;
        }
        return null;
    }


    public findLastIntersectingPath(circle: Circle): { path: ArcPath, intersectionAnglesPair: IntersectionAnglesPair}
    {
        let path: ArcPath = this.next;
        while(path != this) {
            if(path.circle.colideWith(circle)) {
                const intersectionAnglesPair = path.circle.getIntersectionAnglesPair(circle);
                if (path.containsAngle(intersectionAnglesPair.selfIntersectionAngles.endAngle)) {
                    return {path: path, intersectionAnglesPair: intersectionAnglesPair};
                }
            }
            path = path.next;
        }
        return null;
    }

    public tryAddCircle(newCirclePaths: ArcPath[]): {isAdded: boolean, outerPath: ArcPath, innerPaths: ArcPath[]} {
        const newCircle = newCirclePaths[0].circle;
        let path: ArcPath = this.findFirstColidingWithCircle(newCircle);
        if(path == null) {
            return {
                isAdded: false,
                outerPath: this,
                innerPaths: []
            }
        }

        const output: {isAdded: boolean, outerPath: ArcPath, innerPaths: ArcPath[]} = {
            isAdded: true,
            outerPath: null,
            innerPaths: []
        }

        let outerPath: ArcPath;
        const innerPaths: ArcPath[] = [];

        const pathIntersectionAnglesPair = path.circle.getIntersectionAnglesPair(newCircle);
        if(path.containsAngle(pathIntersectionAnglesPair.selfIntersectionAngles.startAngle)) {
            let outPath: ArcPath;
            let circleIntersectionAngles: ArcAngles;
            if(path.containsAngle(pathIntersectionAnglesPair.selfIntersectionAngles.endAngle)) {
                // split apart
                outPath = new ArcPath(path.circle, pathIntersectionAnglesPair.selfIntersectionAngles.endAngle, path.endAngle);
                outPath.next = path.next;

                circleIntersectionAngles = pathIntersectionAnglesPair.otherIntersectionAngles;
            } else {
                // remove end / find begining
                const out = path.findLastIntersectingPath(newCircle);
                const outintersectionAnglesPair = out.intersectionAnglesPair;
                outPath = out.path;

                outPath.startAngle = outintersectionAnglesPair.selfIntersectionAngles.endAngle;

                circleIntersectionAngles = ArcAngles.create(
                    outintersectionAnglesPair.otherIntersectionAngles.startAngle,
                    pathIntersectionAnglesPair.otherIntersectionAngles.endAngle
                );
            }

            const inCirclePath = newCirclePaths.find(x => x.containsAngle(pathIntersectionAnglesPair.otherIntersectionAngles.endAngle));
            inCirclePath.startAngle = pathIntersectionAnglesPair.otherIntersectionAngles.endAngle;

            const outCirclePath = newCirclePaths.find(x => x.containsAngle(circleIntersectionAngles.startAngle));
            outCirclePath.next = outPath; // not finished, u might want to split path
            outCirclePath.endAngle = circleIntersectionAngles.startAngle;

            path.next = inCirclePath;
            path.endAngle = pathIntersectionAnglesPair.selfIntersectionAngles.startAngle;

            output.outerPath = path;
            path = outPath.next;
        }
        else {
            if(path.containsAngle(pathIntersectionAnglesPair.selfIntersectionAngles.endAngle)) {
                // remove begining
            }
            else{
                // path is inside newCircle
            }
        }


        while(path != this) {

        }
    }

    public static tryAddCircleToArcPaths(newCircle: Circle, existingPaths: ArcPath[]): ArcPath[] {
        const newPaths: ArcPath[] = [];
        const newCirclePaths: ArcPath[] = [new ArcPath(newCircle)];

        for(let i = 0; i < existingPaths.length; i++) {
            existingPaths[i].tryAddCircle(newCirclePaths);
        }
        if(!isAdded) {
            existingPaths.push(newCirclePaths[0]);
        }
        return isAdded;
    }
}