import React, { useState, useEffect } from 'react';
import LoanLimitApproval from './LoanLimitApproval';
import WizardHorizontalCustom from './WizardHorizontalCustom';
import { TableCustomer } from './TableCustomer';
// import { QrsToObj } from '../../../../utility/function';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUploadData } from '../../../../redux/upload';

const LoanLimitReqBD = (props) => {
    const { isValidated, isTableActive } = props
    const location = useLocation();
    const dispatch = useDispatch();
    // const qrs = QrsToObj(window.location.search);

    const switchRender = () => {
        if (location.search === "") {
            return <TableCustomer />
        } else {
            return <WizardHorizontalCustom type="bd" />
        }
    }

    return (<>
        {/* {
            isValidated && isQrsEmpty ? switchRender(isQrsEmpty) : <WizardHorizontal />
        } */}
        {
            switchRender()
        }

    </>);
}

export default LoanLimitReqBD;