import React, { memo, useEffect, useState } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { CustomTable } from '../../../../@core/components/table/index';
import { useNavigate } from 'react-router-dom';
import { MerchantService } from '../../../../data/business';
import { useDispatch } from 'react-redux';
import { setLoanLimitRequestID } from '../../../../redux/customer';
import { PATH_LOAN_ORIGINATION_SYSTEM } from '../../../../navigation/path';
import { handleRequestSubmittedByBD } from '../../../../redux/merchant';

function _TableCustomer(props) {
	const navigate = useNavigate();
	const [dataState, setDataState] = useState("1234567")
	const dispatch = useDispatch();
	const userId = localStorage.getItem("userId")
	const _service = new MerchantService()
	const [dataTableCustomer, setDataTableCustomer] = useState()

	useEffect(() => {
		_service.GetLoanLimitBDRequestByUserId(userId, 0, 10, {
			Success: (res) => {
				dispatch(handleRequestSubmittedByBD(res?.data))
				setDataTableCustomer(res?.data)
				// console.log(res)
			}
		})
	}, []);

	const redirectTo = (loanLimitRequestId, customerId) => {
		dispatch(setLoanLimitRequestID(loanLimitRequestId));
		navigate(PATH_LOAN_ORIGINATION_SYSTEM+`?id=${loanLimitRequestId}&cid=${customerId}`);
	}

	const configTable = {
		title: ["Job Number", "Company Name", "User", "Created Date", "Status"],
		// data: [{
		// 	Job_Number: dataState,
		// 	Company_Name: 'PT. Andalan Jaya Solusindo',
		// 	User: 'Sugianto',
		// 	Created_Date: '18 Feb 2022',
		// 	Status: '**',
		// 	Details: <span onClick={() => redirectTo()} className='text-link'>Details</span>
		// }]
		data: dataTableCustomer
	}
	return (<>
		<MainCard>
			<CustomTable
				striped
				configTable={configTable}
				redirectTo={redirectTo}
			/>
		</MainCard>
	</>);
}

export const TableCustomer = memo(_TableCustomer);