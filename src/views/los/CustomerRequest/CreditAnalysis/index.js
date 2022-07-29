import React, { useState, useEffect } from 'react';
import { CreditTitle } from './constant';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import TabsPills from '../../../../@core/components/tabsPills';
import { VerificationByCMService } from '../../../../data/business/merchant/verificationByCM';
import { useDispatch, useSelector } from 'react-redux';
import CAScreen from './CAScreen';
import CreditScore from '../../../../@core/components/credit-score-result';
import { store } from '../../../../redux/store';
import Swal from 'sweetalert2';

const CreditAnalysis = ({ stepper }) => {
    const _service = new VerificationByCMService();
    const [tabContent, setTabContent] = useState([])
    const [show, setShow] = useState(false)
    const [data, setData] = useState({});

    const gradeScoreValue = {
        grade: data?.finalScore,
        gradeTableScore: [
            {
                head: "No",
                content: "1"
            },
            {
                head: "Customer Email",
                content: data?.customer?.["email"]
            },
            {
                head: "Phone Number",
                content: data?.customer?.["handphone"]
            },
            {
                head: "Score Amount",
                content: data?.scoreAmount
            }
        ]
    }

    const createTabContent = (ff) => {
        let CT = [];
        CT = CreditTitle.slice();

        ff.forEach((element, index) => {
            CT.push({
                title: element.name.toLocaleUpperCase(),
                content: <CAScreen type={element.name} data={element} />
            })
        });
        setTabContent(CT);
    }

    useEffect(() => {
        _service.getScoringFactorByCM({
            Success: (res) => {
                console.log("Factor Content Called");
                createTabContent(res.data)
            }
        })
    }, [])

    const countTotal = () => {
        let stored = store.getState().creditAnalysis.factorsContent?.scouring;
        let added = 0;
        stored.forEach((val, index)=>{
            if(val.hasOwnProperty('total'))
            {
                added += val.scoring;
            }
        })
        // alert(added);
        return added;
    }

    const handleNext = () => {
        // setShow(true)
        let payload = {
            "loanLimitRequestId": store.getState().merchant.cmSelectedReqData?.loanLimitRequestId,
            "customerId":store.getState().merchant.cmSelectedReqData?.customerId,
            "scoreAmount":countTotal(),
            "customerName": store.getState().merchant.cmSelectedReqData?.customerName,
            "finalScore":"",
            "scouring": store.getState().creditAnalysis.factorsContent?.scouring
        }

        // console.log(JSON.stringify(payload));
        _service.saveScoringFactorByCM(payload, {
            Success: (res) => {                
                console.log("Saved");
                setData(res?.data);
                setShow(true)
            },
            ServerError: (res)=>{
                Swal.fire({
                    title: res?.httpStatus,
                    text: res?.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            },
            ValidationError: (res)=>{
                Swal.fire({
                    title: res?.httpStatus,
                    text: res?.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        });
        // console.log(store.getState().creditAnalysis.factorsContent)
    }

    const handleOkModal = () => {
        setShow(false);
        stepper.next()
    }

    return (<>
        <TabsPills tabs={tabContent} />
        <Button color='primary' className='btn-next ltr-direction margin-top-small' onClick={() => handleNext()}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
        <Modal
            size="lg" style={{ maxWidth: '1000px', width: '100%' }}
            isOpen={show}
            toggle={() => setShow(!show)}
            className='modal-dialog-centered'>
            <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
                <h1 className='text-center mb-1'>Grade Scoring</h1>
                <CreditScore scoreValue={gradeScoreValue} />
                <div className='mid-center'>
                    <Button type='submit' className='margin-top-small' color='primary' onClick={() => handleOkModal()}>
                        Ok
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    </>);
}

export default CreditAnalysis;