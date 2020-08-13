
export default class Circle {
    public color: string | CanvasGradient;
    public radius: number;
    public x: number;
    public y: number;

    public constructor(color: string | CanvasGradient, radius: number, x: number, y: number ) {
        this.color = color;
        this.radius = radius;
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