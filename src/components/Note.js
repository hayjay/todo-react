import React, { Component } from 'react';

import '../App.css';

import 'react-toastify/dist/ReactToastify.css';
class Note extends Component {
  
  constructor (props) {
    super(props);

    this.state = { //set component initial state
      notes : [],
      //set loader/spinner
      isLoading : false,
      method: "POST",
    };
  };

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

  //Remember : the render method is always runned by the compiler --
  //before the componentDidMount() method will run
  handleSubmit(e){
    e.preventDefault();
    if(this.state.noteText === ''){
      this.handleClick();
    }else{
      const url = 'http://localhost:4000/tasks';
      fetch(url, {
        method : this.state.method,
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
        console.log('Something went wrong! '+ reject);
      });
    }
  }

  handleKeyPress = (event) => { //pass event as the argument
    if(event.key === 'Enter'){
      this.handleSubmit(event);
    }
  }

  updateNoteText(noteText){
    //update the notetext as its changes
    this.setState({
      noteText : noteText.target.value //get the value of the textbox
    });
  }

  deleteNote(index){
    let notesArr = this.state.notes;
    notesArr.splice(index, 1); //remove the note from the note array
    //update note array with the new array set after deleting
    this.setState({ notes : notesArr }); 
  }

  fetchTodos(){
    fetch(`http://localhost:4000/tasks`)
    //fetch is a promise so we can go ahead and append a .then call behind it
    .then((resp) => resp.json())
        //when the data is successfully fetched appened another .then call to use the fetched data
        .then(data => {
          let count = 1
          let notes = data.map((each_note) => {
            return (
              <div className="note" key={each_note._id} onClick={this.props.deleteMethod}>
            <span className="primary">{count++}) </span> {each_note.name}
              </div>
            )
          });
          
          //set or update the state (calling this.setState) after pulling notes from the api
          //set or update state to false after notes/todos has been pulled successfully
          this.setState({notes : notes, isLoading : false});
        }).catch((reject) => {
          // console.log(reject);
        });
  }

  componentDidMount(){//helps while the application is still loading to pull data
    //while mounting/pulling data from api : enable the spinner/loader below
    this.setState({ isLoading : true }); 
    setInterval( () => this.fetchTodos(), 1000);
  }


  render() {
    let notes = this.state.notes;
    
    const loaderStyle = {
      color : '#222',
      marginTop: '20px'
    };

    const f_w = {
      fontWeight : 'bold',
    }

    //display a loading p tag if page is still loading trying to fetch data
    if( this.state.isLoading ){
      return <center><p style={loaderStyle}>Loading todo list! Please wait <span style={f_w}>...</span></p></center>;
      
    }
    return (
      
      <div className="container">

        {notes}
        
        <form onSubmit={ this.handleSubmit }>
        <div className="btn" onClick={ this.handleSubmit.bind(this) }>
        
          +
        </div>
          <input name="text" placeholder="Enter new todo here and press enter..." id="todo_text" type="text" ref={ ((input) => {this.textInput = input} )}
          className="textInput" value={this.state.noteText}
            onChange={noteText => this.updateNoteText(noteText)}
            onKeyPress={this.handleKeyPress.bind(this)}
            /> 
        </form>
      </div>
    );
  }
}

export default Note;
