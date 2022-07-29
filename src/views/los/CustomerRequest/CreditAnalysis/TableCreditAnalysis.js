import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Table } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors, convertObjectKey } from '@utils'
import {  checkMatchDataInObject, searchKeyObjectInArray } from '../../../../utility/Utils'
import Divider from '../../../../@core/layouts/components/custom/Divider'
import { useDispatch, useSelector } from 'react-redux'
import { setScouringFactorsContent } from '../../../../redux/creditAnalysis'
import { store } from '../../../../redux/store'

const countTotal = (multiplyVal) => {
  let total = 0;
  for (var x in multiplyVal) {
    if (multiplyVal[x] == "Reject") {
      total += 0;
    } else {
      total += parseInt(multiplyVal[x]);
    }
  }
  return total;
}

const TableCreditAnalysis = ({ data }) => {
  const [creditInput, setCreditInput] = useState({})
  const dispatch = useDispatch();
  const allowedFilter = ['ALL', store.getState().merchant.cmSelectedReqData?.financingService]
  // const selectedCredit = useSelector(state => state.merchant.cmSelectedReqData?.financingService);
  const totalValue = useMemo(() => countTotal(creditInput), [creditInput])
  // console.log("data" + JSON.stringify(data));
  const handleSelect = (name, e, idx) => {
    // alert("data" + selectedCredit.includes("SCF"));
    if (idx != undefined) {
      dispatch(setScouringFactorsContent({
        "factorId": data?.subFactor[idx].id,
        "parentId": data?.subFactor[idx].parentId,
        "scoring": e.value,
        "position": data?.subFactor[idx].key
      }));
    }
    setCreditInput(
      prevInput => (
        {
          ...prevInput,
          [name]: e.value
        }
      )
    )
  };

  const riskCalculator = (name) => {
    return creditInput[name] == "Reject" ? 0 : creditInput[name];
  };

  useEffect(() => {
    dispatch(setScouringFactorsContent({
      "factorId": data?.id,
      "parentId": null,
      "scoring": totalValue,
      "position": data?.key,
      "total": "Total"
    }));
  }, [totalValue])

  const createContent = () => {
    if (data?.subFactor.length == 0) {
      return <tr key={data?.id}>
        <td>{data?.name}</td>
        <td>
          <Select
            id={`select-ca-${data.id}`}
            theme={selectThemeColors}
            className='react-select'
            classNamePrefix='select'
            options={convertObjectKey(data?.options, ["name"], ["label"])}
            isClearable={false}
            onChange={(e) => {
              handleSelect(data.name, e)
            }
            }
          />
        </td>
        <td>
          {
            riskCalculator(data.name) == undefined ? 0 : riskCalculator(data.name)
          }
        </td>
      </tr>
    } else {
      return data?.subFactor.map((val, index) => {
        return checkMatchDataInObject(val?.filter, allowedFilter)?<tr key={val?.id}>
          <td>{val?.name}</td>
          <td>
            <Select
              id={`select-ca-${val.id}`}
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={convertObjectKey(val?.options, ["name"], ["label"])}
              isClearable={false}
              onChange={(e) => {
                handleSelect(val.name, e, index)
              }
              }
            />
          </td>
          <td>
            {
              riskCalculator(val.name) == undefined ? 0 : riskCalculator(val.name)
            }
          </td>
        </tr>:null
      })
    }
  }

  // { console.log("CreditInput" + JSON.stringify(data)) }
  return (
    <>
      <Table
        striped
        style={{
          height: '100px'
        }}
      >
        <thead>
          <tr>
            <th>Factor</th>
            <th>Input</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            createContent()
          }
          <tr style={{ borderTop: '2px solid red' }}>
            <td style={{ fontWeight: 'bolder' }} colSpan={2}>
              Total Score :
            </td>
            <td>
              {totalValue}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default TableCreditAnalysis