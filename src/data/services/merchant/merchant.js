import {
  EP_BD_GET_LOAN_LIMIT_REQUEST_BY_USER_ID,
  EP_BD_GET_MERCHANT_DATA_BY_LOAN_LIMIT_RQ_ID,
  EP_GET_COMPANY_TYPE_BY_LOANLIMITREQUESTID,
  EP_GET_MERCHANT_STRUCTURE_BY_LOANLIMITREQUESTID,
  EP_SAVE_LOANLIMITREQUEST,
  EP_SAVE_BACKGROUND_FILE,
  EP_SAVE_MERCHANT_STRUCTURE,
  EP_GET_BG_FILE_LOANLIMITREQUESTD,
  EP_BD_GET_LOAN_LIMIT_TRANSACTION_BY_USER_ID,
  EP_SAVE_MERCHANT_INFO,
  EP_GET_CUSTOMER_DATA_BY_LOANLIMITREQUESTID,
  EP_BD_DISAPPROVE_LOANLIMITREQUEST,
  EP_BD_APPROVE_LOANLIMITREQUEST,
  EP_CM_GET_APPROVE_LOANLIMITREQUEST,
  EP_CM_GET_UPLOAD_DOC_REVIEW,
  EP_CM_SAVE_UPLOAD_DOCUMENT,
  EP_GET_MERCHANT_DOCUMENT_BY_LOANLIMITREQUESTID,
  EP_GET_MERCHANT_INFO_BY_LOANLIMITREQUESTID,
  EP_SAVE_MERCHANT_DOCUMENT,
  EP_CM_GET_APPROVED_HISTORY_LOAN,
  EP_CM_GET_APUPPT_SCORE,
  EP_GET_CREDIT_RECOMMENDATION,
  EP_APPROVE_CREDIT_RECOMMENDATION,
  EP_DISAPPROVE_CREDIT_RECOMMENDATION,
  EP_CM_SAVE_APUPPT_SCORE,
  EP_BD_REJECT_LOAN_LIMIT_REQ, EP_BD_REVIEW_LOAN_LIMIT_REQ
} from '@utility/Endpoints';
import { EP_BD_GET_SUBMITTED_LOAN_HISTORY, EP_CM_GET_APPROVED_LLR_HISTORY_DETAIL, EP_CM_PROCESS_LOAN, EP_GET_LIST_APPROVE_CREDIT_RECOMMENDATION } from '../../../utility/Endpoints';
import { DataService } from '../config';

export class MerchantServiceData {
  GetLoanLimitBDRequestByUserId(userId, offset, limit) {
    return DataService.get(`${EP_BD_GET_LOAN_LIMIT_REQUEST_BY_USER_ID}?userId=${userId}&offset=${offset}&limit=${limit}`)
  }

  GetMerchantDataByLoanLimitRequestID(loanlimitrequestId) {
    return DataService.get(`${EP_BD_GET_MERCHANT_DATA_BY_LOAN_LIMIT_RQ_ID}?loanLimitRequestId=${loanlimitrequestId}`)
  }

  GetMerchantCompanyTypeByLoanLimitRequestID(loanlimitrequestId) {
    return DataService.get(`${EP_GET_COMPANY_TYPE_BY_LOANLIMITREQUESTID}?loanLimitRequestId=${loanlimitrequestId}`)
  }

  GetBgFileLoanLimitRequestID(loanlimitrequestId) {
    return DataService.get(`${EP_GET_BG_FILE_LOANLIMITREQUESTD}?loanLimitRequestId=${loanlimitrequestId}`)
  }

  GetMerchantStructure(loanlimitrequestId) {
    return DataService.get(`${EP_GET_MERCHANT_STRUCTURE_BY_LOANLIMITREQUESTID}?loanLimitRequestId=${loanlimitrequestId}`)
  }

  GetMerchantInfo(loanlimitrequestId) {
    return DataService.get(`${EP_GET_MERCHANT_INFO_BY_LOANLIMITREQUESTID}?loanLimitRequestId=${loanlimitrequestId}`)
  }

  GetMerchantDocument(loanlimitrequestId) {
    return DataService.get(`${EP_GET_MERCHANT_DOCUMENT_BY_LOANLIMITREQUESTID}?loanLimitRequestId=${loanlimitrequestId}`)
  }

  GetLoanLimitTransactionBDByUserId(userId, offset, limit) {
    return DataService.get(`${EP_BD_GET_LOAN_LIMIT_TRANSACTION_BY_USER_ID}?userId=${userId}&offset=${offset}&limit=${limit}`)
  }

  GetCustomerDataByLoanLimitRequestID(loanlimitrequestId) {
    return DataService.get(`${EP_GET_CUSTOMER_DATA_BY_LOANLIMITREQUESTID}?loanLimitRequestId=${loanlimitrequestId}`);
  }

  SetReviewLoanLimitRequestByBD(payload) {
    return DataService.post(EP_BD_REVIEW_LOAN_LIMIT_REQ, payload);
  }

  SetRejectLoanLimitRequestByBD(payload) {
    return DataService.post(EP_BD_REJECT_LOAN_LIMIT_REQ, payload);
  }

  GetCMApproveLoanLimitRequest(ids, offset, limit) {    
    return DataService.get(`${EP_CM_GET_APPROVE_LOANLIMITREQUEST}?userLogin=${ids}&offset=${offset}&limit=${limit}`);
  }

  GetCMUploadDocumentLoanLimitRequest(loanlimitrequestId) {
    return DataService.get(`${EP_CM_GET_UPLOAD_DOC_REVIEW}?loanLimitRequestId=${loanlimitrequestId}`);
  }

  GetCMAPUPPTData() {
    return DataService.get(EP_CM_GET_APUPPT_SCORE);
  }

  GetCMApprovedLoanHistory(offset, limit) {
    return DataService.get(`${EP_CM_GET_APPROVED_HISTORY_LOAN}?offset=${offset}&limit=${limit}`);
  }

  GetCMApprovedLoanLimitRequestHistoryDetail(loanlimitrequestId) {
    return DataService.get(`${EP_CM_GET_APPROVED_LLR_HISTORY_DETAIL}?loanLimitRequestId=${loanlimitrequestId}`);
  }

  GetCreditRecommendation(offset, limit) {
    const username = localStorage.getItem("email");
    return DataService.get(`${EP_GET_CREDIT_RECOMMENDATION}?userId=${username}&offset=${offset}&limit=${limit}`);
  }

  PostSaveMerchantLoanLimitRequest(req) {
    return DataService.post(EP_SAVE_LOANLIMITREQUEST, req);
  }

  PostSaveBackgroundFile(req) {
    return DataService.post(EP_SAVE_BACKGROUND_FILE, req);
  }

  PostSaveMerchantDocument(req) {
    return DataService.post(EP_SAVE_MERCHANT_DOCUMENT, req);
  }

  PostSaveMerchantStructure(req) {
    return DataService.post(EP_SAVE_MERCHANT_STRUCTURE, req);
  }

  PostSaveMerchantInfo(req) {
    return DataService.post(EP_SAVE_MERCHANT_INFO, req);
  }

  PostApproveLoanLimitRequest(req) {
    return DataService.post(EP_BD_APPROVE_LOANLIMITREQUEST, req);
  }

  PostDisappproveLoanLimitRequest(req) {
    return DataService.post(EP_BD_DISAPPROVE_LOANLIMITREQUEST, req);
  }

  PostSaveUploadDocReview(req) {
    return DataService.post(EP_CM_SAVE_UPLOAD_DOCUMENT, req);
  }

  PostApproveLoanComittee(req) {
    return DataService.post(EP_APPROVE_CREDIT_RECOMMENDATION, req);
  }

  PostDisapproveLoanComittee(req) {
    return DataService.post(EP_DISAPPROVE_CREDIT_RECOMMENDATION, req);
  }

  PostSaveAPUPPTScore(req) {
    return DataService.post(EP_CM_SAVE_APUPPT_SCORE, req);
  }

  GetListApprovalLoanCommitte(offset, limit) {
    const username = localStorage.getItem("email");
    return DataService.get(`${EP_GET_LIST_APPROVE_CREDIT_RECOMMENDATION}?userId=${username}&offset=${offset}&limit=${limit}`);
  }

  TakeLoanProcess(req) {
    return DataService.post(EP_CM_PROCESS_LOAN, req);
  }

  GetSubmittedLoanLimitHistoryByBD(offset, limit) {
    const username = localStorage.getItem("email");
    return DataService.get(`${EP_BD_GET_SUBMITTED_LOAN_HISTORY}?userId=${username}&offset=${offset}&limit=${limit}`);
  }
}