// ** React Imports
import { Fragment, lazy } from 'react'
import { Navigate } from 'react-router-dom'
// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'
import { PATH_CLOE, PATH_DASHBOARD, PATH_LOGIN, PATH_REGISTER } from '../../navigation/path'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'

// ** Utils
import { isObjEmpty } from '@utils'
import CustomerRoutes from './Customers'
import LosRoutes from './Los'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = PATH_LOGIN;

const Home = lazy(() => import('../../views/Home'))
const SecondPage = lazy(() => import('../../views/SecondPage'))
const Login = lazy(() => import('../../views/Login'))
const Register = lazy(() => import('../../views/Register'))
const ForgotPassword = lazy(() => import('../../views/ForgotPassword'))
const Error = lazy(() => import('../../views/Error'));

// ** Merge Routes
const Routes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: PATH_CLOE,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: PATH_DASHBOARD,
    element: <Home />
  },
  {
    path: '/second-page',
    element: <SecondPage />
  },
  {
    path: PATH_LOGIN,
    element: <Login />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: PATH_REGISTER,
    element: <Register />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/error',
    element: <Error />,
    meta: {
      layout: 'blank'
    }
  },
  ...CustomerRoutes,
  ...LosRoutes
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
