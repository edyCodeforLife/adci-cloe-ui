import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import LaporanKeuangan from './LaporanKeuangan';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import TableLaporanKeuangan from './TableLaporanKeuangan';
import { MerchantService } from '../../../../../../data/business';
import { getFormData } from '../../../../../../utility/function';
import { store } from '../../../../../../redux/store';
import { setCreditAmountLimit, setMerchantDocument } from '../../../../../../redux/customer';
import { filteringArrayByKey } from '../../../../../../utility/Utils';
import { useDispatch } from 'react-redux';

const FinancialDocuments = ({ stepper, merchantDocLoanLimitReq, type, loanlimitrequestId, handleNext, handleUpload, setUploaded, showUploadFile, getMerchantDoc, onGetNewData }) => {

    const _service = new MerchantService();
    const dispatch = useDispatch();
    const [updated, setUpdate] = useState(true);

    const handleNextButton = () => {
        const form = new FormData;
        form.set('merchantDocumentId', store.getState().customer.creditLimitAmount?.id == undefined ? '' : store.getState().customer.creditLimitAmount?.id);
        form.set('loanLimitRequestId', loanlimitrequestId);
        form.set('documentGroup', "Pengajuan Credit Limit");
        form.set('documentName', store.getState().customer.creditLimitAmount?.value == undefined ?
            0 : store.getState().customer.creditLimitAmount?.value
        );
        form.set('active', true)

        handleAddForm(form);
        // handleNext(true);
        stepper.next();
    }

    const handleAddForm = (form = FormData) => {
        setTimeout(() => {
            _service.PostSvMerchantDocument(
                form, {
                Success: (res) => {
                    setUpdate(true);
                    onGetNewData();
                }
            }
            )
        }, 250);
    }

    const handleTrash = (val) => {
        val["merchantDocumentId"] = val.id;
        delete val["id"];
        val["active"] = false;
        const _newData = getFormData(val);
        _service.PostSvMerchantDocument(_newData, {
            Success: (res) => {
                getMerchantDoc();
            }
        })
    }

    useEffect(() => {
        if (updated) {
            _service.GetMerchantDocument(store.getState().customer.loanLimitRequestId, {
                Success: (res) => {
                    // console.log("GET UP"+JSON.stringify());
                    dispatch(setMerchantDocument(res.data))
                    let datad = filteringArrayByKey(res.data, "documentGroup", "Pengajuan Credit Limit");
                    dispatch(setCreditAmountLimit({ value: datad[0]?.documentName, id: datad[0]?.id }))
                    setUpdate(false);
                }
            }
            )
        }
    }, [updated])

    return (<>
        <TableLaporanKeuangan data={merchantDocLoanLimitReq} handleTrash={handleTrash} />
        <LaporanKeuangan handleUpload={handleUpload} loanlimitrequestId={loanlimitrequestId} handleAddForm={handleAddForm} showUploadFile={showUploadFile} />
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => { handleNextButton() }}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default FinancialDocuments;