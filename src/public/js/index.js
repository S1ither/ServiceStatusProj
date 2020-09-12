var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Child, InfoPlace, Line, Parent } from "./components/index.js";
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
    constructor() {
        this.mainServiceCircle = new Parent("Healthy").element;
        this.memoryInfo = new InfoPlace();
        this.childArr = [];
        this.root = document.getElementById("root");
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.data = {};
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
            });
        }
    }
    updateData(page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`http://127.0.0.1:3000/${page}`)
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                this.data = (yield data.json());
                this.mainServiceCircle = new Parent("Healthy").element;
            }))
                .catch(() => (this.mainServiceCircle = new Parent("Unhealthy").element));
        });
    }
    switchParent(element) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ctx.moveTo(innerWidth / 2, innerHeight / 2);
            this.ctx.lineTo(innerWidth / 2, innerHeight / 1.7);
            this.ctx.lineTo(innerWidth / 2, innerHeight / 2);
            this.ctx.stroke();
            this.root.removeChild(this.mainServiceCircle);
        });
    }
    Init_() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateData();
            this.root.appendChild(this.mainServiceCircle);
            for (const [key, item] of this.data.entries.entries()) {
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
                    }
                    else {
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
        });
    }
}
