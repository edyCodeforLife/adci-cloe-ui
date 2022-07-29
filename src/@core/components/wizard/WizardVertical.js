import React, { forwardRef } from 'react'
import Wizard from '.'

const WizardVertical = forwardRef((props , ref) => {
  console.log('ref', ref)
  const {
    steps,
    setStepper
  } = props

  return (
    <div className='vertical-wizard'>
      <Wizard
        // instance={onClick} 
        instance={el => setStepper(el)} 
        ref={ref} 
        steps={steps} 
        type='vertical' 
        options={{
          linear: false
        }} 
      />
  </div>
  )
})

export default WizardVertical