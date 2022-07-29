
import { EP_LOGIN_TOKEN, EP_LOOKUP_REGISTRATION_CUSTOMER } from '@utility/Endpoints';
import { DataService } from '../config';

export class AuthServiceData {
	Login(req) {
		return DataService.post(EP_LOGIN_TOKEN, req);
	}

	RegistrationCustomer(req) {
		return DataService.post(EP_LOOKUP_REGISTRATION_CUSTOMER, req);
	}
}