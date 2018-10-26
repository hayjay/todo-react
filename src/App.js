import React, { Component } from 'react';
import Note from './components/Note'; //import Note component
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor () {
    super();

    this.state = {
      noteText : '',
      notes : [] //holds array of each note we want to create
    }
  }

  componentDidMount(){
    fetch(`https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json`)
    .then((resp) => resp.json())
    // .then(results => {
    //     console.log(results.json());

    //       return results.json();
    //     })
        .then(data => {
          console.log(data)
          let notes = data.results.map((each_note) => {
            return (
              <div className="note" key={each_note.results} onClick={this.props.deleteMethod}>
                {each_note.results.name}
              </div>
            )
          });
          //set or update the state (calling this.setState) after pulling notes from the api
          this.setState({notes : notes});
          console.log("todos", this.state.notes)
        }).catch((reject) => {
          console.log(reject);
        });
  }

  updateNoteText(noteText){
    //update the notetext as its changes
    this.setState({
      noteText : noteText.target.value //get the value of the textbox
    });
  }

  handleKeyPress = (event) => { //pass event as the argument
    if(event.key === 'Enter'){
      this.addNote();
    }
  }
  addNote(){
    // console.log(this.state.noteText);
    if(this.state.noteText === ''){return}
    let notesArr = this.state.notes;

    notesArr.push(this.state.noteText);
    console.log(notesArr);
    //reset the state of the note textbox to empty after it has been added
    this.setState({noteText : ''});
    this.textInput.focus(); //set the mouse focus on the textbox after it has been added

  }
  deleteNote(index){
    let notesArr = this.state.notes;
    notesArr.splice(index, 1); //remove the note from the note array
    //update note array with the new array set after deleting
    this.setState({ notes : notesArr }); 
  }
  render() {
    let notes = this.state.notes.map((val, key) => {
      return <Note key={key} text={val} deleteMethod={ () => this.deleteNote(key) }/>
    });

    return (
      <div className="container">
        <div className="header">
          Simple & Powerful Todo Application
        </div>
        {notes}
        <div className="btn" onClick={ this.addNote.bind(this) }>
          +
        </div>
        <input type="text" ref={ ((input) => {this.textInput = input} )}
         className="textInput" value={this.state.noteText}
          onChange={noteText => this.updateNoteText(noteText)}
          onKeyPress={this.handleKeyPress.bind(this)}
          /> 
      </div>
    );
  }
}

export default App;
