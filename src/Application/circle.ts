import { ArcAngles } from "./arcAngles";
import { IntersectionAnglesPair } from "./intersectionAnglesPair";
import { MathValues } from "./mathValues";
import { Point } from "./point";

export default class Circle {
    public center: Point;

    private _radiusSqr : number;
    public get radiusSqr() : number {
        return this._radiusSqr;
    }
    private set radiusSqr(v : number) {
        this._radiusSqr = v;
    }
    
    private _radius : number;
    public get radius() : number {
        return this._radius;
    }
    public set radius(v : number) {
        this._radius = v;
        this.radiusSqr = v*v;
    }
    

    public constructor(radius: number, point: Point ) {
        this.radius = radius;
        this.center = point;
    }

    public angleBetweenCenters(circle: Circle)  {
        return Circle.angleBetweenCenters(this, circle);
    }

    public pointInside(point: Point): boolean {
        return Circle.pointInside(this, point);
    }

    public intersectWith(circle: Circle): boolean {
        return Circle.intersectWith(this, circle);
    }

    public colideWith(circle: Circle): boolean {
        return Circle.colideWith(this, circle);
    }

    public getIntersectionAnglesPair(other: Circle): IntersectionAnglesPair {
        const distance = Point.distanceBetween(this.center, other.center);
        const distance2 = distance*2;
        const distanceSqr = distance * distance;
        const c1_angleBetweenCenters = this.angleBetweenCenters(other);
        const c2_angleBetweenCenters = MathValues.addAngle(c1_angleBetweenCenters, Math.PI);
        const c1_intersectionAngle = Math.acos((this.radiusSqr + distanceSqr - other.radiusSqr)/(distance2*this.radius));
        const c2_intersectionAngle = Math.acos((other.radiusSqr + distanceSqr - this.radiusSqr)/(distance2*other.radius));
        return {
            selfIntersectionAngles: ArcAngles.create(
                MathValues.subAngle(c1_angleBetweenCenters, c1_intersectionAngle), 
                MathValues.addAngle(c1_angleBetweenCenters, c1_intersectionAngle)
            ), 
            otherIntersectionAngles: ArcAngles.create(
                MathValues.subAngle(c2_angleBetweenCenters, c2_intersectionAngle), 
                MathValues.addAngle(c2_angleBetweenCenters, c2_intersectionAngle)
            )
        };
    }

    public static pointInside(circle: Circle, point: Point) {
        return circle.center.distanceTo(point) <= circle.radius;
    }

    public static colideWith(c1: Circle, c2: Circle): boolean {
        const radiusSum = c1.radius + c2.radius;
        const xDifference = c1.center.x - c2.center.x;
        const yDifference = c1.center.y - c2.center.y;
        return radiusSum*radiusSum > xDifference*xDifference + yDifference*yDifference;
    }

    public static intersectWith(c1: Circle, c2: Circle): boolean {
        const distance = Point.distanceBetween(c1.center, c2.center);
        return distance < c1.radius + c2.radius && c1.radius < distance + c2.radius && c2.radius < distance + c1.radius;
    }

    public static angleBetweenCenters(c1: Circle, c2: Circle) {
        return c1.center.angleBetween(c1.center);
    }
}