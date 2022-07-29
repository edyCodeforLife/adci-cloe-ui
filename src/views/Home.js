import { useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import ChloeDashboard from './dashboard/ChloeDashboard'
import DashboardCard from './ui-elements/DashboardCard';
import { LookupService } from '../data/business/index';
import { MerchantDashboardService } from '../data/business/dashboard/dashboard';
import { setDashboardData } from '../redux/general';
import { useDispatch, useSelector } from 'react-redux';
import { BUSINESS_DEVELOPMENT, CREDIT_MANAGER, LOAN_COMMITTE } from '../utility/Constants';

const Home = () => {

  const credential = useSelector(state=>state.login.credential);
  // hanya contoh buat ngetes
  const _service = new MerchantDashboardService();
  const role = localStorage.getItem("role");
  const email = localStorage.getItem('email');
  const dispatch = useDispatch();

  const getCMDashboardDataFn = () => {
    _service.getCMDashboardData(email, {
      Success: (res)=>{        
        dispatch(setDashboardData(res?.data))
      }
    })
  }

  const getBDDashboardDataFn = () => {
    _service.getBDDashboardData(email, {
      Success: (res)=>{        
        dispatch(setDashboardData(res?.data))
      }
    })
  }

  const getCommitteeDashboardDataFn = () => {
    _service.getCommitteeDashboardData(email, {
      Success: (res)=>{        
        dispatch(setDashboardData(res?.data))
      }
    })
  }

  useEffect(() => {
    if(role==CREDIT_MANAGER)
      getCMDashboardDataFn();
    else if(role==BUSINESS_DEVELOPMENT)
      getBDDashboardDataFn();
    else if(role==LOAN_COMMITTE)
      getCommitteeDashboardDataFn();
  }, [])

  return (
    <ChloeDashboard />
  )
}

export default Home
