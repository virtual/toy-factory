import React, { Component } from 'react';
import './sprites.css';

export default class Panda extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      time: 1,
      shapes: [
        {x: 0, y: 0},
        {x: 0, y: 80},
        {x: 0, y: 140},
        {x: 0, y: 204},
        {x: 0, y: 268} 
      ]
    }
    this.walk = this.walk.bind(this);
  }
  walk() {
    this.setState({ 
      y: this.state.shapes[this.state.time % this.state.shapes.length].y, 
      time: this.state.time + 1} ) 
  }

  render() {
    setTimeout(()=>{ 
      this.walk();
    }, 300); 

    return (
      <div>
        <div style={{
        backgroundPosition: '' + this.state.y +'px ' + this.state.x + 'px'
      }} 
        id="panda"></div>
        Walking panda! {this.state.y} {this.state.x}
      </div>
    );
  }
}