import React, { useState, useEffect } from 'react';
import Divider from '../../../../../@core/layouts/components/custom/Divider';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';
import Select from 'react-select';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors } from '@utils';
import { convertObjectKey } from '../../../../../utility/function';
import { filter, isEmpty, find } from 'lodash';
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import { UploadFileContainer, LabelText, ContainerData } from '../../../../../@core/components/styled-components/custom-component/index';
import { LinearProgressWithLabel } from '../../../../../@core/components/styled-components/progress-tracker/index';
import { TableDocument } from "./TableDocument";

const dropValAkta = [
    {
        "id": "0f43ecee-c036-4a63-8b28-0c1307d62cc2",
        "group": "DOC_AKTA",
        "code": "DOC_AKTA_PENDIRIAN",
        "name": "Akta Pendirian",
        "position": 1
    },
    {
        "id": "acf040ee-e705-4721-9d22-38589a927577",
        "group": "DOC_AKTA",
        "code": "DOC_AKTA_PERUBAHAN",
        "name": "Akta Perubahan",
        "position": 2
    },
    {
        "id": "6fd04b74-a06c-4d07-aae7-0a467dbc8b9e",
        "group": "DOC_AKTA",
        "code": "DOC_AKTA_TERAKHIR",
        "name": "Akta Terakhir",
        "position": 3
    }
]

const dropValKemenkumham = [
    {
        "id": "0f43ecee-c036-4a63-8b28-0c1307d62cc2",
        "group": "DOC_KEMENKUMHAM",
        "value": "DOC_KEMENKUMHAM_PENDIRIAN",
        "label": "Akta Pendirian",
        "position": 1
    },
    {
        "id": "acf040ee-e705-4721-9d22-38589a927577",
        "group": "DOC_KEMENKUMHAM",
        "value": "DOC_KEMENKUMHAM_PERUBAHAN",
        "label": "Akta Perubahan",
        "position": 2
    },
    {
        "id": "6fd04b74-a06c-4d07-aae7-0a467dbc8b9e",
        "group": "DOC_KEMENKUMHAM",
        "value": "DOC_KEMENKUMHAM_TERAKHIR",
        "label": "Akta Terakhir",
        "position": 3
    }
]

const dropValCompanyBG = [
    {
        "id": "0f43ecee-c036-4a63-8b28-0c1307d62cc2",
        "group": "DOC_COMPANYBG",
        "value": "DOC_COMPANYBG_PENDIRIAN",
        "label": "Akta Pendirian",
        "position": 1
    },
    {
        "id": "acf040ee-e705-4721-9d22-38589a927577",
        "group": "DOC_COMPANYBG",
        "value": "DOC_COMPANYBG_PERUBAHAN",
        "label": "Akta Perubahan",
        "position": 2
    },
    {
        "id": "6fd04b74-a06c-4d07-aae7-0a467dbc8b9e",
        "group": "DOC_COMPANYBG",
        "value": "DOC_COMPANYBG_TERAKHIR",
        "label": "Akta Terakhir",
        "position": 3
    }
]

const DocumentDetail = ({
    type,
    stepper,
    deleteDocumentMerchant,
    bgFileLoanLimitReq,
    allowedFiles,
    handleUploadFiles,
    onHandleClickDocument,
    activeAkta,
    aktaDocumentFile,
    isSendingFile,
    uploadedType,
    fileName,
    progressTracker,
    deleteDocument,
    openLink,
    activeKemenkumham,
    kemenkumhamDocumentFile,
    companyBGDocumentFile,
    activeCompanyBG,
    onHandleChangeValueStep2,
    dataAktaInput,
    handleAdd,
    companyKemenkumhamDocument,
    companyBGDocument,
    companyAktaDocument,
    dataKemenkumhamInput
}) => {

    const dataTableAkta = filter(bgFileLoanLimitReq, { documentGroup: "Akta Pendirian dan Perubahan Terakhir" });
    const dataTableKemenkumham = filter(bgFileLoanLimitReq, { documentGroup: "Pengesahan Kemenkumham" });
    const dataTableCompanyDoc = filter(bgFileLoanLimitReq, { documentGroup: "Company Background Document" });

    // const selectedValueDataAkta = find(dropValAkta, { label: dataAktaInput.documentType });

    const dataConvertAkta = convertObjectKey(companyAktaDocument, ["code", "name"], ["value", "label"]);
    const dataConvertKemenkumham = convertObjectKey(companyKemenkumhamDocument, ["code", "name"], ["value", "label"]);
    const dataConvertBGDocument = convertObjectKey(companyBGDocument, ["code", "name"], ["value", "label"]);

    const configTableAkta = {
        title: ["Jenis Akta", "Tahun Pendirian/Perubahan", "File", "Tipe Dokumen", "Notes", "Action"],
        data: dataTableAkta
    }

    const configTableKemenkumham = {
        title: ["Jenis Akta", "Tahun Pendirian/Perubahan", "File", "Tipe Dokumen", "Notes", "Action"],
        data: dataTableKemenkumham
    }

    const configTableCompanyDoc = {
        title: ["Jenis Akta", "Tipe Dokumen", "File", "Action"],
        data: dataTableCompanyDoc
    }

    return (<>
        <MainCard>
            <div className='content-header'>
                <h5 className='mb-0'>Akta Pendirian dan Perubahan Terakhir</h5>
                <small className='text-muted'>Enter here</small>
            </div>
            <Form style={{ margin: "60px 0px" }} onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='3' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Pilih Jenis Akta
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={dataConvertAkta[0]}
                            options={dataConvertAkta}
                            isClearable={false}
                            // value={dataAktaInput?.documentType}
                            onChange={(e) => { onHandleChangeValueStep2('akta', "documentType", e.label); }}
                        />
                    </Col>
                    <Col md='3' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Tahun Pendirian/Perubahan
                        </Label>
                        <Input
                            type='text'
                            name={`year-${type}`}
                            id={`year-${type}`}
                            placeholder='Please fill Tahun Pendirian / Perubahan'
                            aria-label='john.doe'
                            value={dataAktaInput?.documentYear}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            maxLength="4"
                            onChange={(e) => { e.persist(); onHandleChangeValueStep2('akta', "documentYear", e.target.value); }}
                        />
                    </Col>
                    <Col md='2' className='mb-1'>
                        <Button color='primary' className='xs-margin-top inline-flex' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                onChange={(e) => { handleUploadFiles?.(e, "akta") }}
                                hidden
                                value={''}
                                accept={allowedFiles}
                            />
                        </Button>
                    </Col>
                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Notes
                        </Label>
                        <Input
                            type='textarea'
                            name={`notes-${type}`}
                            id={`notes-${type}`}
                            placeholder='Please fill Notes'
                            aria-label='john.doe'
                            onChange={(e) => { e.persist(); onHandleChangeValueStep2('akta', "documentNotes", e.target.value); }}
                        />
                    </Col>
                    {!isEmpty(aktaDocumentFile) && activeAkta && (
                        <UploadFileContainer style={{ width: "30%" }}>
                            <LabelText
                                style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
                                fsize={12}
                                color={"#000000"}
                            >
                                {aktaDocumentFile?.filename}
                            </LabelText>

                            <ContainerData>
                                <LabelText
                                    style={{ cursor: 'pointer' }}
                                    margin={"0px 5px"}
                                    fsize={14}
                                    color={"#61C7B5"}
                                    onClick={() => { openLink(aktaDocumentFile?.fileUrl) }}
                                >
                                    Lihat
                                </LabelText>

                                <LabelText
                                    style={{ cursor: 'pointer' }}
                                    fsize={14}
                                    color={"#ED2323"}
                                    onClick={() => { deleteDocument("akta"); }}
                                >
                                    Hapus
                                </LabelText>
                            </ContainerData>
                        </UploadFileContainer>
                    )}

                    {isSendingFile && uploadedType === "akta" && (
                        <UploadFileContainer>
                            <LabelText
                                style={{ wordBreak: 'break-all', textAlign: 'left' }}
                                fsize={12}
                                color={"#000000"}
                            >
                                {fileName}
                            </LabelText>

                            <LinearProgressWithLabel value={progressTracker} />
                        </UploadFileContainer>
                    )}
                </Row>
                <Button color='primary' className='btn-next float-right' onClick={() => handleAdd("akta")}>
                    <span className='align-middle d-sm-inline-block d-none'>Add</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
                {/* <Row>Akta Pendirian : 2011 - Akta pendirian PT Andalan Jaya Sugianto</Row> */}
            </Form>
            {dataTableAkta.length > 0 && (
                <TableDocument
                    striped
                    isNotDocumentBG
                    onHandleClickDocument={onHandleClickDocument}
                    configTable={configTableAkta}
                    deleteDocumentMerchant={deleteDocumentMerchant}
                />
            )}


            <Divider />
            <div className='content-header'>
                <h5 className='mb-0'>Pengesahan Kemenkumham</h5>
                <small className='text-muted'>Enter here</small>
            </div>
            <Form style={{ margin: "60px 0px" }} onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='3' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Pilih Jenis Akta
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={dataConvertKemenkumham[0]}
                            options={dataConvertKemenkumham}
                            isClearable={false}
                            onChange={(e) => { onHandleChangeValueStep2('kemenkumham', "documentType", e.label); }}
                        />
                    </Col>
                    <Col md='3' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Tahun Pendirian/Perubahan
                        </Label>
                        <Input
                            type='text'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please fill Tahun Pendirian / Perubahan'
                            aria-label='john.doe'
                            maxLength="4"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={(e) => { e.persist(); onHandleChangeValueStep2('kemenkumham', "documentYear", e.target.value); }}
                        />
                    </Col>
                    <Col md='2' className='mb-1'>
                        <Button color='primary' className='xs-margin-top inline-flex' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                onChange={(e) => { handleUploadFiles?.(e, "kemenkumham") }}
                                hidden
                                value={''}
                                accept={allowedFiles}
                            />
                        </Button>
                    </Col>
                    <Col md='4' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Notes
                        </Label>
                        <Input
                            type='textarea'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please fill Notes'
                            aria-label='john.doe'
                            onChange={(e) => { e.persist(); onHandleChangeValueStep2('kemenkumham', "documentNotes", e.target.value); }}
                        />
                    </Col>

                    {!isEmpty(kemenkumhamDocumentFile) && activeKemenkumham && (
                        <UploadFileContainer style={{ width: "30%" }}>
                            <LabelText
                                style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
                                fsize={12}
                                color={"#000000"}
                            >
                                {kemenkumhamDocumentFile?.filename}
                            </LabelText>

                            <ContainerData>
                                <LabelText
                                    style={{ cursor: 'pointer' }}
                                    margin={"0px 5px"}
                                    fsize={14}
                                    color={"#61C7B5"}
                                    onClick={() => { openLink(kemenkumhamDocumentFile?.fileUrl) }}
                                >
                                    Lihat
                                </LabelText>

                                <LabelText
                                    style={{ cursor: 'pointer' }}
                                    fsize={14}
                                    color={"#ED2323"}
                                    onClick={() => { deleteDocument("kemenkumham"); }}
                                >
                                    Hapus
                                </LabelText>
                            </ContainerData>
                        </UploadFileContainer>
                    )}

                    {isSendingFile && uploadedType === "kemenkumham" && (
                        <UploadFileContainer>
                            <LabelText
                                style={{ wordBreak: 'break-all', textAlign: 'left' }}
                                fsize={12}
                                color={"#000000"}
                            >
                                {fileName}
                            </LabelText>

                            <LinearProgressWithLabel value={progressTracker} />
                        </UploadFileContainer>
                    )}
                </Row>
                <Button color='primary' className='btn-next float-right' onClick={() => handleAdd("kemenkumham")}>
                    <span className='align-middle d-sm-inline-block d-none'>Add</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </Form>
            {dataTableKemenkumham.length > 0 && (
                <TableDocument
                    striped
                    isNotDocumentBG
                    onHandleClickDocument={onHandleClickDocument}
                    configTable={configTableKemenkumham}
                    deleteDocumentMerchant={deleteDocumentMerchant}
                />
            )}

            <Divider />
            <div className='content-header'>
                <h5 className='mb-0'>Company Background Document</h5>
                <small className='text-muted'>Enter here</small>
            </div>

            <Form style={{ margin: "60px 0px" }} onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='3' className='mb-1'>
                        <Label className='form-label' for={`username-${type}`}>
                            Pilih Jenis Dokumen
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={dataConvertBGDocument[0]}
                            options={dataConvertBGDocument}
                            isClearable={false}
                            onChange={(e) => { onHandleChangeValueStep2('companyBG', "documentType", e.label); }}
                        />
                    </Col>
                    <Col md='2' className='mb-1'>
                        <Button color='primary' className='xs-margin-top inline-flex' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                onChange={(e) => { handleUploadFiles?.(e, "companyBG") }}
                                hidden
                                value={''}
                                accept={allowedFiles}
                            />
                        </Button>
                    </Col>
                    {!isEmpty(companyBGDocumentFile) && activeCompanyBG && (
                        <UploadFileContainer style={{ width: "30%" }}>
                            <LabelText
                                style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
                                fsize={12}
                                color={"#000000"}
                            >
                                {companyBGDocumentFile?.filename}
                            </LabelText>

                            <ContainerData>
                                <LabelText
                                    style={{ cursor: 'pointer' }}
                                    margin={"0px 5px"}
                                    fsize={14}
                                    color={"#61C7B5"}
                                    onClick={() => { openLink(companyBGDocumentFile?.fileUrl) }}
                                >
                                    Lihat
                                </LabelText>

                                <LabelText
                                    style={{ cursor: 'pointer' }}
                                    fsize={14}
                                    color={"#ED2323"}
                                    onClick={() => { deleteDocument("companyBG"); }}
                                >
                                    Hapus
                                </LabelText>
                            </ContainerData>
                        </UploadFileContainer>
                    )}

                    {isSendingFile && uploadedType === "companyBG" && (
                        <UploadFileContainer>
                            <LabelText
                                style={{ wordBreak: 'break-all', textAlign: 'left' }}
                                fsize={12}
                                color={"#000000"}
                            >
                                {fileName}
                            </LabelText>

                            <LinearProgressWithLabel value={progressTracker} />
                        </UploadFileContainer>
                    )}
                </Row>
                <Button color='primary' className='btn-next float-right' onClick={() => handleAdd("companyBG")}>
                    <span className='align-middle d-sm-inline-block d-none'>Add</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </Form>
            {dataTableCompanyDoc.length > 0 && (
                <TableDocument
                    striped
                    isNotDocumentBG={false}
                    onHandleClickDocument={onHandleClickDocument}
                    configTable={configTableCompanyDoc}
                    deleteDocumentMerchant={deleteDocumentMerchant}
                />
            )}
        </MainCard>

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

export default DocumentDetail;