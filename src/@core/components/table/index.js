import moment from 'moment';
import React, { Fragment, memo } from 'react';
import { CheckCircle, Tool } from 'react-feather';
import { Button, Table } from 'reactstrap';
import '../../scss/base/components/table.scss';

function _CustomTable(props) {
	const {
		configTable,
		tag,
		size,
		bordered,
		borderless,
		striped,
		dark,
		hover,
		responsive,
		redirectTo,
		moreDetails,
		isScoring,
		isAction,
		handleAction,
		idUser
	} = props;
	return (<>
		<Table
			// striped={striped}
			tag={tag}
			size={size}
			bordered={bordered}
			borderless={borderless}
			dark={dark}
			hover={hover}
			responsive={responsive}
			className={!isAction ? 'tableStatic' : null}
		>
			<thead>
				<tr>
					{configTable?.title?.map((item, idx) => (
						<th key={idx}>
							{item}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{configTable?.data?.length > 0 ?
					configTable?.data?.map((data, idx) => (
						<tr key={idx} onClick={isAction ? null : () => redirectTo(data?.loanLimitRequestId, data.customerId)}>
							<th scope="row">{data?.jobNumber}</th>
							<td>{data?.companyName}</td>
							<td>{data?.customerName}</td>
							<td>{data?.createdDate}</td>
							{moreDetails ? (
								<Fragment>
									<td>{data?.updatedBy}</td>
									<td>{data?.updatedDate}</td>
								</Fragment>

							) : null}
							{
								isScoring ?
									<Fragment>
										<td>
											<tr>
												{data?.apupptBorrowerType}
											</tr>
											<tr>
												{data?.apupptRiskStatus}
											</tr>
											<tr>
												{data?.apupptTotalScore}
											</tr>
										</td>
										<td style={{ fontWeight: 'bolder' }}>
											<tr>
												{data?.icrFinalScore}
											</tr>	<tr>
												{data?.icrScoreAmount}
											</tr>
										</td>
									</Fragment> : null
							}
							<td>{data?.statusDesc}</td>
							{/* {!isNoNeedDetails ? (
							<td>
								<span onClick={() => redirectTo(data?.loanLimitRequestId, data.customerId)} className='text-link'>Details</span>
							</td>
						) : null} */}
							{
								isAction ?
									<td>
										{
											idUser == data?.cmId ?
												<Button className='btn-icon-mine' variant="primary"
													onClick={() => redirectTo(data?.loanLimitRequestId, data.customerId)}>
													<CheckCircle size={14} />
												</Button> :
												<Button className='btn-icon-hove'
													onClick={() => handleAction(data?.loanLimitRequestId, data.customerId)}>
													<Tool size={14} />
												</Button>
										}
									</td> : null
							}
						</tr>
					)) : <tr>
						<td style={{ textAlign: 'center' }} colSpan={configTable?.title?.length}>Empty Data</td></tr>
				}
			</tbody>
		</Table>
	</>);
}

export const CustomTable = memo(_CustomTable);