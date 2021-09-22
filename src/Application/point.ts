export class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distanceTo(point: Point): number {
        return Point.distanceBetween(this, point);
    }

    public equals(point: Point): boolean {
        return Point.equals(this, point);
    }

    public angleBetween(point: Point): number {
        return Point.angleBetween(this, point);
    }

    public static distanceBetween(p1: Point, p2: Point): number {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    public static equals(p1: Point, p2: Point): boolean {
        return p1.x == p2.x && p1.y == p2.y;
    }

    public static angleBetween(p1: Point, p2: Point): number {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }
}