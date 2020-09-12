var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import App from "./js/index.js";
const app = new App();
onload = () => __awaiter(void 0, void 0, void 0, function* () {
    yield app.Init_();
});
onresize = () => __awaiter(void 0, void 0, void 0, function* () {
    const PIXEL_RATIO = window.devicePixelRatio;
    app.canvas.width = innerWidth * PIXEL_RATIO;
    app.canvas.height = innerHeight * PIXEL_RATIO;
    app.ctx.scale(PIXEL_RATIO, PIXEL_RATIO);
});
