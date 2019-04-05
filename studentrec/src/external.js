import React from 'react'
import { Route, Link } from 'react-router-dom'


const User = ({ match }) => <p>{match.params.id}</p>      
{/* <p> </p> 里的内容display on web */}

class Users extends React.Component {
  render() {
    const { url } = this.props.match
    return (
      <div>
        <strong>select a EX</strong>
        <ul>
          <li>
              {/* match.params.id 是 1, /external 是match.url */}
            <Link to="/external/1">EX 1 </Link>
          </li>
          <li>
            <Link to="/external/2">EX 2 </Link>
          </li>
          <li>
            <Link to="/external/3">EX 3 </Link>
          </li>
        </ul>
        <Route path="/external/:id" component={User} />
      </div>
    )
  }
}
export default Users