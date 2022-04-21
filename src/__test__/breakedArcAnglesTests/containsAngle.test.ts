import { ArcAngles } from "../../Application/arcAngles";
import { MathValues } from "../../Application/mathValues";

test("BreakedArcAngle contains angle", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.25;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.75)).toBe(true);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.9)).toBe(true);
    expect(breakedArcAngles.containsAngle(MathValues.PI2)).toBe(true);
    expect(breakedArcAngles.containsAngle(0)).toBe(true);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.1)).toBe(true);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.25)).toBe(true);
});

test("BreakedArcAngle not contains angle", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.25;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.2500000001)).toBe(false);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.3)).toBe(false);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.5)).toBe(false);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.7)).toBe(false);
    expect(breakedArcAngles.containsAngle(MathValues.PI2 * 0.7499999999)).toBe(false);
});