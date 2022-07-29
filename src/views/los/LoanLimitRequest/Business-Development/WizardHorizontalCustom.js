// ** React Imports
import { useRef, useState, useEffect, useCallback } from 'react'

// ** Custom Components
import Wizard from '../../../../@core/components/wizard';
import CompanyDetail from './ValidationVerification/CompanyDetail'
import DocumentDetail from './ValidationVerification/DocumentDetail'
import ShareholderDetail from './ValidationVerification/ShareholderDetail';
import { QrsToObj } from '../../../../utility/function';
import { useNavigate } from 'react-router-dom';
import { MerchantService, UploadService, LookupService } from '../../../../data/business/index';
import CompanyStructure from './ValidationVerification/Company-Background-Structure/CompanyStructure';
import CompanyInformation from './ValidationVerification/Company-Background-Information/CompanyInformation';
import FinancialDocuments from './ValidationVerification/Financial-Documents/FinancialDocuments';
import { getFormData } from '../../../../utility/function';
import { clone, merge } from 'lodash';
import SuccessValidation from './ValidationVerification/SuccessValidation';
import Swal from 'sweetalert2'
import { handleMerchantData } from '../../../../redux/merchant'
import { useDispatch } from 'react-redux';
import { setmerchantStructureLoanLimit } from '../../../../redux/customer';
import { createNewArrayOfObjectWithSpecificKeys, deleteObjectInArray, openUrl, searchKeyObjectInArray } from '../../../../utility/Utils';
import { resetUploadData, uploadDocData } from '../../../../redux/upload';
import { store } from '../../../../redux/store';
import { Eye, Trash2 } from 'react-feather';
import { SwalError } from '../../../../utility/layouts';


const WizardHorizontalCustom = ({ type }) => {
  const qrs = QrsToObj(window.location.search);
  const fileInputRef = useRef(null);
  const loanlimitrequestId = qrs.id;
  const _customerId = qrs.cid;
  const navigate = useNavigate();
  const _upload = new UploadService();
  const userNameBd = localStorage.getItem("email")?.split("@")[0];
  const dataInfo = {
    fieldName: "",
    fieldValue: "",
    loanLimitRequestId: loanlimitrequestId,
    position: 1,
    active: true
  }

  const dataAktaInitialState = {
    documentGroup: "Akta Pendirian dan Perubahan Terakhir",
    documentType: "",
    documentYear: "",
    documentNotes: "",
    position: 1,
    active: true
  }

  const dataKemenkumhamInitialState = {
    documentGroup: "Pengesahan Kemenkumham",
    documentType: "",
    documentYear: "",
    documentNotes: "",
    position: 1,
    active: true
  }

  const dataCompanyBGInitialState = {
    documentGroup: "Company Background Document",
    documentType: "",
    position: 1,
    active: true
  }

  const _optionsLabel = {
    province: "",
    city: "",
    country: "",
    businessAreaCoverage: ""
  }

  const ALLOWED_FILE_TYPES =
    'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv';
  const _service = new MerchantService();
  const _lookupService = new LookupService();
  const [isSendingFile, setIsSendingFile] = useState(false);
  const [uploaded, setUploaded] = useState("");
  const [uploadedType, setUploadedType] = useState("");
  const [nibFile, setNibFile] = useState({});
  const [npwpFile, setNpwpFile] = useState({});
  const [KTPFile, setKTPFile] = useState({});

  const [bgFileLoanLimitReq, setBgFileLoanLimitReq] = useState({});

  // const [merchantStructureLoanLimitReq, setmerchantStructureLoanLimitReq] = useState([]);
  const [merchantInfoLoanLimitReq, setmerchantInfoLoanLimitReq] = useState([]);
  const [merchantDocLoanLimitReq, setmerchantDocLoanLimitReq] = useState([]);
  const [dataInfoAddDocument, setDataInfoAddDocument] = useState(dataInfo);

  const [activeSuccess, setActiveSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSendError, setFileSendError] = useState(null);
  const [activeAkta, setActiveAkta] = useState(false);
  const [aktaDocumentFile, setAktaDocumentFile] = useState({});
  const [merchantData, setMerchantData] = useState({});
  const [merchantStructureData, setMerchantStructureData] = useState([]);
  const [progressTracker, setProgressTracker] = useState(0);
  const [activeDocumentNpwp, setActiveDocumentNpwp] = useState(false);
  const [activeDocumentNib, setActiveDocumentNib] = useState(false);
  const [activeDocumentKTP, setActiveDocumentKTP] = useState(false);
  const [activeKemenkumham, setActiveKemenkumham] = useState(false);
  const [activeCompanyBG, setActiveCompanyBG] = useState(false);
  const [kemenkumhamDocumentFile, setKemenkumhamDocumentFile] = useState({});
  const [companyBGDocumentFile, setCompanyBGDocumentFile] = useState({});
  const [companyTypeLoanLimitReq, setCompanyTypeLoanLimitReq] = useState("");
  const [dataAktaInput, setDataAktaInput] = useState(dataAktaInitialState);
  const [dataKemenkumhamInput, setDataKemenkumhamInput] = useState(dataKemenkumhamInitialState);
  const [dataCompanyBGInput, setDataCompanyBGInput] = useState(dataCompanyBGInitialState);
  const [companyAktaDocument, setCompanyAktaDocument] = useState([]);
  const [companyBGDocument, setCompanyBGDocument] = useState([]);
  const [companyKemenkumhamDocument, setCompanyKemenkumhamDocument] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedOptLabel, setSelectedOptLabel] = useState(_optionsLabel);
  const [businessLineList, setBusinessLineList] = useState([]);
  const [businessAreaCoverage, setBusinessAreaCoverage] = useState([]);
  const [listSelectedBACoverage, setListSelectedBACoverage] = useState([]);

  const dispatch = useDispatch();
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null);

  const resetAllData = () => {
    dispatch(resetUploadData())
  }

  useEffect(() => {
    resetAllData();
  }, [])

  const getLoanLimitRequestbyId = () => {
    _service.GetMerchantDataByLoanLimitRequestID(loanlimitrequestId, {
      Success: (res) => {
        let obj = {};
        obj["province"] = res?.data?.province;
        obj["city"] = res?.data?.city;
        obj["country"] = res?.data?.country;
        obj["businessAreaCoverage"] = res?.data?.businessAreaCoverage?.[0];
        obj["businessLine"] = res?.data?.businessLine;
        setListSelectedBACoverage(res?.data?.businessAreaCoverage)
        setSelectedOptLabel({ ...selectedOptLabel, ...obj });
        setMerchantData(res.data);
        dispatch(handleMerchantData(res.data))

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

  const getMerchantBGByLoanLimitRequestID = () => {
    _service.GetBgFileLoanLimitRequestID(loanlimitrequestId, {
      Success: (res) => {
        setBgFileLoanLimitReq(res.data);
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

  const getMerchantInformationByLoanLimitRequestID = () => {
    _service.GetMerchantInfo(loanlimitrequestId, {
      Success: (res) => {
        console.log(res.data)
        setmerchantInfoLoanLimitReq(res.data)
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

  const getMerchantCompanyType = () => {
    _service.GetMerchantCompanyTypeByLoanLimitRequestID(loanlimitrequestId, {
      Success: (res) => {
        setCompanyTypeLoanLimitReq(res.data);
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

  const getMerchantStructureByLoanLimitRequestID = () => {
    _service.GetMerchantStructure(loanlimitrequestId, {
      Success: (res) => {
        setMerchantStructureData(res?.data)
        dispatch(setmerchantStructureLoanLimit(res.data))
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

  const getMerchantDocumenteByLoanLimitRequestID = () => {
    _service.GetMerchantDocument(loanlimitrequestId, {
      Success: (res) => {
        console.log(res)
        setmerchantDocLoanLimitReq(res.data)
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

  const getAktaDocumentCompany = () => {
    _lookupService.GetCompanyAktaDocument({
      Success: (res) => {
        setCompanyAktaDocument(res)
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

  const getCompanyBGDocument = () => {
    _lookupService.GetCompanyBGDocument({
      Success: (res) => {
        setCompanyBGDocument(res)
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

  const getCompanyKemenkumham = () => {
    _lookupService.GetCompanyKemenkumhamDocument({
      Success: (res) => {
        setCompanyKemenkumhamDocument(res)
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

  const onHandleInputChange = useCallback((fieldId, value, error) => {
    let obj = {};
    obj[fieldId] = value;
    setMerchantData({ ...merchantData, ...obj })
  }, [merchantData]);

  const handleChange = useCallback((fieldId, value, error) => {
    let obj = {};
    obj[fieldId] = value;
    setDataInfoAddDocument({ ...dataInfoAddDocument, ...obj })
  }, [dataInfoAddDocument]);

  const onSaveData = () => {
    let _newData = clone(merchantData);
    _newData["merchantDataId"] = merchantData?.id;
    _newData["customerId"] = _customerId;
    _newData["loanLimitRequestId"] = loanlimitrequestId;
    // let _baCoverage = createNewArrayOfObjectWithSpecificKeys(listSelectedBACoverage, ['label'])
    _newData["businessAreaCoverage"] = listSelectedBACoverage;
    delete _newData["id"];
    // const _merchanData = getFormData(_newData);
    _service.PostSaveMerchantLoanLimitRequest(_newData, {
      Success: (res) => {
        stepper.next();
      },
      ServerError: (res, status) => {
        SwalError("Error " + status, res?.error)
      }
    })
  }

  const onSubmitValidationVerification = () => {
    setActiveSuccess(true);
  }

  const handleUploadFiles = (e, type) => {
    const file = e.target.files?.[0];
    let obj = {};
    if (file) {
      let max = 50;
      let { size, name } = file;
      let sizeInMb = size / 1024 / 1024;
      if (sizeInMb > max) {
        Swal.fire({
          title: 'Error!',
          text: "Ukuran file melebihi batas maksimal",
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        return;
      }
      let formData = new FormData();
      formData.append('file', file);
      const fr = new FileReader();
      setUploadedType(type)
      setIsSendingFile(true);
      setFileName(name);
      setFileSendError(null);
      fr.onload = function () {
        _upload.PostUploadFIle(formData, {
          Success: (res) => {
            if (type === "nibUrl") {
              setNibFile(res.data);
              setActiveDocumentNib(true)
            }
            if (type === "npwpUrl") {
              setNpwpFile(res.data);
              setActiveDocumentNpwp(true);
            }

            if (type === "ktpUrl") {
              setKTPFile(res.data);
              setActiveDocumentKTP(true);
            }

            if (type === "akta") {
              setAktaDocumentFile(res.data);
              setActiveAkta(true);
            }

            if (type === "kemenkumham") {
              setKemenkumhamDocumentFile(res.data);
              setActiveKemenkumham(true)
            }

            if (type === "companyBG") {
              setCompanyBGDocumentFile(res.data);
              setActiveCompanyBG(true)
            }
            setMerchantData({ ...merchantData, [type]: `${process.env.REACT_APP_API_URL}${res?.data?.fileUrl}` })
            setIsSendingFile(false);
            Swal.fire({
              title: 'Sukses!',
              text: res.message,
              icon: 'success',
              confirmButtonText: 'Close'
            })
          },
          NotFound: (res) => {
            setFileSendError('There was a problem uploading the file. Please try again.');
            setIsSendingFile(false);
          },
          ValidationError: (data) => {
            Swal.fire({
              title: 'Error!',
              text: data.message,
              icon: 'error',
              confirmButtonText: 'Close'
            })
            setFileSendError('There was a problem uploading the file. Please try again.');
            setIsSendingFile(false);
          },
          handleLargePayload: (data) => {
            Swal.fire({
              title: 'Error!',
              text: data.message,
              icon: 'error',
              confirmButtonText: 'Close'
            })
            setFileSendError('File size is too large. Maximum file size is 10MB.');
          },
          ServerError: (data) => {
            Swal.fire({
              title: 'Error!',
              text: "Upload Gagal",
              icon: 'error',
              confirmButtonText: 'Close'
            })
            setFileSendError('There was a problem uploading the file. Please try again.');
            setIsSendingFile(false);
          },
          PercentageTracker: progressTracker => {
            setTimeout(() => {
              setProgressTracker(progressTracker)
            }, 250);
          },
        })
      }
      fr.readAsDataURL(file);
    }
  }

  const addNewInformationField = () => {
    const payload = getFormData(dataInfoAddDocument);
    _service.PostSaveMerchantInfo(payload, {
      Success: (res) => {
        getMerchantInformationByLoanLimitRequestID();
      }
    })
  }

  const openLink = (link) => {
    const anchorEl = document.createElement('a');

    anchorEl.href = `${process.env.REACT_APP_API_URL}${link}`;
    anchorEl.target = '_blank';
    anchorEl.rel = 'noopener';
    setTimeout(() => {
      anchorEl.click();
    });
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

  const deleteDocumentMerchant = (data) => {
    data["active"] = false;
    data["merchantBackFileId"] = data?.id;
    data["documentFile"] = data.documentFile === undefined ? "" : data.documentFile;
    delete data["id"];
    const _formData = getFormData(data);
    _service.PostSaveBackgroundFile(_formData, {
      Success: (res) => {
        getMerchantBGByLoanLimitRequestID();
      }
    })

  }

  const deleteDocument = (type) => {
    if (type === "npwpUrl") {
      setActiveDocumentNpwp(false);
    }

    if (type === "nibUrl") {
      setActiveDocumentNib(false);
    }

    if (type === "ktpUrl") {
      setActiveDocumentKTP(false)
    }

    if (type === "akta") {
      setActiveAkta(false);
    }

    if (type === "kemenkumham") {
      setActiveKemenkumham(false);
    }

    if (type === "companyBG") {
      setActiveCompanyBG(false);
    }
  }

  const showUploadFile = (key, value, styled) => {
    var x = searchKeyObjectInArray(store.getState().upload.UploadDoc, key, value)
    if (x) {
      return (<span style={styled}>
        {x.filename}
        <Eye size={17} className='mx-1 icon-app' onClick={() => {
          openUrl(x.fileUrl)
        }} />
        <Trash2 size={17} className='mx-1 icon-app' onClick={() => {
          dispatch(uploadDocData(deleteObjectInArray(store.getState().upload.UploadDoc, key, value)))
          setUploaded(value)
        }} />
      </span>)
    }
  }

  const onHandleAddBACoverage = (value) => {
    // console.log("---->"+JSON.stringify(value));
    // console.log("===>" + JSON.stringify(value));
    // handleSelectOpt?.("businessAreaCoverage", value)
    let _baCoverage = createNewArrayOfObjectWithSpecificKeys(value, ['value'])
    // console.log("baco" + JSON.stringify(_baCoverage));
    setListSelectedBACoverage(_baCoverage);
    // setListSelectedBACoverage(listSelectedBACoverage.concat(selectedOptLabel?.businessAreaCoverage?.replaceAll('_', ' ')))
  }

  const onHandleChangeValueStep2 = useCallback((type, fieldId, value, error) => {
    let obj = {};
    if (type === "akta") {
      obj[fieldId] = value;
      setDataAktaInput({ ...dataAktaInput, ...obj })
    }

    if (type === "kemenkumham") {
      obj[fieldId] = value;
      setDataKemenkumhamInput({ ...dataKemenkumhamInput, ...obj })
    }

    if (type === "companyBG") {
      obj[fieldId] = value;
      setDataCompanyBGInput({ ...dataCompanyBGInput, ...obj })
    }

  }, [dataAktaInput, dataKemenkumhamInput, dataCompanyBGInput]);

  const handleAdd = (type) => {
    const selectedFile = type === "akta" ? aktaDocumentFile.fileUrl : type === "kemenkumham" ? kemenkumhamDocumentFile?.fileUrl : companyBGDocumentFile.fileUrl;
    const _data = {
      loanLimitRequestId: loanlimitrequestId,
      documentFile: selectedFile !== undefined ? `${process.env.REACT_APP_API_URL}${selectedFile}` : ""
    }

    const _newDataAkta = merge(dataAktaInput, _data);
    const _newDataKemenkumham = merge(dataKemenkumhamInput, _data);
    const _newDataBG = merge(dataCompanyBGInput, _data);
    const formDataAkta = getFormData(_newDataAkta);
    const formDataKemenkumham = getFormData(_newDataKemenkumham);
    const formDataCompanyBG = getFormData(_newDataBG);
    const typeData = type === "akta" ? formDataAkta : type === "kemenkumham" ? formDataKemenkumham : formDataCompanyBG;
    _service.PostSaveBackgroundFile(typeData, {
      Success: (res) => {
        getMerchantBGByLoanLimitRequestID();
      }
    })
  }

  const handleUpload = (e) => {
    const form = new FormData();
    const file = e.target.files[0];
    form.set("file", file);
    // const reader = new FileReader();
    // reader.onload = function () {
    _upload.PostUploadFIle(form, {
      Success: (res) => {
        let temp = Object.assign(res.data, { "inputName": e.target.name })
        let array = store.getState().upload.UploadDoc.map(a => ({ ...a }));
        let objKey = searchKeyObjectInArray(array, "inputName", e.target.name);
        if (objKey == undefined) {
          array.push(temp)
        } else {
          var index = array.findIndex(p => p.inputName == e.target.name);
          Object.assign(array[index], temp)
        }
        dispatch(uploadDocData(array))
        setUploaded("hu-" + e.target.name)
      }
    });
    // }
    // reader.readAsDataURL(file);
  }

  const getLookupCity = () => {
    _lookupService.GetCityList({
      Success: (res) => {
        setCityList(res)
      }
    })
  }

  const getLookupCountry = () => {
    _lookupService.GetCountryList({
      Success: (res) => {
        setCountryList(res)
      }
    })
  }

  const getLookupState = () => {
    _lookupService.GetStateList({
      Success: (res) => {
        setStateList(res)
      }
    })
  }

  const getLookupBusinessLine = () => {
    _lookupService.GetBusinessLine({
      Success: (res) => {
        setBusinessLineList(res);
      }
    })
  }

  const getLookupBusinessAreaCoverage = () => {
    _lookupService.GetBusinessAreaCoverage({
      Success: (res) => {
        setBusinessAreaCoverage(res);
      }
    })
  }

  const handleSelectOpt = useCallback((fieldId, value, error) => {
    let obj = {};
    obj[fieldId] = value;
    setMerchantData({ ...merchantData, ...obj });
    setSelectedOptLabel({ ...selectedOptLabel, ...obj });
  }, [merchantData, selectedOptLabel])

  const onGetNewData = () => {
    getLoanLimitRequestbyId();
    getMerchantBGByLoanLimitRequestID();
    getMerchantStructureByLoanLimitRequestID();
    getMerchantInformationByLoanLimitRequestID();
    getMerchantDocumenteByLoanLimitRequestID();
  }

  const getLookupData = () => {
    getLookupState();
    getLookupCountry();
    getLookupCity();
    getLookupBusinessLine();
    getLookupBusinessAreaCoverage();
  }

  useEffect(() => {
    if (!loanlimitrequestId) {
      navigate('/los/loan-limit-request');
    } else {
      getCompanyBGDocument();
      getCompanyKemenkumham();
      getLookupData();
      Promise.all([getLookupData]).then((res) => {
        getLoanLimitRequestbyId();
        getMerchantBGByLoanLimitRequestID();
        getMerchantStructureByLoanLimitRequestID();
        getMerchantInformationByLoanLimitRequestID();
        getMerchantDocumenteByLoanLimitRequestID();
        getMerchantCompanyType();
        getAktaDocumentCompany();
      })
    }
  }, [])


  const steps = [
    {
      id: 'company-detail',
      title: 'Enter Company Detail',
      subtitle: 'Company Detail',
      content: <CompanyDetail
        merchantData={merchantData}
        onSaveData={onSaveData}
        onHandleInputChange={onHandleInputChange}
        stepper={stepper}
        type={type}
        handleUploadFiles={handleUploadFiles}
        allowedFiles={ALLOWED_FILE_TYPES}
        fileInputRef={fileInputRef}
        isSendingFile={isSendingFile}
        progressTracker={progressTracker}
        fileSendError={fileSendError}
        fileName={fileName}
        uploadedType={uploadedType}
        nibFile={nibFile}
        npwpFile={npwpFile}
        KTPFile={KTPFile}
        openLink={openLink}
        deleteDocument={deleteDocument}
        activeDocumentNpwp={activeDocumentNpwp}
        activeDocumentNib={activeDocumentNib}
        activeDocumentKTP={activeDocumentKTP}
        stateList={stateList}
        countryList={countryList}
        cityList={cityList}
        businessLineList={businessLineList}
        businessAreaCoverage={businessAreaCoverage}
        handleSelectOpt={handleSelectOpt}
        selectedOptLabel={selectedOptLabel}
        onHandleAddBACoverage={onHandleAddBACoverage}
        listSelectedBACoverage={listSelectedBACoverage}

      />
    },
    {
      id: 'complete-document',
      title: 'Complete Document',
      subtitle: 'Company Document',
      content: <DocumentDetail
        openLink={onHandleClickDocument}
        deleteDocument={deleteDocument}
        uploadedType={uploadedType}
        allowedFiles={ALLOWED_FILE_TYPES}
        isSendingFile={isSendingFile}
        progressTracker={progressTracker}
        fileSendError={fileSendError}
        bgFileLoanLimitReq={bgFileLoanLimitReq}
        stepper={stepper}
        type={type}
        handleUploadFiles={handleUploadFiles}
        aktaDocumentFile={aktaDocumentFile}
        activeAkta={activeAkta}
        fileName={fileName}
        kemenkumhamDocumentFile={kemenkumhamDocumentFile}
        activeKemenkumham={activeKemenkumham}
        onHandleClickDocument={onHandleClickDocument}
        activeCompanyBG={activeCompanyBG}
        companyBGDocumentFile={companyBGDocumentFile}
        onHandleChangeValueStep2={onHandleChangeValueStep2}
        dataAktaInput={dataAktaInput}
        dataKemenkumhamInput={dataKemenkumhamInput}
        handleAdd={handleAdd}
        companyAktaDocument={companyAktaDocument}
        companyBGDocument={companyBGDocument}
        companyKemenkumhamDocument={companyKemenkumhamDocument}
        deleteDocumentMerchant={deleteDocumentMerchant}

      />
    },
    {
      id: 'company-background-structure',
      title: 'Company Background Structures',
      subtitle: 'Company Background Structures',
      content: <CompanyStructure
        getMerchantStructureByLoanLimitRequestID={getMerchantStructureByLoanLimitRequestID}
        showUploadFile={showUploadFile}
        handleUpload={handleUpload}
        loanlimitrequestId={loanlimitrequestId}
        companyTypeLoanLimitReq={companyTypeLoanLimitReq}
        stepper={stepper} type={type} />
    },
    {
      id: 'company-information',
      title: 'Company Information',
      subtitle: 'Add Company Information',
      content: <CompanyInformation
        merchantInfoLoanLimitReq={merchantInfoLoanLimitReq}
        handleChange={handleChange}
        addNewInformationField={addNewInformationField}
        dataInfoAddDocument={dataInfoAddDocument}
        stepper={stepper} type={type} />
    },
    {
      id: 'financial-documents',
      title: 'Financial Documents',
      subtitle: 'Financial Documents',
      content: <FinancialDocuments
        showUploadFile={showUploadFile}
        handleUpload={handleUpload}
        loanlimitrequestId={loanlimitrequestId}
        merchantDocLoanLimitReq={merchantDocLoanLimitReq}
        stepper={stepper} type={type}
        onGetNewData={onGetNewData}
        getMerchantDoc={getMerchantDocumenteByLoanLimitRequestID}
      />

    },
    {
      id: 'shareholder-detail',
      title: 'Validation & Verification',
      subtitle: 'Enter Your Company Detail.',
      content: <ShareholderDetail
        loanlimitrequestId={loanlimitrequestId}
        userNameBd={userNameBd}
        merchantData={merchantData}
        bgFileLoanLimitReq={bgFileLoanLimitReq}
        merchantStructureData={merchantStructureData}
        merchantInfoLoanLimitReq={merchantInfoLoanLimitReq}
        merchantDocLoanLimitReq={merchantDocLoanLimitReq}
        stepper={stepper}
        onSubmitValidationVerification={onSubmitValidationVerification}
        type={type}
        onHandleClickDocument={onHandleClickDocument}
      />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      {!activeSuccess ? (
        <Wizard
          ref={ref}
          steps={steps}
          options={{
            linear: false
          }}
          instance={el => setStepper(el)}
        />
      ) : (
        <SuccessValidation
          title={`Hi ${userNameBd}`}
          text={`System will be processing and updating all updated data and documents.       
          Notification will be set and sent to Customer and related parties.`}
          data={
            {
              "ID": store.getState().merchant.bdApprovalData?.id,
              "Job Number": store.getState().merchant.bdApprovalData?.jobNumber,
              "Amount": store.getState().merchant.bdApprovalData?.amount
            }
          }
        />
      )}

    </div>
  )
}

export default WizardHorizontalCustom