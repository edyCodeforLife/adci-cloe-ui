// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

// ** Table Columns
import { columns } from './columns.js';

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { ArrowLeft, ArrowRight } from 'react-feather'
// ** Reactstrap Import
import { Button, Input, Row, Col, Card } from 'reactstrap'

// ** Store & Actions
// import { getData } from '../store'
// import { useDispatch, useSelector } from 'react-redux'

import { data } from "./data";

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import AdditionalDocument from '../AdditionalDocument/index.js';
import MainCard from '../../../../@core/layouts/components/custom/MainCard.js';
import Divider from '../../../../@core/layouts/components/custom/Divider.js';
import DocumentValidation from '../DocumentValidation/index.js';
import { TableAdditionalDocs } from '../AdditionalDocument/TableAdditionalDocs';
import { TableDocumentManagement } from './TableDocumentManagement';

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
          </div>
          <Button tag={Link} to='/apps/invoice/add' color='primary'>
            Add Record
          </Button>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Search</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Invoice'
            />
          </div>
          <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value=''>Select Status</option>
            <option value='downloaded'>Downloaded</option>
            <option value='draft'>Draft</option>
            <option value='paid'>Paid</option>
            <option value='partial payment'>Partial Payment</option>
            <option value='past due'>Past Due</option>
            <option value='sent'>Sent</option>
          </Input>
        </Col>
      </Row>
    </div>
  )
}

const DocumentManagement = ({ stepper, saveDocs, deleteAdditionalDocs, onHandleAddTable, additionalDocs, additionalDocsObj, handleInput, verifiedValue, UploadedDocs, redirectTo, handleChange, businessLine, handleSelectBL, selectedBusinessLine }) => {
  // ** Ref
  const ref = useRef(null)

  // ** Store vars
  //   const dispatch = useDispatch()
  const store = data;//useSelector(state => state.invoice)
  // {
  //   console.log("niolaoi store"+JSON.stringify(store))
  // }

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [stepperVer, setStepperVer] = useState(null);

  const configTable = {
    title: ["Document Group", "Document Name", "Document Label", "Document Year", "Document Url", "Verified Docs", "Remark Docs"],
    data: UploadedDocs
  }

  const configDataAdditionalDocs = {
    title: ["Document Name", "Required", "Template", "Business Line", "Actions"],
    data: additionalDocs
  }


  useEffect(() => {
    // dispatch(
    //   getData({
    //     sort,
    //     q: value,
    //     sortColumn,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     status: statusValue
    //   })
    // )
  })
  // }, [dispatch, store.data.length])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value
      })
    )
  }

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    )
  }

  const steps = [
    {
      id: 'document-validation-verification',
      title: "Document Validation & Verification",
      subtitle: '',
      content: <DocumentValidation stepper={stepperVer} />
    },
    {
      id: 'additional-document-requested',
      title: "Additional Document Requested",
      subtitle: '',
      content: <AdditionalDocument stepper={stepperVer} />
    },
  ]

  return (
    <div className='invoice-list-wrapper'>
      <MainCard title="Document Validation & Verification" actions='collapse'>
        <div style={{ boxSizing: 'border-box', overflow: 'scroll' }} className='invoice-list-dataTable react-dataTable'>
          {/* <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          /> */}
          <TableDocumentManagement
            striped
            configTable={configTable}
            redirectTo={redirectTo}
            borderless={true}
            handleInput={handleInput}
            verifiedValue={verifiedValue}
          />
        </div>
      </MainCard>
      <MainCard title="Additional Document Requested" actions='collapse' >
        <AdditionalDocument
          businessLine={businessLine}
          handleChange={handleChange}
          handleSelectBL={handleSelectBL}
          selectedBusinessLine={selectedBusinessLine}
          additionalDocsObj={additionalDocsObj}
          onHandleAddTable={onHandleAddTable}
        />

        {additionalDocs.length > 0 && (
          <TableAdditionalDocs
            striped
            configTable={configDataAdditionalDocs}
            deleteAdditionalDocs={deleteAdditionalDocs}
          />
        )}

      </MainCard>
      <Button color='primary' className='btn-next ltr-direction' onClick={() => { saveDocs(); stepper.next(); }}>
        <span className='align-middle d-sm-inline-block d-none'>Next</span>
        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
      </Button>
    </div>
  )
}

export default DocumentManagement
