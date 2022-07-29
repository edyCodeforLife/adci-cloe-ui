import { HandleError } from "../../services/error/error";
import { MerchantServiceData } from "../../services/merchant/merchant";

export class MerchantService {
	constructor() {
		this._service = new MerchantServiceData();
	}

	async GetLoanLimitBDRequestByUserId(userId, offset, limit, handler) {
		try {
			const response = await this._service.GetLoanLimitBDRequestByUserId(userId, offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetLoanLimitTransactionBDByUserId(userId, offset, limit, handler) {
		try {
			const response = await this._service.GetLoanLimitTransactionBDByUserId(userId, offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetMerchantDataByLoanLimitRequestID(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetMerchantDataByLoanLimitRequestID(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetMerchantCompanyTypeByLoanLimitRequestID(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetMerchantCompanyTypeByLoanLimitRequestID(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetBgFileLoanLimitRequestID(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetBgFileLoanLimitRequestID(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetMerchantStructure(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetMerchantStructure(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetMerchantInfo(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetMerchantInfo(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetMerchantDocument(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetMerchantDocument(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCustomerDataByLoanLimitRequestID(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetCustomerDataByLoanLimitRequestID(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async setReviewLoanLimitRequestByBD(payload, handler) {
		try {
			const response = await this._service.SetReviewLoanLimitRequestByBD(payload);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async setRejectLoanLimitRequestByBD(payload, handler) {
		try {
			const response = await this._service.SetRejectLoanLimitRequestByBD(payload);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCMApproveLoanLimitRequest(ids, offset,limit, handler) {
		try {
			const response = await this._service.GetCMApproveLoanLimitRequest(ids, offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCMUploadDocumentLoanLimitRequest(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetCMUploadDocumentLoanLimitRequest(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCMAPUPPTData(handler) {
		try {
			const response = await this._service.GetCMAPUPPTData();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCMApprovedLoanHistory(offset, limit, handler) {
		try {
			const response = await this._service.GetCMApprovedLoanHistory(offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getCMApprovedLoanLimitRequestHistoryDetail(loanlimitrequestId, handler) {
		try {
			const response = await this._service.GetCMApprovedLoanLimitRequestHistoryDetail(loanlimitrequestId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetCreditRecommendation(offset, limit, handler) {
		try {
			const response = await this._service.GetCreditRecommendation(offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveMerchantLoanLimitRequest(req, handler) {
		try {
			const response = await this._service.PostSaveMerchantLoanLimitRequest(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveBackgroundFile(req, handler) {
		try {
			const response = await this._service.PostSaveBackgroundFile(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveMerchantStructure(req, handler) {
		try {
			const response = await this._service.PostSaveMerchantStructure(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSvMerchantDocument(req, handler) {
		try {
			const response = await this._service.PostSaveMerchantDocument(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveMerchantInfo(req, handler) {
		try {
			const response = await this._service.PostSaveMerchantInfo(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostApproveLoanLimitRequest(req, handler) {
		try {
			const response = await this._service.PostApproveLoanLimitRequest(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostDisappproveLoanLimitRequest(req, handler) {
		try {
			const response = await this._service.PostDisappproveLoanLimitRequest(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveUploadDocReview(req, handler) {
		try {
			const response = await this._service.PostSaveUploadDocReview(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostApproveLoanComittee(req, handler) {
		try {
			const response = await this._service.PostApproveLoanComittee(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostDisapproveLoanComittee(req, handler) {
		try {
			const response = await this._service.PostDisapproveLoanComittee(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async PostSaveAPUPPTScore(req, handler) {
		try {
			const response = await this._service.PostSaveAPUPPTScore(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getListApprovalLoanCommitte(offset, limit, handler) {
		try {
			const response = await this._service.GetListApprovalLoanCommitte(offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async takeLoanProcess(req, handler) {
		try {
			const response = await this._service.TakeLoanProcess(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getSubmittedLoanLimitHistoryByBD(offset, limit, handler) {
		try {
			const response = await this._service.GetSubmittedLoanLimitHistoryByBD(offset, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
	
}