import React, { memo, useEffect, useState } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { CustomTable } from '../../../../@core/components/table/index';
import { useNavigate } from 'react-router-dom';
import { MerchantService } from '../../../../data/business/index';
import { useDispatch, useSelector } from 'react-redux';
import { resetMerchantData, setLoanLimitReqDataForCM } from '../../../../redux/merchant';
import { resetCreditAnalysis } from '../../../../redux/creditAnalysis';
import { PATH_LOAN_REQUEST_PREVIEW } from '../../../../navigation/path';
import { store } from '../../../../redux/store';
import '../../../../@core/scss/base/plugins/forms/form-wizard.scss'
import Swal from 'sweetalert2';

function _CustomTableCM(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = localStorage.getItem("userId")
	const _service = new MerchantService()
	const [dataTableCM, setDataTableCM] = useState([])
	const email = localStorage.getItem('email');
	const credential = useSelector(state => state.login.credential);
	// alert((email))
	const resetData = () => new Promise((resolve, reject) => {
		dispatch(resetMerchantData());
		dispatch(resetCreditAnalysis());
		resolve();
	});

	useEffect(() => {
		resetData().then(
			_service.GetCMApproveLoanLimitRequest(
				email, 0, 10, {
				Success: (res) => {
					dispatch(setLoanLimitReqDataForCM(res.data))
					setDataTableCM(res?.data)
				}
			}))
	}, []);

	const redirectTo = (loanLimitRequestId, customerId) => {
		navigate(PATH_LOAN_REQUEST_PREVIEW + `?id=${loanLimitRequestId}&cid=${customerId}`);
	}

	const configTable = {
		title: ["Job Number", "Company Name", "User", "Created Date", "Status", "Action"],
		data: dataTableCM
	}

	const handleActionCM = (llr, cid) => {
		Swal.fire({
			title: 'Do you want to process this loan?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			showCancelButton: true,
			confirmButtonText: 'Take',
			denyButtonText: `Don't save`,
		}).then((result) => {
			if (result.isConfirmed) {
				_service.takeLoanProcess({
					"userLoginCM": email,
					"loanLimitRequestId": llr
				}, {
					Success: (res) => {
						navigate(PATH_LOAN_REQUEST_PREVIEW + `?id=${llr}&cid=${cid}`);
					}
				})
			} else {
				// Swal.fire('Changes are not saved', '', 'info')
			}
		})
	}

	return (<>
		<MainCard>
			{dataTableCM.length > 0 ? (
				<CustomTable
					striped
					configTable={configTable}
					redirectTo={redirectTo}

					isAction={true}
					handleAction={handleActionCM}
					idUser={credential?.userId}
				/>) : (
				"Tidak ditemukan Loan Limit Request"
			)
			}
		</MainCard>
	</>);
}

export const CustomTableCM = memo(_CustomTableCM);