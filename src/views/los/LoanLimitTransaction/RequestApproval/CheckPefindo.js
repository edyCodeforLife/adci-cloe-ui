import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button, InputGroup } from 'reactstrap'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { Spinner } from 'reactstrap';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import MainLabel from '../../../../@core/layouts/components/custom/label/MainLabel';

const CheckPefindo = ({ type, stepper, isDisable, onHandleCheckPefindo, merchantData, loading, onHandleInputChange, pefindoData, onClickHandleApproveReject, onHandleClickDocument }) => {
    const navigate = useNavigate();
    return (<>
        <MainCard>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Customer {merchantData?.customerType === "Individual" ? "NIK" : "NPWP"}
                        </Label>
                        <Input md="10"
                            type='text'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please Fill Customer NPWP'
                            aria-label='john.doe'
                            value={merchantData?.customerType === "Individual" ? merchantData?.customerNik : merchantData?.npwpNo}
                            onChange={(e) => { e.persist(); onHandleInputChange(merchantData?.customerType === "Individual" ? "customerNik" : "npwpNo", e.target.value); }}
                        />
                    </Col>
                </Row>
            </Form>
            <div className='d-flex justify-content-between'>
                <Button color='primary' className='btn-next' disabled={merchantData?.companyNpwp === ""} onClick={onHandleCheckPefindo}>
                    <span className='align-middle d-sm-inline-block d-none'>Check</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    {loading && (
                        <Spinner type={"grow"} style={{ width: '1rem', height: '1rem', color: 'white' }}
                            children={false}
                        />
                    )}
                </Button>
            </div>

            {!loading && !isEmpty(pefindoData) ? (
                <MainLabel className={"labelCustom"}>
                    {`${pefindoData?.message === null ? "Data Pefindo tidak ditemukan" : pefindoData?.message}`}
                </MainLabel>
            ) : null}

            {pefindoData?.pefindoTxtFileUrl &&
                <div className='d-flex'>
                    <div className='mx-1'>Pefindo Detail TXT File URL</div>
                    <div className='text-link' onClick={() => onHandleClickDocument(pefindoData?.pefindoTxtFileUrl)}>{"Lihat Dokumen"}</div>
                </div>
            }

            {pefindoData?.pefindoExcelFileUrl &&
                <div className='d-flex'>
                    <div className='mx-1'>Pefindo Detail Excel File URL</div>
                    <div className='text-link' onClick={() => onHandleClickDocument(pefindoData?.pefindoExcelFileUrl)}>{"Lihat Dokumen"}</div>
                </div>
            }

            {pefindoData?.pefindoPdfFileUrl &&
                <div className='d-flex'>
                    <div className='mx-1'>Pefindo Detail PDF File URL</div>
                    <div className='text-link' onClick={() => onHandleClickDocument(pefindoData?.pefindoPdfFileUrl)}>{"Lihat Dokumen"}</div>
                </div>
            }


        </MainCard>

        <MainCard>
            <MainLabel className='d-flex justify-content-center mb-2'>
                Silahkan Pilih Approve atau Reject
            </MainLabel>
            <div className='d-flex justify-content-center'>
                <Button color='primary' className='btn-prev mx-1' onClick={() => onClickHandleApproveReject("approved")}>
                    <span className='align-middle d-sm-inline-block d-none'>Approved</span>
                </Button>
                <Button color='secondary' className='btn-next mx-1' onClick={() => onClickHandleApproveReject("reject")}>
                    <span className='align-middle d-sm-inline-block d-none'>Reject</span>
                </Button>
            </div>
        </MainCard>

        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' disabled={isDisable} onClick={() => navigate("/cloe")}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>

    </>);
}

export default CheckPefindo;