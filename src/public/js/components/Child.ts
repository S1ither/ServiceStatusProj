import { serviceStatus } from "../../../typings";
import Circle from "./Circle";

export default class extends Circle {
	constructor() {
		super();
		this.element.classList.add("child");
		this.display = "none";
	}

	public set display(value: "none" | "block") {
		this.element.style.display = value;
	}

	public set status(value: serviceStatus) {
		this.element.classList.add(value);
	}
}
