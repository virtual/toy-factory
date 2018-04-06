import React, { Component } from 'react';
import './Scoreboard.css';

export default class Scoreboard extends Component {
  render() {
    let hpWidth = (100 - this.props.health) + '%'
    return (
      <div>
        <ul className="scoreboard">
          <li>XP: <strong>{this.props.points} xp</strong></li>
          <li>Health: <strong>{this.props.health}</strong> 
            <div className="healthbar-container">
            <div className="healthbar" style={{width:hpWidth}}></div>
            </div>
            </li>
          <li>Weapon: <strong>{this.props.weapon}</strong></li>
        </ul>
      </div>
    );
  }
}