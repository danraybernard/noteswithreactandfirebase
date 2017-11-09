import React, {Component} from 'react';
import './Note.css';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
  }

  render(props){
    return (
      <div className="container">
      <div className="note">
        {
          (this.noteContent && this.noteId) ?
          <textarea className="noteContent" rows="10" cols="90" defaultValue={this.noteContent} /> :
          <textarea className="noteContent" rows="10" cols="90" placeholder="Enter a note..." />
        }
        <RaisedButton className="saveBtn" label="Save" />
      </div>
      </div>
    )
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
}
