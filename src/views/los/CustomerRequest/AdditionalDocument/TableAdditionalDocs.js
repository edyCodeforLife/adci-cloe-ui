
import React, { memo } from 'react';
import { Label, Table } from 'reactstrap';
import '../../../../@core/scss/base/components/table.scss';
import { Trash2 } from 'react-feather';

function _TableAdditionalDocs(props) {
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
		deleteAdditionalDocs
	} = props;
	return (<>
		<Table
			style={{ marginTop: 20 }}
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
						<td scope="row">
							{data?.newDocumentName}
						</td>
						<td>{data?.requiredFor}</td>
						<td>{data?.template}</td>
						<td>{data?.businessLine}</td>
						<td>
							<Trash2 aria-placeholder='delete record' size={17} className='mx-1 icon-app' onClick={() => deleteAdditionalDocs(data, idx)} />
						</td>
					</tr>
				))}

			</tbody>
		</Table>
	</>);
}

export const TableAdditionalDocs = memo(_TableAdditionalDocs);