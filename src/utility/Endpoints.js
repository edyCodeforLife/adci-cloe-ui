export const EP_LOGIN_TOKEN = "/api/login/token";

export const EP_LOOKUP_COMPANY_GROUP = "/api/lookup/by-group/COMPANY_DOC_GROUP";
export const EP_LOOKUP_CUSTOMER_TYPE = "api/lookup/customer-type";
export const EP_LOOKUP_FINANCING_SERVICE = "/api/lookup/financing-service";
export const EP_LOOKUP_COMPANY_TYPE = "/api/lookup/company-type";
export const EP_LOOKUP_COMPANY_DOC_BG = "/api/lookup/company-doc-background";
export const EP_LOOKUP_COMPANY_DOC_AKTA = "/api/lookup/company-doc-akta-pp";
export const EP_LOOKUP_COMPANY_DOC_KEMENKUMHAM = "/api/lookup/company-doc-kemenkumham";
export const EP_LOOKUP_BUSINESS_LINE = "/api/lookup/business-line";
export const EP_LOOKUP_CITY = "/api/lookup/city";
export const EP_LOOKUP_COUNTRY = "/api/lookup/country";
export const EP_LOOKUP_STATE = "/api/lookup/state";
export const EP_LOOKUP_BUSINESSAREACOVERAGE = "/api/lookup/business-area-coverage";

export const EP_LOOKUP_REGISTRATION_CUSTOMER = "/api/customer/register";

export const EP_GET_MERCHANT_INFO_BY_LOANLIMITREQUESTID = "/api/merchant/get-info"
export const EP_GET_MERCHANT_DOCUMENT_BY_LOANLIMITREQUESTID = "api/merchant/get-document"

export const EP_BD_GET_LOAN_LIMIT_REQUEST_BY_USER_ID = '/api/merchant/bd/get-submitted-loan-limit-request';
export const EP_BD_GET_MERCHANT_DATA_BY_LOAN_LIMIT_RQ_ID = "/api/merchant/get-merchant-data";
export const EP_BD_GET_LOAN_LIMIT_TRANSACTION_BY_USER_ID = '/api/merchant/bd/get-submitted-loan-limit-transaction'
export const EP_GET_COMPANY_TYPE_BY_LOANLIMITREQUESTID = "/api/merchant/loan-limit-request/company-type";
export const EP_GET_BG_FILE_LOANLIMITREQUESTD = "/api/merchant/get-background-file";
export const EP_GET_CUSTOMER_DATA_BY_LOANLIMITREQUESTID = "/api/merchant/loan-limit-request/customer-data";
export const EP_BD_APPROVE_LOANLIMITREQUEST = "/api/merchant/bd/approve-loan-limit-transaction";
export const EP_BD_DISAPPROVE_LOANLIMITREQUEST = "/api/merchant/bd/disapprove-loan-limit-transaction";
export const EP_GET_MERCHANT_STRUCTURE_BY_LOANLIMITREQUESTID = "/api/merchant/get-structure";
export const EP_SAVE_LOANLIMITREQUEST = "/api/merchant/save-loan-limit-request";
export const EP_SAVE_BACKGROUND_FILE = "/api/merchant/save-background-file";
export const EP_SAVE_MERCHANT_STRUCTURE = "/api/merchant/save-structure";
export const EP_SAVE_MERCHANT_INFO = "/api/merchant/save-info";

export const EP_BD_REVIEW_LOAN_LIMIT_REQ = "/api/merchant/bd/review-loan-limit-request";
export const EP_BD_REJECT_LOAN_LIMIT_REQ = "/api/merchant/bd/reject-review-loan-limit-request";

export const EP_SAVE_UPLOAD_FILE = "/api/file/upload";

export const EP_CHECK_WATCHLIST = "/api/verification/check-watchlist"
export const EP_CHECK_FDC = "/api/verification/check-fdc";
export const EP_CHECK_PEFINDO = "/api/verification/check-pefindo-inquiry";

export const EP_SAVE_MERCHANT_DOCUMENT = "/api/merchant/save-document";

export const EP_CM_GET_APPROVED_HISTORY_LOAN = "/api/merchant/cm/get-approved-bd-loan-limit-request-history";
export const EP_CM_GET_APPROVE_LOANLIMITREQUEST = "/api/merchant/cm/get-approved-bd-loan-limit-request";
export const EP_CM_GET_UPLOAD_DOC_REVIEW = "/api/merchant/cm/get-upload-documents-for-review";
export const EP_CM_GET_APUPPT_SCORE = "/api/merchant/cm/get-apuppt-scoring";
export const EP_CM_SAVE_UPLOAD_DOCUMENT = "/api/merchant/cm/save-upload-documents-for-review";
export const EP_CM_SAVE_APUPPT_SCORE = "/api/merchant/cm/save-apuppt-scoring";
export const EP_CM_GET_PRODUCT_LIST = "/api/merchant/cm/get-product-list";
export const EP_CM_PROCESS_LOAN = "/api/merchant/cm/loan-process"
export const EP_CM_GET_APPROVED_LLR_HISTORY_DETAIL = "/api/merchant/cm/get-approved-bd-loan-limit-request-history-detail"

export const EP_SCORING_FACTOR = "/api/scoring/factors";
export const EP_SAVE_SCORING_FACTOR = "/api/scoring/save";
export const EP_SAVE_CREDIT_MEMO = "/api/credit-memo/save";

export const EP_GET_CREDIT_RECOMMENDATION = "/api/merchant/committee/get-credit-recommendation";
export const EP_APPROVE_CREDIT_RECOMMENDATION = "/api/merchant/committee/approve-credit-recommendation";
export const EP_DISAPPROVE_CREDIT_RECOMMENDATION = "/api/merchant/committee/disapprove-credit-recommendation";

export const EP_GET_LIST_APPROVE_CREDIT_RECOMMENDATION = "/api/merchant/committee/get-approve-credit-recommendation"

export const EP_APPROVE_CM_CREDIT_ANALYSIS_ASSESMENT = "/api/merchant/cm/approve-credit-analysis-assessment"

export const EP_CM_REPORT_GET_DASHBOARD = "/api/report/cm/get-dashboard"
export const EP_COMMITTEE_GET_DASHBOARD = "/api/report/committee/get-dashboard"
export const EP_BD_GET_DASHBOARD = "/api/report/bd/get-dashboard"

export const EP_BD_GET_SUBMITTED_LOAN_HISTORY = "/api/merchant/bd/get-submitted-loan-limit-transaction-history"