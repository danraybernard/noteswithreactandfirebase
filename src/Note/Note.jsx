import React, {Component} from 'react';
/* eslint-disable */

import './Note.css';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase/app';
import 'firebase/database';

export default class Note extends Component {
  constructor(props){
    super(props);

    let isLoaded = false;
    let note

    if (this.props.notes && this.props.notes.length < 1) {
      isLoaded = true;
      note = this.props.notes.find(note => {
        return note.id === window.location.pathname.slice(1)}
      );

    }

    if (!note) {
      note = {
        id: null,
        noteContent: null,
      };
    }

    this.state = {
      note,
      isLoaded,
      noteContent: '',
      noteId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.writeNote = this.writeNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }
  componentDidMount(){
    this.forceUpdate();
  }

  handleChange(evt){
    let noteId = this.state.note.id
    this.setState({
      noteContent: evt.target.value,
      note: {
        id: noteId,
        noteContent: evt.target.value
      }
    })
    console.log(this.state.noteContent)
  }

  removeNote(){
    console.log(this.props)
    this.props.deleteNote(this.state.note)

  }

  writeNote(){
    // this.props.addNote(this.state.noteContent);
    this.props.updateNote(this.state.note)
  }

  componentWillReceiveProps(nextProps, nextState) {
    let id = window.location.pathname.slice(1);
    if ((!this.state.isLoaded || this.state.note.id !== id) && nextProps.notes) {
      let note = nextProps.notes.find(note => {
        return note.id === id}
      );

      if (note) {
        this.setState({
          note,
          noteContent: note.noteContent,
          isLoaded: true,
        });
      }
    }
  }

  render(){
    return (
      (this.state.isLoaded) ?
      <div className="container">
      <div className="note">
        <textarea id="noteContent" rows="10"
        cols="90"
        value={this.state.noteContent}
        onChange={this.handleChange} />
        <RaisedButton className="saveBtn" label="Save" onClick={this.writeNote} />
      </div>
      <RaisedButton className="deleteBtn" onClick={this.removeNote} label="Delete" />
      </div> :
      <div className="container">
        <div className="note">
          <textarea id="noteContent" rows="10"
          cols="90"
          onChange={this.handleChange} />
          <RaisedButton className="saveBtn" onClick={this.writeNote} label="Save" />
        </div>
      </div>
   )
  }
}

