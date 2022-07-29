// ** Custom Components
import { Fragment } from 'react'
// ** Icons Imports

// ** Reactstrap Imports
import { map } from 'lodash';
import { Table } from 'reactstrap'

const CompanyTable = ({ configTable, username, type, onHandleClickDocument }) => {
  return (
    <Table style={{ width: type === "merchantData" ? 'max-content' : '100%' }} bordered responsive striped>
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
        <tr>
          {type === "merchantData" && (
            <Fragment>
              <td>
                <span className='align-middle fw-bold'>
                  {configTable?.data?.name}
                </span>
              </td>

              <td>
                {configTable?.data?.email}
              </td>

              <td>
                {configTable?.data?.nibNo}
              </td>

              <td>
                {configTable?.data?.npwpNo}
              </td>


              <td>
                {configTable?.data?.phone}
              </td>


              <td>
                {`${configTable?.data?.address}, Kode Pos ${configTable?.data?.postalCode}, ${configTable?.data?.city}, ${configTable?.data?.province}, ${configTable?.data?.country}`}
              </td>


              <td>
                {configTable?.data?.product}
              </td>

              <td>
                {configTable?.data?.businessLine}
              </td>

              <td>
                {configTable?.data?.businessAreaCoverage}
              </td>

              <td>
                {username}
              </td>

            </Fragment>

          )}
        </tr>

        {type === "BGFile" && (
          <Fragment>
            {map(configTable?.data, (item, idx) => (
              <tr key={idx}>
                <td>
                  <span className='align-middle fw-bold'>
                    {item?.documentGroup}
                  </span>
                </td>
                <td>{item?.documentType}</td>
                <td>
                  {item?.documentYear}
                </td>
                <td>
                  {item?.documentNotes}
                </td>
                <td className='text-link' onClick={() => onHandleClickDocument(item?.documentUrl)}>{item?.documentUrl === "" ? null : "Lihat Dokumen"}</td>
              </tr>
            ))}
          </Fragment>
        )}

        {type === "merchantInfo" && (
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
        )}
      </tbody>
    </Table >
  )
}

export default CompanyTable
