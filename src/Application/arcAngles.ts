import { MathValues } from "./mathValues";

export abstract class ArcAngles {
    startAngle: number;
    endAngle: number;

    protected constructor(startAngle: number, endAngle: number) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    public abstract containsAngle(angle: number): boolean;

    public abstract containsArcAngles(other: ArcAngles): boolean;

    public abstract isContainedByBreakedArcAngles(other: BreakedArcAngles): boolean;

    public abstract isContainedBySolidArcAngles(other: SolidArcAngles): boolean;

    public haveCommonPart(other: ArcAngles): boolean {
        return this.containsAngle(other.startAngle) || this.containsAngle(other.endAngle);
    }

    public static create(startAngle: number, endAngle: number): ArcAngles {
        if(startAngle > endAngle) {
            return new BreakedArcAngles(startAngle, endAngle);
        }
        return new SolidArcAngles(startAngle, endAngle);
    }
}

export class BreakedArcAngles extends ArcAngles {

    public containsAngle(angle: number): boolean
    {
        return angle <= this.endAngle || angle >= this.startAngle;
    }

    public containsArcAngles(other: ArcAngles): boolean {
        return other.isContainedByBreakedArcAngles(this);
    }

    public isContainedByBreakedArcAngles(other: BreakedArcAngles): boolean {
        return other.endAngle >= this.endAngle && other.startAngle <= this.startAngle;
    }

    public isContainedBySolidArcAngles(other: SolidArcAngles): boolean {
        return other.startAngle == 0 && other.endAngle == MathValues.PI2;
    }
}

export class SolidArcAngles extends ArcAngles {
    public containsAngle(angle: number): boolean
    {
        return angle >= this.startAngle && angle <= this.endAngle;
    }

    public containsArcAngles(other: ArcAngles): boolean {
        return other.isContainedBySolidArcAngles(this);
    }

    public isContainedByBreakedArcAngles(other: BreakedArcAngles): boolean {
        return this.startAngle >= other.startAngle || this.endAngle <= other.endAngle;
    }

    public isContainedBySolidArcAngles(other: SolidArcAngles): boolean {
        return other.startAngle <= this.startAngle && other.endAngle >= this.endAngle;
    }
}