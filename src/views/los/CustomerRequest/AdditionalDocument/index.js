// ** React Imports
import { useState } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'

// ** Third Party Components
import { X, Plus } from 'react-feather'
import { SlideDown } from 'react-slidedown'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardText, Form, Label, Input, Button } from 'reactstrap'

import Select from 'react-select'
import { selectThemeColors } from '@utils'
import './additional-document.scss';
import { convertObjectKey } from '../../../../utility/function';

const AdditionalDocument = ({ handleChange, businessLine, handleSelectBL, selectedBusinessLine, additionalDocsObj, onHandleAddTable }) => {
  // ** State
  const [count, setCount] = useState(1)


  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form')
    if (slideDownWrapper) {
      slideDownWrapper.remove()
    }
    // else {
    //   form.remove()
    // }
  }

  const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
  ]

  const blType = convertObjectKey(businessLine, ["code", "name"], ["value", "label"]);

  const checkData = (data) => {
    if (data === "undefined") return "";
    else return data;
  }

  return (
    <>
      <Repeater count={count}>
        {i => {
          const Tag = i === 0 ? 'div' : SlideDown
          return (
            <Tag key={i}>
              <Form>
                <Row className='justify-content-between align-items-center mb-1'>
                  <Col sm={6} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-item-name-${i}`}>
                      New Document Name
                    </Label>
                    <Input value={additionalDocsObj?.newDocumentName} type='text' id={`animation-item-name-${i}`} placeholder='Input Document Name' onChange={(e) => { handleChange('newDocumentName', e.target.value); }} />
                  </Col>
                </Row>
                <Row className='mb-1'>
                  <Col sm={6} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-cost-${i}`}>
                      Required for
                    </Label>
                    <div className='demo-inline-spacing'>
                      <div className='form-check'>
                        <Input type='radio' id='ex1-active' name='additional-document-required-for' value={additionalDocsObj?.requiredFor} defaultChecked onChange={(e) => { handleChange('requiredFor', e.target.labels[0]?.innerText); }} />
                        <Label className='form-check-label' for='ex1-active'>
                          Mandatory
                        </Label>
                      </div>
                      <div className='form-check'>
                        <Input type='radio' name='additional-document-required-for' value={additionalDocsObj?.requiredFor} id='ex1-inactive' onChange={(e) => { handleChange('requiredFor', e.target.labels?.[0]?.innerText); }} />
                        <Label className='form-check-label' for='ex1-inactive'>
                          Not Mandatory
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className='mb-1'>
                  <Col sm={6} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-quantity-${i}`}>
                      Template Will be Used For
                    </Label>
                    <Row>
                      <Col sm={6}>
                        <div className='demo-inline-spacing'>
                          <div className='form-check'>
                            <Input type='radio' id='ex1-activeSCF1' name='additional-document-template' value={additionalDocsObj?.template} defaultChecked onChange={(e) => { handleChange('template', e.target.labels?.[0]?.innerText); }} />
                            <Label className='form-check-label' for='ex1-activeSCF1'>
                              SCF - PT/CV
                            </Label>
                          </div>

                        </div>
                        <div className='demo-inline-spacing'>

                          <div className='form-check'>
                            <Input type='radio' name='additional-document-template' value={additionalDocsObj?.template} id='ex1-activeIF1' onChange={(e) => { handleChange('template', e.target.labels?.[0]?.innerText); }} />
                            <Label className='form-check-label' for='ex1-activeIF1'>
                              IF - PT/CV
                            </Label>
                          </div>
                        </div>
                        <div className='demo-inline-spacing'>

                          <div className='form-check'>
                            <Input type='radio' id='ex1-activeSCF2' name='additional-document-template' value={additionalDocsObj?.template} onChange={(e) => { handleChange('template', e.target.labels?.[0]?.innerText); }} />
                            <Label className='form-check-label' for='ex1-activeSCF2'>
                              SCF - Individual/PD
                            </Label>
                          </div>
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className='demo-inline-spacing'>

                          <div className='form-check'>
                            <Input type='radio' name='additional-document-template' value={additionalDocsObj?.template} id='ex1-activeIF2' onChange={(e) => { handleChange('template', e.target.labels?.[0]?.innerText); }} />
                            <Label className='form-check-label' for='ex1-activeIF2'>
                              IF - Individual/PD
                            </Label>
                          </div>
                        </div>
                        <div className='demo-inline-spacing'>

                          <div className='form-check'>
                            <Input type='radio' name='additional-document-template' value={additionalDocsObj?.template} id='ex1-none' onChange={(e) => { handleChange('template', e.target.labels?.[0]?.innerText); }} />
                            <Label className='form-check-label' for='ex1-none'>
                              None / One Time
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='mb-1'>
                  <Col sm={6} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-price-${i}`}>
                      Business Line
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={blType[0]}
                      options={blType}
                      isClearable={false}
                      value={blType.find(item => item.value === checkData(selectedBusinessLine))}
                      onChange={(e) => handleSelectBL(e?.value)}
                    />
                  </Col>
                  {/* <Col md={2}>
                      <Button color='danger' className='text-nowrap px-1' onClick={deleteForm} outline>
                        <X size={14} className='me-50' />
                        <span>Delete</span>
                      </Button>
                    </Col> */}
                </Row>
                {/* <div className='justify-content-end align-items-center mb-1'>
                  <Button color='danger' className='text-nowrap px-1' disabled={count === 1} onClick={deleteForm} outline>
                    <X size={14} className='me-50' />
                    <span>Delete</span>
                  </Button>
                </div> */}
                <hr />
              </Form>
            </Tag>
          )
        }}
      </Repeater>
      <Button className='btn-icon' color='primary' disabled={additionalDocsObj?.newDocumentName === "" && selectedBusinessLine === ""} onClick={onHandleAddTable}>
        <Plus size={14} />
        <span className='align-middle ms-25'>Add</span>
      </Button>
    </>
  )
}

export default AdditionalDocument
