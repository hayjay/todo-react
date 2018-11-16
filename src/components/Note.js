import React, { Component } from 'react';

class Note extends Component {
  constructor (props) {
    super(props);

    this.state = { //set component initial state
      notes : [],
      //set loader/spinner
      isLoading : false
    };
  };

  //Remember : the render method is always runned by the compiler --
  //before the componentDidMount() method will run

  fetchTodos(){
    fetch(`http://localhost:4000/tasks`)
    //fetch is a promise so we can go ahead and append a .then call behind it
    .then((resp) => resp.json())
        //when the data is successfully fetched appened another .then call to use the fetched data
        .then(data => {
          let notes = data.map((each_note) => {
            return (
              <div className="note" key={each_note._id} onClick={this.props.deleteMethod}>
                {each_note.name}
              </div>
            )
          });
          //set or update the state (calling this.setState) after pulling notes from the api
          //set or update state to false after notes/todos has been pulled successfully
          this.setState({notes : notes, isLoading : false});
          console.log("todos", this.state.notes)
        }).catch((reject) => {
          // console.log(reject);
        });
  }

  componentDidMount(){
    //while mounting/pulling data from api : enable the spinner/loader below
    this.setState({ isLoading : true }); 
    setInterval( () => this.fetchTodos(), 1000);
  }


  render() {

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
      <div className="note" onClick={this.props.deleteMethod}>
        {/* //render the pulled data (from api) to the page/view */ }
        {/* below, we can call this.state.pictures because we have updated the state using this.setState in the componentDidMount function */}
        {this.state.notes}
      </div>
    );
  }
}

export default Note;
