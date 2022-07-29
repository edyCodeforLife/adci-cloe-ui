import React from 'react'
import { Input, Label, Button } from 'reactstrap';

export default function RadioChooseType(props) {
    const { data, handleChange } = props;

    return (
        data?.map((val, index) => {
            const isFinancing = val.code === "FS_SCF" || val.code === "FS_IF" ? val.code : val.name;
            return <div className='form-check' key={index}>
                <Input type='radio' id={val.id} name={val.group} value={isFinancing} defaultChecked={index === 0}
                    onChange={handleChange} />
                <Label className='form-check-label' for='ex1-active'>
                    {val.name}
                </Label>
            </div>
        })

    )
}
