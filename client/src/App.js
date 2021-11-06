import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
//Routing
import PrivateRoute from './routing/privateRoute/PrivateRoute'
import PageRender from './routing/pageRoute/PageRender'
// Pages
import {LoginScreen,RegisterScreen,ForgotPasswordScreen,ResetPasswordScreen,IndexPage,HomePage} from './pages'


const App=()=> {
  return (
    <Router>
      <div className='App'>
        <Switch>

            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/resetpassword" component={ResetPasswordScreen} />
            <PrivateRoute exact path="/home" component={HomePage}/>
            <PrivateRoute path="/" component={IndexPage}/>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
