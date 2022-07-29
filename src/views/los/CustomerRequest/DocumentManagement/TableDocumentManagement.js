
import React, { Fragment, memo } from 'react';
import { Label, Table, Input } from 'reactstrap';
import '../../../../@core/scss/base/components/table.scss';

function _TableDocumentManagement(props) {
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
		handleInput,
		verifiedValue
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
				{configTable?.data?.map((data, idx) => (
					<tr key={idx}>
						<td scope="row">
							<Label>
								{data?.documentGroup}
							</Label>
							<div>
								{data?.type}
							</div>
						</td>
						<td>{data?.documentName}</td>
						<td>{data?.documentLabel ? data?.documentLabel : "tidak ada label"}</td>
						<td>{data?.documentYear ? data?.documentYear : "tidak ada tahun dokumen"}</td>
						{data?.documentUrl1 ? (
							<td>
								<span onClick={() => redirectTo(data?.documentUrl1)} className='text-link'>Dokumen 1</span>
								{data?.documentUrl2 ? <span onClick={() => redirectTo(data?.documentUrl2)} className='text-link'>Dokumen 2</span> : null}
								{data?.documentUrl3 ? <span onClick={() => redirectTo(data?.documentUrl3)} className='text-link'>Dokumen 3</span> : null}
							</td>
						) :
							<td>
								Tidak ada dokumen
							</td>
						}

						<td>
							<div className='form-check form-switch'>
								<Input type='switch' name='customSwitch' id='exampleCustomSwitch'
									checked={data?.verifiedDocument1 === null ? false : data?.verifiedDocument1}
									onChange={
										(e) => {
											handleInput(e, data?.documentName, "switch", idx, "verifiedDocument1");
										}} />
								<Label for='exampleCustomSwitch' className='form-check-label'>
									Verified
								</Label>
							</div>

							{data?.type === "MERCHANT_STRUCTURE" && (
								<div className='form-check form-switch' style={{ marginTop: 10 }}>
									<Input type='switch' name='customSwitch' id='exampleCustomSwitch'
										checked={data?.verifiedDocument2 === null ? false : data?.verifiedDocument2}
										onChange={
											(e) => {
												handleInput(e, data?.documentName, "switch", idx, "verifiedDocument2");
											}} />
									<Label for='exampleCustomSwitch' className='form-check-label'>
										Verified
									</Label>
								</div>
							)}
						</td>


						{/* {data?.verifiedDocument1 && data?.verifiedDocument1 !== null ? (
							<td className='d-flex flex-column'>
								<span>{data?.verifiedDocument1}</span>
								{data?.verifiedDocument2 ? <span>{data?.verifiedDocument2}</span> : null}
								{data?.verifiedDocument3 ? <span>{data?.verifiedDocument3}</span> : null}
							</td>
						) :
							<td>
								Tidak ditemukan Verifikasi
							</td>
						} */}

						{/* {data?.remarkDocument1 && data?.remarkDocument1 !== null ? (
							<td className='d-flex flex-column'>
								<span>{data?.remarkDocument1}</span>
								{data?.remarkDocument2 ? <span>{data?.remarkDocument2}</span> : null}
								{data?.remarkDocument2 ? <span>{data?.remarkDocument2}</span> : null}
							</td>
						) :
							<td>
								Tidak ditemukan Remark
							</td>
						} */}
						<td>
							<Input
								type='textarea'
								name='notes'
								id='floating-textarea'
								placeholder='Insert Remark Here'
								style={{ minHeight: '60px', minWidth: '300px', margin: '20px 0px' }}
								onChange={
									(e) => {
										handleInput(e, data?.documentName, "textarea", idx, "remarkDocument1");
									}}
							/>

							{data?.type === "MERCHANT_STRUCTURE" && (
								<Input
									type='textarea'
									name='notes'
									id='floating-textarea'
									placeholder='Insert Remark Here'
									style={{ minHeight: '60px', minWidth: '300px', margin: '20px 0px' }}
									onChange={
										(e) => {
											handleInput(e, data?.documentName, "textarea", idx, "remarkDocument2");
										}}
								/>
							)}

						</td>
					</tr>
				))}

			</tbody>
		</Table>
	</>);
}

export const TableDocumentManagement = memo(_TableDocumentManagement);