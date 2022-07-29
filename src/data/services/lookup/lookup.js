
import { EP_LOOKUP_CUSTOMER_TYPE, EP_LOOKUP_FINANCING_SERVICE, EP_LOOKUP_BUSINESS_LINE, EP_LOOKUP_COMPANY_TYPE, EP_LOOKUP_COMPANY_DOC_BG, EP_LOOKUP_COMPANY_DOC_AKTA, EP_LOOKUP_COMPANY_DOC_KEMENKUMHAM, EP_LOOKUP_CITY, EP_LOOKUP_COUNTRY, EP_LOOKUP_STATE, EP_LOOKUP_BUSINESSAREACOVERAGE } from '@utility/Endpoints';
import { DataService } from '../config';

export class LookupServiceData {
	GetCustomerType() {
		return DataService.get(EP_LOOKUP_CUSTOMER_TYPE);
	}

	GetFinancingService() {
		return DataService.get(EP_LOOKUP_FINANCING_SERVICE);
	}

	GetCompanyType(customerType) {
		return DataService.get(`${EP_LOOKUP_COMPANY_TYPE}?customerType=${customerType}`);
	}

	GetCompanyBGDocument() {
		return DataService.get(EP_LOOKUP_COMPANY_DOC_BG);
	}

	GetCompanyAktaDocument() {
		return DataService.get(EP_LOOKUP_COMPANY_DOC_AKTA);
	}

	GetCompanyKemenkumhamDocument() {
		return DataService.get(EP_LOOKUP_COMPANY_DOC_KEMENKUMHAM);
	}

	GetBusinessLine() {
		return DataService.get(EP_LOOKUP_BUSINESS_LINE);
	}

	GetCountryList() {
		return DataService.get(EP_LOOKUP_COUNTRY);
	}

	GetCityList() {
		return DataService.get(EP_LOOKUP_CITY);
	}

	GetStateList() {
		return DataService.get(EP_LOOKUP_STATE);
	}

	GetBusinessAreaCoverage() {
		return DataService.get(EP_LOOKUP_BUSINESSAREACOVERAGE);
	}

}