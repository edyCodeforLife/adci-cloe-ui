import React from 'react'
import { Col, Input, InputGroup, InputGroupText, Row, Table } from 'reactstrap';
import Divider from '../../layouts/components/custom/Divider';

const CreditScore = ({ scoreValue, title }) => {
  const { grade, gradeTableScore } = scoreValue
  return (
    <div>
      <h4 className='md-margin-bottom thick'>{title}</h4>
      <Divider />
      <Row>
        <Col xl="2" md="2" xs="2" className="d-flex align-items-center">
          <span className='text-center' style={{
            fontSize: '40px'
          }}>{grade}</span>
        </Col>
        <Col xl="10" md="10" xs="10" className="md-left">
          <Table responsive>
            <thead className="table-dark">
              <tr>
                {gradeTableScore.map((val, index) => {
                  return (
                    <th className="md-margin-bottom md-padding">{val.head}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {gradeTableScore.map((val, index) => {
                  return (
                    <th className="md-margin-bottom md-padding">{val.content}</th>
                  );
                })}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* <InputGroup className="xs-margin-top">
          <InputGroupText>Covenant</InputGroupText>
          <Input
            md="10"
            type="text"
            name="field"
            id="field"
            placeholder="Please fill covenant"
            aria-label="john.doe"
          />
        </InputGroup> */}
    </div>
  )
}

export default CreditScore