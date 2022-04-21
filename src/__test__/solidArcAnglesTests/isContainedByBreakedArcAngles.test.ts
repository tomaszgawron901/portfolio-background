import { ArcAngles } from "../../Application/arcAngles";
import { MathValues } from "../../Application/mathValues";

test("SolidArcAngle is contained by BreakedArcAngle (both angles smaller than breakedArc end angle)", () => {
    const startAngle = MathValues.PI2 * 0.1;
    const endAngle = MathValues.PI2 * 0.2;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(true);
});

test("SolidArcAngle is contained by BreakedArcAngle (end angle equals breaked end, start smaller than breaked end)", () => {
    const startAngle = MathValues.PI2 * 0.1;
    const endAngle = MathValues.PI2 * 0.25;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(true);
});

test("SolidArcAngle is contained by BreakedArcAngle (both angles greated than breakedArc start angle)", () => {
    const startAngle = MathValues.PI2 * 0.8;
    const endAngle = MathValues.PI2 * 0.9;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(true);
});

test("SolidArcAngle is contained by BreakedArcAngle (start angle equals breaked start, end greater than breaked start)", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.9;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(true);
});

test("SolidArcAngle is not contained by BreakedArcAngle (both angles outside breakedArc)", () => {
    const startAngle = MathValues.PI2 * 0.6;
    const endAngle = MathValues.PI2 * 0.7;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(false);
});

test("SolidArcAngle is not contained by BreakedArcAngle (end greated than, start less than breaked end)", () => {
    const startAngle = MathValues.PI2 * 0.1;
    const endAngle = MathValues.PI2 * 0.5;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(false);
});

test("SolidArcAngle is not contained by BreakedArcAngle (end greater than, start less than breaked start)", () => {
    const startAngle = MathValues.PI2 * 0.5;
    const endAngle = MathValues.PI2 * 0.9;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.75;
    const endAngle2 = MathValues.PI2 * 0.25;
    const breakedArcAngle = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedByBreakedArcAngles(breakedArcAngle)).toBe(false);
});