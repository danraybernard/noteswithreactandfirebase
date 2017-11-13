import React, {Component} from 'react';
import './NewNote.css';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase/app';
import 'firebase/database';

export default class Note extends Component {
  constructor() {
    super();
    this.noteContent = ''
    this.noteId = null
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }


  handleUserInput(evt){
    this.setState({
      noteContent: evt.target.value
    })
  }

  writeNote(){
    console.log('before', this.state)
    if (this.state.noteContent.length > 0){
    this.props.addNote(this.state.noteContent);
    }
    this.setState({noteContent: ''})
    document.getElementById('noteContent').value = '';
    console.log('after', this.state)
  }

  render(){
    return (
      <div className="container">
      <div className="note">
        {
          <textarea id="noteContent" onChange={this.handleUserInput} rows="10" cols="90" placeholder="Enter a note..." />
        }
        <RaisedButton className="saveBtn" onClick={this.writeNote} label="Save" />
      </div>
      </div>
    )
  }
}

// NewNote.propTypes = {
//   noteContent: PropTypes.string
// }


// addNote sets state
// write note passes up to the db
