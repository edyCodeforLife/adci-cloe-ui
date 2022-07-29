import React, { useState, useEffect, useMemo } from 'react';
import Divider from '../../../../../@core/layouts/components/custom/Divider';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { Plus, ArrowLeft, ArrowRight } from 'react-feather'
import { isEmpty } from 'lodash';
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import { Label, Row, Col, Input, Form, Button, InputGroup } from 'reactstrap';
import { UploadFileContainer, LabelText, ContainerData, FlexRow, FlexOne, Flex } from '../../../../../@core/components/styled-components/custom-component/index';
import { LinearProgressWithLabel } from '../../../../../@core/components/styled-components/progress-tracker/index';
import { convertObjectKey } from '../../../../../utility/function';
import { selectThemeColors } from '@utils'
import { map } from 'lodash';
import { ALLOWED_KTP_DISPLAY } from '../../../../../utility/Constants';
import { filteringArrayByKey, filterValue, returnMultipleValToArr } from '../../../../../utility/Utils';
import { store } from '../../../../../redux/store';

const CompanyDetail = (props) => {

    const {
        merchantData,
        stepper,
        type,
        onHandleInputChange,
        onSaveData,
        handleUploadFiles,
        allowedFiles,
        fileInputRef,
        uploadedType,
        isSendingFile,
        progressTracker,
        fileSendError,
        fileName,
        npwpFile,
        nibFile,
        KTPFile,
        deleteDocument,
        openLink,
        activeDocumentNib,
        activeDocumentNpwp,
        activeDocumentKTP,
        stateList,
        countryList,
        cityList,
        businessLineList,
        businessAreaCoverage,
        handleSelectOpt,
        selectedOptLabel,
        onHandleAddBACoverage,
        listSelectedBACoverage
    } = props;

    // const onChange = e => {
    //     const reader = new FileReader(),
    //         files = e.target.files
    //     reader.onload = function () {
    //         setAvatar(reader.result)
    //     }
    //     reader.readAsDataURL(files[0])
    // }

    // alert(JSON.stringify(merchantData))

    const stateOptions = convertObjectKey(stateList, ["code", "name"], ["value", "label"]);
    const cityOptions = convertObjectKey(cityList, ["code", "name"], ["value", "label"]);
    const countryOptions = convertObjectKey(countryList, ["code", "name"], ["value", "label"]);
    const businessLineOptions = convertObjectKey(businessLineList, ["code", "name"], ["value", "label"]);
    const BACoverage = convertObjectKey(businessAreaCoverage, ["code", "name"], ["value", "label"]);
    const animatedComponents = makeAnimated()
    // console.log("--->" + JSON.stringify(merchantData));
    const [multipleVal, setMultipleVal] = useState([]);
    // {console.log("==>"+JSON.stringify(listSelectedBACoverage))}
    const isNotKTP = filterValue(ALLOWED_KTP_DISPLAY, filteringArrayByKey(store.getState().merchant.bdLoanLimitRequestSubmitted, "loanLimitRequestId", store.getState().customer.loanLimitRequestId)[0]?.companyType)

    useEffect(() => {
        // console.log("xxxxxxxxxx"+"==="+JSON.stringify(listSelectedBACoverage));
        let _tempBA = convertObjectKey(businessAreaCoverage, ["code", "name"], ["value", "label"]);
        let _temp = returnMultipleValToArr(_tempBA, listSelectedBACoverage)        
        setMultipleVal(_temp)
    }, [listSelectedBACoverage])


    const checkData = (data) => {
        if (data === "undefined") return "";
        else return data;
    }
    const dataProvince = {
        group: "STATE",
        id: "b42f040d-9d33-47fa-812a-f7ec0651398e",
        position: 3,
        value: merchantData?.province?.replaceAll('_', ' '),
        label: merchantData?.province?.replaceAll('_', ' ')
    }

    const dataCity = {
        group: "STATE",
        id: "b42f040d-9d33-47fa-812a-f7ec0651398e",
        position: 3,
        value: merchantData?.city?.replaceAll('_', ' '),
        label: merchantData?.city?.replaceAll('_', ' ')
    }

    const dataCountry = {
        group: "STATE",
        id: "b42f040d-9d33-47fa-812a-f7ec0651398e",
        position: 3,
        value: merchantData?.country?.replaceAll('_', ' '),
        label: merchantData?.country?.replaceAll('_', ' ')
    }

    const dataBusinessLine = {
        group: "STATE",
        id: "b42f040d-9d33-47fa-812a-f7ec0651398e",
        position: 3,
        value: merchantData?.businessLine?.replaceAll('_', ' '),
        label: merchantData?.businessLine?.replaceAll('_', ' ')
    }

    const dataBACoverage = {
        group: "STATE",
        id: "b42f040d-9d33-47fa-812a-f7ec0651398e",
        position: 3,
        value: merchantData?.businessAreaCoverage?.[0].replaceAll('_', ' '),
        label: merchantData?.businessAreaCoverage?.[0].replaceAll('_', ' ')
    }

    return (<>
        <MainCard>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='12' className='mb-1 inline-flex'>
                        <Label md="2" className='form-label' for={`username-${type}`}>
                            Company Name
                        </Label>
                        <Input md="10"
                            type='text'
                            name={`company-${type}`}
                            id={`company-${type}`}
                            placeholder='Please fill company name'
                            aria-label='john.doe'
                            maxLength="128"
                            value={merchantData?.name}
                            onChange={(e) => { e.persist(); onHandleInputChange('name', e.target.value); }}
                        />
                    </Col>
                    <Col md='12' className='mb-1 inline-flex'>
                        <Label md="2" className='form-label' for={`username-${type}`}>
                            Company Address
                        </Label>
                        <InputGroup>
                            <Input
                                type="textarea"
                                maxLength="128"
                                placeholder='Please fill company address'
                                value={merchantData?.address}
                                onChange={(e) => { e.persist(); onHandleInputChange('address', e.target.value); }}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='rtl-direction'>
                    <Col md='5' className='mb-1'>
                        <Label md="3" className='form-label' for={`username-${type}`}>
                            State/Province
                        </Label>
                        {/* <Input md="9"
                            type='text'
                            name={`province-${type}`}
                            id={`province-${type}`}
                            placeholder='please fill state / province'
                            aria-label='john.doe'
                            value={merchantData?.province}
                            onChange={(e) => { e.persist(); onHandleInputChange('province', e.target.value); }}
                        /> */}

                        <Select
                            md={"9"}
                            theme={selectThemeColors}
                            className='react-select ltr-direction'
                            classNamePrefix='select'
                            defaultValue={dataProvince}
                            options={stateOptions}
                            isClearable={false}
                            value={stateOptions.find(item => item.value === checkData(selectedOptLabel?.province))}
                            onChange={(e) => { handleSelectOpt?.("province", e?.value) }}
                        />
                    </Col>
                    <Col md='5' className='mb-1'>
                        <Label md="3" className='form-label' for={`username-${type}`}>
                            City
                        </Label>
                        {/* <Input md="9"
                            type='text'
                            name={`city-${type}`}
                            id={`city-${type}`}
                            placeholder='Please fill city'
                            aria-label='john.doe'
                            value={merchantData?.city}
                            onChange={(e) => { e.persist(); onHandleInputChange('city', e.target.value); }}
                        /> */}
                        <Select
                            md={"9"}
                            theme={selectThemeColors}
                            className='react-select ltr-direction'
                            classNamePrefix='select'
                            defaultValue={dataCity}
                            options={cityOptions}
                            isClearable={false}
                            value={cityOptions.find(item => item.value === checkData(selectedOptLabel?.city))}
                            onChange={(e) => { handleSelectOpt?.("city", e?.value) }}
                        />
                    </Col>
                </Row>
                <Row className='rtl-direction'>
                    <Col md='5' className='mb-1'>
                        <Label md="3" className='form-label left-float ltr-direction' for={`username-${type}`}>
                            Postal Code
                        </Label>
                        <Input md="9"
                            type='text'
                            name={`postal-${type}`}
                            id={`postal-${type}`}
                            maxLength="5"
                            placeholder='Please fill Postal Code'
                            aria-label='john.doe'
                            value={merchantData?.postalCode}
                            onChange={(e) => { e.persist(); onHandleInputChange('postalCode', e.target.value); }}
                        />
                    </Col>
                    <Col md='5' className='mb-1 rtl-direction'>
                        <Label md="3" className='form-label' for={`username-${type}`}>
                            Country
                        </Label>
                        {/* <Input md="9"
                            type='text'
                            name={`country-${type}`}
                            id={`country-${type}`}
                            placeholder='Please fill Country'
                            aria-label='john.doe'
                            value={merchantData?.country}
                            onChange={(e) => { e.persist(); onHandleInputChange('country', e.target.value); }}
                        /> */}
                        {/* {console.log("::"+JSON.stringify(selectedOptLabel))} */}
                        <Select
                            md={"9"}
                            theme={selectThemeColors}
                            className='react-select ltr-direction'
                            classNamePrefix='select'
                            defaultValue={dataCountry}
                            options={countryOptions}
                            isClearable={false}
                            value={countryOptions.find(item => item.value == checkData(selectedOptLabel?.country))}
                            onChange={(e) => { handleSelectOpt?.("country", e?.value) }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Row>
                            <Label md="4" className='form-label align-flex-start' for={`username-${type}`}>
                                KTP No
                            </Label>
                            <Col md='8' className='mb-1'>
                                <Row>
                                    <Col md="8">
                                        <Input
                                            type='text'
                                            name={`ktp-${type}`}
                                            id={`ktp-${type}`}
                                            maxLength="16"
                                            placeholder='Please fill KTP'
                                            aria-label='john.doe'
                                            value={merchantData?.ktpNo}
                                            onChange={(e) => { e.persist(); onHandleInputChange('ktpNo', e.target.value); }}
                                        />
                                    </Col>
                                    {!activeDocumentKTP && (
                                        <Col md="4">
                                            <Button color='primary' className='inline-flex' tag={Label}>
                                                Upload
                                                <Input
                                                    type='file'
                                                    onChange={(e) => { handleUploadFiles?.(e, "ktpUrl") }}
                                                    hidden
                                                    value={''}
                                                    accept={allowedFiles}
                                                />
                                            </Button>
                                        </Col>
                                    )}


                                    {!isEmpty(KTPFile) && activeDocumentKTP && (
                                        <UploadFileContainer>
                                            <LabelText
                                                style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
                                                fsize={12}
                                                color={"#000000"}
                                            >
                                                {KTPFile?.filename}
                                            </LabelText>

                                            <ContainerData>
                                                <LabelText
                                                    style={{ cursor: 'pointer' }}
                                                    margin={"0px 5px"}
                                                    fsize={14}
                                                    color={"#61C7B5"}
                                                    onClick={() => { openLink(KTPFile?.fileUrl) }}
                                                >
                                                    Lihat
                                                </LabelText>

                                                <LabelText
                                                    style={{ cursor: 'pointer' }}
                                                    fsize={14}
                                                    color={"#ED2323"}
                                                    onClick={() => { deleteDocument("ktpUrl"); }}
                                                >
                                                    Hapus
                                                </LabelText>
                                            </ContainerData>
                                        </UploadFileContainer>
                                    )}

                                    {isSendingFile && uploadedType === "ktpUrl" && (
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
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Row>
                            <Label md="4" className='form-label align-flex-start' for={`username-${type}`}>
                                NPWP or Tax ID
                            </Label>
                            <Col md='8' className='mb-1'>
                                <Row>
                                    <Col md="8">
                                        <Input
                                            type='text'
                                            name={`npwp-${type}`}
                                            id={`npwp-${type}`}
                                            placeholder='Please fill NPWP / Tax ID'
                                            aria-label='john.doe'
                                            maxLength="20"
                                            value={merchantData?.npwpNo}
                                            onChange={(e) => { e.persist(); onHandleInputChange('npwpNo', e.target.value); }}
                                        />
                                    </Col>
                                    {!activeDocumentNpwp && (
                                        <Col md="4">
                                            <Button color='primary' className='inline-flex' tag={Label}>
                                                Upload
                                                <Input
                                                    type='file'
                                                    onChange={(e) => { handleUploadFiles?.(e, "npwpUrl") }}
                                                    hidden
                                                    value={''}
                                                    accept={allowedFiles}
                                                />
                                            </Button>
                                        </Col>
                                    )}

                                    {!isEmpty(npwpFile) && activeDocumentNpwp && (
                                        <UploadFileContainer>
                                            <LabelText
                                                style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
                                                fsize={12}
                                                color={"#000000"}
                                            >
                                                {npwpFile?.filename}
                                            </LabelText>

                                            <ContainerData>
                                                <LabelText
                                                    style={{ cursor: 'pointer' }}
                                                    margin={"0px 5px"}
                                                    fsize={14}
                                                    color={"#61C7B5"}
                                                    onClick={() => { openLink(npwpFile?.fileUrl) }}
                                                >
                                                    Lihat
                                                </LabelText>

                                                <LabelText
                                                    style={{ cursor: 'pointer' }}
                                                    fsize={14}
                                                    color={"#ED2323"}
                                                    onClick={() => { deleteDocument("npwpUrl"); }}
                                                >
                                                    Hapus
                                                </LabelText>
                                            </ContainerData>
                                        </UploadFileContainer>
                                    )}

                                    {isSendingFile && uploadedType === "npwpUrl" && (
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
                            </Col>
                        </Row>
                    </Col>
                    {
                        isNotKTP ?
                            <Col md='6' className='mb-1'>
                                <Row>
                                    <Label md="4" className='form-label align-flex-start' for={`username-${type}`}>
                                        NIB Reg No
                                    </Label>

                                    <Col md='8' className='mb-1 '>
                                        <Row>
                                            <Col md="8">
                                                <Input
                                                    md="8"
                                                    type='text'
                                                    name={`NIB-${type}`}
                                                    id={`NIB-${type}`}
                                                    maxLength="13"
                                                    placeholder='Please fill NIB Reg No'
                                                    aria-label='john.doe'
                                                    value={merchantData?.nibNo}
                                                    onChange={(e) => { e.persist(); onHandleInputChange('nibNo', e.target.value); }}
                                                />
                                            </Col>
                                            {!activeDocumentNib && (
                                                <Col md="4">
                                                    <Button color='primary' className='inline-flex' tag={Label}>
                                                        Upload
                                                        <Input
                                                            type='file'
                                                            name="uploadNIB"
                                                            onChange={(e) => { handleUploadFiles(e, "nibUrl") }}
                                                            hidden
                                                            value={''}
                                                            accept={allowedFiles}
                                                        />
                                                    </Button>
                                                </Col>
                                            )}

                                            {!isEmpty(nibFile) && activeDocumentNib && (
                                                <UploadFileContainer>
                                                    <LabelText
                                                        style={{ wordBreak: 'break-all', textAlign: 'left', width: '50%' }}
                                                        fsize={12}
                                                        color={"#000000"}
                                                    >
                                                        {nibFile?.filename}
                                                    </LabelText>

                                                    <ContainerData>
                                                        <LabelText
                                                            style={{ cursor: 'pointer' }}
                                                            margin={"0px 5px"}
                                                            fsize={14}
                                                            color={"#61C7B5"}
                                                            onClick={() => { openLink(nibFile?.fileUrl) }}
                                                        >
                                                            Lihat
                                                        </LabelText>

                                                        <LabelText
                                                            style={{ cursor: 'pointer' }}
                                                            fsize={14}
                                                            color={"#ED2323"}
                                                            onClick={() => { deleteDocument("nibUrl"); }}
                                                        >
                                                            Hapus
                                                        </LabelText>
                                                    </ContainerData>
                                                </UploadFileContainer>
                                            )}

                                            {isSendingFile && uploadedType == "nibUrl" && (
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

                                    </Col>
                                </Row>
                            </Col> : null}
                </Row>
                <Row>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Company Email
                        </Label>
                        <Input md="2"
                            type='text'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please fill Company Email'
                            aria-label='john.doe'
                            maxLength="128"
                            value={merchantData?.email}
                            onChange={(e) => { e.persist(); onHandleInputChange('email', e.target.value); }}
                        />
                    </Col>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Company Phone
                        </Label>
                        <Input md="2"
                            type='text'
                            name={`phone-${type}`}
                            id={`phone-${type}`}
                            maxLength="20"
                            placeholder='Please fill Company Phone'
                            aria-label='john.doe'
                            value={merchantData?.phone}
                            onChange={(e) => { e.persist(); onHandleInputChange('phone', e.target.value); }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Product / Brand
                        </Label>
                        <Input md="2"
                            type='text'
                            name={`product-${type}`}
                            id={`product-${type}`}
                            placeholder='Please fill Product / Brand'
                            aria-label='john.doe'
                            maxLength="128"
                            value={merchantData?.product}
                            onChange={(e) => { e.persist(); onHandleInputChange('product', e.target.value); }}
                        />
                    </Col>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Business Line
                        </Label>
                        {/* <Input md="2"
                            type='text'
                            name={`business-${type}`}
                            id={`business-${type}`}
                            placeholder='Please fill Business Line'
                            aria-label='john.doe'
                            value={merchantData?.businessLine}
                            onChange={(e) => { e.persist(); onHandleInputChange('businessLine', e.target.value); }}
                        /> */}
                        {/* {console.log("bizin"+JSON.stringify(businessLineOptions[0])+"==="+JSON.stringify(selectedOptLabel?.businessLine))} */}
                        <div style={{ width: '300px' }}>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={dataBusinessLine}
                                options={businessLineOptions}
                                isClearable={false}
                                value={businessLineOptions.find(item => item.value === checkData(selectedOptLabel?.businessLine))}
                                onChange={(e) => { handleSelectOpt?.("businessLine", e?.value) }}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md='12'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Business Area Coverage
                        </Label>
                        <Row>
                            {console.log("====+" + JSON.stringify(multipleVal))}
                            <Col md={12}>
                                <Select
                                    theme={selectThemeColors}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    className='react-select ltr-direction'
                                    classNamePrefix='select'
                                    // defaultValue={dataBACoverage}
                                    options={BACoverage}
                                    isClearable={false}
                                    value={multipleVal}
                                    // value={BACoverage.find(item => item.value === checkData(selectedOptLabel?.businessAreaCoverage))}
                                    // onChange={(e) => { handleSelectOpt?.("businessAreaCoverage", e?.value) }}
                                    onChange={(e) => { onHandleAddBACoverage(e) }}
                                />
                            </Col>

                            {/* <Col md={6}>
                                <Button className='btn-icon' color='primary' onClick={onHandleAddBACoverage}>
                                    <Plus size={14} />
                                    <span className='align-middle ms-25'>Add</span>
                                </Button>
                            </Col> */}
                        </Row>
                        {/* <Row>
                            <Col md={12}>
                                <FlexRow>
                                    {map(listSelectedBACoverage, (item, idx) => (
                                        <div key={idx} style={{ color: '#ef0000', marginTop: 15, marginRight: 15 }} >
                                            {item}
                                        </div>
                                    ))}
                                </FlexRow>
                            </Col>
                        </Row> */}
                    </Col>
                </Row>

            </Form>
        </MainCard>
        <div className='d-flex justify-content-between'>
            <Button color='secondary' className='btn-prev' outline disabled>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => { onSaveData(); }}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyDetail;