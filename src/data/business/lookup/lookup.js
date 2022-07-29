
import { HandleError } from '../../services/error/error';
import { LookupServiceData } from '../../services/lookup/lookup';

export class LookupService {
	constructor() {
		this._service = new LookupServiceData();
	}

	async GetCustomerType(handler) {
		try {
			const response = await this._service.GetCustomerType();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetFinancingService(handler) {
		try {
			const response = await this._service.GetFinancingService();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCompanyType(customerType, handler) {
		try {
			const response = await this._service.GetCompanyType(customerType);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCompanyBGDocument(handler) {
		try {
			const response = await this._service.GetCompanyBGDocument();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCompanyAktaDocument(handler) {
		try {
			const response = await this._service.GetCompanyAktaDocument();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCompanyKemenkumhamDocument(handler) {
		try {
			const response = await this._service.GetCompanyKemenkumhamDocument();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetBusinessLine(handler) {
		try {
			const response = await this._service.GetBusinessLine();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCountryList(handler) {
		try {
			const response = await this._service.GetCountryList();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCityList(handler) {
		try {
			const response = await this._service.GetCityList();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetStateList(handler) {
		try {
			const response = await this._service.GetStateList();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetBusinessAreaCoverage(handler) {
		try {
			const response = await this._service.GetBusinessAreaCoverage();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}