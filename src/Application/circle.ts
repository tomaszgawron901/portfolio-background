
export default class Circle {
    public maxRadius: number;
    public radius: number;
    public x: number;
    public y: number;

    public constructor(radius: number, maxRadius: number, x: number, y: number ) {
        this.radius = radius;
        this.maxRadius = maxRadius;
        this.x = x;
        this.y = y;
    }

    public pointInside(x: number, y: number): boolean {
        let xDistance = Math.abs(this.x - x);
        if(xDistance > this.radius) {
            return false;
        }

        let yDistance = Math.abs(this.y - y);
        if(yDistance > this.radius) {
            return false;
        }

        let distance = Math.sqrt(Math.pow( xDistance, 2) + Math.pow(yDistance, 2));
        return distance <= this.radius;
    }
}