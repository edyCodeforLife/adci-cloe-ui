import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import Grader from './Grader';
import TableValidator from './TableValidator';
import { MerchantService } from '../../../../data/business/index';
import { CustomTable } from '../../../../@core/components/table';
import { useNavigate } from 'react-router-dom'
import ApprovalScreen from './ApprovalScreen';
import { useDispatch } from 'react-redux';
import { setLoanDataForLoanCommittee } from '../../../../redux/committee';
import { searchKeyObjectInArray } from '../../../../utility/Utils';
import ApprovalList from './ApprovalList';
import { LIST } from '../../../../utility/Constants';
import { PATH_LOAN_ORIGINATION_SYSTEM } from '../../../../navigation/path';

const gradeTitle = [
  "Borrower", "Facility", "Credit Line Limit", "Admin Fee",
  "Tenure", "Month Propose"
]

const ApprovalRequest = ({ screen }) => {
  const location = useLocation();
  const _service = new MerchantService();
  const navigate = useNavigate();
  const [dataCreditRecommendation, setDataCreditRecommendation] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    _service.GetCreditRecommendation(0, 10, {
      Success: (res) => {
        setDataCreditRecommendation(res?.data)
      }
    })
  }, []);

  const redirectTo = (loanLimitRequestId, customerId) => {
    dispatch(setLoanDataForLoanCommittee(searchKeyObjectInArray(dataCreditRecommendation, "loanLimitRequestId", loanLimitRequestId)))
    navigate(PATH_LOAN_ORIGINATION_SYSTEM + `?id=${loanLimitRequestId}&cid=${customerId}`);
  }

  const configTable = {
    title: ["Job Number", "Company Name", "User", "Created Date", "Status"],
    data: dataCreditRecommendation
  }

  const switchRender = () => {
    if (screen == LIST) {
      return <ApprovalList />
    }
    else {
      if (location.search === "") {
        return <MainCard>
          <CustomTable
            striped
            configTable={configTable}
            redirectTo={redirectTo}
          />
        </MainCard>
      } else {
        return <ApprovalScreen />
      }
    }
  }

  return (<>
    {
      switchRender()
    }
  </>);
}

export default ApprovalRequest;