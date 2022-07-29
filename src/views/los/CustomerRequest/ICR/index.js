import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Button } from 'reactstrap';

const ICR = ({stepper}) => {
    return ( <>
     <Button color='primary' className='btn-next ltr-direction margin-top-small' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
    </> );
}
 
export default ICR;