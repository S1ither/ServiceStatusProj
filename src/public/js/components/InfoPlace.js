export default class {
    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("focus-info");
        this.display = "none";
    }
    set display(value) {
        this.element.style.display = value;
    }
}
