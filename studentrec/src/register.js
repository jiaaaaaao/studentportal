import { login } from "./userlogin";
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Link } from "react-router-dom";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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

    add(history) {

        var inputTagName = document.getElementById("Name");
        var inputName = inputTagName.value;

        var inputTagPassword = document.getElementById("Password");
        var inputPassword = inputTagPassword.value;

        const user = {
            username: inputName,
            password: inputPassword
        };

        axios.post(`http://localhost:8080/userLogin`, user)
            .then(
                response => {
                    console.log(response);             
                    history.push("/")
                }
            )
            .catch(
                response => {
                    console.log(response);
                }
            )
    }


    create(cb, history) {
        var inputTagName = document.getElementById("Name");        
        var inputName = inputTagName.value;

        var inputTagPassword = document.getElementById("Password");
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
                    if (info.username !== inputName && info.password !== inputPassword) {
                        cb(history);                        
                    }
                    
                }
            )
            .catch(
                response => {
                    console.log(response);
                }
            )


    }




    render() {

        return (
            <div class='loginbox'>
                <label> Username</label>
                <br></br>
                <input type="text" id='Name' value={this.state.username} placeholder="Create Username" onChange={this.handleChangeUsername} />
                <br></br>
                <label for="exampleInputPassword1"> Password</label>
                <br></br>
                <input type="password" id='Password' value={this.state.password} placeholder="Create your password" onChange={this.handleChangePassword} />
                <br></br>
                <br></br>
                <button onClick={()=>{
                    this.create(this.add, this.props.history);                    
                }}>Create a New Account</button>
            </div>
        );
    }

}

export default Register 