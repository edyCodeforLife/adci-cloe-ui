// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** Images
// import react from '@src/assets/images/icons/react.svg'
// import vuejs from '@src/assets/images/icons/vuejs.svg'
// import angular from '@src/assets/images/icons/angular.svg'
// import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-11.jpg'

// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Input } from 'reactstrap'

const avatarGroupData1 = [
  {
    title: 'Leslie',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Quinn',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Quinn',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  }
]

const TableScore = () => {

  return (
    <>
    <p>Corporate Borrower</p>
    <Table bordered responsive className='sm-margin-bottom'>
      <thead>
        <tr>
          <th>Factor</th>
          <th>Weight</th>
          <th>Input</th>
          <th>Risk Score</th>
          <th>Risk Category</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className='align-middle fw-bold'>Product Type</span>
          </td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              25%
            </Badge>
          </td>
          <td>
            <Input type='text' name='text' id='exampleText' rows='3' placeholder='Textarea' />
          </td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              1
            </Badge>
          </td>
          <td>
            Low
          </td>
         <td>
           0,25%
         </td>
        </tr>
      </tbody>
      {/* total */}
      <tbody className='border-table-total'>
        <tr>
          <td>
            <span className='align-middle fw-bold'>Total Score</span>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
            Low
          </td>
         <td>
           0,25%
         </td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default TableScore
