import React, { useState, useEffect } from 'react';
import { CustomTable } from '../../../../@core/components/table';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { MerchantService } from '../../../../data/business';

const ApprovalList = () => {
    const _service = new MerchantService();
    const [dataListApproval, setDataListApproval] = useState([]);

    useEffect(() => {
        _service.getListApprovalLoanCommitte(0, 10, {
          Success: (res) => {
            setDataListApproval(res?.data)
          }
        })
      }, []);

    const redirectTo = (loanLimitRequestId, customerId) => {
        // dispatch(setLoanDataForLoanCommittee(searchKeyObjectInArray(dataCreditRecommendation, "loanLimitRequestId", loanLimitRequestId)))
        // navigate(`/los/loan-limit-request?id=${loanLimitRequestId}&cid=${customerId}`);
    }

    const configTable = {
        title: ["Job Number", "Company Name", "User", "Created Date", "APUPPT Score", "ICR Score", "Status"],
        data: dataListApproval
    }

    return (<>
        <MainCard>
            <CustomTable
                striped
                configTable={configTable}
                redirectTo={redirectTo}
                isScoring={true}
            />
        </MainCard>
    </>);
}

export default ApprovalList;