import { EP_APPROVE_CM_CREDIT_ANALYSIS_ASSESMENT, EP_CM_GET_PRODUCT_LIST, EP_SAVE_CREDIT_MEMO, EP_SAVE_SCORING_FACTOR, EP_SCORING_FACTOR } from '../../../utility/Endpoints';
import { DataService } from '../config';

export class VerificationByCMServiceData {
	GetScoringFactor() {
		return DataService.get(EP_SCORING_FACTOR);
	}
	SaveScoringFactor(req) {
		return DataService.post(EP_SAVE_SCORING_FACTOR, req)
	}
	SaveCreditMemo(req) {
		return DataService.post(EP_SAVE_CREDIT_MEMO, req)
	}
	ApproveCreditAssesmentByCM(req) {
		return DataService.post(EP_APPROVE_CM_CREDIT_ANALYSIS_ASSESMENT, req)
	}
	GetProductListByCM()
	{
		return DataService.get(EP_CM_GET_PRODUCT_LIST)
	}
}