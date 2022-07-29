import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';

const SuccessApproval = () => {

    const styled = {
        width: '50%',
        margin: '20px'
    }

    return (<>
        <div className='double-card'>
            <MainCard styled={styled}>
                Offering Letter for Credit Loan Limit
            </MainCard>
            <MainCard styled={styled}>
                Boost Credit Loan Limit
            </MainCard>
        </div>
    </>);
}

export default SuccessApproval;