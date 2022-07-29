import React from 'react'
import { useSelector } from 'react-redux'
import RichText from '../../../../@core/components/rich-text'
import MainCard from '../../../../@core/layouts/components/custom/MainCard'
import Grader from './Grader'

function ApprovalScreen() {
    const data = useSelector(state => state.committee.loanData)

    const styled = {
        border: '5px solid red',
        backgroundColor: 'black',
    }
    const styled2 = {
        border: '5px solid red',
    }

    return (
        <>
            <MainCard styled={styled}>
                {
                    data ? <Grader data={data} /> : null
                }
            </MainCard>
            <MainCard styled={styled2}>
                {
                    data?.customerDetail ? <RichText data={Buffer.from(data?.customerDetail, 'base64').toString('ascii')} readOnly /> :
                        null
                }
            </MainCard>
        </>
    )
}

export default ApprovalScreen