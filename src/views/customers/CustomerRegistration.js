import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody, CardTitle, CardText, Input, Label, Button } from 'reactstrap'
import FinancingServices from './FinancingServices';
import CompanyCustomerProfile from './CompanyCustomerProfile';
import CustomerRegistrationSubmit from './CustomerRegistrationSubmit';
import { PATH_CONFIRMATION } from '../../navigation/path';
import { useNavigate } from 'react-router-dom';
import "../../@core/scss/react/custom/customer-registration.scss";
import BreadCrumbs from '../../@core/components/breadcrumbs';
import { useDispatch } from 'react-redux';
import Wizard from '../../@core/components/wizard';
import WizardVertical from '../../@core/components/wizard/WizardVertical';
import { LookupService, AuthService } from '../../data/business/index';
import { customerData } from '../../redux/customer';
import { PATH_MY_CUSTOMER } from '../../navigation/path';
import { validateEmail } from '../../utility/function';
import SuccessRegistration from './SuccessRegistration';
// const steps = ["Financing Services", "Company & Customer", "Cust Reg Submitted"]

const CustomerRegistration = () => {
    const myRef = useRef()

    const userRegisData = {
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        landlineNumber: "",
        handphone: "",
        password: "password123",
        customerType: "INDIVIDUAL",
        financingService: "FS_SCF",
        companyType: "",
        companyName: "",
        userLogin: localStorage.getItem("email")
    }

    const _messageError = {
        email: "",
        handphone: "",
    }

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [stepper, setStepper] = useState();
    const _service = new LookupService();
    const _authService = new AuthService();
    const [fs, setFs] = useState([]);
    const [cs, setCs] = useState([]);
    const [companyType, setCompanyType] = useState([]);
    const [dropdownOpen, setDropdownopen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(userRegisData?.companyType)
    const [userDataRegis, setUserDataRegis] = useState(userRegisData);
    const [activeSuccess, setActiveSuccess] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState(_messageError);
    const userInteraction = useRef(false);

    const renameField = (field) => {
        switch (field) {
            case "CUSTOMER_TYPE":
                return "customerType";

            case "FINANCING_SERVICE":
                return "financingService";

            case "COMPANY_TYPE":
                return "companyType";
        }
    }

    const toggle = () => {
        setDropdownopen(!dropdownOpen)
    }

    const changeValue = (e) => {
        setUserDataRegis({ ...userDataRegis, companyType: e.currentTarget.textContent });
        setSelectedValue(e.currentTarget.textContent)
    }

    const handleChange = (e) => {
        setUserDataRegis({ ...userDataRegis, [renameField(e.target.name)]: e.target.value })
    }

    useEffect(() => {
        _service.GetCustomerType({
            Success: (res) => {
                setCs(res);
                setUserDataRegis({ ...userDataRegis, customerType: res?.[0]?.code });
            }
        });
        _service.GetFinancingService({
            Success: (res) => {
                setFs(res);
                setUserDataRegis({ ...userDataRegis, financingService: res?.[0]?.code });
            }
        });

        _service.GetCompanyType(userDataRegis?.customerType, {
            Success: (res) => {
                setCompanyType(res)
                setUserDataRegis({ ...userDataRegis, companyType: res?.[0]?.name });
            }
        });
    }, []);

    const onChange = useCallback((fieldId, value, error) => {
        if (
            fieldId === "handphone" ||
            fieldId === "email"
        ) {
            userInteraction.current = true;
        }

        let obj = {};
        obj[fieldId] = value;
        setUserDataRegis({ ...userDataRegis, ...obj })

    }, [userDataRegis]);

    useEffect(() => {
        userInteraction.current && validationChangeInput();
    }, [userDataRegis]);

    const validationChangeInput = () => {
        const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
        let messageError = {};

        if (userDataRegis && userDataRegis.handphone !== "") {
            if (!userDataRegis.handphone.match(regexMinimum)) {
                messageError["handphone"] = "Minimum 9 angka";
            } else {
                messageError["handphone"] = "";
            }
        }

        if (userDataRegis && userDataRegis.email !== "") {
            if (!validateEmail(userDataRegis.email)) {
                messageError["email"] = "Masukkan Email yang valid";
            } else {
                messageError["email"] = "";
            }
        }

        setErrorMessage({ ...errorMessage, ...messageError });
    }

    console.log(userDataRegis)

    const nextStep = () => {
        setUserDataRegis({ ...userDataRegis, fullName: userDataRegis?.firstName + " " + userDataRegis?.lastName });
    }

    const onSubmitRegistrationCustomer = () => {
        dispatch(customerData(userDataRegis))
        _authService.RegistrationCustomer(userDataRegis, {
            Success: (res) => {
                console.log(res);
                setActiveSuccess(true)
            },
            ValidationError: (res) => {
                console.log(res)
            },
            ServerError: (res) => {
                console.log(res)
            },
            handle401: (res) => {
                console.log(res)
            }
        })
    }

    const nextStepOne = () => {
        _service.GetCompanyType(userDataRegis?.customerType, {
            Success: (res) => {
                setCompanyType(res);
                setUserDataRegis({ ...userDataRegis, companyType: res?.[0]?.name });
            }
        });
    }

    const navigateTo = () => {
        navigate("/cloe/dashboard")
    }

    useEffect(() => {
        if (userDataRegis?.firstName !== "" &&
            userDataRegis.lastName !== "" &&
            userDataRegis.email !== "" &&
            userDataRegis.landlineNumber !== "" &&
            userDataRegis.handphone !== "" &&
            errorMessage.email === "" &&
            errorMessage.handphone === "") {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [userDataRegis, isDisabled]);

    const steps = [
        {
            id: 'financing-services',
            title: 'Financing Services',
            subtitle: '',
            content: <FinancingServices t={t} fs={fs} cs={cs} nextStepOne={nextStepOne} handleChange={(e) => handleChange(e)} stepper={stepper} type='wizard-vertical' />
        },
        {
            id: 'company-customer-profile',
            title: 'Company Customer Profile',
            subtitle: '',
            content: <CompanyCustomerProfile errorMessage={errorMessage} isDisabled={isDisabled} nextStep={nextStep} onChange={onChange} userDataRegis={userDataRegis} toggle={toggle} changeValue={changeValue} selectedValue={selectedValue} dropdownOpen={dropdownOpen} companyType={companyType} t={t} stepper={stepper} type='wizard-vertical' />
        },
        {
            id: 'customer-registration-profile',
            title: 'Customer Registration Submit',
            subtitle: '',
            content: <CustomerRegistrationSubmit onSubmitRegistrationCustomer={() => onSubmitRegistrationCustomer()} userDataRegis={userDataRegis} t={t} stepper={stepper} type='wizard-vertical' />
        },

    ]

    return (<>
        <BreadCrumbs title='Customer Registration' data={[{ title: 'Customer' }, { title: 'Customer Registration' }]} />
        {/* <div className='vertical-wizard'>
            <Wizard 
                instance={el => setStepper(el)} 
                ref={myRef} 
                steps={steps}
                type='vertical' 
                options={{
                    linear: false
                }} 
            />
        </div> */}

        {activeSuccess ? (
            <SuccessRegistration
                navigateTo={navigateTo}
                buttonText={"Kembali ke Home"}
                text={`Hi ${localStorage?.getItem("email").split("@")[0]}, Activation user has been sent to email : ${userDataRegis?.email}`}
            />
        ) : (
            <WizardVertical
                steps={steps}
                setStepper={setStepper}
                // onClick={el => setStepper(el)}
                ref={myRef}
            />
        )}

    </>);
}

export default CustomerRegistration;