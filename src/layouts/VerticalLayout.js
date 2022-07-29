// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
import { BUSINESS_DEVELOPMENT } from '../utility/Constants';
import { deleteKeys } from '../utility/Utils';

const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  const role = localStorage.getItem("role");

  const determineMenuIndex = () => {
    if(role!=BUSINESS_DEVELOPMENT)
    {
      let arr = ["Customers"];

      return deleteKeys(navigation, arr);
    }else{
      return navigation
    }
  }

  return (
    <Layout menuData={determineMenuIndex()} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
