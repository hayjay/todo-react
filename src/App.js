import React, { Component } from 'react';
import Note from './components/Note'; //import Note component
import logo from './logo.svg';
import Alert from './components/Alert'; //import Note component
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';


class App extends Component {
  constructor () {
    super();

    this.state = {
      noteText : '',
      notes : [], //holds array of each note we want to create,
      singleNote : ''
    }
  }

  updateNoteText(noteText){
    //update the notetext as its changes
    this.setState({
      noteText : noteText.target.value //get the value of the textbox
    });
  }

  handleKeyPress = (event) => { //pass event as the argument
    if(event.key === 'Enter'){
      this.handleSubmit(event);
    }
  }
  addNote(){
    // console.log(this.state.noteText);
    if(this.state.noteText === ''){return}
    let notesArr = this.state.notes;

    notesArr.push(this.state.noteText);
    // console.log(notesArr);
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
  
  handleSubmit(e){
    e.preventDefault();
    if(this.state.noteText === ''){
      this.handleClick();
    }else{
      const url = 'http://localhost:4000/tasks';
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json"
        },
        body: JSON.stringify({ "name" : this.state.noteText})
      })
      .then(res => res.json()) //
      .then(response => {
        //  console.log('Success', JSON.stringify(response))
        // this.state.notes.push(JSON.stringify(response));
        this.setState({notes : JSON.stringify(response)});
        //  console.log(b);
      })
      .catch((reject) => {
        console.log('Something went wrong!');
      });
    }
  }
  render() {

    let notes = <Note />;

    return (
      <div className="App">
        <BrowserRouter>
        
          <Route path="/todos" Component={Note}/>
          <Route path="/" Component={Home}/>
        </BrowserRouter>
      </div>
      // <div className="container">
      //   <div className="header">
      //     Daily Todo 
      //   </div>

      //   {notes}
        
      //   <form onSubmit={ this.handleSubmit }>
      //   <div className="btn" onClick={ this.handleSubmit.bind(this) }>
        
      //     +
      //   </div>
      //     <input  name="text" id="todo_text" type="text" ref={ ((input) => {this.textInput = input} )}
      //     className="textInput" value={this.state.noteText}
      //       onChange={noteText => this.updateNoteText(noteText)}
      //       onKeyPress={this.handleKeyPress.bind(this)}
      //       /> 
      //   </form>
      // </div>
      
    );
  }
}

export default App;
