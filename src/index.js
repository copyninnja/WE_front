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
  const HideOnScroll = () => {
    const [scroll, setScroll] = React.useState(window.scrollY);
    const [visible, setVisible] = React.useState(false)
    React.useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > scroll)
            setScroll(window.scrollY)
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    });

    return (
        <div style={{ height: "50px" }}>
            {visible && (              <SiteHeader />         )}
        </div>
    );
}
  return ( 
     <Provider store={store}>
      <BrowserRouter>
         <Suspense fallback={<h1>Loading page....</h1>}>
        <div className="jumbotron jumbotron-fluid">
        {/* <SiteHeader />      New Header  */}
        <HideOnScroll/>
          <div className="container-fluid" style={{marginTop: '100px'}}>
            <Switch>
         <Route  path="/login" component={LoginPage} /> 
          <Route  path="/register" component={registerPage} />
          <Route  path="/findpassword" component={findpassword} />
          <Route component={Main}></Route>
        </Switch>
        {/* <div hidden id="snipcart" data-api-key={process.env.REACT_APP_SNIPCART} data-config-modal-style="side"></div> */}

      </div> 
    </div> 
    </Suspense>
    </BrowserRouter>
    </Provider >
  

  );
};

ReactDOM.render(<App />, document.getElementById("root"));