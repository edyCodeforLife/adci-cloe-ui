import React, { useState, useEffect } from 'react';
import { Button, Label } from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import RichText from '../../../../@core/components/rich-text';
import { useNavigate } from 'react-router-dom';
import { PATH_LOAN_ORIGINATION_SYSTEM } from '../../../../navigation/path';
import { setCombineContent } from '../../../../redux/creditAnalysis';
import { VerificationByCMService } from '../../../../data/business/merchant/verificationByCM';
import { store } from '../../../../redux/store';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { setLookupProductIDCreditMemo } from '../../../../redux/merchant';
import { convertObjectKey } from '../../../../utility/Utils';

const CreditMemo = ({ stepper }) => {
    const navigate = useNavigate();
    const _service = new VerificationByCMService();
    const caData = useSelector(state => state.creditAnalysis);
    const cmProductID = convertObjectKey(useSelector(state => state.merchant.cmLookupProductId), ["id", "name"], ["value", "label"]);;
    const [productId, setProductID] = useState({})
    const dispatch = useDispatch();

    const contentText = () => {
        let text = "";
        text += text.concat(caData.purposeContent);
        text += "<br />"
        text += caData.customerDetailContent;

        return text
    }

    useEffect(() => {
        _service.getProductListByCM({
            Success: (res) => {
                dispatch(setLookupProductIDCreditMemo(res?.data))
            }
        })
    }, [])


    const handleText = (txt) => {
        dispatch(setCombineContent(txt));
    }

    const handleNext = () => {
        let payload = {
            "loanLimitRequestId": store.getState().merchant.cmSelectedReqData?.loanLimitRequestId,
            "customerId": store.getState().merchant.cmSelectedReqData?.customerId,
            "purpose": "",
            "customerDetail": Buffer.from(store.getState().creditAnalysis?.combineContent).toString('base64'),
            "productId": productId?.productID==undefined? store.getState().merchant.cmLookupProductId[0]?.id : productId?.productID
        }
        _service.saveCreditMemoByCM(payload, {
            Success: (res) => {
                // console.log("Credit Memo : " + JSON.stringify(res));
                _service.approveCreditAssesmentByCM({
                    "loanLimitRequestId": store.getState().merchant.cmSelectedReqData?.loanLimitRequestId,
                }, {
                    Success: (res) => {
                        Swal.fire({
                            title: 'Success!',
                            text: "All Saved",
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            navigate(PATH_LOAN_ORIGINATION_SYSTEM);
                        })
                    }
                })
            },
            ServerError: (res) => {
                Swal.fire({
                    title: 'Error!',
                    text: "Error Happen When Try To Submit " + JSON.stringify(res),
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            },
        }
        );
    }

    return (<>
        <MainCard title="Verification Page">
            <Label className='form-label' >
                Product ID
            </Label>
            <Select
                theme={selectThemeColors}
                className='react-select lg-margin-bottom'
                classNamePrefix='select'
                // value={transitionValue}
                options={cmProductID}
                isClearable={false}
                onChange={(e) => setProductID({["productID"]: e.value})}
            />
            <Label className='form-label' >
                Text Editor
            </Label>
            <RichText data={contentText()} handleText={handleText} />
        </MainCard>
        <Button color='primary' className='btn-next ltr-direction margin-top-small' onClick={() => handleNext()}>
            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
    </>);
}

export default CreditMemo;