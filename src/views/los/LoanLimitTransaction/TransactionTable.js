import React, { memo, useState, useEffect } from 'react';
import MainCard from '@layouts/components/custom/MainCard';
import { CustomTable } from '../../../@core/components/table/index';
import { useNavigate } from 'react-router-dom';
import { PATH_LOAN_LIMIT_TRANSACTION } from '../../../navigation/path';
import { MerchantService } from '../../../data/business/index';

function _TransactionTable(props) {
	const navigate = useNavigate();
	const _merchantService = new MerchantService();
	const userId = localStorage.getItem("userId");
	const [dataTableTransaction, setDataTableTransaction] = useState([]);

	useEffect(() => {
		_merchantService.GetLoanLimitTransactionBDByUserId(userId, 0, 10, {
			Success: (res) => {
				setDataTableTransaction(res?.data);
			}
		})
	}, []);

	const redirectTo = (loanLimitRequestId, customerId) => {
		navigate(`${PATH_LOAN_LIMIT_TRANSACTION}?id=${loanLimitRequestId}&cid=${customerId}`);
	}

	const configTable = {
		title: ["Job Number", "Company Name", "User", "Created Date", "Status"],
		data: dataTableTransaction
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

export const TransactionTable = memo(_TransactionTable);