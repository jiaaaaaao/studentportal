import React from 'react';
import './index.css';
import axios from 'axios';

class Studentid extends React.Component {
    render() {
        return (
            <div className="content" >
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
            chinesescore:" score",
            addChineseScore:'',
            putname: '',
            entername: '',
            deletename:'',
            updatename:'',
            updateChineseScore:'',


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2= this.handleChange2.bind(this);
        this.handleChange3= this.handleChange3.bind(this);
        this.handleChangeUpdateName=this.handleChangeUpdateName.bind(this);
        this.handleChangeUpdateChinesescore=this.handleChangeUpdateChinesescore.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this); 
        this.handleSubmitUpdate=this.handleSubmitUpdate.bind(this);
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

    handleChange2(event) {
        this.setState({
            addChineseScore: event.target.value
        });
    }

    handleChange3(event) {
        this.setState({
            deletename: event.target.value
        });
    }

    handleChangeUpdateName(event) {
        this.setState({
           updatename: event.target.value
        });
    }

    handleChangeUpdateChinesescore(event) {
        this.setState({
           updateChineseScore: event.target.value
        });
    }

    handleSubmitUpdate(event) {

        const updstudent = {
            id:0,
            name:this.state.updatename,
            chineseScore:this.state.updateChineseScore,
        };
        
        

        axios.post(`http://localhost:8080/studentInfo/1`,updstudent)
      .then(
          
          response => {
            console.log("2");
        console.log(response);
        console.log(response.data);
      })
      .catch(
        response => {
            console.log(response);
        }
    )

    }
//delete---------------------------------------------
    handleSubmit1(event) {
        
        var dele = this.state.deletename;
  
        axios.delete(`http://localhost:8080/studentInfo`,
            {
                params: {
                    name: dele
                }
            })
            .then(

                response => {
                    alert("this student's info deleted")
                    console.log("2 come on.............");
                    console.log(response);
                    console.log(response.status);
                })
            .catch(
                response => {
                    console.log(response);
                }
            )

    }
//----------------------------------------------------------


    handleSubmit(event) {
        const student = {
            id: 0,
            name: this.state.putname,
            chineseScore: this.state.addChineseScore,
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
        //var stateSavedName = this.state.entername;

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
                <h1 className="text-center"> Student Information</h1>
                <div>
                    <input className="form-control" id='searchName' type="text" value={this.state.entername} placeholder="enter student name" onChange={this.handleChange1} />
                </div><br />
                <div>{this.createStudentIdTag()}</div>

                <ul>
                    <li>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group mx-sm-3 mb-2">  
                    
                    {/* &nbsp; 空格 */}                  
                    <label> <strong>Add A Student Info</strong></label> &nbsp;&nbsp;
                        <input type="text"  value={this.state.putname} placeholder="name" onChange={this.handleChange} />
                        <input type="text"  value={this.state.addChineseScore} placeholder="chinese score" onChange={this.handleChange2} />
                    
                    </div>
                    <input className="btn btn-primary" type="submit" value="PUT" />

                </form>
                  </li>
                  {/*  delete */}


                  <li>

                <form className="form-inline" onSubmit={this.handleSubmit1}>
                    <div className="form-group mx-sm-3 mb-2">  
                    
                    {/* &nbsp; 空格 */}                  
                    <label> <strong>Delete A Student Info</strong></label> &nbsp;&nbsp;
                    
                        <input type="text"  value={this.state.deletename} placeholder="StudentName" onChange={this.handleChange3} />
                    
                    </div>
                    <input className="btn btn-primary" type="submit" value="Delete" />

                </form>

                  </li>


                  <li>
                <form className="form-inline" onSubmit={this.handleSubmitUpdate}>
                    <div className="form-group mx-sm-3 mb-2">  
                    
                    {/* &nbsp; 空格 */}                  
                    <label> <strong>Update A Student Info</strong></label> &nbsp;&nbsp;
                        <input type="text"  value={this.state.updatename} placeholder="name" onChange={this.handleChangeUpdateName} />
                        <input type="text"  value={this.state.updateChineseScore} placeholder="chinese score" onChange={this.handleChangeUpdateChinesescore} />
                    
                    </div>
                    <input className="btn btn-primary" type="submit" value="UPDATE" />

                </form>
                  </li>



                </ul>
            </div>
            
        )
    }
}

class MoreInfo extends React.Component {
    render() {
        return (
            <div>
                <Student />
                
            </div>
        );
    }
}




export default MoreInfo