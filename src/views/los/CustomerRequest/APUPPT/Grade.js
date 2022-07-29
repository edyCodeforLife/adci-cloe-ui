import React, { useState, useEffect } from "react";
import { Check, X } from "react-feather";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  CardHeader,
  Label,
  Table,
} from "reactstrap";
import CreditScore from "../../../../@core/components/credit-score-result";
import Divider from "../../../../@core/layouts/components/custom/Divider";
import MainCard from "../../../../@core/layouts/components/custom/MainCard";

const gradeScoreValue = {
  grade: "B",
  gradeTableScore: [
    {
      head: "No",
      content: "1"
    },
    {
      head: "Borrower",
      content: "PT ANDALAN JAYA SOLUSINDO"
    },
    {
      head: "Facility",
      content: "SCF-PT/CV"
    },
    {
      head: "Credit Line Limit",
      content: "Rp 2.000.000, 00"
    },
    {
      head: "Admin Fee",
      content: "3% / Month Upfront deducted"
    },
    {
      head: "Tenure",
      content: "30 days"
    },
    {
      head: "Month Propose",
      content: "N/A"
    },
  ]
}
const gradeTitle = [
  "No",
  "Borrower",
  "Facility",
  "Credit Line Limit",
  "Admin Fee",
  "Tenure",
  "Month Propose",
];

const gradeContent = [
  "1",
  "PT ANDALAN JAYA SOLUSINDO",
  "SCF-PT/CV",
  "Rp 2.000.000, 00",
  "3% / Month Upfront deducted",
  "30 days",
  "N/A",
];

const scoreResultContent = [
  {
    tableHead: "Borrower",
    tableContent: "PT ANDALAN JAYA SOLUSINDO",
  },
  {
    tableHead: "Type of Borrower",
    tableContent: "Corporate",
  },
  {
    tableHead: "APUPPT Scoring",
    tableContent: "1,45",
  },
];

const Grade = () => {
  const styled = {
    borderStyle: "none",
    color: "black",
    backgroundColor: "#fff5f5",
    display: "flex",
  };

  const styledInside = {
    marginTop: "10px",
  };

  const scoreResultStyle = {
    backgroundColor: "limegreen",
    padding: "10px",
    marginRight: "30px",
  };

  return (
    <div>
      <p className="mt-2">APUPPT Scoring</p>
      <MainCard styled={styled}>
        <CreditScore
          scoreValue={gradeScoreValue}
        />
        <Divider />
        <h4>APPUPPT Score Result</h4>
        <div className="d-flex mt-2 align-items-center" key="1">
          <div className="flex-shrink-0 xs-padding" style={scoreResultStyle}>
            LOW
          </div>
          <div className="d-flex align-items-center justify-content-between flex-grow-1">
            <Table responsive>
              <thead className="table-dark">
                <tr>
                  {scoreResultContent.map((val, index) => {
                    return (
                      <th className="md-margin-bottom md-padding">
                        {val.tableHead}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {scoreResultContent.map((val, index) => {
                    return (
                      <th className="md-margin-bottom md-padding">
                        {val.tableContent}
                      </th>
                    );
                  })}
                </tr>
              </tbody>
            </Table>
          </div>
          {/* <div className='d-flex align-item-center justify-content-between flex-grow-1'>
                    <div className='me-1'>
                        <p className='fw-bolder mb-0'>PT Andalan</p>
                        <span>Corporate</span>
                        <p>1.25%</p>
                    </div>
                </div> */}
        </div>
      </MainCard>
    </div>
  );
};

export default Grade;
