import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'
import Header from '../Header'

const ProtectedRoute = props => {
  const {path} = props
  if (Cookies.get('token') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      {path === '/search' ? null : <Header />}
      <Route {...props} />
    </>
  )
}

export default ProtectedRoute
