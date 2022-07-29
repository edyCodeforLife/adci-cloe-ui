import React, { useState, useEffect } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import CompanyDetail from './ValidationVerification/CompanyDetail';
import ShareholderDetail from './ValidationVerification/ShareholderDetail';
import DocumentDetail from './ValidationVerification/DocumentDetail';

const ValidationVerification = ({ stepper, type }) => {
    return (<>
        <MainCard title="Company Detail" actions='collapse'>
            <CompanyDetail type={type}/>
        </MainCard>
        <MainCard title="Document Detail" actions='collapse'>
            <DocumentDetail type={type}/>
        </MainCard>
        <MainCard title="Shareholder Detail" actions='collapse'>
            <ShareholderDetail />
        </MainCard>
        <div className='d-flex justify-content-between'>
            <Button color='secondary' className='btn-prev' outline disabled>
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

export default ValidationVerification;