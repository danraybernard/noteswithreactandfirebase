
import React, { Component } from 'react';
import './App.css';
import NewNote from './NewNote/NewNote.jsx';
import Note from './Note/Note.jsx';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import {DB_CONFIG} from './Config/config';
import firebase from 'firebase/app';
import { withRouter, Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import 'firebase/database';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      notes: [],
      firstNote: {}
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    this.clickHandler = this.clickHandler.bind(this);
    // this.addNote = this.addNote.bind(this);
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });


  componentWillMount(){
    const prevNotes = this.state.notes;
    this.db.on('child_added', snap => {
      prevNotes.push({
        id: snap.key,
        noteContent: snap.val(),
      })
      this.setState({
        notes: prevNotes,
        firstNote: prevNotes[prevNotes.length - 1],
        selectedNote: {}
      })
    })
  }

  clickHandler(evt){
    evt.preventDefault();
    this.setState({firstNote: []})
    console.log(this.state);

  }

  // Add note probably belongs in Note.jsx or NewNote.jsx
  addNote(note){
    this.db.push().set( note );
  }
  //Use render to pass props in Route switch

  render(props){
  return (
    <MuiThemeProvider key={1}>
    <BrowserRouter>
      <div className="notesWrapper">
        <div className="notesHeader">
            <h1 className="heading">Notes App</h1>
          <div className="notesBody">

          <Switch>
            <Route exact path="/" render={() => {return <Note  note={this.state.firstNote} />}} />
            <Route exact path="/new" render={() => {return <NewNote addNote={this.addNote.bind(this)} />}} />
            <Route
path="/:id" render={() => {return <Note notes={this.state.notes} />
}}
 />
          </Switch>

          <RaisedButton
            label="Open Drawer"
            onClick={this.handleToggle}
            />

            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={ (open) => this.setState({open}) }>
              {this.state.notes.map(note => {
                return (
                  <Link to={`/${note.id}`} key={note.id}>
                  <MenuItem  onClick={this.handleClose}>
                    {note.noteContent.slice(0, 5)}
                  </MenuItem>
                  </Link>
                )
              })}
            </Drawer>


              <button className="newNote" label="New Note" onClick={this.clickHandler}>
                <Link to="/new">
                  New Note
                </Link>
              </button>
          </div>
        </div>
      </div>
    </BrowserRouter>
    </MuiThemeProvider>
    );
  }
}


// export default withRouter(App);
