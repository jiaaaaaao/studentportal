import React from 'react';
import './index.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import Users from './external';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends React.Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}


const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

// Define a component named PrivateRoute
// InputComponent in our case is the passed in "Protected" component
// "...rest" are other parameter passed in, in our case it is the path
function PrivateRoute({ component: InputComponent, ...rest }) {
    return (
        <Route
            {...rest}

            render={props =>
                fakeAuth.isAuthenticated ?
                    (
                        // if is authenticated render here          
                        <InputComponent />
                    ) : (
                        // if is NOT authenticated redirect to /login 
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}


export { Login, PrivateRoute}