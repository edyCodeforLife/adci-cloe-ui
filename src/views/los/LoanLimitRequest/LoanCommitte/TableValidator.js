import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'reactstrap'
import MainCard from '../../../../@core/layouts/components/custom/MainCard'
import { PATH_LOAN_ORIGINATION_SYSTEM } from '../../../../navigation/path'

const TableValidator = props => {
    const navigate = useNavigate();

    const redirectTo = (loanLimitRequestId, customerId) => {
		// dispatch(setLoanLimitRequestID(loanLimitRequestId));
		navigate(PATH_LOAN_ORIGINATION_SYSTEM+`?id=${loanLimitRequestId}&cid=${customerId}`);
	}

    return (
        <MainCard>
            <Table className='table-solid-border xl-margin-top xs-margin-bottom'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            Some Id
                        </td>
                        <td>
                            <span onClick={() => redirectTo()} className='text-link'>Details</span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </MainCard>
    )
}

export default TableValidator