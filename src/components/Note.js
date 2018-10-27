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
  componentDidMount(){
    fetch(`http://localhost:4000/tasks`)
    //fetch is a promise so we can go ahead and append a .then call behind it
    .then((resp) => resp.json())
        //when the data is successfully fetched appened another .then call to use the fetched data
        .then(data => {
          // console.log(data);
          let notes = data.map((each_note) => {
            return (
              <div className="note" key={each_note._id} onClick={this.props.deleteMethod}>
                {each_note.name}
              </div>
            )
          });
          //set or update the state (calling this.setState) after pulling notes from the api
          this.setState({notes : notes});
          console.log("todos", this.state.notes)
        }).catch((reject) => {
          // console.log(reject);
        });
  }


  render() {
    // console.log(notes);
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
