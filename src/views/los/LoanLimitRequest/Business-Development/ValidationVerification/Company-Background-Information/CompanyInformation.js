import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'
import CustomInformation from './CustomInformation';
import FixedInformation from './FixedInformation';
import TableCompanyInformation from './TableCompanyInformation';
// import { store } from '../../../../redux/store';
// import { convertFormDataToJSON } from '../../../../utility/Utils';
// import { LoanService } from '../../../../data/business/loan/loan';

const CompanyInformation = ({ stepper, type, merchantInfoLoanLimitReq, handleChange, dataInfoAddDocument, addNewInformationField }) => {
    // const _service = new LoanService();

    //pending
    const handleNextClick = () => {

    }

    const configDataMerchantInfo = {
        title: ["Additional Document Name", "Description"],
        data: merchantInfoLoanLimitReq
    }

    return (<>
        <TableCompanyInformation configTable={configDataMerchantInfo} />
        {/* <FixedInformation type="fxd-inf-comp" /> */}
        <CustomInformation addNewInformationField={addNewInformationField} dataInfoAddDocument={dataInfoAddDocument} handleChange={handleChange} f />
        {/* below button */}
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            {/* <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
                <span className='align-middle d-sm-inline-block d-none'>Save as Draft</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button> */}
            <Button color='primary' className='btn-next' onClick={() => { stepper.next(); }}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyInformation;