// ** React Imports
import { useEffect, useRef, useState, useCallback } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import DocumentManagement from './DocumentManagement'
import AdditionalDocument from './AdditionalDocument'
import APUPPT from './APUPPT'
import CreditMemo from './CreditMemo'
import CreditAnalysis from './CreditAnalysis'
import ICR from './ICR';
import { MerchantService, LookupService } from '../../../data/business/index';
import { QrsToObj } from '../../../utility/function';
import { clone, map, filter, uniqBy, reverse, find } from 'lodash';

const CustomerWizard = () => {

  const _docsObj = {
    newDocumentName: "",
    requiredFor: "Mandatory",
    template: "SCF - PT/CV",
    businessLine: ""
  }
  const qrs = QrsToObj(window.location.search);
  const loanlimitrequestId = qrs.id;
  const _lookupService = new LookupService();
  const [show, setShow] = useState(false)
  const [verifiedValue, setVerifiedValue] = useState(false);
  const [verifiedValue2, setVerifiedValue2] = useState(false);
  const [businessLine, setBusinessLine] = useState([]);
  const [selectedBusinessLine, setSelectedBusineeLine] = useState("");
  const [additionalDocs, setAdditionalDocs] = useState([]);
  const [additionalDocsObj, setAdditionalDocsObj] = useState(_docsObj);
  const [APUPPTData, setAPUPPTData] = useState([]);
  const [masterAPUPPTData, setMasterAPUPPTData] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [selectedAPUPPTOptions, setSelectedAPUPPTOptions] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [selectedObjAPUPPT, setSelectedObjAPUPPT] = useState([]);
  const [APUPPTScore, setAPUPPTScore] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // ** Ref
  const ref = useRef(null);
  const _service = new MerchantService();

  // ** State
  const [stepper, setStepper] = useState(null);
  const [UploadedDocs, setUploadedDocs] = useState([]);

  const getUploadedDocs = () => {
    _service.GetCMUploadDocumentLoanLimitRequest(loanlimitrequestId, {
      Success: (res) => {
        setUploadedDocs(res.data)
      }
    })
  }

  const getAPUPPTScore = () => {
    let _customerType = "";
    _service.GetCustomerDataByLoanLimitRequestID(loanlimitrequestId, {
      Success: (res) => {
        if (res?.data?.companyType === "PD" || res?.data?.companyType === "UD" || res?.data?.companyType === "OTHERS") {
          _customerType = "Individu";
        } else {
          _customerType = "Corporate";
        }
        _service.GetCMAPUPPTData({
          Success: (res) => {
            const _newData = filter(res?.data?.row_data, (item, idx) => {
              item["riskRating"] = "";
              return item?.borrowerType === _customerType
            });
            setMasterAPUPPTData(_newData);
            setAPUPPTData(_newData);
          }
        })
        setCustomerType(_customerType);

      }
    })
  }

  const handleOkModal = () => {
    setShow(false);
    stepper.next();
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

  const handleChange = useCallback((fieldId, value, error) => {
    let obj = {};
    obj[fieldId] = value;
    setAdditionalDocsObj({ ...additionalDocsObj, ...obj })
  }, [additionalDocsObj]);

  const handleInput = (e, docsName, type, idx, docsType) => {
    const data = clone(UploadedDocs);
    let _newData = map(data, (item, index) => {
      let _checked = clone(verifiedValue);
      let _checked2 = clone(verifiedValue2);
      let returnValue = { ...item };
      if (item?.documentName === docsName) {
        if (type === "textarea" && docsType === "remarkDocument1") {
          returnValue["remarkDocument1"] = e.target.value;
        }

        if (type === "textarea" && docsType === "remarkDocument2") {
          returnValue["remarkDocument2"] = e.target.value;
        }

        if (type === "switch" && docsType === "verifiedDocument1") {
          returnValue["verifiedDocument1"] = !_checked ? 1 : 0;
          setVerifiedValue(!_checked)
        }

        if (type === "switch" && docsType === "verifiedDocument2") {
          returnValue["verifiedDocument2"] = !_checked2 ? 1 : 0;
          setVerifiedValue2(!_checked2)
        }

      }
      return returnValue;
    });
    setUploadedDocs(_newData);
  }

  const getDataBusinessLine = () => {
    _lookupService.GetBusinessLine({
      Success: (res) => {
        setBusinessLine(res);
      }
    })
  }

  const saveDocs = () => {
    const payload = {
      loanLimitRequestId: loanlimitrequestId,
      documents: UploadedDocs,
      additionalDocuments: additionalDocs
    }

    _service.PostSaveUploadDocReview(payload, {
      Success: (res) => {
        console.log(res.data)
      }
    })
  }

  const handleSelectBL = (value) => {
    setSelectedBusineeLine(value);
    setAdditionalDocsObj({ ...additionalDocsObj, businessLine: value })
  }

  const onHandleAddTable = () => {
    setAdditionalDocs(additionalDocs.concat(additionalDocsObj));
  }

  const deleteAdditionalDocs = (data, index) => {
    const _newData = filter(additionalDocs, (item, idx) => {
      return idx !== index;
    });
    setAdditionalDocs(_newData);
  }

  const handleSelectAPUPPT = (data) => {
    setSelectedAPUPPTOptions(data);
    const cloneData = clone(masterAPUPPTData)
    const _newData = filter(cloneData, (item, idx) => {
      if (data?.riskFactorId === item?.riskFactorId) {
        item["riskRating"] = data?.riskRating;
      }
      return item;
    })
    setAPUPPTData(_newData);
  }

  const toggleShow = (isShow) => {
    setShow(isShow);
  }

  const saveDataAPUPPT = () => {
    setIsLoading(true);
    const _data = reverse(uniqBy(reverse(selectedObjAPUPPT), "riskFactorId"));
    const productTypeId = find(_data, { factorName: "Product Type" });
    const addressId = find(_data, { factorName: "Address/Province" });
    const occupationId = find(_data, { factorName: "Occupation" });
    const citizenshipId = find(_data, { factorName: "Citizenship" });
    const loanPurposeId = find(_data, { factorName: "Loan Purpose" });
    const totalLoanId = find(_data, { factorName: "Total Loan" });
    const incomeId = find(_data, { factorName: "Source of fund/Income" });

    const payload = {
      productTypeId: productTypeId?.value,
      addressId: addressId?.value,
      occupationId: occupationId?.value,
      borrowerType: customerType,
      citizenshipId: citizenshipId?.value,
      loanPurposeId: loanPurposeId?.value,
      totalLoanId: totalLoanId?.value,
      incomeId: incomeId?.value,
      loanLimitRequestId: loanlimitrequestId
    }
    _service.PostSaveAPUPPTScore(payload, {
      Success: (res) => {
        setIsLoading(false);
        toggleShow(true);
        setAPUPPTScore(res?.data)
      }
    })
  }

  useEffect(() => {
    getUploadedDocs();
    getDataBusinessLine();
    getAPUPPTScore();
  }, []);

  useEffect(() => {
    let _isDisable = true;
    map(APUPPTData, (item, idx) => {
      if (item?.riskRating === "") {
        _isDisable = true;
      } else {
        setSelectedObjAPUPPT(selectedObjAPUPPT.concat(selectedAPUPPTOptions));
        _isDisable = false;
      }
      setIsDisable(_isDisable);
    })
  }, [APUPPTData]);

  const steps = [
    {
      id: 'validation-verification',
      title: 'Validation & Verification',
      subtitle: 'Enter Your Account Details.',
      content: <DocumentManagement
        selectedBusinessLine={selectedBusinessLine}
        handleSelectBL={handleSelectBL}
        businessLine={businessLine}
        handleChange={handleChange}
        UploadedDocs={UploadedDocs}
        redirectTo={onHandleClickDocument}
        stepper={stepper}
        handleInput={handleInput}
        verifiedValue={verifiedValue}
        additionalDocsObj={additionalDocsObj}
        onHandleAddTable={onHandleAddTable}
        additionalDocs={additionalDocs}
        deleteAdditionalDocs={deleteAdditionalDocs}
        saveDocs={saveDocs}

      />
    },
    {
      id: 'apuppt-assesment',
      title: 'APUPPT Assesment',
      subtitle: 'Add Personal Info',
      content: <APUPPT
        isDisable={isDisable}
        stepper={stepper}
        show={show}
        toggleShow={toggleShow}
        handleOkModal={handleOkModal}
        saveDataAPUPPT={saveDataAPUPPT}
        APUPPTData={APUPPTData}
        handleSelectAPUPPT={handleSelectAPUPPT}
        selectedAPUPPTOptions={selectedAPUPPTOptions}
        isLoading={isLoading}
        APUPPTScore={APUPPTScore}
      />
    },
    {
      id: 'credit-analysis',
      title: 'Credit Analysis',
      subtitle: 'Add Personal Info',
      content: <CreditAnalysis stepper={stepper} />
    },
    {
      id: 'credit-memo',
      title: 'Credit Memo',
      subtitle: 'Add Personal Info',
      content: <CreditMemo stepper={stepper} />
    }
  ]

  return (<>
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps}
        options={{
          linear: false
        }}
      />
    </div>
  </>
  )
}

export default CustomerWizard