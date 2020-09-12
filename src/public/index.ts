import App from "./js";

const app = new App();

onload = async () => {
	await app.Init_();
};

onresize = async () => {
	const PIXEL_RATIO = window.devicePixelRatio;
	app.canvas.width = innerWidth * PIXEL_RATIO;
	app.canvas.height = innerHeight * PIXEL_RATIO;
	app.ctx.scale(PIXEL_RATIO, PIXEL_RATIO);
};
