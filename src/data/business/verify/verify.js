import { HandleError } from "../../services/error/error";
import { VerifyServiceData } from "../../services/verify/verify";

export class VerifyService {
	constructor() {
		this._service = new VerifyServiceData();
	}

	async PostSaveCheckWatchlist(req, handler) {
		try {
			const response = await this._service.PostSaveCheckWatchlist(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveCheckFDC(req, handler) {
		try {
			const response = await this._service.PostSaveCheckFDC(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveCheckPefindo(req, handler) {
		try {
			const response = await this._service.PostSaveCheckPefindo(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}