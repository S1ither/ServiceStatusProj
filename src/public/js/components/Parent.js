import Circle from "./Circle.js";
export default class extends Circle {
    constructor(status) {
        super();
        this.element.classList.add("parent", status);
        this.element.style.left = "50%";
        this.element.style.top = "50%";
    }
}
