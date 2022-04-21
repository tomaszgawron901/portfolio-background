import { ArcAngles } from "../../Application/arcAngles";
import { MathValues } from "../../Application/mathValues";

test("SolidArcAngle contains angle", () => {
    const startAngle = MathValues.PI2 * 0.25;
    const endAngle = MathValues.PI2 * 0.75;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.25)).toBe(true);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.3)).toBe(true);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.5)).toBe(true);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.7)).toBe(true);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.75)).toBe(true);
});

test("SolidArcAngle not contains angle", () => {
    const startAngle = MathValues.PI2 * 0.25;
    const endAngle = MathValues.PI2 * 0.75;
    const solidArcAngles = ArcAngles.create(startAngle, endAngle);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.75000001)).toBe(false);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.9)).toBe(false);
    expect(solidArcAngles.containsAngle(MathValues.PI2)).toBe(false);
    expect(solidArcAngles.containsAngle(0)).toBe(false);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.1)).toBe(false);
    expect(solidArcAngles.containsAngle(MathValues.PI2 * 0.24999999)).toBe(false);
});