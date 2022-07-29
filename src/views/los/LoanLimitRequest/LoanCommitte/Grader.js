import React, { useState } from 'react'
import CreditScore from '../../../../@core/components/credit-score-result'
import MainCard from '../../../../@core/layouts/components/custom/MainCard'
import { ArrowLeft, ArrowRight, Check, X } from 'react-feather'
import { Row, Col, Input, InputGroup, InputGroupText, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { PATH_CONFIRMATION } from '../../../../navigation/path';
import { MerchantService } from '../../../../data/business/index';
import Swal from 'sweetalert2';
import { QrsToObj } from '../../../../utility/function';

const Grader=({data})=>{
    const [approvalStatus, setApprovalStatus] = useState(false)
    const navigate = useNavigate();
    const _service = new MerchantService();
    const qrs = QrsToObj(window.location.search);
    const losId = qrs?.id;

    const styled = {
        display: 'flex'
    }

    const gradeScoreValue = {
        grade: data?.icrFinalScore,
        riskStatus: data?.riskStatus,
        gradeTableScore: [
            {
                head: "No",
                content: "1"
            },
            {
                head: "Company Name",
                content: data?.companyName
            },
            {
                head: "Customer Name",
                content: data?.customerName
            },
            {
                head: "Amount",
                content: Number((data?.amount?data.amount:0).toFixed(1)).toLocaleString()
            },
            {
                head: "Score Amount",
                content: data?.icrScoreAmount
            }
        ]
    }

    const apupptScoreValue = {
        grade: data?.apupptRiskStatus,
        riskStatus: data?.riskStatus,
        gradeTableScore: [
            {
                head: "No",
                content: "1"
            },
            {
                head: "Company Name",
                content: data?.companyName
            },
            {
                head: "Customer Name",
                content: data?.customerName
            },
            {
                head: "Amount",
                content: Number((data?.amount?data.amount:0).toFixed(1)).toLocaleString()
            },
            {
                head: "Borrower Type",
                content: data?.apupptBorrowerType
            },
            {
                head: "Total Score",
                content: data?.apupptTotalScore
            }
        ]
    }

    const handleClick = (status) => {
        if (status === "Approved") {
            _service.PostApproveLoanComittee({
                loanLimitRequestId: losId,
                userId: localStorage.getItem("email")
            }, {
                Success: (res) => {
                    Swal.fire({
                        title: 'Sukses!',
                        text: "Successfully Approved the loan",
                        icon: 'success',
                        confirmButtonText: 'Close'
                    });
                    setTimeout(() => {
                        navigate(PATH_CONFIRMATION, { state: { texts: 'you ' + status } })
                    }, 1000);
                },
                ValidationError: (res) => {
                    console.log(res)

                },
                ServerError: (res) => {
                    console.log(res)
                },
            })
        }

        if (status === "Reject") {
            _service.PostDisapproveLoanComittee({
                loanLimitRequestId: losId,
                userId: localStorage.getItem("email")
            }, {
                Success: (res) => {
                    Swal.fire({
                        title: 'Info!',
                        text: "Successfully Disapprove the loan",
                        icon: 'info',
                        confirmButtonText: 'Close'
                    });
                    setTimeout(() => {
                        navigate(PATH_CONFIRMATION, { state: { texts: 'you ' + status } })
                    }, 1000);
                },
                ValidationError: (res) => {
                    console.log(res)

                },
                ServerError: (res) => {
                    console.log(res)
                },
            })
        }


    }

    return (
        <>
            <MainCard secTitle="Company" styled={styled}>
                <CreditScore
                    title="APUPPT Score Result"
                    scoreValue={gradeScoreValue}
                />
                <CreditScore
                    title="ICR Score Result"
                    scoreValue={apupptScoreValue}
                />
            </MainCard>

            <Button color='primary' className='btn-next right-float margin-top-small' onClick={() => handleClick("Approved")}>
                <span className='align-middle d-sm-inline-block d-none'>Approved</span>
                <Check size={14} className='align-middle ms-sm-25 ms-0'></Check>
            </Button>
            <Button color='primary' className='btn-next ltr-direction margin-top-small' onClick={() => handleClick("Reject")}>
                <span className='align-middle d-sm-inline-block d-none'>Reject</span>
                <X size={14} className='align-middle ms-sm-25 ms-0'></X>
            </Button>
        </>
    )
}

export default Grader