import {BreakedArcAngles, SolidArcAngles, ArcAngles} from '../../Application/arcAngles';

test("ArcAngles correctly create BreakedArcAngles", () => {
    const startAngle = Math.PI;
    const endAngle = 0;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    expect(breakedArcAngles).toBeInstanceOf(BreakedArcAngles);
});

test("ArcAngles correctly create SolidArcAngles", () => {
    const startAngle = 0;
    const endAngle = Math.PI;
    const breakedArcAngles = ArcAngles.create(startAngle, endAngle);
    expect(breakedArcAngles).toBeInstanceOf(SolidArcAngles);
});