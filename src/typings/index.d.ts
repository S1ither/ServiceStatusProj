import { Child,Line} from "../public/js/components";

export type serviceStatus = "Healthy" | "Unhealthy" | "Degraded";

export type ServiceObj = {
	description?: string;
	status: serviceStatus;
	entries: ServiceObj[];
};

export type ServiceResponse = {
	status: serviceStatus;
	totalDuration: string;
	entries: Service[];
};

type Service = {
	data: Object;
	status: serviceStatus;
	duration: string;
	description?: string;
};

export type ChildArr = {
	/* diag: Line */
	child: Child
}