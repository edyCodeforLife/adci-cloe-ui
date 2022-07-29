import { lazy } from 'react'
import { PATH_LOAN_LIMIT_TRANSACTION, PATH_LOAN_ORIGINATION_SYSTEM, PATH_LOAN_REQUEST_PREVIEW, PATH_UPLOAD_AGGREMENT, PATH_LOAN_LIMIT_HISTORY_DETAIL } from '../../navigation/path'
import AcceptApproval from '@views/los/LoanLimitRequest/Customer/AcceptApproval'
import TextScreen from '../../views/TextScreen'
import LoanLimitTransaction from '../../views/los/LoanLimitTransaction';

const CustomerRequest = lazy(() => import('../../views/los/CustomerRequest'))
const LoanLimitReq = lazy(() => import('../../views/los/LoanLimitRequest'))
const LoanLimitHistory = lazy(() => import('../../views/los/LoanLimitHistory/HistoryDetail/index'))

const LosRoutes = [
  {
    path: PATH_LOAN_ORIGINATION_SYSTEM,
    element: <LoanLimitReq />
  },
  {
    path: PATH_LOAN_REQUEST_PREVIEW,
    element: <CustomerRequest />
  },
  {
    path: PATH_LOAN_LIMIT_TRANSACTION,
    element: <LoanLimitTransaction />
  },
  {
    path: PATH_LOAN_LIMIT_HISTORY_DETAIL,
    element: <LoanLimitHistory />
  },
]

export default LosRoutes
