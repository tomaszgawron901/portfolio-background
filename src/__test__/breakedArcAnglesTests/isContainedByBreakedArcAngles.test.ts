import { ArcAngles } from "../../Application/arcAngles";
import { MathValues } from "../../Application/mathValues";

test("BreakedArcAngle is contained by BreakedArcAngle", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.25;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    for(let testData of [
        {start: 0.6, end: 0.3},
        {start: 0.75, end: 0.3},
        {start: 0.6, end: 0.25},
    ]) {
        const startAngle2 = MathValues.PI2 * testData.start;
        const endAngle2 = MathValues.PI2 * testData.end;
        const breakedArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
        expect(breakedArcAngles.isContainedByBreakedArcAngles(breakedArcAngles2)).toBe(true);
    }
});

test("BreakedArcAngle is not contained by SolidArcAngle", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.25;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    for(let testData of [
        {start: 0.8, end: 0.2},
        {start: 0.8, end: 0.25},
        {start: 0.75, end: 0.2},
    ]) {
        const startAngle2 = MathValues.PI2 * testData.start;
        const endAngle2 = MathValues.PI2 * testData.end;
        const breakedArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
        expect(breakedArcAngles.isContainedByBreakedArcAngles(breakedArcAngles2)).toBe(false);
    }
});