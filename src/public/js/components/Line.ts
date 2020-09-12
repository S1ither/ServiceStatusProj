export default class {
	element: HTMLDivElement;
	constructor() {
		this.element = document.createElement("div");
		this.element.classList.add("diag");
		this.display = "none";
	}

	public set deg({ withX, withY }: { withX: number; withY: number }) {
		const x = innerWidth / 2 - withX;
		const y = withY - innerHeight / 2;
		if (x == 0 || y == 0)
			if (x == 0) {
				this.element.style.rotate = `${90}deg`;
				this.width = y;
			} else {
				this.element.style.rotate = `${0}deg`;
				this.width = x;
			}
		const deg = x / y;
		this.element.style.rotate = `${deg}deg`;
	}
	public set width(width: number) {
		this.element.style.width = `${width}px`;
	}
	public set display(value: "none" | "block") {
		this.element.style.display = value;
	}
}
