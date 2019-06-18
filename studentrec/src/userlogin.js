import React from 'react';
import './index.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import Users from './external';
import { BrowserRouter as Router, Route, withRouter, Link } from "react-router-dom";
import { createBrotliCompress } from 'zlib';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    login = () => {
        fakeAuth.authenticate(() => {
            fakeAuth.isAuthenticated = true;
            this.setState({ redirectToReferrer: true });
        });

        {/*} fakeAuth.authenticate();
    this.setState({ redirectToReferrer: true });*/}

    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        //  let { redirectToReferrer } = this.state这个公式里面的redirectToReferrer（1）和上面的construct里面的this.state里面的redirectToReferrer（2）不是一个。是把（2）付给（1）。
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={{
            from,
            state: {
                key1: "test"
            }
        }} />;

        return (
            <div class='loginbox'>
                <label> Username</label>
                <br></br>
                <input type="text" id='searchName' value={this.state.username} placeholder="Enter Username" onChange={this.handleChangeUsername} />
                <br></br>
                <label for="exampleInputPassword1"> Password</label>
                <br></br>
                <input type="password" id='searchPassword' value={this.state.password} placeholder="Enter your password" onChange={this.handleChangePassword} />
                <br></br>
                <br></br>
                <li>
                    <Link to="/external">External</Link>
                </li>
                {/*<p>You must log in to view the page at {from.pathname}</p>*/}
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}


const fakeAuth = {
    isAuthenticated: false,

    //authenticate里面写的是与database链接看看有没有这个user?
    authenticate(cb) {
        var inputTagName = document.getElementById("searchName");
        var inputName = inputTagName.value;

        var inputTagPassword = document.getElementById("searchPassword");
        var inputPassword = inputTagPassword.value;

        axios.get(`http://localhost:8080/userLogin`,
            {
                params: {
                    username: inputName
                }
            })
            .then(
                response => {
                    console.log(response);
                    console.log(response.data);

                    const info = response.data;
                    if (info.username === inputName && info.password === inputPassword) {
                        cb();
                    }
                    console.log(this.state);
                }
            )
            .catch(
                response => {
                    console.log(response);
                }
            )


    },

    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
          </button>
            </p>
        ) : (
                <p>You are not logged in.</p>
            )
);

// Define a component named PrivateRoute
// InputComponent in our case is the passed in "Protected" component
// "...rest" are other parameter passed in, in our case it is the path
function PrivateRoute({ component: InputComponent, ...rest }) {
    return (
        <Route
            {...rest}

            render={props => {
                return fakeAuth.isAuthenticated ?
                    (
                        // if is authenticated render here          
                        <InputComponent propertyA={props.location.state} />
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
            }
        />
    );
}


export { Login, PrivateRoute, AuthButton }