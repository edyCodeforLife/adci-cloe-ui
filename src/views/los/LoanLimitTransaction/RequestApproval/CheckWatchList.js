import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button, InputGroup } from 'reactstrap'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { useNavigate } from 'react-router-dom';
import { PATH_MY_CUSTOMER } from '../../../../navigation/path';
import DatePicker from 'react-date-picker';
import { Spinner } from 'reactstrap';
import { isEmpty } from 'lodash';
import MainLabel from '../../../../@core/layouts/components/custom/label/MainLabel';
// import DatepickerDefault from '../../../../@core/components/datepicker';

const CheckWatchlist = ({ type, stepper, loading, onHandleInputChange, onSaveData, watchlistData, merchantData, onHandleDatePicker, dataDate, isDisable, onHandleClickDocument }) => {
    const navigate = useNavigate()
    const navigateTo = () => {
        navigate(PATH_MY_CUSTOMER);

    }

    return (<>
        <MainCard>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Customer Name
                        </Label>
                        <Input md="10"
                            type='text'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please Fill Customer Name'
                            aria-label='john.doe'
                            value={merchantData?.fullName}
                            onChange={(e) => { e.persist(); onHandleInputChange('fullName', e.target.value); }}

                        />
                    </Col>
                    <Col md='6' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-${type}`}>
                            Date of Birth
                        </Label>

                        <DatePicker
                            onChange={onHandleDatePicker}
                            value={dataDate}
                            format={"dd-MM-y"}
                        />

                        {/* <Flatpickr
                            className='form-control'
                            // value={picker}
                            onChange={date => onHandleInputChange('dob', formatDate(date))
                            }
                            id='default-picker'
                        />
                        <DatepickerDefault
                            onHandleInputChange={(e) => { e.persist(); onHandleInputChange('dob', e.target.value) }}
                        /> */}
                        {/* <Input md="10"
                            type='text'
                            name={`email-${type}`}
                            id={`email-${type}`}
                            placeholder='Please Fill Date Of Birth'
                            aria-label='john.doe'
                            onChange={(e) => { e.persist(); onHandleInputChange('dob', e.target.value); }}
                        /> */}
                    </Col>
                </Row>
            </Form>
            <div className='d-flex justify-content-between'>
                <Button color='primary' className='btn-next' disabled={merchantData?.fullName === "" && merchantData?.bod === ""} onClick={() => onSaveData()}>
                    <span className='align-middle d-sm-inline-block d-none'>Check</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    {loading && (
                        <Spinner type={"grow"} style={{ width: '1rem', height: '1rem', color: 'white' }}
                            children={false}
                        />
                    )}
                </Button>
            </div>

            {!loading && !isEmpty(watchlistData) ? (
                <MainLabel className={"labelCustom"}>
                    {`Customer ${merchantData?.fullName} ${watchlistData?.userInWatchlist ? "terdaftar" : "tidak terdaftar"} di Watchlist`}
                </MainLabel>
            ) : null}


            {watchlistData?.userInWatchlist &&
                <div className='d-flex'>
                    <div className='mx-1'>WatchList Detail PDF File URL</div>
                    <div className='text-link' onClick={() => onHandleClickDocument(watchlistData?.watchlistPdfFileUrl)}>{"Lihat Dokumen"}</div>
                </div>
            }

            {/* {watchlistData?.userInWatchlist &&
                <div className='d-flex'>
                    <div className='mx-1'>WatchList Detail Excel File URL</div>
                    <div className='text-link' onClick={() => onHandleClickDocument(watchlistData?.watchlistDetailExcelFileUrl)}>{"Lihat Dokumen"}</div>
                </div>
            } */}



        </MainCard>

        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-prev' onClick={() => stepper.next()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CheckWatchlist;