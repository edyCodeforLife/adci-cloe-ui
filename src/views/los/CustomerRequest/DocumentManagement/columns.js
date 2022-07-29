// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { store } from '@store/store'
// import { deleteInvoice } from '../store'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  Label,
  DropdownToggle,
  Input,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather'
import { PATH_LOAN_REQUEST_PREVIEW } from '../../../../navigation/path'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** Table columns
export const columns = [
  {
    name: 'Document Type',
    sortable: true,
    sortField: 'documentType',
    minWidth: '350px',
    // selector: row => row.id,
    cell: row => <Link to={`/apps/invoice/preview/${row.id}`}>{`${row.documentType}`}</Link>
  },
  {
    name: 'Document Title',
    sortable: true,
    sortField: 'id',
    minWidth: '200px',
    // selector: row => row.id,
    cell: row => <Link to={`/apps/invoice/preview/${row.id}`}>{`${row.documentTitle}`}</Link>
  },
  {
    name: 'State',
    sortable: true,
    minWidth: '120px',
    sortField: 'client.name',
    // selector: row => row.client.name,
    cell: row => {
      return (
        <div className='form-check form-switch'>
          <Input type='switch' name='customSwitch' id='exampleCustomSwitch' />
          <Label for='exampleCustomSwitch' className='form-check-label'>
            Verified
          </Label>
        </div>
      )
    }
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Remark',
    sortField: 'dueDate',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Input type='text' name='text' id='exampleText' rows='3' placeholder='Textarea' />
      </div>
    )
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send className='cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={{
          pathname: PATH_LOAN_REQUEST_PREVIEW,
          search: '?id=' + row.id,
          hash: "#boost-id"
        }}
          state={{ fromDashboard: 'mystate' }}
          id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Invoicep
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='me-50' />
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                // store.dispatch(deleteInvoice(row.id))
              }}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='me-50' />
              <span className='align-middle'>Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div >
    )
  }
]
