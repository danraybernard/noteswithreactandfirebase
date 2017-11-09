
import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [
        {id: 1, noteContent: 'Note1 LOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM bbbbbIPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUM'},
        {id: 2, noteContent: 'Note2'}
      ],
    }
  }
  render(props){
    console.log(this.state.notes[0]);
    const firstNote = this.state.notes[0];
  return (
      <div className="notesWrapper">
        <div className="notesHeader">
            <h1 className="heading">Notes App</h1>
          <div className="notesBody">
            {
              <MuiThemeProvider key={firstNote.id}>
                <Note noteContent={firstNote.noteContent} noteId={firstNote.id} key={firstNote.id} />
              </MuiThemeProvider>
            }
          </div>
        </div>
      </div>
    );
  }
}
