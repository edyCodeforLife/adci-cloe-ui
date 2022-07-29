import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Progress, Button } from 'reactstrap';
import MainCard from '../../@core/layouts/components/custom/MainCard';
import { SV_CUSTOMER_REGIST_FORM } from '../../utility/Constants';
import { ArrowLeft, ArrowRight } from 'react-feather'


const CustomerRegistrationSubmit = ({ stepper, userDataRegis, onSubmitRegistrationCustomer }) => {

    {console.log("isiuserdatare"+JSON.stringify(userDataRegis))}
    const configName = (name) => {
        switch (name) {
            case "FS_IF":
                return "IF) Invoice Financing";

            case "FS_SCF":
                return "(SCF) Supply Chain Financing";
        }
    }

    const CustomerSubmitContent = [
        {
            labelValue: 'Financing Services',
            inputValue: `${configName(userDataRegis?.financingService)} – ${userDataRegis?.customerType.toLowerCase()}`
        },
        {
            labelValue: 'Company Name',
            inputValue: userDataRegis?.companyName
        },
        {
            labelValue: 'Individual as Company Representative or  Owner Name',
            inputValue: userDataRegis?.fullName
        },
        {
            labelValue: 'Phone Number',
            inputValue: userDataRegis?.landlineNumber
        },
        {
            labelValue: 'Handphone',
            inputValue: userDataRegis?.handphone
        },
        {
            labelValue: 'Email',
            inputValue: userDataRegis?.email
        }
    ]

    return (<>
        <MainCard title={SV_CUSTOMER_REGIST_FORM}>
            {CustomerSubmitContent.map((value, key) =>
                <Row className='pt-50' key={key}>
                    <Col className='mb-2' md='6' sm='12'>
                        <p className='mb-50'>{value.labelValue} :</p>
                    </Col>
                    <Col className='mb-2' md='6' sm='12'>
                        <p className='mb-50'>{value.inputValue}</p>
                    </Col>
                </Row>
            )}
        </MainCard>
        <div className='d-flex justify-content-between'>
            <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()} outline>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={onSubmitRegistrationCustomer}>
                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
            </Button>
        </div>
    </>);
}

export default CustomerRegistrationSubmit;