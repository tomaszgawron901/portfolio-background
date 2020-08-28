import Canvas from './canvas';

function randn_bm() {
    var rand = 0;
    
    for (var i = 0; i < 3; i += 1) {
        rand += Math.random();
    }
    
    return rand / 3;
}

export class App {

    private intervals: NodeJS.Timeout[];
    private canvas: Canvas;

    constructor() {
        document.onvisibilitychange = ()=>{ this.onVisibilityChange() };
        window.onresize = ()=>{ this.onWindowsResize() };

        this.intervals = new Array<NodeJS.Timeout>();
        this.canvas = new Canvas(window.innerWidth, window.innerHeight, 2, 50);
        document.body.appendChild(this.canvas.element);

        this.start();
    }

    public start() {
        this.intervals.push(setInterval(()=> {
            this.canvas.addCircle(Math.floor((randn_bm()*this.canvas.width)), Math.floor((randn_bm()*this.canvas.height)));
        }, 1333));
        this.intervals.push(setInterval(()=> {
            this.canvas.addCircle(Math.floor((randn_bm()*this.canvas.width)), Math.floor((randn_bm()*this.canvas.height)));
        }, 8888))
        this.intervals.push(setInterval(()=> {
            this.canvas.addCircle(Math.floor((randn_bm()*this.canvas.width)), Math.floor((randn_bm()*this.canvas.height)));
        }, 6666))
        this.canvas.startDrawing();
    }

    public stop() {
        while(this.intervals.length > 0) {
            clearInterval(this.intervals.pop());
        }
        this.canvas.stopDrawing();
    }

    private onVisibilityChange() {
        if(document.visibilityState == "visible")
        {
            this.start();
        }
        else
        {
            this.stop();
        }
    }

    private onWindowsResize() {
        this.stop();
        this.canvas.resizeCanvas(window.innerWidth, window.innerHeight);
        this.start();
    }

}