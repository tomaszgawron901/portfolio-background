export class MathValues {
    public static readonly PI2 = Math.PI * 2;
    public static readonly RADIAN = 180 / Math.PI;


    public static addAngle(a: number, b: number): number {
        const mod = (a+b)%this.PI2;
        return mod == 0 ? this.PI2 : mod;
    }

    public static subAngle(a: number, b: number): number {
        const mod = (a-b)%this.PI2;
        return mod > 0 ? mod : mod + this.PI2;
    }

    public static normalizeAngle(angle: number): number {
        const mod = (angle)%this.PI2;
        return mod > 0 ? mod : mod + this.PI2;
    }
}