import { HandleError } from "../../services/error/error";
import { VerificationByCMServiceData } from "../../services/merchant/verificationByCM";

export class VerificationByCMService {
	constructor() {
		this._service = new VerificationByCMServiceData();
	}

	async getScoringFactorByCM(handler) {
		try {
			const response = await this._service.GetScoringFactor();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async saveScoringFactorByCM(payload, handler) {
		try {
			const response = await this._service.SaveScoringFactor(payload);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async saveCreditMemoByCM(payload, handler) {
		try {
			const response = await this._service.SaveCreditMemo(payload);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async approveCreditAssesmentByCM(payload, handler) {
		try {
			const response = await this._service.ApproveCreditAssesmentByCM(payload);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getProductListByCM(handler)
	{
		try {
			const response = await this._service.GetProductListByCM(handler);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}