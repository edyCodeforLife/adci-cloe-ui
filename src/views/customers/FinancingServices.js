import React from 'react';
import { Button } from 'reactstrap'
import MainCard from '../../@core/layouts/components/custom/MainCard';
import { forwardRef } from 'react'
import { SV_CUSTOMER_TYPE, SV_FINANCING_SERVICE } from '../../utility/Constants';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from 'react-redux';
import RadioChoose from './RadioChooseType';

const FinancingServices = forwardRef((props, ref) => {
    const { t, fs, cs, stepper, handleChange, nextStepOne } = props;
    // useImperativeHandle(ref, () => ({ getMyState: () => { return fs } }), [fs]);

    {console.log("isi fs"+JSON.stringify(fs)+",,,"+JSON.stringify(cs))}
    return (<>
        <MainCard title={SV_FINANCING_SERVICE}>
            <div className='demo-inline-spacing'>
                <RadioChoose data={fs} handleChange={handleChange} />
                {/* <div className='form-check'>
                    <Input type='radio' id='ex1-active' name='financing-service-cb' value="scf" defaultChecked 
                        onChange={(e) => handleChange(e)} />
                    <Label className='form-check-label' for='ex1-active'>
                        SCF ({t("SCF")})
                    </Label>
                </div>
                <div className='form-check'>
                    <Input type='radio' name='financing-service-cb' value="if" id='ex1-inactive' 
                        onChange={(e) => handleChange(e)} />
                    <Label className='form-check-label' for='ex1-inactive'>
                        IF ({t("IF")})
                    </Label>
                </div> */}
            </div>
        </MainCard>
        <MainCard title={SV_CUSTOMER_TYPE}>
            <div className='demo-inline-spacing'>
                <RadioChoose data={cs} handleChange={handleChange} />
                {/* <div className='form-check'>
                    <Input type='radio' id='ex1-active' value="company" name='customer-type-cb' defaultChecked onChange={handleChange} />
                    <Label className='form-check-label' for='ex1-active'>
                        {t("Company.PT.CV")}
                    </Label>
                </div>
                <div className='form-check'>
                    <Input type='radio' name='customer-type-cb' value="individual" id='ex1-inactive' onChange={handleChange} />
                    <Label className='form-check-label' for='ex1-inactive'>
                        {t("Individual.UD.PD")}
                    </Label>
                </div> */}
            </div>
        </MainCard>
        <div className='d-flex justify-content-between'>
            <Button color='secondary' className='btn-prev' outline disabled>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => { nextStepOne(); stepper.next() }}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
})

export default FinancingServices;