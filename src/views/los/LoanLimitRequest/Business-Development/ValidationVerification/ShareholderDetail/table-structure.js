import React from 'react'
import { Table } from 'reactstrap'
import { Trash2, Eye } from 'react-feather'
import { openUrl } from '../../../../../../utility/Utils';

function TableCompanyStructureShareholder({ data = [] }) {
	const MAX = 3;

	return (
		<> {
			data?.map((val, index) => {
				if (val?.active == true) {
					return (
						<Table key={index} bordered responsive striped>
							<tbody>
								{val?.field1 != "undefined" ?
									<tr>
										<td className='thick'>{val?.label1}</td>
										<td>{val?.field1}</td>
									</tr> : null
								}{
									val?.field2 != "undefined" ?
										<tr>
											<td className='thick'>{val?.label2}</td>
											<td>{val?.field2}</td>
										</tr> : null
								}
								{
									val?.field3 != "undefined" ?
										<tr>
											<td className='thick'>{val?.label3}</td>
											<td>{val?.field3}</td>
										</tr> : null
								}
								<tr>
									<td><div className='column-action d-flex align-items-center'>
										Foto Ktp {" "}
										{
											val.ktpUrl ?
												<Eye size={17} className='mx-1 icon-app' onClick={() => {
													openUrl(val.ktpUrl)
												}} /> : "tidak ditemukan"
										}
									</div>
									</td>
									<td><div className='column-action d-flex align-items-center'>
										Foto Npwp {" "}
										{
											val.npwpUrl ?
												<Eye size={17} className='mx-1 icon-app' onClick={() => {
													openUrl(val.npwpUrl)
												}} /> : "tidak ditemukan"
										}
									</div>
									</td>
								</tr>
							</tbody>
						</Table >

					)
				}
			})
		}    </>)
}

export default TableCompanyStructureShareholder