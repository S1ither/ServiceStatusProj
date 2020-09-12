import { serviceStatus } from "../../../typings";
import Circle from "./Circle";

export default class extends Circle {
	
	constructor(status: serviceStatus) {
		super();
		this.element.classList.add("parent", status);
		this.element.style.left = "50%";
		this.element.style.top = "50%";
	}
}
