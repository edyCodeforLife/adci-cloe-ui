import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';

const AcceptApproval = () => {

    const submit = ()=>{
        // alert("SUkses")
    }

    return (<>
        <MainCard>
        <p>Hi Sugianto</p>
        <p>Thank you for your approvals. You are not far away from your first digital financing experience,
            Please download Boost Credit Indonesia agreement bellow and signed off the agreement.
        </p>
        <div>PDF FILE</div>
        <p>Please to upload the Boost Credit Indonesia agreement
            once you have signed through bellow button, and click Submit button: </p>
        <Button color='primary' className='btn-next ltr-direction margin-top-small'>
            <span className='align-middle d-sm-inline-block d-none'>Browse</span>
        </Button>
        <Button color='primary' className='btn-next right-float margin-top-small' onClick={submit}>
            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
        </Button>
        </MainCard>
    </>);
}

export default AcceptApproval;