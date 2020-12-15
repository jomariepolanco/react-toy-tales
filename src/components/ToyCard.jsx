import React, { Component } from 'react';

class ToyCard extends Component {

  handleDeleteClick = () => {
    this.props.deleteToy(this.props.toyObj.id)
  }

  handleLikeClick = () => {
    this.props.updateLike(this.props.toyObj.id)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
        <p>{this.props.toyObj.likes} Likes </p>
        <button className="like-btn" onClick={this.handleLikeClick}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDeleteClick}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
