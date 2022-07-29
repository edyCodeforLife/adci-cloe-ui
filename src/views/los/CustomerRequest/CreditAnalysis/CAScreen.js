import React from 'react'
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import TableCreditAnalysis from './TableCreditAnalysis';

const CAScreen = (props) => {

  const { type, data } = props;
  
  return (
    <>
      <MainCard>
        <div>{type}</div>
        {
          data ? <TableCreditAnalysis data={data} /> : null
        }
      </MainCard>
    </>
  )
}

export default CAScreen