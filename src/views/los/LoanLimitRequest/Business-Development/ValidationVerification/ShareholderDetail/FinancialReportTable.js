import React from 'react'
import { Table } from 'reactstrap'

function FinancialReportTable({ data }) {
	return (
		<Table bordered responsive striped>
			<tbody>
				{
					data.map((val, index) => {
						if (val.active == true) {
							return (
								<tr key={index}>
									<td className='thick'>{val.documentGroup}</td>
									<td>{val.documentName}</td>
									{val?.documentYear != undefined ?
										<td>{val.documentYear}</td> : null}
								</tr>
							)
						}
					})
				}
			</tbody>
		</Table>
	)
}

export default FinancialReportTable;