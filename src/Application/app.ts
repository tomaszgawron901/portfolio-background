import Canvas from './canvas';
import Circle from './circle';
import CircleGroup from './circleGroup';

export class App {

    constructor() {
        let canvas = new Canvas(window.innerWidth, window.innerHeight, 2, 50);
        document.body.appendChild(canvas.element);
        const group = new CircleGroup(new Circle('red', 30, 200, 200));
        canvas.groups.push(group);
        group.add(new Circle('blue', 20, 220, 220));
        group.add(new Circle('green', 50, 400, 400));
        group.add(new Circle('yellow', 1, 300, 300));
        canvas.startDrawing();
    }
}