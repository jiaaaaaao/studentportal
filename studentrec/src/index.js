import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// 创建不同js之间的联系，可以得到code进行运行 
import Moreinfo from './moreinfo'
import App from './App'
import Users from './external'
import { Login } from './userlogin'
import { PrivateRoute } from './userlogin'
import { AuthButton } from './userlogin'
import Protected from './protected'

const routing = (
  <Router>
    <div>
      <AuthButton />
      {/*  "/App"  是App.js */}
      {/*
      <ul>
        <li>
          <Link to="/">Home</Link>                 
        </li>

        <li>
          <Link to="/moreinfo">More Information</Link>
        </li>

        <li>
          <Link to="/external">External</Link>
        </li>
        
        
        <li>
          <Link to="/protected">Protected</Link>
        </li>
      </ul>

      {/*   App 是App.js里面的export default App（是Class App） */}
      {/*<Route exact path="/" component={App} />           */}

      <PrivateRoute exact path="/" component={Protected} /> {/*当可以login的时候，页面跳转到protected页面 */}

      <Route path="/login" component={Login} />
      <Route path="/moreinfo" component={Moreinfo} />
      <Route path="/external" component={Users} />


    </div>
  </Router>
)


ReactDOM.render(routing, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
