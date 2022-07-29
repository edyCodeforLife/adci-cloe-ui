import { lazy } from 'react'
import { PATH_CONFIRMATION, PATH_CUSTOMER_REGISTRATION, PATH_MY_CUSTOMER, PATH_NOTIFICATION } from '../../navigation/path'

const CustomerRegistration = lazy(() => import('../../views/customers/CustomerRegistration'))
const TextScreen = lazy(() => import('../../views/TextScreen'))

const CustomerRoutes = [
  {
    path: PATH_CUSTOMER_REGISTRATION,
    element: <CustomerRegistration />
  },
  {
    path: PATH_CONFIRMATION,
    element: <TextScreen />
  },
  {
    path: PATH_MY_CUSTOMER,
    element: <TextScreen />
  },
]

export default CustomerRoutes
