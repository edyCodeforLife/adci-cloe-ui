import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import MainCard from '../../../../../../@core/layouts/components/custom/MainCard';
import { replaceAll } from '../../../../../../utility/Utils';

const FixedInformation = ({ props, type }) => {
    // const data = useSelector(state=>state.loan.companyInformation)
    const data = []

    return (<>
        <MainCard>
            <div className='content-header'>
                <h5 className='mb-0'>Information</h5>
                <small className='text-muted'>Company</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                {
                    data?.map((val, index) => {
                        // console.log("chan--->"+JSON.stringify(data)+"********hold*********"+JSON.stringify(val))
                        return (
                            <Row>
                                <Col md='12' className='mb-1 inline-flex'>
                                    <Label md='4' className='form-label' for={'total-' + replaceAll(val.fieldName.toLowerCase(), ' ', '-')}>
                                        {val.fieldName}
                                    </Label>
                                    <Input md='8'
                                        type='text'
                                        name={'total-' + replaceAll(val.fieldName.toLowerCase(), ' ', '-')}
                                        id={val.id}
                                        placeholder={val.fieldValue}
                                        aria-label={val.fieldName}
                                    />
                                </Col>
                            </Row>
                        )
                    })
                }
            </Form>
        </MainCard>
    </>);
}

export default FixedInformation;