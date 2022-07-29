import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather';
import CompanyPT from './CompanyPT';
import CompanyCV from './CompanyCV';
import Individual from './Individual';
import TableCompanyBackground from './TableCompanyStructure';
import { useSelector } from 'react-redux';
import TableCompanyStructure from './TableCompanyStructure';
import { MerchantService } from '../../../../../../data/business';

const CompanyStructure = ({ stepper, type, companyTypeLoanLimitReq,
    showUploadFile, handleUpload, getMerchantStructureByLoanLimitRequestID, loanlimitrequestId }) => {

    const merchantStructureLoanLimit = useSelector(state => state.customer.merchantStructureLoanLimit)
    const _service = new MerchantService();
    const [saved, setSave] = useState(false);

    function switchView(companyType) {
        switch (companyType) {
            // switch () {
            case "PT":
                return <CompanyPT loanlimitrequestId={loanlimitrequestId} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
            case "CV":
                return <CompanyCV loanlimitrequestId={loanlimitrequestId} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
            case "UD":
                return <Individual loanlimitrequestId={loanlimitrequestId} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
        }
    }

    const handleAdd = (form = FormData) => {
        _service.PostSaveMerchantStructure(form, {
            Success: (res) => {
                console.log("suksees");
                getMerchantStructureByLoanLimitRequestID();
                setUpdate(!saved);
            }
        })
    }

    return (<>
        <TableCompanyStructure data={merchantStructureLoanLimit} handleTrash={handleAdd} />
        {switchView(companyTypeLoanLimitReq)}
        {/* below button */}
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyStructure;