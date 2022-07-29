import moment from 'moment';
import React, { Fragment, memo } from 'react';
import { Table } from 'reactstrap';
import '../../../../@core/scss/base/components/table.scss';

function _HistoryTransactionDetailTable(props) {
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
		isUploadDocsReviews
	} = props;
	return (<>
		<Table
			style={{ overflow: 'scroll', width: 'max-content' }}
			striped={striped}
			tag={tag}
			size={size}
			bordered={bordered}
			borderless={borderless}
			dark={dark}
			hover={hover}
			responsive={responsive}
		// className='tableStatic'
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
				{isUploadDocsReviews ?
					configTable?.data?.map((data, idx) => (
						<tr key={idx}>
							<th scope="row">{data?.documentGroup}</th>
							<td>{data?.documentLabel ? data?.documentLabel : "Tidak ditemukan label"}</td>
							<td>{data?.documentName}</td>
							<td>{data?.documentUrl1 ?
								<span onClick={() => redirectTo(data?.documentUrl1)} className='text-link'>URL 1</span>
								: "Tidak ditemukan url 1"}
							</td>
							<td>{data?.documentUrl2 ?
								<span onClick={() => redirectTo(data?.documentUrl2)} className='text-link'>URL 2</span>
								: "Tidak ditemukan url 2"}
							</td>
							<td>{data?.documentYear ? data?.documentYear : "Tidak Berhasil ada tahun doc"}</td>
							<td>{data?.remarkDocument1 ? data?.remarkDocument1 : "Tidak ditemukan remark doc 1"}</td>
							<td>{data?.remarkDocument2 ? data?.remarkDocument2 : "Tidak ditemukan remark doc 2"}</td>
							<td>{data?.type}</td>
							<td>{data?.verifiedDocument1 ? data?.verifiedDocument1 : "Tidak ditemukan verified doc 1"}</td>
							<td>{data?.verifiedDocument2 ? data?.verifiedDocument2 : "Tidak ditemukan verified doc 2"}</td>
						</tr>
					)) :

					<tr>
						<th scope="row">{configTable?.data?.apupptScoringId}</th>
						<td>{configTable?.data?.borrowerType ? configTable?.data?.borrowerType : "Tidak ditemukan nama borrower"}</td>
						<td>{configTable?.data?.loanPurposeName}</td>
						<td>{configTable?.data?.addressName ? configTable?.data?.addressName : "Tidak ada alamat"}</td>
						<td>{configTable?.data?.citizenName ? configTable?.data?.citizenName : "Tidak ada kewarganegaraan"}</td>
						<td>{configTable?.data?.incomeName ? configTable?.data?.incomeName : "Tidak ditemukan sumber penghasilan"}</td>
						<td>{configTable?.data?.productTypeName}</td>
						<td>{configTable?.data?.totalLoanName ? configTable?.data?.totalLoanName : "Tidak ditemukan total peminjaman"}</td>
						<td>{configTable?.data?.totalScore ? configTable?.data?.totalScore : "Tidak ditemukan total score"}</td>
						<td>{configTable?.data?.riskStatus ? configTable?.data?.riskStatus : "Tidak ditemukan status resiko"}</td>
					</tr>
				}
			</tbody>
		</Table>
	</>);
}

export const HistoryTransactionDetailTable = memo(_HistoryTransactionDetailTable);