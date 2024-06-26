import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom'
import CalculatorPage from '../pages/calculator/Calculator'
import { useAppSelector } from '../redux/hooks'
import { selectAuthenticatedUser } from '../redux/slices/auth.slice'
import LoginPage from '../pages/login/LoginPage'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ ...rest }: RouteProps): React.ReactElement | null => {
  const { access_token } = useAppSelector(selectAuthenticatedUser)
  // return access_token ? <Route {...rest} /> : <Route {...rest} element={<Navigate replace to="/" />} />
  return access_token ? <Outlet /> : <Navigate to="/" />
}

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/calculator" element={<PrivateRoute />}>
          <Route path="/calculator" element={<CalculatorPage />} />
        </Route>
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default RootNavigation
