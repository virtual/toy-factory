import React, { Component } from 'react';

export default class Scoreboard extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>XP: {this.props.points} xp</li>
          <li>Health: {this.props.health}</li>
          <li>Weapon: {this.props.weapon}</li>
        </ul>
      </div>
    );
  }
}