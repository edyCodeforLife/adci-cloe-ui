// ** React Imports
import { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment';
// ** Custom Components
import Wizard from '@components/wizard'
import { CheckFDC, CheckPefindo, CheckWatchList } from './RequestApproval'
import { getFormData } from '../../../utility/function';
import { VerifyService, MerchantService } from '../../../data/business';
import { QrsToObj } from '../../../utility/function';
import { clone } from 'lodash';
import Swal from 'sweetalert2';

const WizardHorizontal = ({ type }) => {
    // ** Ref
    const ref = useRef(null);
    const qrs = QrsToObj(window.location.search);
    const loanlimitrequestId = qrs?.id;
    const cid = qrs?.cid;
    const formatDate = (date) => {
        const formatted = moment(new Date(date)).format("DD/MM/YYYY")
        const formatedStr = formatted.replaceAll("/", "-")
        return formatedStr
    }

    const _initialState = {
        fullName: "",
        bod: formatDate(Date.now()),
        searchType: "ALL",
        npwpNo: "",
        customerNik: "",
        inquiryPeriodStart: "",
        inquiryPeriodEnd: "",
        emailBd: "",
        loanLimitRequestId: loanlimitrequestId,
        customerId: cid,
        customerType: ""
    }

    // ** State
    const dateInteraction = useRef(false);
    const [stepper, setStepper] = useState(null)
    const [merchantData, setMerchantData] = useState(_initialState);
    const [watchlistData, setWatchlistData] = useState({});
    const [FDCData, setFDCData] = useState({});
    const [pefindoData, setPefindoData] = useState({});
    const [loading, setLoading] = useState(false);
    const [dataDate, setDataDate] = useState(new Date());
    const [isDisable, setIsDisable] = useState(true);
    const [customerData, setCustomerData] = useState({});
    const _service = new VerifyService();
    const _merchantService = new MerchantService();

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const onChangeDateRangePicker = (update) => {
        dateInteraction.current = true;
        setDateRange(update);

    };

    useEffect(() => {
        const newData = clone(merchantData);
        newData["inquiryPeriodStart"] = formatDate(startDate);
        newData["inquiryPeriodEnd"] = formatDate(endDate);
        setMerchantData(newData);
    }, [dateRange])

    const onHandleInputChange = useCallback((fieldId, value, error) => {
        let obj = {};
        obj[fieldId] = value;
        setMerchantData({ ...merchantData, ...obj })
    }, [merchantData]);

    const onHandleDatePicker = (value) => {
        setDataDate(value)
        setMerchantData({ ...merchantData, bod: formatDate(value) });
    }

    const getCustomerData = () => {
        let customerType = "";
        _merchantService.GetCustomerDataByLoanLimitRequestID(loanlimitrequestId, {
            Success: (res) => {
                setCustomerData(res?.data);
                if (res?.data?.companyType === "PD" || res?.data?.companyType === "UD" || res?.data?.companyType === "OTHERS") {
                    customerType = "Individual";
                } else {
                    customerType = "Company"
                }

                const newData = clone(merchantData);

                newData["npwpNo"] = res?.data?.npwpNo;
                newData["customerType"] = customerType;
                newData["fullName"] = `${res?.data?.firstName} ${res?.data?.lastName}`;
                setMerchantData(newData)
            }
        })
    }

    useEffect(() => {
        getCustomerData();
    }, []);

    const onSaveData = () => {
        setLoading(true);
        // let isDisable = false;
        const _payload = {
            fullName: merchantData.fullName,
            searchType: merchantData.searchType,
            bod: merchantData.bod,
            loanLimitRequestId: loanlimitrequestId
        }
        const _merchantData = getFormData(_payload)
        _service.PostSaveCheckWatchlist(_merchantData, {
            Success: (res) => {
                setLoading(false);
                setWatchlistData(res?.data)
                // if (res?.data?.userInWatchlist === null || !res?.data.userInWatchlist) {
                //     isDisable = false;
                // } else {
                //     isDisable = true;
                // }
                // setIsDisable(isDisable);
            },
            ValidationError: (res) => {
                setLoading(false);
            },
            ServerError: (res) => {
                setLoading(false);
            },
        })
    }

    const onHandleCheckPefindo = () => {
        const _newData = clone(merchantData);
        setLoading(true);
        const checkPefindo = {
            loanLimitRequestId: _newData?.loanLimitRequestId,
            customerId: _newData?.customerType === "Individual" ? _newData?.customerNik : _newData?.npwpNo,
            dateOfBirth: _newData?.bod,
            customerType: _newData?.customerType
        }
        const _payload = getFormData(checkPefindo);
        _service.PostSaveCheckPefindo(_payload, {
            Success: (res) => {
                setLoading(false);
                setPefindoData(res?.data)
            },
            ValidationError: (res) => {
                setLoading(false);
            },
            ServerError: (res) => {
                setLoading(false);
            },
        })

    }

    const onCheckFDC = () => {
        setLoading(true);
        const data = clone(merchantData);
        const payload = {
            companyNpwp: data?.npwpNo,
            customerNik: data?.customerNik,
            inquiryPeriodStart: data?.inquiryPeriodStart,
            inquiryPeriodEnd: data?.inquiryPeriodEnd,
            emailBd: localStorage?.getItem("email")
        }

        const sendData = getFormData(payload);
        _service.PostSaveCheckFDC(sendData, {
            Success: (res) => {
                setLoading(false);
                setFDCData(res?.data);
            },
            ValidationError: (res) => {
                setLoading(false);
            },
            ServerError: (res) => {
                setLoading(false);
            },

        })
    }

    const onClickHandleApproveReject = (type) => {
        if (type === "approved") {
            _merchantService.PostApproveLoanLimitRequest({ loanLimitRequestId: loanlimitrequestId }, {
                Success: (res) => {
                    setIsDisable(false);
                    Swal.fire({
                        title: 'Sukses!',
                        text: "Successfully Approved the loan",
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                }
            })
        } else {
            _merchantService.PostDisappproveLoanLimitRequest({ loanLimitRequestId: loanlimitrequestId }, {
                Success: (res) => {
                    setIsDisable(false);
                    Swal.fire({
                        title: 'Sukses!',
                        text: "Successfully Disapprove the loan",
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                }
            })
        }

    }

    const onHandleClickDocument = (link) => {
        const anchorEl = document.createElement('a');

        anchorEl.href = link;
        anchorEl.target = '_blank';
        anchorEl.rel = 'noopener';
        setTimeout(() => {
            anchorEl.click();
        });
    }

    const steps = [
        {
            id: 'check-watchlist',
            title: 'Check WatchList',
            subtitle: 'Enter Your Account Details.',
            content: <CheckWatchList
                stepper={stepper}
                type={type}
                onSaveData={onSaveData}
                dataDate={dataDate}
                loading={loading}
                merchantData={merchantData}
                onHandleInputChange={onHandleInputChange}
                watchlistData={watchlistData}
                isDisable={isDisable}
                onHandleDatePicker={onHandleDatePicker}
                onHandleClickDocument={onHandleClickDocument}
            />
        },
        {
            id: 'check-fdc',
            title: 'Check FDC',
            subtitle: 'Enter Your Account Details.',
            content: <CheckFDC
                stepper={stepper}
                type={type}
                merchantData={merchantData}
                onHandleInputChange={onHandleInputChange}
                onChangeDateRangePicker={onChangeDateRangePicker}
                startDate={startDate}
                endDate={endDate}
                customerData={customerData}
                onCheckFDC={onCheckFDC}
                FDCData={FDCData}
                onHandleClickDocument={onHandleClickDocument}
                loading={loading}
            />
        },
        {
            id: 'check-pefindo',
            title: 'Check Pefindo',
            subtitle: 'Enter Your Account Details.',
            content: <CheckPefindo
                loading={loading}
                pefindoData={pefindoData}
                stepper={stepper}
                type={type}
                onHandleCheckPefindo={onHandleCheckPefindo}
                merchantData={merchantData}
                onHandleInputChange={onHandleInputChange}
                onClickHandleApproveReject={onClickHandleApproveReject}
                onHandleClickDocument={onHandleClickDocument}
                isDisable={isDisable}
            />
        }
    ]

    return (
        <div className='horizontal-wizard'>
            <Wizard ref={ref}
                steps={steps}
                // options={{
                //     linear: false
                // }}
                instance={el => setStepper(el)}
            />
        </div>
    )
}

export default WizardHorizontal