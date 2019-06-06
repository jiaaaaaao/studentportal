import React from 'react';
import './index.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import Users from './external';


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect:false,
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handclickNewUser=this.handclickNewUser.bind(this);
       /* this.handleSubmit = this.handleSubmit.bind(this);*/
        
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
    handclickNewUser(event){
        this.setState({
            redirect:true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/external' />
        }
      }



    render() {


        return (
            
                <form className="loginbox"> {/* onSubmit={this.handleSubmit} */}
                    
                    <div className="form-group">                   
                        <label> Username</label>
                        <br></br>
                        <input type="text"  value={this.state.username} placeholder="Enter Username" onChange={this.handleChangeUsername} />       
                    </div>

                    <div className="form-group">                     
                        <label for="exampleInputPassword1"> Password</label>   
                        <br></br>
                        <input type="password"  value={this.state.password} placeholder="Enter your password" onChange={this.handleChangePassword} />       
                    </div>

                    <div className="form-group">  
               
                        <input className="btn btn-primary" type="submit" value="LOGIN" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <p>or</p>
                        <button onClick={(event)=>this.handclickNewUser(event)}>Create A Account</button>&nbsp;&nbsp;
                        <small>Forget Password ?</small>
            
                    </div>

                    <div>
                    {this.renderRedirect()}
                    </div>

                </form>
            
            
                
           




        );
    }
}
//ReactDOM.render(<Login/>, document.getElementById('root')); {/* Login 是class */}

export default Login