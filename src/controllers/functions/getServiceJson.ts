import fetch from "node-fetch";
import { statusProd } from "../../config";
import { ServiceObj, ServiceResponse } from "../../typings";

export async function getServiceJSON(url: string): Promise<ServiceObj> {
	const result = await fetch(url);
	const obj: ServiceObj = {
		status: "Healthy",
		entries: [],
	};
	const resultObj = (await result.json()) as ServiceResponse;
	if (resultObj.entries)
	for (const [key, item] of resultObj.entries.entries()) {
		if (/^(http)\w+/i.test(`${key}`))
			if (statusProd) {
				const url_ = `https://core-report.astralnalog.ru/${`${key}`.slice(`http://report-online-`.length)}`;
				obj.entries.push({
					status: item.status,
					entries: [/* await getServiceJSON(url_) */],
				});
			} else {
				obj.entries.push({
					status: item.status,
					entries: [/* await getServiceJSON(`${key}`) */],
				});
			}
		else
			obj.entries.push({
				status: item.status,
				entries: [],
			});
	}
	return obj;
}
