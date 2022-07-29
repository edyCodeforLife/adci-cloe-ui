import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import "react-datepicker/dist/react-datepicker.css";
// import TableLaporanKeuangan from './TableLaporanKeuangan';
import { useDispatch } from 'react-redux';
import MainCard from '../../../../../../@core/layouts/components/custom/MainCard';
import { ALLOWED_FILE_TYPES } from '../../../../../../utility/Constants';
import CustomButton from '../../../../../../@core/layouts/components/custom/button/CustomButton';
import { checkData, filteringArrayByKey, numberOnlyKey, searchKeyObjectInArray } from '../../../../../../utility/Utils';
import { store } from '../../../../../../redux/store';
import { setCreditAmountLimit } from '../../../../../../redux/customer';
import TextInput from '../../../../../../@core/layouts/components/custom/input/TextInput';

const YearTypeName = ""

const LaporanKeuangan = ({ props, type, setUploaded, handleUpload, loanlimitrequestId, handleAddForm, showUploadFile }) => {
    const dispatch = useDispatch();
    // const [years, setYears] = useState([]);
    const [financeReportData, setFinanceReport] = useState([
        {
            'limitAmountInput': store.getState().customer.creditLimitAmount?.value
        }
    ])

    function handleInput(e) {
        if (e?.target) {
            const { name, value } = e?.target;
            setFinanceReport(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFinanceReport(prevState => ({
                ...prevState,
                [e.name]: e.value
            }));
        }
    }


    const handleAdd = (docId, documentGroup, activeStatus, fileKey, name, year) => {
        // console.log("doc" + documentGroup)
        const form = new FormData();
        let idea = loanlimitrequestId;
        form.set('merchantDocumentId', docId == undefined ? '' : docId);
        form.set('loanLimitRequestId', idea);
        form.set('documentGroup', documentGroup);
        form.set('documentName', financeReportData?.[name]);
        if (financeReportData?.[year] != undefined)
            form.set('documentYear', financeReportData[year]);
        // if (financeReportData?.[desc] != undefined)
        //     form.set('documentDesc', financeReportData?.[desc]);
        form.set('position', '1');
        let fileUri = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", fileKey)?.["fileUrl"]
        if (fileUri != undefined)
            form.set('documentUrl', fileUri)
        form.set('active', activeStatus == undefined ? '' : activeStatus)

        handleAddForm(form);
    }

    const TitleGroup = [
        "Laporan Keuangan 3 Tahun Terakhir", "Bank Statement Ops 12 Bulan Terakhir",
        "Sell Out Report to Distributor 1 Tahun Terakhir", "Copy Contract Kerjasama Dengan Supplier",
        "Sample Invoice to the Buyer",
        "Pengajuan Credit Limit"
    ]

    // {console.log("creditLimitAmount: "+JSON.stringify(store.getState().customer.creditLimitAmount))}

    return (<>
        <MainCard title={TitleGroup[0]} actions='collapse'>
            <div className='content-header'>
                <div>
                    <Row>
                        <Col md='6' className='mb-1 inline-flex'>
                            <Label md="4" className='form-label' for={`document-laporan-keuangan}`}>
                                Document Name
                            </Label>
                            <Input md="8"
                                type='text'
                                name={`documentLaporanKeuangan`}
                                id={`document-laporan-keuangan`}
                                onChange={
                                    (e) => {
                                        handleInput(e);
                                    }}
                            />
                        </Col>
                        <Col md='6' className='mb-1 inline-flex'>
                            <Label md="4" className='form-label' for={`username`}>
                                Year
                            </Label>
                            {/* <Flatpickr value={picker} onChange={date => setPicker(date)} id='default-picker' /> */}
                            <Input md="4"
                                type='text'
                                maxLength="4"
                                name={`documentKeuanganYears`}
                                id={`document-keuangan-years`}
                                pattern="[0-9]+"
                                placeholder="Type Year Here"
                                onKeyPress={
                                    numberOnlyKey}
                                onChange={
                                    (e) => {
                                        handleInput(e);
                                    }}
                            />
                            {/* <CustomButton text={"Upload"} handleClick={() => handleAdd()} styled='btn-next' /> */}
                            <Button color='primary float-right' className='btn-next' tag={Label}>
                                Upload
                                <Input
                                    type='file'
                                    name={`financeReportLTY`}
                                    onChange={(e) => { handleUpload(e) }}
                                    hidden
                                    value={''}
                                    accept={ALLOWED_FILE_TYPES}
                                />
                            </Button>
                        </Col>
                    </Row>
                    {
                        <Row style={{ direction: 'rtl' }}><Col md="8" className='mb-1 inline-flex'>{showUploadFile("inputName", `financeReportLTY`, { direction: 'ltr' })}</Col></Row>
                    }
                </div>
            </div>
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[0], true, 'financeReportLTY',
                    'documentLaporanKeuangan', 'documentKeuanganYears')} />
        </MainCard>
        <MainCard title={TitleGroup[1]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`document-bank-statement`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`documentBankStatement`}
                        id={`document-bank-statement`}
                        placeholder="Document Name"
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`year-bank-statement`}>
                        Year
                    </Label>
                    <Input md="4"
                        type='text'
                        maxLength="4"
                        name={`yearBankStatement`}
                        id={`year-bank-statement`}
                        placeholder="Type Year Here"
                        onKeyPress={
                            numberOnlyKey}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`documentBankStatementRY`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row style={{ direction: 'rtl' }}><Col md="8" className='mb-1 inline-flex'>{showUploadFile("inputName", `documentBankStatementRY`, { direction: 'ltr' })}</Col></Row>
            }
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[1], true, 'documentBankStatementRY',
                    'documentBankStatement', 'yearBankStatement')} />
        </MainCard>
        <MainCard title={TitleGroup[2]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`sell-out-report`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`sellOutReport`}
                        id={`sell-out-report`}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`sellOutReportFile`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row><Col md="8" className='mb-1 inline-flex'>{showUploadFile("inputName", `sellOutReportFile`, { direction: 'ltr' })}</Col></Row>
            }
            {/* <CustomButton text={"Add"} handleClick={() => handleAdd('', TitleGroup[1], true, 'sellOutReportFile')} /> */}
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[2], true, 'sellOutReportFile',
                    'sellOutReport', '')} />
        </MainCard>
        <MainCard title={TitleGroup[3]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`Copy-Contract-Kerjasama`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`copyContractKerjasama`}
                        id={`Copy-Contract-Kerjasama`}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`copyContractKerjasamaFile`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row><Col md="6" className='mb-1 inline-flex'>{showUploadFile("inputName", `copyContractKerjasamaFile`, { direction: 'ltr' })}</Col></Row>
            }
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[3], true, 'copyContractKerjasamaFile',
                    'copyContractKerjasama', '')} />
        </MainCard>
        <MainCard title={TitleGroup[4]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`sample-invoice-buyer`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`sampleInvoiceBuyer`}
                        id={`sample-invoice-buyer`}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`sampleInvoiceBuyerFile`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row><Col md="6" className='mb-1 inline-flex'>{showUploadFile("inputName", `sampleInvoiceBuyerFile`, { direction: 'ltr' })}</Col></Row>
            }
            {/* <CustomButton text={"Add"} handleClick={() => handleAdd('', TitleGroup[4], true, 'sampleInvoiceBuyerFile')} /> */}
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[4], true, 'sampleInvoiceBuyerFile',
                    'sampleInvoiceBuyer', '')} />
        </MainCard>
        <MainCard title={TitleGroup[5]} actions='collapse'>
            <Row>
                <Col md='8' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`limit-Amount-Input`}>
                        Jumlah Limit
                    </Label>
                    <TextInput
                        type='text'
                        md='8'
                        name={`limitAmountInput`}
                        id={`limit-Amount-Input`}
                        placeholder="Input Limit Amount"
                        aria-label={"limit-Amount-Input"}
                        language="idn"
                        value={checkData(store.getState().customer.creditLimitAmount?.value)}
                        onChange={
                            (e) => {
                                dispatch(setCreditAmountLimit({
                                    value: e.value,
                                    id: store.getState().customer.creditLimitAmount?.id
                                }))
                                handleInput(e);
                            }}
                    />
                </Col>
            </Row>
        </MainCard>

    </>);
}

export default LaporanKeuangan;