import React from 'react';
import Moreinfo from './moreinfo'
import { Login } from './userlogin'
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, withRouter, Link } from "react-router-dom";

// Protected is the component that will display after successfully login
class Protected extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.propertyA)
    }



    render() {
        return (
            <div>
                <Moreinfo/>
                <h3>Protected page, information only shows when you log in</h3>

            </div>
        );
    }
}

export default Protected