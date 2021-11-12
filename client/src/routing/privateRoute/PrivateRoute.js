import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = (props) => {
  const firstLogin = localStorage.getItem('firstLogin')
  return firstLogin ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRoute
