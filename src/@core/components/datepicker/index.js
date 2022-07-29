// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const DatepickerDefault = ({ onHandleInputChange }) => {
  // ** State
  const [picker, setPicker] = useState(new Date())
  // console.log('isi picker', picker)
  return (
    <Fragment>
      {/* <Label className='form-label' for='default-picker'>
        Default
      </Label> */}
      <Flatpickr 
        className='form-control' 
        // value={picker} 
        onChange={onHandleInputChange} 
        id='default-picker' 
      />
    </Fragment>
  )
}

export default DatepickerDefault
