import { Mail, Home, Circle, Activity } from 'react-feather'
import { PATH_CUSTOMER_REGISTRATION, PATH_LOAN_LIMIT_TRANSACTION, PATH_LOAN_ORIGINATION_SYSTEM, PATH_DASHBOARD } from '../path'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: PATH_DASHBOARD
  },
  {
    id: 'customers',
    title: 'Customers',
    icon: <Mail size={20} />,
    children: [
      {
        id: 'customerRegistration',
        title: 'Customer Registration',
        icon: <Circle size={12} />,
        navLink: PATH_CUSTOMER_REGISTRATION
      },
      // {
      //   id: 'myCustomer',
      //   title: 'My Customer',
      //   icon: <Circle size={12} />,
      //   navLink: PATH_MY_CUSTOMER
      // }
    ]
  },
  {
    id: 'los',
    title: 'Loan',
    icon: <Activity size={20} />,
    children: [
      {
        id: 'loanLimitRequest',
        title: 'Loan Limit Request',
        icon: <Circle size={12} />,
        navLink: PATH_LOAN_ORIGINATION_SYSTEM
      },
      {
        id: 'loanLimitTransaction',
        title: 'Loan Limit Transaction',
        icon: <Circle size={12} />,
        navLink: PATH_LOAN_LIMIT_TRANSACTION
      }
    ]
  }
]
