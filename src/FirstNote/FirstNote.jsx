import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class FirstNote extends Component {
  constructor(){
    super();
  }
  render(props){
    console.log(this.props);
    return (
      <div className="container">
      <div className="note">
        {

          (this.props.note) ?
          <textarea id="noteContent" onChange={this.handleUserInput} rows="10" cols="90" defaultValue={this.props.note.noteContent} /> :
          <textarea id="noteContent" onChange={this.handleUserInput} rows="10" cols="90" defaultValue="Enter a note..." />
        }
        <RaisedButton className="saveBtn" onClick={this.writeNote} label="Save" />
      </div>
      </div>
    )
  }
}
