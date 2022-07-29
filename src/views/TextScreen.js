import React, { useState, useEffect } from 'react';
import MainLabel from '../@core/layouts/components/custom/label/MainLabel';
import MainCard from '../@core/layouts/components/custom/MainCard';
import Breadcrumbs from '@components/breadcrumbs'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TextScreen = (props) => {
    const { textDisplay } = props;
    const { state } = useLocation();
    const cred = useSelector(state=>state.login.credential);

    const sourceFrom = () => {
        if(state?.text==undefined) //coming from not navigate
        {
            return (
                <MainLabel size="12px" align='center'>{textDisplay}</MainLabel>
            )
        }
        else 
        {
            return (
                <MainLabel size="12px" align='center'>{state?.texts}</MainLabel>
            )
        }
    }

    return (<>
        <Breadcrumbs title='Account Settings' data={[{ title: 'Pages' }, { title: 'Account Settings' }]} />
        <MainCard title={"Confirmation"}>
            <h3>Hi {cred?.username}</h3>
            {
               sourceFrom()
            }          
        </MainCard>
    </>);
}

export default TextScreen;