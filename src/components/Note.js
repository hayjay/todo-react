import React, { Component } from 'react';

class Note extends Component {
  constructor () {
    super();

    this.state = { //set component initial state
      notes : []
    };
  };

  
  render() {
    return (
      <div className="note" onClick={this.props.deleteMethod}>
        {this.props.text}
      </div>
    );
  }
}

export default Note;
