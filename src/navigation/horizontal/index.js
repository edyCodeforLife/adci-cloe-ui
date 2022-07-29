import { Mail, Home } from 'react-feather';
import { PATH_DASHBOARD } from '../path'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: PATH_DASHBOARD
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  }
]
