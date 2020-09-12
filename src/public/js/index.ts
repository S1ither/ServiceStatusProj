import { ChildArr, ServiceObj } from "../../typings";
import { Child, InfoPlace, Line, Parent } from "./components";

const radius = 200;
const k = 0.7;
const serviceCirclePos = [
	{
		posX: innerWidth / 2,
		posY: innerHeight / 2 - radius,
	},
	{
		posX: innerWidth / 2 + radius * k,
		posY: innerHeight / 2 + radius * k,
	},
	{
		posX: innerWidth / 2 - radius * k,
		posY: innerHeight / 2 + radius * k,
	},
	{
		posX: innerWidth / 2 + radius,
		posY: innerHeight / 2,
	},
	{
		posX: innerWidth / 2 - radius,
		posY: innerHeight / 2,
	},
	{
		posX: innerWidth / 2 + radius * k,
		posY: innerHeight / 2 - radius * k,
	},
	{
		posX: innerWidth / 2 - radius * k,
		posY: innerHeight / 2 - radius * k,
	},
];
export default class App {
	private mainServiceCircle: HTMLDivElement = new Parent("Healthy").element;
	private memoryInfo: InfoPlace = new InfoPlace();
	private childArr = [] as ChildArr[];
	public readonly root = document.getElementById("root")!;
	public readonly canvas = document.querySelector("canvas")!;
	public readonly ctx = this.canvas.getContext("2d")!;
	private data = {} as ServiceObj;

	constructor() {
		this.canvas.width = innerWidth * devicePixelRatio;
		this.canvas.height = innerHeight * devicePixelRatio;
		this.ctx.lineWidth = 2;
		this.root.appendChild(this.memoryInfo.element);
		for (const item of serviceCirclePos) {
			const _Child = new Child();
			_Child.element.style.left = `${item.posX}px`;
			_Child.element.style.top = `${item.posY}px`;
			const diagonal = new Line();
			/* diagonal.deg = {
                withX: item.posX,
                withY: item.posY,
            }; */
			this.childArr.push({
				child: _Child,
				/* diag: diagonal, */
			});
		}
	}

	public async updateData(page: number = 0) {
		await fetch(`http://127.0.0.1:3000/${page}`)
			.then(async (data) => {
				this.data = (await data.json()) as ServiceObj;
				this.mainServiceCircle = new Parent("Healthy").element;
			})
			.catch(() => (this.mainServiceCircle = new Parent("Unhealthy").element));
	}

	public async switchParent(element: HTMLDivElement) {
		this.ctx.moveTo(innerWidth / 2, innerHeight / 2);
		this.ctx.lineTo(innerWidth / 2, innerHeight / 1.7);
		this.ctx.lineTo(innerWidth / 2, innerHeight / 2);
		this.ctx.stroke();
		this.root.removeChild(this.mainServiceCircle);
	}

	public async Init_() {
		await this.updateData();
		this.root.appendChild(this.mainServiceCircle);
		for (const [key, item] of this.data.entries!.entries()) {
			const _Child = this.childArr[key].child;
			_Child.status = item.status;
			_Child.display = "block";
			_Child.element.id = `${item.id}`;
			this.root.appendChild(_Child.element);
			_Child.element.addEventListener("click", () => {
				if (_Child.element.classList.contains("focus")) {
					_Child.element.classList.toggle("focus");
					this.memoryInfo.display = "none";
					_Child.element.style.left = `${serviceCirclePos[key].posX}px`;
					_Child.element.style.top = `${serviceCirclePos[key].posY}px`;
				} else {
					_Child.element.removeAttribute("style");
					_Child.element.classList.toggle("focus");
					this.memoryInfo.display = "block";
					this.memoryInfo.element.textContent = "Test content";
				}
			});
			this.ctx.moveTo(innerWidth / 2, innerHeight / 2);
			this.ctx.lineTo(serviceCirclePos[key].posX, serviceCirclePos[key].posY);
			this.ctx.lineTo(innerWidth / 2, innerHeight / 2);
			this.ctx.stroke();
		}
	}
}
