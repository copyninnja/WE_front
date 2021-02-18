import React ,{ Suspense }from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import SiteHeader from './components/siteHeader';
import LoginPage from "./pages/LoginPage";
import registerPage from './pages/RegisterPage';
import { Provider } from 'react-redux' 
import store from './redux/store'
import './assets/css/index.less'
import Main from '../src/pages/main'
import './test/socketIO_test'
import findpassword from './pages/findpasswordPage'


const App = () => {
  return ( 
     <Provider store={store}>
      <BrowserRouter>
         <Suspense fallback={<h1>Loading page....</h1>}>
        <div className="jumbotron">
          <SiteHeader />      {/* New Header  */}
          <div className="container-fluid" style={{marginTop: '100px'}}>
            <Switch>
         <Route  path="/login" component={LoginPage} /> 
          <Route  path="/register" component={registerPage} />
          <Route  path="/findpassword" component={findpassword} />
          <Route component={Main}></Route>
        </Switch>

      </div> 
    </div> 
    </Suspense>
    </BrowserRouter>
    </Provider >
  

  );
};

ReactDOM.render(<App />, document.getElementById("root"));