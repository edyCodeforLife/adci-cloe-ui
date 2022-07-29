import React, { memo, useEffect, useState } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { CustomTable } from '../../../../@core/components/table/index';
import { useNavigate } from 'react-router-dom';
import { MerchantService } from '../../../../data/business/index';
import { useDispatch } from 'react-redux';
import { resetMerchantData, setLoanLimitReqDataForCM } from '../../../../redux/merchant';
import { resetCreditAnalysis } from '../../../../redux/creditAnalysis';
import { PATH_LOAN_LIMIT_HISTORY_DETAIL } from '../../../../navigation/path';

function _TableHistoryCM(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = localStorage.getItem("userId")
	const _service = new MerchantService()
	const [dataTableCM, setDataTableCM] = useState([])

	// const resetData = () => new Promise((resolve, reject) => {
	// 	dispatch(resetMerchantData());
	// 	dispatch(resetCreditAnalysis());
	// 	resolve();
	// });

	useEffect(() => {
		_service.GetCMApprovedLoanHistory(0, 10, {
			Success: (res) => {
				setDataTableCM(res?.data)
			}
		})
	}, []);

	const redirectTo = (loanLimitRequestId, customerId) => {
		console.log(loanLimitRequestId)
		navigate(PATH_LOAN_LIMIT_HISTORY_DETAIL + `?id=${loanLimitRequestId}&cid=${customerId}`);
	}

	const configTable = {
		title: ["Job Number", "Company Name", "User", "Created Date", "Status"],
		data: dataTableCM
	}
	return (<>
		<MainCard>
			{dataTableCM.length > 0 ? (
				<CustomTable
					striped
					configTable={configTable}
					redirectTo={redirectTo}
					// isCMTable={true}
					isNoNeedDetails={true}
				/>
			) : "Tidak Ditemukan Data history Loan"}

		</MainCard>
	</>);
}

export const TableHistoryCM = memo(_TableHistoryCM);