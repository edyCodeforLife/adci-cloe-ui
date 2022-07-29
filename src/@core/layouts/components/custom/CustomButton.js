import React from 'react'
import { Button } from 'reactstrap'

function CustomButton(props) {
    const {handleAdd, text, icon} = props;

    const classBtn = 'btn-next float-right md-margin-bottom'

    return (
        <Button color='primary' className={classBtn} onClick={() => handleAdd()}>
            <span className='align-middle d-sm-inline-block d-none'>{text}</span>
            {
                icon? null: null
            }
        </Button>
    )
}

export default CustomButton