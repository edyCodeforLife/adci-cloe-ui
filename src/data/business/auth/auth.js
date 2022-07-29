
import { HandleError } from '../../services/error/error';
import { AuthServiceData } from '../../services/auth/auth';

export class AuthService {
	constructor() {
		this._service = new AuthServiceData();
	}

	async Login(req, handler) {
		try {
			const response = await this._service.Login(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async RegistrationCustomer(req, handler) {
		try {
			const response = await this._service.RegistrationCustomer(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}