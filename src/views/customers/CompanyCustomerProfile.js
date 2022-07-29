import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, UncontrolledButtonDropdown, Row, Col, Button } from 'reactstrap';
import MainCard from '../../@core/layouts/components/custom/MainCard';
import { SV_COMPANY_PROFILE, SV_CUSTOMER_PROFILE } from '../../utility/Constants';
import "../../@core/scss/react/custom/customer-registration.scss";
import MainLabel from '../../@core/layouts/components/custom/label/MainLabel';
import { ArrowLeft, ArrowRight } from 'react-feather'

const CompanyCustomerProfile = (props) => {

    const { t, stepper, companyType, dropdownOpen, selectedValue, toggle, changeValue, userDataRegis, onChange, nextStep, isDisabled, errorMessage } = props;
    console.log(companyType)

    return (<>
        <MainCard title={SV_COMPANY_PROFILE}>
            <div className='display-inline'>
                <MainLabel className="sm-margin-right" size="12px" align='center'>{t("Company Type")}</MainLabel>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className='flex-1' outline color='primary' size='sm' caret>
                        {selectedValue === "" ? companyType[0]?.name : selectedValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        {companyType.map((item, idx) => (
                            <DropdownItem style={{ padding: 8 }} className='w-100' key={idx}>
                                <div style={{ width: '100%' }} onClick={(e) => changeValue(e)}>{item.name}</div>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                    {/* <Dropdown className='flex-1'>
                        <DropdownToggle caret>
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>
                                Header
                            </DropdownItem>
                            <DropdownItem>
                                Action
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}
                </Dropdown>
                <MainLabel className="sm-margin-left sm-margin-right" size="12px" align='center'>{t("Company Name")}</MainLabel>
                <Input
                    onChange={
                        (e) => {
                            e.persist();
                            onChange("companyName", e.target.value)
                        }}
                    value={userDataRegis?.companyName}
                    className='half-field'
                    type='text'
                    id='company-name'
                    placeholder='Company Name'
                    autoFocus
                />
            </div>
        </MainCard>
        <MainCard title={SV_CUSTOMER_PROFILE}>
            <Row>
                <Col md='6'>
                    <Label>{t("First Name")}</Label>
                    <Input
                        onChange={
                            (e) => {
                                e.persist();
                                onChange("firstName", e.target.value)
                            }}
                        value={userDataRegis?.firstName}
                        type='text'
                        className='tidy-margin'
                        id='firstName'
                        placeholder='First Name'
                    />
                    <Label>{t("Phone")}</Label>
                    <Input
                        onChange={
                            (e) => {
                                e.persist();
                                onChange("landlineNumber", e.target.value)
                            }}
                        value={userDataRegis?.landlineNumber}
                        type='number'
                        className='tidy-margin'
                        id='telephone-number'
                        placeholder='Phone'
                    />
                    <Label>{t("Email")}</Label>
                    <Input
                        onChange={
                            (e) => {
                                e.persist();
                                onChange("email", e.target.value)
                            }}
                        value={userDataRegis?.email}
                        type='email'
                        className='tidy-margin'
                        id='email'
                        placeholder='Email'
                    />
                    <div className='errorMessageCustom'>{errorMessage?.email}</div>
                </Col>
                <Col md='6'>
                    <Label>{t("Last Name")}</Label>
                    <Input
                        onChange={
                            (e) => {
                                e.persist();
                                onChange("lastName", e.target.value)
                            }}
                        value={userDataRegis?.lastName}
                        type='text'
                        className='tidy-margin'
                        id='lastName'
                        placeholder='Last Name'
                    />
                    <Label>{t("Mobile Phone")}</Label>
                    <Input
                        onChange={
                            (e) => {
                                e.persist();
                                onChange("handphone", e.target.value)
                            }}
                        value={userDataRegis?.handphone}
                        type='number'
                        className='tidy-margin'
                        id='mobile-phone'
                        placeholder='Mobile Phone'
                    />
                    <div className='errorMessageCustom'>{errorMessage?.handphone}</div>
                </Col>
            </Row>
        </MainCard>
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' disabled={isDisabled} onClick={() => { nextStep(); stepper.next() }}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyCustomerProfile;