import React from 'react'
import { Label, Button, Input } from 'reactstrap';
import { ALLOWED_FILE_TYPES } from '@utility/Constants';

const UploadButton = ({handleUpload, nameInput, showUploadFile}) => {

    return (
        <>
            <Button color='primary float-right' className='btn-next' tag={Label}>
                Upload
                <Input
                    type='file'
                    name={nameInput}
                    onChange={(e) => { handleUpload(e) }}
                    hidden
                    value={''}
                    accept={ALLOWED_FILE_TYPES}
                />
            </Button>
            <div>{showUploadFile("inputName", nameInput)}</div>
        </>
    )
}

export default UploadButton