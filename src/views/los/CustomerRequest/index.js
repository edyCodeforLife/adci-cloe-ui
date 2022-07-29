import { Fragment, useState, useEffect } from 'react'

import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import MainCard from '../../../@core/layouts/components/custom/MainCard'
import { TableCompanyDetail } from './TableCompanyDetail';
import CustomerWizard from './CustomerWizard'
import { LOAN_LIMIT_REQ } from '../../../utility/Constants'
import { useSelector } from 'react-redux'
import { QrsToObj } from '../../../utility/function'
import { find } from 'lodash';
import TextScreen from '../../TextScreen'

const CustomerRequest = () => {

    const [activeTab, setActiveTab] = useState('1')
    const [data, setData] = useState(null);
    const qrs = QrsToObj(window.location.search);
    const _loanlimitreqId = qrs?.id;
    const cmCustomerData = useSelector(state => state.merchant.cmLoanLimitReqData)

    const toggleTab = tab => {
        setActiveTab(tab)
    }

    useEffect(() => {
        let data = find(cmCustomerData, { loanLimitRequestId: _loanlimitreqId });
        // alert(JSON.stringify(data))
        setData(data);
    }, [_loanlimitreqId])

    const switchScreen = () => {
        switch (data?.status) {
            case 3:
                return <CustomerWizard />
            // break;
            case 7:
                let text = "Offering Loan Letter already sent to " + data?.customerName + "," + data?.companyName + " and waiting for customer response"
                return <TextScreen textDisplay={text} />
            // break;
        }
    }

    return (
        <>
            <Breadcrumbs title={LOAN_LIMIT_REQ} data={[{ title: 'Pages' }, { title: LOAN_LIMIT_REQ }]} />
            {/* {data !== null ? ( */}
            <MainCard>
                <TableCompanyDetail />
            </MainCard>
            <MainCard>
                {
                    switchScreen()
                }
                <span className='icon-app'>{_loanlimitreqId}</span>
            </MainCard>
            {/* ) : null} */}
        </>
    );
}

export default CustomerRequest;