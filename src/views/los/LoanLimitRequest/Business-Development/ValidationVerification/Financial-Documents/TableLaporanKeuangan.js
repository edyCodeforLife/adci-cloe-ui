import React from 'react'
import { Table } from 'reactstrap'
import { Trash2, Eye, EyeOff } from 'react-feather'
import { openUrl } from '../../../../../../utility/Utils'

function TableLaporanKeuangan({ data, handleTrash }) {

    const deleteItem = (data) => {
        const form = new FormData();
    }

    return (
        <Table className='table-solid-border xl-margin-top xs-margin-bottom'>
            <tbody>
                {
                    data.map((val, index) => {
                        if (val.active == true) {
                            return (
                                <tr>
                                    <td className='thick'>{val.documentGroup}</td>
                                    <td colSpan={val?.documentYear ==undefined? '2': '1'}>{val.documentName}</td>
                                    {val?.documentYear != undefined ?
                                        <td>{val.documentYear}</td> : null}
                                    <td>
                                        <div className='column-action d-flex align-items-center'>
                                            {/* <td>{val.documentDesc}</td> */}
                                            {
                                                val?.documentUrl != undefined ?

                                                    <Eye size={17} className='mx-1 icon-app' onClick={() => {
                                                        openUrl(val.documentUrl)
                                                    }} /> : <EyeOff size={17} className='mx-1 icon-app-off' />
                                            }
                                            <Trash2 aria-placeholder='delete record' size={17} className='mx-1 icon-app' onClick={() =>
                                                handleTrash(val)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableLaporanKeuangan