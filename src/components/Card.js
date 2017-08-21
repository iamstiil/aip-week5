import React, { Component } from 'react';

class Card extends Component {
  render(){
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h4 className="card-title">{this.props.title}</h4>
          <p className="card-text">{this.props.children}</p>
        </div>
      </div>
    );
  }
}

export default Card;
