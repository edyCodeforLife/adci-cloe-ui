import React, { memo, useEffect, useState } from 'react';
import { CustomTable } from '../../../@core/components/table/index';
import { useNavigate } from 'react-router-dom';
import { MerchantService } from '../../../data/business/index';
import { find } from 'lodash';
import { QrsToObj } from '../../../utility/function';
import { useDispatch } from 'react-redux';
import { setSelectedCMRequestData } from '../../../redux/merchant';

function _TableCompanyDetail(props) {
	const navigate = useNavigate();
	const qrs = QrsToObj(window.location.search);
	const _loanlimitreqId = qrs?.id;
	const _service = new MerchantService()
	const dispatch = useDispatch();
	const [dataTableCM, setDataTableCM] = useState([])
	const email = localStorage.getItem('email');

	useEffect(() => {
		_service.GetCMApproveLoanLimitRequest(
			email, 0, 10, {
			Success: (res) => {
				const data = find(res?.data, { loanLimitRequestId: _loanlimitreqId });
				dispatch(setSelectedCMRequestData(data));
				setDataTableCM([data])
			}
		})
	}, []);


	const configTable = {
		title: ["Job Number", "Company Name", "User", "Created Date", "Updated By", "Updated Date", "Status"],
		data: dataTableCM
	}
	return (<>
		<CustomTable
			striped
			configTable={configTable}
			isNoNeedDetails={true}
			moreDetails={true}
		/>

	</>);
}

export const TableCompanyDetail = memo(_TableCompanyDetail);