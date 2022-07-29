import React, { useState, useEffect } from 'react';
import BreadCrumbs from '../../../@core/components/breadcrumbs';
import LoanLimitReqBD from './Business-Development';
import TableList from './Credit-Manager/TableList';
import { CustomTableCM } from './Credit-Manager/CustomTableCM';
import OfferingLoan from './Customer';
import ApprovalRequest from './LoanCommitte';
// import SuccessApproval from './Customer/SuccessApproval'
// import { determineRole } from '../../../utility/Utils';
// import { store } from '../../../redux/store';

const LoanLimitRequest = () => {
    const role = localStorage?.getItem("role");
    console.log(role)

    const generateContent = () => {
        switch (role) {
            case "bd":
                return <LoanLimitReqBD isValidated={false} />
            case "cm":
                return <CustomTableCM />
            case "committee":
                return <ApprovalRequest screen="request" />
            case "bd2":
                return <LoanLimitReqBD isValidated={true} />
        }
    }

    return (<>
        <BreadCrumbs title='Loan Limit Request' data={[{ title: 'Loan' }, { title: 'Loan Limit Request' }]} />
        {
            generateContent()
        }
    </>);
}

export default LoanLimitRequest;