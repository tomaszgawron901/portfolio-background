import { ArcAngles } from "../../Application/arcAngles";
import { MathValues } from "../../Application/mathValues";

test("SolidArcAngle is contained by SolidArcAngle", () => {
    const startAngle = MathValues.PI2 * 0.3;
    const endAngle = MathValues.PI2 * 0.6;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(true);
});

test("SolidArcAngle is contained by SolidArcAngle (both angles the same)", () => {
    const startAngle = MathValues.PI2 * 0.25;
    const endAngle = MathValues.PI2 * 0.75;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(true);
});

test("SolidArcAngle is not contained by SolidArcAngle (both angles smaller)", () => {
    const startAngle = MathValues.PI2 * 0.1;
    const endAngle = MathValues.PI2 * 0.15;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(false);
});

test("SolidArcAngle is not contained by SolidArcAngle (all angles greater)", () => {
    const startAngle = MathValues.PI2 * 0.8;
    const endAngle = MathValues.PI2 * 0.9;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(false);
});

test("SolidArcAngle is not contained by SolidArcAngle (first smaller second greater)", () => {
    const startAngle = MathValues.PI2 * 0.1;
    const endAngle = MathValues.PI2 * 0.9;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(false);
});

test("SolidArcAngle is not contained by SolidArcAngle (first smaller second between)", () => {
    const startAngle = MathValues.PI2 * 0.1;
    const endAngle = MathValues.PI2 * 0.5;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(false);
});

test("SolidArcAngle is not contained by SolidArcAngle (first between second greater)", () => {
    const startAngle = MathValues.PI2 * 0.5;
    const endAngle = MathValues.PI2 * 0.9;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = MathValues.PI2 * 0.25;
    const endAngle2 = MathValues.PI2 * 0.75;
    const solidArcAngles2 = ArcAngles.create(startAngle2, endAngle2);
    expect(solidArcAngles.isContainedBySolidArcAngles(solidArcAngles2)).toBe(false);
});