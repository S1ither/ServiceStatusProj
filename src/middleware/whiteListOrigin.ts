import { Request, Response } from "express";

const whiteListOrigin = async (req: Request, res: Response, next: any) => {
	const origin = /((?:http|https)\:\/\/127\.0\.0\.1:\d\d\d\d)/i.exec(req.headers.origin!);
	res.setHeader("Access-Control-Allow-Origin", `${origin?[0] : `127.0.0.1:\d\d\d\d`}`);
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS, POST");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader("Content-Type", "application/json");
	return next();
};

export default whiteListOrigin;
