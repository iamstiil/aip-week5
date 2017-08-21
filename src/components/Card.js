import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
  render(){
    return (
      <div className="card mb-3" onClick={this.props.onClick}>
        <div className="card-body">
          <h4 className="card-title">{this.props.title}</h4>
          <p className="card-text">{this.props.children}</p>
        </div>
      </div>
    );
  }
}

export default Card;