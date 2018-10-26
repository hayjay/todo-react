import React, { Component } from 'react';

class Note extends Component {
  constructor () {
    super();

    this.state = { //set component initial state
      notes : []
    };
  };
  

  componentDidMount(){
    fetch(`http://localhost:4000/tasks`)
    .then((resp) => resp.json())
        .then(data => {
          console.log(data);
          let notes = data.map((each_note) => {
            // console.log(each_note)
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
          // console.log(reject);
        });
  }


  render() {
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
