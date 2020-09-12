import { Request, Response } from "express";
import { urlServices } from "../config";
import { ServiceObj, ServiceResponse } from "../typings";
import { getServiceJSON } from "./functions/getServiceJson";
import fetch from "node-fetch";

export const GET = async (req: Request, res: Response) => {
	const obj: ServiceObj = {
		status: "Healthy",
		entries: [],
	};
	let page = +req.params.page ?? 0;
	for (const [key, urlService] of urlServices.entries()) {
		if (page * 7 <= key && key < page * 7 + 7) {
			const result = /* await getServiceJSON(urlService); */ (await (
				await fetch(urlService)
			).json()) as ServiceResponse;
			obj.entries.push({
				status: result.status,
				description: result.entries[result.entries.length - 1]?.description
					? result.entries[result.entries.length - 1]?.description
					: undefined,
				entries: [],
			});
		}
	}
	res.json(obj);
};
