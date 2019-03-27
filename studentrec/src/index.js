import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

class Studentid extends React.Component{
    render() {
        return (
            <div>
          <button 
          onClick={()=>this.props.onClick()}>   
          GET       
          </button>
          
          <div>{this.props.name}</div>
          <div>{this.props.id}</div>
          <div>{this.props.chinesescore}</div>
          </div>
        );
      }
}

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={
                    name:" ? ",
                    id:" # ",
                    chinesescore:" ? ",

        };
        //this.handelclick=this.handelclick.bind(this);
    }

    handleClick(id){
        axios.get(`http://localhost:8080/studentInfo?name='qqq'`)
        .then(
            response=>{
                console.log(response);
                console.log(response.data);              
                
                const info=response.data;                
                this.setState({
                    name:info.name,
                    id:info.id,
                    chinesescore:info.chineseScore,
                
                 });
                

                 console.log(this.state);
            }
        )
        .catch(
            response=>{
                console.log(response);
            }
        )         
                
    }

    studentinfo(id){
        return <Studentid name={this.state.name} 
        id = {this.state.id} chinesescore = {this.state.chinesescore}
        onClick={()=>{this.handleClick(id);}}/>;
            
    }


    render(){
        return( 
        <div>
          <h1> Student Information</h1> 
            <div>            
                {this.studentinfo(0)}                      
            </div>
            
        </div>           
        )
    }
}

class Runner extends React.Component {
        render(){
            return (
            <div> 
            <Student />
            </div>
          );
        }
    }

ReactDOM.render(<Runner />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
