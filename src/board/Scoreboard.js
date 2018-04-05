import React, { Component } from 'react';
import './Scoreboard.css';

export default class Scoreboard extends Component {
  render() {
    return (
      <div>
        <ul className="scoreboard">
          <li>XP: <strong>{this.props.points} xp</strong></li>
          <li>Health: <strong>{this.props.health}</strong></li>
          <li>Weapon: <strong>{this.props.weapon}</strong></li>
        </ul>
      </div>
    );
  }
}