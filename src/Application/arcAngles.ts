import { MathValues } from "./mathValues";

export abstract class ArcAngles {
    startAngle: number;
    endAngle: number;

    protected constructor(startAngle: number, endAngle: number) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    public abstract containsAngle(angle: number): boolean;

    public abstract containsIntersectionAngles(other: ArcAngles): boolean;

    public abstract isContainedByBreakedIntersectionAngles(other: BreakedArcAngles): boolean;

    public abstract isContainedBySolidIntersectionAngles(other: SolidArcAngles): boolean;

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
        return angle < this.endAngle || angle > this.startAngle;
    }

    public containsIntersectionAngles(other: ArcAngles): boolean {
        return other.isContainedByBreakedIntersectionAngles(this);
    }

    public isContainedByBreakedIntersectionAngles(other: BreakedArcAngles): boolean {
        return other.endAngle > this.endAngle && other.startAngle < this.startAngle;
    }

    public isContainedBySolidIntersectionAngles(other: SolidArcAngles): boolean {
        return other.startAngle == 0 && other.endAngle == MathValues.PI2;
    }
}

export class SolidArcAngles extends ArcAngles {
    public containsAngle(angle: number): boolean
    {
        return angle > this.startAngle && angle < this.endAngle;
    }

    public containsIntersectionAngles(other: ArcAngles): boolean {
        return other.isContainedBySolidIntersectionAngles(this);
    }

    public isContainedByBreakedIntersectionAngles(other: BreakedArcAngles): boolean {
        return this.startAngle == 0 && this.endAngle == MathValues.PI2;
    }

    public isContainedBySolidIntersectionAngles(other: SolidArcAngles): boolean {
        return other.startAngle < this.startAngle && other.endAngle > this.endAngle;
    }
}