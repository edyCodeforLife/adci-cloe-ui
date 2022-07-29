import React, { useState, useEffect } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import avatar1 from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import AvatarGroup from '@components/avatar-group'
// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'
// ** Reactstrap Imports
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';


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

const OfferingLoan = () => {
    const navigation = useNavigate();

    const approved = () => {
        // navigation(PATH_UPLOAD_AGGREMENT)
    }

    return (<>
        <MainCard>
            <p>Hi Sugianto</p>
            <p>Your Credit Loan Request form with Credit Limit Loan Request Job Number #1234567 has been processed,
                bellow is Boost Offering Loan Limit Letter. </p>
            <Table bordered responsive>
                <thead className='table-dark'>
                    <tr>
                        <th>No</th>
                        <th>Borrower</th>
                        <th>Facility</th>
                        <th>Credit Line Limit</th>
                        <th>Admin Fee</th>
                        <th>Tenure</th>
                        <th>Month Propose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            <img className='me-75' src={avatar1} alt='angular' height='20' width='20' />
                            <span className='align-middle fw-bold'>PT Skd</span>
                        </td>
                        <td>SCF</td>
                        <td>
                           Rp 2.000.000
                        </td>
                        <td>
                            3%/bulan
                        </td>
                        <td>
                            30 days
                        </td>
                        <td>
                            N/A
                        </td>
                    </tr>
                </tbody>
            </Table>
        </MainCard>
        <Button color='primary' className='btn-next right-float margin-top-small' onClick={approved}>
            <span className='align-middle d-sm-inline-block d-none'>Approved</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
        <Button color='primary' className='btn-next ltr-direction margin-top-small'>
            <span className='align-middle d-sm-inline-block d-none'>Reject</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
    </>);
}

export default OfferingLoan;