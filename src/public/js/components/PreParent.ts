import Circle from "./Circle";

export default class extends Circle {
	constructor() {
		super();
		this.element.classList.add("pre-parent", "Healthy");
		this.element.style.left = "50%";
		this.element.style.top = `${innerHeight / 1.7}px`;
	}
}
