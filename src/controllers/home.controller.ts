import { Request, Response } from "express";
import fetch from "node-fetch";

export const GET = async (req: Request, res: Response) => {
	const result = await (await fetch("http://127.0.0.1:8080")).json();
	res.json(result);
};
