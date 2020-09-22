import React, { Component } from 'react';
import './Style.css';

class Input extends Component {
    render() {
      return (
        <div id="Form">
          <h3>Add a new row</h3>  
          <form onSubmit={this.props.handleFormSubmit}>
            <input id="username" value={this.props.newUsername} 
              type="text" name="username"
              onChange={this.props.handleInputChange} />
             &nbsp;
             {(this.props.newUsername !=='')
              ?
            <button type="submit" value="Submit" className="style" >+</button>
            :<></>}
            
          </form>
        </div>
      );
    }
  }
  
  export default Input;
  