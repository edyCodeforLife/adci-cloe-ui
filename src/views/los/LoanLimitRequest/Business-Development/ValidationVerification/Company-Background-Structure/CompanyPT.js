import React, { useState } from 'react'
import MainCard from '@layouts/components/custom/MainCard';
import { Label, Row, Col, Input, Form, Button, Table } from 'reactstrap'
import { ALLOWED_FILE_TYPES, BOCOMMISION_STRUCTURE, BODIRECTORS, SHAREHOLDER_STRUCTURE } from '@utility/Constants';
import { searchKeyObjectInArray } from '@utility/Utils';
import CustomButton from '../../../../../../@core/layouts/components/custom/button/CustomButton';
import UploadButton from '../../../../../../@core/layouts/components/custom/button/UploadButton';
import { store } from '../../../../../../redux/store';

const CompanyPT = props => {

  const { handleAdd, showUploadFile, handleUpload, loanlimitrequestId } = props;
  const [companyPTInput, setCompanyPTInput] = useState([])

  const style = {
    border: '2px solid #010432',
    width: '100%',
    height: '100%'
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setCompanyPTInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const add = (structureId, structureGroup, activeStatus, labelStructure = []) => {
    const form = new FormData();
    form.set('merchantStructureId', structureId ?? '');
    form.set('loanLimitRequestId', loanlimitrequestId);
    form.set('structureGroup', structureGroup);
    for (var x = 0; x < labelStructure.length; x++) {
      form.set('label' + (x + 1), labelStructure?.[x]);
    }
    form.set('field1', companyPTInput?.[structureGroup + "_input_1"] == undefined ? '' : companyPTInput?.[structureGroup + "_input_1"]);
    form.set('field2', companyPTInput?.[structureGroup + "_input_2"] == undefined ? '' : companyPTInput?.[structureGroup + "_input_2"]);
    form.set('field3', companyPTInput?.[structureGroup + "_input_3"] == undefined ? '' : companyPTInput?.[structureGroup + "_input_3"]);
    let ktpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", structureGroup + "_ktpFile")?.["fileUrl"];
    let npwpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", structureGroup + "_npwpFile")?.["fileUrl"];
    if (npwpFile != undefined)
      form.set('npwpFile', npwpFile);
    if (ktpFile != undefined)
      form.set('ktpFile', ktpFile);
    form.set('position', '1');
    form.set('active', activeStatus ?? '');

    // console.log("isinya apa ya"+JSON.stringify(convertFormDataToJSON(form)))
    handleAdd(form);
  }

  return (
    <>
      <MainCard>
        <div className='content-header'>
          <h5 className='mb-0'>{SHAREHOLDER_STRUCTURE}</h5>
          <small className='text-muted'>Shareholder Structures</small>
        </div>
        <MainCard styled={style}>
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={`username`}>
                  Company Name
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={SHAREHOLDER_STRUCTURE + "_input_name"}>
                  Share Holder Name
                </Label>
                <Input
                  type='text'
                  name={SHAREHOLDER_STRUCTURE + `_input_1`}
                  id={SHAREHOLDER_STRUCTURE + "_input_name"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                // aria-label='john.doe'
                />
              </Col>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={SHAREHOLDER_STRUCTURE + "_input_stock"}>
                  Total Exchange Stock
                </Label>
                <Input
                  type='text'
                  name={SHAREHOLDER_STRUCTURE + `_input_2`}
                  id={SHAREHOLDER_STRUCTURE + "_input_stock"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                // aria-label='john.doe'
                />
              </Col>
            </Row>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' md="6" for={`username`}>
                  KTP
                </Label>
                <UploadButton nameInput={SHAREHOLDER_STRUCTURE + "_ktpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
              </Col>
              <Col md='6' className='mb-1'>
                <Label md="6" className='form-label fw-bold' for={`username`}>
                  NPWP
                </Label>
                <UploadButton nameInput={SHAREHOLDER_STRUCTURE + "_npwpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
              </Col>
            </Row>
          </Form>
          <CustomButton text={"Save"} handleClick={() =>
            add('', SHAREHOLDER_STRUCTURE, true,
              ["Shareholder Name", "Total Exchange Stock", ''])}
          />
        </MainCard>
      </MainCard>
      {/* 2 */}
      <MainCard>
        <div className='content-header'>
          <h5 className='mb-0'>{BOCOMMISION_STRUCTURE}</h5>
          <small className='text-muted'>Board of Comission</small>
        </div>
        <MainCard styled={style}>
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={`username`}>
                  Company Name
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={BOCOMMISION_STRUCTURE + "_input_name"}>
                  Commission Name*
                </Label>
                <Input
                  type='text'
                  name={BOCOMMISION_STRUCTURE + `_input_1`}
                  id={BOCOMMISION_STRUCTURE + "_input_name"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                />
              </Col>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={BOCOMMISION_STRUCTURE + "_input_role"}>
                  Role*
                </Label>
                <Input
                  type='text'
                  name={BOCOMMISION_STRUCTURE + `_input_2`}
                  id={BOCOMMISION_STRUCTURE + "_input_role"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                />
              </Col>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={`username`}>
                  Superior*
                </Label>
                <Input
                  type='text'
                  name={BOCOMMISION_STRUCTURE + `_input_3`}
                  id={BOCOMMISION_STRUCTURE + "_input_superior"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                />
              </Col>
            </Row>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' md="6" for={`username`}>
                  KTP
                </Label>
                <Button md="6" color='primary' className='btn-next' tag={Label}>
                  Upload
                  <Input
                    type='file'
                    name={BOCOMMISION_STRUCTURE + "_ktpFile"}
                    onChange={(e) => handleUpload(e)}
                    hidden
                    value={''}
                    accept={ALLOWED_FILE_TYPES}
                  />
                </Button>
                <div>{showUploadFile("inputName", BOCOMMISION_STRUCTURE + "_ktpFile")}</div>
              </Col>
              <Col md='6' className='mb-1'>
                <Label md="6" className='form-label fw-bold' for={`username`}>
                  NPWP
                </Label>
                <UploadButton nameInput={BOCOMMISION_STRUCTURE + "_npwpFile"}
                  showUploadFile={showUploadFile} handleUpload={handleUpload} />
              </Col>
            </Row>
          </Form>
          <CustomButton text={"Save"} handleClick={() =>
            add('', BOCOMMISION_STRUCTURE, true,
              ["Commission Name", "Role", 'Superior'])}
          />
        </MainCard>
      </MainCard>
      {/* 3 */}
      <MainCard>
        <div className='content-header'>
          <h5 className='mb-0'>{BODIRECTORS}</h5>
          <small className='text-muted'>Board of Directors</small>
        </div>
        <MainCard styled={style}>
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={`username`}>
                  Company Name
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={BODIRECTORS + "_input_name"}>
                  Director Name*
                </Label>
                <Input
                  type='text'
                  name={BODIRECTORS + `_input_1`}
                  id={BODIRECTORS + "_input_name"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                />
              </Col>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={BODIRECTORS + "_input_role"}>
                  Role*
                </Label>
                <Input
                  type='text'
                  name={BODIRECTORS + `_input_2`}
                  id={BODIRECTORS + "_input_role"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                />
              </Col>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' for={BODIRECTORS + "_input_superior"}>
                  Superior*
                </Label>
                <Input
                  type='text'
                  name={BODIRECTORS + `_input_3`}
                  id={BODIRECTORS + "_input_superior"}
                  placeholder='Type here'
                  onChange={
                    (e) => {
                      handleInput(e);
                    }}
                />
              </Col>
            </Row>
            <Row>
              <Col md='6' className='mb-1'>
                <Label className='form-label fw-bold' md="6" for={`username`}>
                  KTP
                </Label>
                <UploadButton nameInput={BODIRECTORS + "_ktpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
                {/* <Button md="6" color='primary' className='btn-next' tag={Label}>
                  Upload
                  <Input
                    type='file'
                    name={BODIRECTORS + "_ktpFile"}
                    onChange={(e) => handleUpload(e)}
                    hidden
                    value={''}
                    accept={ALLOWED_FILE_TYPES}
                  />
                </Button> */}
              </Col>
              <Col md='6' className='mb-1'>
                <Label md="6" className='form-label fw-bold' for={`username`}>
                  NPWP
                </Label>
                <UploadButton nameInput={BODIRECTORS + "_npwpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
              </Col>
            </Row>
          </Form>
          <CustomButton text={"Save"} handleClick={() =>
            add('', BODIRECTORS, true,
              ["Director Name", "Role", 'Superior'])}
          />
        </MainCard>
      </MainCard>
    </>
  )
}

export default CompanyPT