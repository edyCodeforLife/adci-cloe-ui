
import React, { Fragment, memo } from 'react';
import { Button, Table, Modal, ModalBody, ModalHeader } from 'reactstrap';
import MainCard from "../../../../@core/layouts/components/custom/MainCard";
import { scoreFactorColor } from '../../../../utility/function';

function _ModalAPUPPT(props) {
	const {
		show,
		toggleShow,
		handleOkModal,
		APUPPTScore,
		isLoading
	} = props;

	const scoreResultContent = [
		{
			tableHead: "Borrower",
			tableContent: APUPPTScore?.borrower,
		},
		{
			tableHead: "Type of Borrower",
			tableContent: APUPPTScore?.borrower_type,
		},
		{
			tableHead: "APUPPT Scoring",
			tableContent: APUPPTScore?.apu_ppt_scoring,
		},
	];

	const styled = {
		borderStyle: "none",
		color: "black",
		backgroundColor: "#fff5f5",
		display: "flex",
	};

	const scoreResultStyle = {
		backgroundColor: "limegreen",
		padding: "10px",
		marginRight: "30px",
	};


	return (<Modal
		size="lg" style={{ maxWidth: '1000px', width: '100%' }}
		isOpen={show}
		toggle={() => toggleShow(!show)}
		className='modal-dialog-centered'>
		<ModalHeader className='bg-transparent' toggle={() => toggleShow(!show)}></ModalHeader>
		<ModalBody className='px-sm-5 mx-50 pb-5'>
			<h1 className='text-center mb-1'>APUPPT Scoring</h1>
			<div className='mid-center'>
				<div>
					<MainCard styled={styled}>
						<h4>APPUPPT Score Result</h4>
						<div className="d-flex mt-2 align-items-center" key="1">
							<div className="flex-shrink-0 xs-padding" style={{
								backgroundColor: scoreFactorColor(APUPPTScore?.apu_ppt_score_result),
								padding: "10px",
								fontWeight: 600,
								maxWidth: 100,
								display: 'flex',
								justifyContent: 'center',
								color: '#000000',
								marginRight: 30
							}}>
								{APUPPTScore?.apu_ppt_score_result?.toUpperCase()}
							</div>
							<div className="d-flex align-items-center justify-content-between flex-grow-1">
								<Table responsive>
									<thead className="table-dark">
										<tr>
											{scoreResultContent.map((val, index) => {
												return (
													<th className="md-margin-bottom md-padding">
														{val.tableHead}
													</th>
												);
											})}
										</tr>
									</thead>
									<tbody>
										<tr>
											{scoreResultContent.map((val, index) => {
												return (
													<th className="md-margin-bottom md-padding">
														{val.tableContent}
													</th>
												);
											})}
										</tr>
									</tbody>
								</Table>
							</div>
						</div>
					</MainCard>
				</div>

			</div>
			<div className='d-flex justify-content-center w-100'>
				<Button type='submit' className='margin-top-small' color='primary' onClick={() => handleOkModal()}>
					Ok
				</Button>
			</div>

		</ModalBody>
	</Modal>)

}

export const ModalAPUPPT = memo(_ModalAPUPPT);