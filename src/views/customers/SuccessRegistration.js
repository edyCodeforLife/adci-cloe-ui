import React from 'react';
import MainLabel from '../../@core/layouts/components/custom/label/MainLabel';
import MainCard from '../../@core/layouts/components/custom/MainCard';
import { Button } from 'reactstrap';
const SuccessRegistration = ({ text, navigateTo, buttonText }) => {

	return (<>
		<MainCard title={"Confirmation"}>
			<div className='d-flex justify-content-between'>
				<MainLabel size="12px" align='center'>{text}</MainLabel>
				<Button color='primary' className='btn-next' onClick={() => { navigateTo() }}>
					<span className='align-middle d-sm-inline-block d-none'>{buttonText}</span>
				</Button>
			</div>
		</MainCard>
	</>);
}

export default SuccessRegistration;