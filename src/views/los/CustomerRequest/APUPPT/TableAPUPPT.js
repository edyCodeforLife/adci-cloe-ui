
import React, { Fragment, memo } from 'react';
import { Table } from 'reactstrap';
import '../../../../@core/scss/base/components/table.scss';
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import { convertObjectKey, scoreFactorColor } from '../../../../utility/function';
import { find, map } from 'lodash';

function _TableAPUPPT(props) {
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
		handleSelectAPUPPT,
		selectedAPUPPTOptions
	} = props;

	return (<>
		<Table
			style={{ overflow: 'scroll' }}
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
				{configTable?.data?.map((data, idx) => {
					const _data = convertObjectKey(data?.factorDetail, ["riskFactorDetailId", "riskFactorDetail"], ["value", "label"]);
					let _newData = map(_data, (item, idx) => {
						item["riskFactorId"] = data?.riskFactorId;
						item["factorName"] = data?.factorName;
						return item;
					})

					return (
						<tr key={idx}>
							<th scope="row">
								{data?.factorName}
							</th>
							<td>{data?.weight}%</td>
							<td>
								<Select
									id={`select-city`}
									theme={selectThemeColors}
									className='react-select'
									classNamePrefix='select'
									isClearable={false}
									options={_newData}
									onChange={(e) => { handleSelectAPUPPT(e) }}
								/>
							</td>
							<td>
								<div className="flex-shrink-0 xs-padding" style={{
									backgroundColor: scoreFactorColor(data?.riskRating),
									padding: "10px",
									fontWeight: 600,
									maxWidth: 100,
									display: 'flex',
									justifyContent: 'center',
									color: '#000000'
								}}>
									{data?.riskRating === "" ? "" : data?.riskRating?.toUpperCase()}
								</div>
							</td>
						</tr>
					)
				})}

			</tbody>
		</Table>
	</>);
}

export const TableAPUPPT = memo(_TableAPUPPT);