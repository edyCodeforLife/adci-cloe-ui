import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TransactionTable } from './TransactionTable';
import BreadCrumbs from '../../../@core/components/breadcrumbs';
import WizardHorizontal from './WizardHorizontal';
import { TableHistoryCM } from '../LoanLimitRequest/Credit-Manager/TableHistoryCM';
import ApprovalRequest from '../LoanLimitRequest/LoanCommitte/index';
import { LIST } from '../../../utility/Constants';

const LoanLimitTransaction = () => {
    const location = useLocation();
    const role = localStorage?.getItem("role");
    // console.log(role)
    // const qrs = QrsToObj(window.location.search);

    const switchRender = () => {
        if (location.search === "") {
            return <TransactionTable />
        } else {
            return <WizardHorizontal />
        }
    }

    const generateContent = () => {
        switch (role) {
            case "bd":
                return switchRender();
            case "cm":
                return <TableHistoryCM />
            case "committee":
                return <ApprovalRequest screen={LIST} />
        }
    }

    return (<>
        <BreadCrumbs title='Loan Limit Transaction' data={[{ title: 'Loan' }, { title: 'Loan Limit Transaction' }]} />
        {
            generateContent()
        }
    </>);
}

export default LoanLimitTransaction;