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
    let note;

    if (this.props.notes && this.props.notes.length < 1) {
      console.log(this.props.notes)
      isLoaded = true;
      note = this.props.notes.find(note => {
        return note.id === window.location.pathname.slice(1)}
      );

      if (!note) {
        note = {
          id: null,
          noteContent: null,
        };
      }
    }

    this.state = {
      note,
      isLoaded,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.forceUpdate();
  }

  handleChange(evt){
    this.setState({
      noteContent: evt.value
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('receiving props: ', nextProps);
    console.log('current state: ', this.state);
    let id = window.location.pathname.slice(1);
    if ((!this.state.isLoaded || this.state.note.id !== id) && nextProps.notes) {
      let note = nextProps.notes.find(note => {
        return note.id === id}
      );

      if (note) {
        this.setState({
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
        <RaisedButton className="saveBtn" label="Save" />
      </div>
      </div> :
      <div className="container">
        <div className="note">
          <textarea id="noteContent" rows="10"
          cols="90"
          onChange={this.handleChange} />
          <RaisedButton className="saveBtn" label="Save" />
        </div>
      </div>
   )
  }
}

// Note.propTypes = {
//   noteContent: PropTypes.string
// }
