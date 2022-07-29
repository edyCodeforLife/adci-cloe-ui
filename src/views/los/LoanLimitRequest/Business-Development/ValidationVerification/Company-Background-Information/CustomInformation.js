import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import MainCard from '../../../../../../@core/layouts/components/custom/MainCard';
import { ArrowLeft, ArrowRight } from 'react-feather'
// import { useDispatch } from 'react-redux';
// import { addNewCompanyInformation } from '../../../../../redux/loan';

const CustomInformation = ({ handleChange, dataInfoAddDocument, addNewInformationField }) => {

    // const [nameInput, setNameInput] = useState("");
    // const [descInput, setDescriptionInput] = useState("");
    // const dispatch = useDispatch();

    // const addNewInformationField = () => {
    //     //   console.log("isilll"+nameInput+"--"+descInput)
    //     //   let payload = {
    //     //           "id": "4fe9abd0-7765-4f7f-af2c-c510ee0e6062",
    //     //           "active": true,
    //     //           "loanLimitRequestId": "df0d3e39-6d14-4901-b044-14c636fcc685",
    //     //           "fieldName": nameInput,
    //     //           "fieldValue": descInput,
    //     //           "position": 1
    //     //   }
    //     //  dispatch(addNewCompanyInformation(payload))
    // }

    return (<>
        <MainCard>
            <div className='content-header'>
                <h5 className='mb-0'>Add Additional Document</h5>
                <small className='text-muted'>Document</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='12' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`additional-doc`}>
                            Type Name Here
                        </Label>
                        <Input md="8"
                            type='text'
                            name={`additional-doc`}
                            id={`additional-doc`}
                            placeholder='Additional Document'
                            aria-label='Additional Document'
                            value={dataInfoAddDocument?.fieldName}
                            onChange={(e) => { e.persist(); handleChange("fieldName", e.target.value) }}
                        />
                    </Col>
                    <Col md='12' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-information`}>
                            Type Description here
                        </Label>
                        <Input md="8"
                            type='textarea'
                            name='username-information'
                            id='username-information'
                            placeholder='Floating Label'
                            style={{ minHeight: '100px' }}
                            value={dataInfoAddDocument?.fieldValue}
                            onChange={(e) => { e.persist(); handleChange("fieldValue", e.target.value) }}
                        />
                    </Col>
                </Row>
                <Button color='primary' className='btn-next float-right' onClick={() => addNewInformationField()}>
                    <span className='align-middle d-sm-inline-block d-none'>Add</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </Form>
        </MainCard>
    </>);
}

export default CustomInformation;