import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button, InputGroup } from 'reactstrap'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from 'reactstrap';
import { isEmpty } from 'lodash';
import MainLabel from '../../../../@core/layouts/components/custom/label/MainLabel';

const CheckFDC = ({ type, stepper, loading, onHandleInputChange, FDCData, merchantData, startDate, onChangeDateRangePicker, endDate, onCheckFDC, onHandleClickDocument }) => {
    return (<>
        <MainCard>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Company NPWP
                        </Label>
                        <Input md="10"
                            type='number'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please fill company NPWP'
                            aria-label='john.doe'
                            value={merchantData?.npwpNo}
                            onChange={(e) => { e.persist(); onHandleInputChange('npwpNo', e.target.value); }}
                        />
                    </Col>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Customer NIK (Requester)
                        </Label>
                        <Input md="10"
                            type='number'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please fill id card number'
                            aria-label='john.doe'
                            value={merchantData?.customerNik}
                            onChange={(e) => { e.persist(); onHandleInputChange('customerNik', e.target.value); }}
                        />
                    </Col>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Inquiry Period
                        </Label>
                        <DatePicker
                            onChange={(update) => onChangeDateRangePicker(update)}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange={true}
                            isClearable={true}
                            dateFormat={"dd/MM/yyyy"}
                        />
                    </Col>
                </Row>
            </Form>
            <div className='d-flex justify-content-between'>
                <Button color='primary' className='btn-next' onClick={() => onCheckFDC()}>
                    <span className='align-middle d-sm-inline-block d-none'>Check</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    {loading && (
                        <Spinner type={"grow"} style={{ width: '1rem', height: '1rem', color: 'white' }}
                            children={false}
                        />
                    )}
                </Button>
            </div>

            {!loading && !isEmpty(FDCData) ? (
                <MainLabel className={"labelCustom"}>
                    {`Customer ${merchantData?.fullName} ${FDCData?.userInFdc ? "ada" : "tidak ada"} di FDC`}
                </MainLabel>
            ) : null}


            {FDCData?.userInFdc && FDCData?.fdcPdfFileUrl !== null &&
                <div className='d-flex'>
                    <div className='mx-1'>FDC Detail PDF File URL</div>
                    <div className='text-link' onClick={() => onHandleClickDocument(FDCData?.fdcPdfFileUrl)}>{"Lihat Dokumen"}</div>
                </div>
            }

        </MainCard>

        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => stepper?.next()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>

    </>);
}

export default CheckFDC;