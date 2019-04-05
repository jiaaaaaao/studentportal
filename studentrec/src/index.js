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

const routing = (
    <Router>
      <div>  
          <ul>
              <li>
              <Link to="/">Home</Link>                 {/*  "/App"  是App.js */}
              </li>

              <li>
              <Link to="/moreinfo">More Information</Link>
              </li>

              <li>
              <Link to="/external">External</Link>
              </li>
          </ul>
        
        <Route exact path="/" component={App} />             {/*   App 是App.js里面的export default App（是Class App） */}
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
