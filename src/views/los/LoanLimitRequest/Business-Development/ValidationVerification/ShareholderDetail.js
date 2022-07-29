import React from 'react';
import Divider from '../../../../../@core/layouts/components/custom/Divider';
import CompanyStructure from './ShareholderDetail/CompanyStructure';
import CompanyTable from './ShareholderDetail/CompanyTable';
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import { Button } from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import TableCompanyStructureShareholder from './ShareholderDetail/table-structure';
import FinancialReportTable from './ShareholderDetail/FinancialReportTable';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PATH_LOAN_ORIGINATION_SYSTEM } from '../../../../../navigation/path';
import { MerchantService } from '../../../../../data/business';
import { useDispatch } from 'react-redux';
import { setBDApprovalData } from '../../../../../redux/merchant';

const ShareholderDetail = ({ stepper, userNameBd, loanlimitrequestId, onHandleClickDocument, merchantData, bgFileLoanLimitReq, merchantStructureData, merchantInfoLoanLimitReq, merchantDocLoanLimitReq, onSubmitValidationVerification }) => {

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const configMerchantData = {
        title: ["Name", "Email", "Nomor NIB", "Nomor NPWP", "Nomor Handphone", "Head Office Address", "Brand", "Business Line", "Area", "BD PIC"],
        data: merchantData
    }
    const _service = new MerchantService();

    const configDataBackgroundFile = {
        title: ["Document Group", "Document Type", "Document Year", "Document Notes", "Document Url"],
        data: bgFileLoanLimitReq
    }

    // const configMerchantStructureData = {
    //     title: ["Structure Group", "Document Type", "Document Year", "Document Notes", "Document Url"],
    //     data: merchantStructureData
    // }

    const configDataMerchantInfo = {
        title: ["Additional Document Name", "Description"],
        data: merchantInfoLoanLimitReq
    }

    const submitData = () => {
        Swal.fire({
            title: 'Do you want to submit data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approve Data',
            cancelButtonText: "Reject Data"
        }).then((result) => {
            if (result.isConfirmed) {
                _service.setReviewLoanLimitRequestByBD({
                    'loanLimitRequestId': loanlimitrequestId
                },
                    {
                        Success: (res) => {
                            dispatch(setBDApprovalData(res?.data));
                            Swal.fire('Review Data Success', `Succesfully approve id ${res?.data?.id} with jobNumber : ${res?.data?.amount}`
                                , 'success').then(onSubmitValidationVerification())
                        },
                        ValidationError: (res) => {
                            Swal.fire('Rejected!', `${res?.error}`, 'error')
                        },
                        ServerError: (res) => {
                            Swal.fire('Rejected!', `${res?.error}`, 'error')
                        }
                    });
            } else {
                _service.setRejectLoanLimitRequestByBD({
                    'loanLimitRequestId': loanlimitrequestId
                },
                    {
                        Success: (res) => {
                            dispatch(setBDApprovalData(res?.data))
                            Swal.fire('Reject Data Success', `Data: ${res?.data}`, 'success').then(navigation(PATH_LOAN_ORIGINATION_SYSTEM))
                        },
                        ValidationError: (res) => {
                            Swal.fire('Rejected!', `${res?.error}`, 'error')
                        },
                        ServerError: (res) => {
                            Swal.fire('Rejected!', `${res?.error}`, 'error')
                        }
                    });
            }
        })
    }

    return (<>
        <MainCard>
            <CompanyTable
                configTable={configMerchantData}
                username={userNameBd}
                type={"merchantData"}
            />

            <Divider />

            <CompanyTable
                configTable={configDataBackgroundFile}
                type={"BGFile"}
                onHandleClickDocument={onHandleClickDocument}
            />

            <Divider />

            <TableCompanyStructureShareholder
                data={merchantStructureData}
            />

            <Divider />

            <CompanyTable
                configTable={configDataMerchantInfo}
                type={"merchantInfo"}
            />

            <Divider />

            <FinancialReportTable data={merchantDocLoanLimitReq} />

            {/* <CompanyStructure /> */}
        </MainCard>

        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => submitData()}>
                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>

    </>);
}

export default ShareholderDetail;