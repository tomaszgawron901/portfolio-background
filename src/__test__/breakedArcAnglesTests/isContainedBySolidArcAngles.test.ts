import { ArcAngles } from "../../Application/arcAngles";
import { MathValues } from "../../Application/mathValues";

test("BreakedArcAngle is contained by SolidArcAngle (it only happens when solidArcAngles are whole)", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.25;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    const startAngle2 = 0;
    const endAngle2 = MathValues.PI2;
    const solidArcAngles = ArcAngles.create(startAngle2, endAngle2);
    expect(breakedArcAngles.isContainedBySolidArcAngles(solidArcAngles)).toBe(true);
});

test("BreakedArcAngle is not contained by SolidArcAngle", () => {
    const startAngle = MathValues.PI2 * 0.75;
    const endAngle = MathValues.PI2 * 0.25;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);

    for(let x = 0.0 ; x <= 1.0 ; x += 0.05) {
        for(let y = x ; y <= 1.0 ; y += 0.05) {
            const startAngle2 = MathValues.PI2 * x;
            const endAngle2 = MathValues.PI2 * y;
            const solidArcAngles = ArcAngles.create(startAngle2, endAngle2);
            expect(breakedArcAngles.isContainedBySolidArcAngles(solidArcAngles)).toBe(false);
        }
    }
});