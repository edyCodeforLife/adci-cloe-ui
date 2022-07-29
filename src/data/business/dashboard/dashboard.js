import { MerchantDashboardData } from "../../services/dashboard/dashboard";
import { HandleError } from "../../services/error/error";

export class MerchantDashboardService {
	constructor() {
		this._service = new MerchantDashboardData();
	}

	async getCMDashboardData(userId, handler) {
		try {
			const response = await this._service.GetCMDashboardData(userId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getCommitteeDashboardData(userId, handler) {
		try {
			const response = await this._service.GetCommitteeDashboardData(userId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getBDDashboardData(userId, handler) {
		try {
			const response = await this._service.GetBDDashboardData(userId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}