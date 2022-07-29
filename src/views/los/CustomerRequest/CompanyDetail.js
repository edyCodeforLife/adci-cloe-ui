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
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

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

const CompanyDetail = () => {
  return (
    <Table bordered responsive>
      <thead className='table-dark'>
        <tr>
          <th>Job Number</th>
          <th>Company Name</th>
          <th>User</th>
          <th>Created Date</th>
          <th>Status</th>
          <th>Details</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            
          </td>
          <td>Peter Charles</td>
          <td>
            <AvatarGroup data={avatarGroupData1} />
          </td>
          <td>18 Feb 2022</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default CompanyDetail
