
import React, { Fragment, memo } from 'react';
import { Table } from 'reactstrap';
import '../../../../../@core/scss/base/components/table.scss';
import { Trash2 } from 'react-feather'

function _TableDocument(props) {
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
		onHandleClickDocument,
		isNotDocumentBG,
		deleteDocumentMerchant
	} = props;
	return (<>
		<Table
			striped={striped}
			tag={tag}
			size={size}
			bordered={bordered}
			borderless={borderless}
			dark={dark}
			hover={hover}
			responsive={responsive}
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
				{configTable?.data?.map((data, idx) => (
					<tr key={idx}>
						<th scope="row">{data?.documentGroup}</th>
						<td>{data?.documentType}</td>
						<td className='text-link' onClick={() => onHandleClickDocument(data?.documentUrl)}>{!data?.documentUrl || data?.documentUrl === "" ? null : "Lihat Dokumen"}</td>
						{isNotDocumentBG && (
							<Fragment>
								<td>{data?.documentYear}</td>
								<td>{data?.documentNotes}</td>
							</Fragment>
						)}
						<td>
							<Trash2 aria-placeholder='delete record' size={17} className='mx-1 icon-app' onClick={() => deleteDocumentMerchant(data)} />
						</td>
					</tr>
				))}

			</tbody>
		</Table>
	</>);
}

export const TableDocument = memo(_TableDocument);