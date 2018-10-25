import React, { Component } from 'react';

class Note extends Component {
  constructor () {
    super();

    this.state = { //set component initial state
      notes : []
    };
  };

  componentDidMount(){
    fetch('http://localhost:4000/tasks').then(results => {
      return results.json();
    });
  }


  render() {
    return (
      <div className="note" onClick={this.props.deleteMethod}>
        {this.props.text}
      </div>
    );
  }
}

export default Note;
