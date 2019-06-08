import React from 'react';
import { Redirect } from 'react-router-dom';

// Protected is the component that will display after successfully login
class Protected extends React.Component {
    constructor(props) {      
        super(props)  
        console.log(this.props.propertyA)
    }
    
    logout = () => {
        return <Redirect
          to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    logoutMark: true, 
                }
        }}
    />
    }

    render(){
        return (
        <div>
        <h3>Protected page, information only shows when you log in</h3>
        <button onClick={this.logout}>Log out</button>
        </div>
        );
    }
}  
 
export default Protected