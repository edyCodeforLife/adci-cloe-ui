import React from 'react';
import { Check } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import Divider from '../../../../../@core/layouts/components/custom/Divider';
import MainLabel from '../../../../../@core/layouts/components/custom/label/MainLabel';
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import { PATH_DASHBOARD } from '../../../../../navigation/path';

const SuccessValidation = ({ text, title, data }) => {

	const navigate = useNavigate();

	const displayData = () => {
		let temp = [];
		for (const x in data) {
			if (x == "amount") {
				temp.push(
					<p>{x} : {Number((data[x]?.amount ? data[x] : 0).toFixed(1)).toLocaleString()}</p>
				)
			} else {
				temp.push(
					<p>{x} : {data[x]}</p>
				)
			}
		}
		return temp;
	}

	return (<>
		<MainCard title={title}>
			<MainLabel size="16px" align='left'>{text}</MainLabel>
			<Divider />
			{
				data ?
					displayData() : null
			}
			<Divider />
			<Button color='primary' className='btn-next right-float margin-top-small' onClick={() => navigate(PATH_DASHBOARD)}>
				<span className='align-middle d-sm-inline-block d-none'>Dashboard</span>
				<Check size={14} className='align-middle ms-sm-25 ms-0'></Check>
			</Button>
		</MainCard>
	</>);
}

export default SuccessValidation;