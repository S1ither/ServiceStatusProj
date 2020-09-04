import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import express from "express";
import fs from "fs";
import { join } from "path";

export default class App {
	private port: number;
	private host: string;
	private app = express();

	constructor(port?: number, host?: string) {
		this.port = port ?? 3000;
		this.host = host ?? "127.0.0.1";

		this.middlewares();
		this.routes();
	}

	private middlewares() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieparser());
		for (const item of fs.readdirSync(join(__dirname, "middleware"))) {
			if (/^\w+\.js|ts$/i.test(item)) {
				let file = require(`./middleware/${item}`).default;
				this.app.use(file);
			}
		}
	}

	private routes() {
		for (const item of fs.readdirSync(join(__dirname, "routes"))) {
			if (/^\w+\.router.js|ts$/i.test(item)) {
				let file = require(`./routes/${item}`).default;
				this.app.use(file);
			}
		}
	}

	public listen() {
		this.app.listen({ host: this.host, port: this.port }, () => {
			console.log(`Server http start on port: ${this.port}`);
		});
	}
}
