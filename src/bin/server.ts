import App from "../App";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import moment from "moment"

new App().listen();

const testService = express();
testService.use(bodyParser.json());
testService.use(bodyParser.urlencoded({ extended: true }));
testService.get("/", (req, res) => {
	/* const origin = /((?:http|https)\:\/\/127\.0\.0\.1:\d\d\d\d)/i.exec(req.headers.origin!);
	res.setHeader("Access-Control-Allow-Origin", `${origin![0]}`);
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS, POST");
	res.setHeader("Access-Control-Allow-Headers", "*"); */
	res.setHeader("Content-Type", "application/json");
	res.json({
		status: "Healthy",
		upTime: moment().locale("ru").format("dddd, MMMM DD YYYY, HH:mm:ss"),
	});
});
http.createServer(testService).listen({ host: "127.0.0.1", port: 8080 });
