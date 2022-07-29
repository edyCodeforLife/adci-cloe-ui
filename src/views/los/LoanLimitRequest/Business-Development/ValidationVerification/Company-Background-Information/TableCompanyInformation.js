// ** Custom Components
import { Fragment } from 'react'
// ** Icons Imports

// ** Reactstrap Imports
import { map } from 'lodash';
import { Table } from 'reactstrap'

const TableCompanyInformation = ({ configTable }) => {
    return (
        <Table bordered responsive striped>
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
                <Fragment>
                    {map(configTable?.data, (item, idx) => (
                        <tr key={idx}>
                            <td>
                                <span className='align-middle fw-bold'>
                                    {item?.fieldName}
                                </span>
                            </td>
                            <td>{item?.fieldValue}</td>
                        </tr>
                    ))}
                </Fragment>
            </tbody>
        </Table >
    )
}

export default TableCompanyInformation
