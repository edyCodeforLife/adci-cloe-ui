import React, { useState, useEffect } from 'react';
// ** Custom Components
import AvatarGroup from '@components/avatar-group'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import Select from 'react-select';
import { ArrowLeft, ArrowRight, Eye, Trash2 } from 'react-feather'
import { selectThemeColors } from '@utils'
// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Input } from 'reactstrap'

const perseroOptions = [
    { value: 'active', label: 'Active' },
    { value: 'passive', label: 'Passive' },
]

const PersonalPT = () => {
    return (<>
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
                        Number of Employee
                    </td>
                    <td>
                        <Badge pill color='light-primary' className='me-1'>
                            2%
                        </Badge>
                    </td>
                    <td>
                        <Select
                            id={`select-city`}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={cityType[0]}
                            options={perseroOptions}
                            isClearable={false}                            
                        />
                    </td>
                    <td>
                        <tr>2</tr>
                        <tr>1`</tr>
                        <tr>0</tr>
                    </td>
                    <td>
                        Low
                    </td>
                    <td>
                        0
                    </td>
                </tr>
            </tbody>
            {/* total */}
            <tbody className='border-table-total'>
                <tr>
                    <td>
                        <img className='me-75' src={avatar1} alt='angular' height='20' width='20' />
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
    </>);
}

export default PersonalPT;