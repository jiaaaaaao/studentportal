import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



class Studentid extends React.Component {
    render() {
        return (
            <div class="content" >
            <div>
                <button className="btn btn-primary"
                    onClick={() => this.props.onClick()}>
                    GET
                 </button>
            </div><br />
            <div>
                 <table className="table">
                 <thead>
                     <tr>
                         <th scope="col">Studnt Name</th>
                         <th scope="col">Student ID(NONE)</th>
                         <th scope="col">Chinese Score</th>
                     </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th scope="row">{this.props.name}</th>
                          <td>{this.props.id}</td>
                          <td>{this.props.chinesescore}</td>
                      </tr>
                   </tbody>
                </table>
            </div>
            </div>
        );
    }
}

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " name ",
            id: " # ",
            chinesescore: " score ",
            putname: '',
            entername: '',


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            putname: event.target.value
        });
    }
    handleChange1(event) {
        this.setState({
            entername: event.target.value
        });
    }

    handleSubmit(event) {
        const student = {
            id: 0,
            name: this.state.putname,
            chineseScore: 100
        };

        console.log("1");
        axios.post(`http://localhost:8080/studentInfo`, student)
            .then(
                response => {
                    console.log("2");
                    console.log(response);
                    console.log(response.data);
                }
            )
            .catch(
                response => {
                    console.log("3");
                    console.log(response);
                }
            )
    }


    handleClick() {
        //以下2种方法，
        //1.通过input id 得到input的这个tag，从而可以得到这个tag的value，这是document.getElementById方法
        var inputTag = document.getElementById("searchName");
        var searchName = inputTag.value;
        //2.通过input 的onchange实时更新this.state.entername的value
        var stateSavedName = this.state.entername;

        axios.get(`http://localhost:8080/studentInfo`,
            {
                params: {
                    name: searchName
                }
            })
            .then(
                response => {
                    console.log(response);
                    console.log(response.data);

                    const info = response.data;
                    this.setState({
                        name: info.name,
                        id: info.id,
                        chinesescore: info.chineseScore,

                    });


                    console.log(this.state);
                }
            )
            .catch(
                response => {
                    console.log(response);
                }
            )

    }

    createStudentIdTag() {
        return <Studentid name={this.state.name}
            id={this.state.id} chinesescore={this.state.chinesescore}
            onClick={() => { this.handleClick() }}
        />;

    }

    render() {
        return (
            <div>  
                <a href="https://uaccess.arizona.edu/" target="_blank">Student Login</a> 
                <h1 className="text-center"> Student Information</h1>
                <div>
                    <input class="form-control" id='searchName' type="text" value={this.state.entername} placeholder="enter student name" onChange={this.handleChange1} />
                </div><br />
                <div>{this.createStudentIdTag()}</div>

                <ul>
                    <li>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group mx-sm-3 mb-2">  
                    
                    {/* &nbsp; 空格 */}                  
                    <label> <strong>Add A Student Info</strong></label> &nbsp;&nbsp;
                        <input type="text"  value={this.state.putname} placeholder="name" onChange={this.handleChange} />
                    
                    </div>
                    <input className="btn btn-primary" type="submit" value="PUT" />

                </form>
                  </li>
                </ul>
            </div>
            
        )
    }
}

class Runner extends React.Component {
    render() {
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
