import Circle from "./Circle.js";
export default class extends Circle {
    constructor() {
        super();
        this.element.classList.add("child");
        this.display = "none";
    }
    set display(value) {
        this.element.style.display = value;
    }
    set status(value) {
        this.element.classList.add(value);
    }
}
