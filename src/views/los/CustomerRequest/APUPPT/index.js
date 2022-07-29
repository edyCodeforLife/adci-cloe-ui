import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Button, Input, Row, Col, Card } from 'reactstrap';
import { TableAPUPPT } from '../APUPPT/TableAPUPPT';
import Divider from '../../../../@core/layouts/components/custom/Divider';
import Grade from './Grade';
import { ModalAPUPPT } from './ModalAPUPPT';

const APUPPT = ({ stepper, APUPPTData, APUPPTScore, isLoading, handleSelectAPUPPT, selectedAPUPPTOptions, isDisable, show, toggleShow, handleOkModal, saveDataAPUPPT }) => {

    const configTable = {
        title: ["Factor", "Weight", "Input", "Risk Category"],
        data: APUPPTData
    }

    return (<>
        <TableAPUPPT
            striped
            configTable={configTable}
            handleSelectAPUPPT={handleSelectAPUPPT}
            selectedAPUPPTOptions={selectedAPUPPTOptions}
        />

        <ModalAPUPPT
            show={show}
            isLoading={isLoading}
            APUPPTScore={APUPPTScore}
            toggleShow={toggleShow}
            handleOkModal={handleOkModal}
        />
        {/* <Grade /> */}
        <Button color='primary' className='btn-next ltr-direction margin-top-small' onClick={saveDataAPUPPT} disabled={isDisable}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
    </>);
}

export default APUPPT;