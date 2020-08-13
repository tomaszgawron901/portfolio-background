import Canvas from './canvas';

function randn_bm() {
    var rand = 0;
    
    for (var i = 0; i < 3; i += 1) {
        rand += Math.random();
    }
    
    return rand / 3;
}

export class App {

    constructor() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let canvas = new Canvas(width, height, 2, 50);
        document.body.appendChild(canvas.element);
        setInterval(()=> {
            canvas.addCircle(Math.floor((randn_bm()*width)), Math.floor((randn_bm()*height)));
        }, 3333)
        setInterval(()=> {
            canvas.addCircle(Math.floor((randn_bm()*width)), Math.floor((randn_bm()*height)));
        }, 8888)
        setInterval(()=> {
            canvas.addCircle(Math.floor((randn_bm()*width)), Math.floor((randn_bm()*height)));
        }, 6666)
        canvas.startDrawing();
    }
}