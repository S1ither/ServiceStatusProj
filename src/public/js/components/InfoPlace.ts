export default class {
	public element: HTMLDivElement;
	constructor() {
		this.element = document.createElement("div");
		this.element.classList.add("focus-info");
		this.display = "none";
	}
	public set display(value: "none" | "block") {
		this.element.style.display = value;
	}
}
