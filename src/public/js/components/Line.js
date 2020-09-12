export default class {
    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("diag");
        this.display = "none";
    }
    set deg({ withX, withY }) {
        const x = innerWidth / 2 - withX;
        const y = withY - innerHeight / 2;
        if (x == 0 || y == 0)
            if (x == 0) {
                this.element.style.rotate = `${90}deg`;
                this.width = y;
            }
            else {
                this.element.style.rotate = `${0}deg`;
                this.width = x;
            }
        const deg = x / y;
        this.element.style.rotate = `${deg}deg`;
    }
    set width(width) {
        this.element.style.width = `${width}px`;
    }
    set display(value) {
        this.element.style.display = value;
    }
}
