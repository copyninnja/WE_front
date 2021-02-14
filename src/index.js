import React ,{ lazy, Suspense }from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/Homepage";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import SiteHeader from './components/siteHeader';
import LoginPage from "./pages/LoginPage";
import PrivateRoute from './contexts/privateRoute';
import ShopList from '../src/components/CardList';
import registerPage from './pages/RegisterPage';
import { Provider } from 'react-redux' 
import store from './redux/store'




const App = () => {
  return ( 
     <Provider store={store}>
      <BrowserRouter>
  
         <Suspense fallback={<h1>Loading page....</h1>}>
        <div className="jumbotron">
          <SiteHeader />      {/* New Header  */}
          <div className="container-fluid">
            <Switch>
         <Route  path="/login" component={LoginPage} /> 
          <Route  path="/register" component={registerPage} />
          <Route  path="/shop" component={ShopList} />
          <Route exact path="/" component={HomePage} />
          <Redirect from="*" to="/" />
        </Switch>

      </div> 
    </div> 
    </Suspense>
    </BrowserRouter>
    </Provider >
  

  );
};

ReactDOM.render(<App />, document.getElementById("root"));