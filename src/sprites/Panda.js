import React, { Component } from 'react';
import './sprites.css';

export default class Panda extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      time: 1,
      direction: 'right',
      shapes: [
        {x: 0, y: 0},
        {x: 0, y: 80},
        {x: 0, y: 140},
        {x: 0, y: 204},
        {x: 0, y: 268} 
      ],
      shapesRight: [
        {x: 0, y: 330},
        {x: 0, y: 400},
        {x: 0, y: 470},
        {x: 0, y: 540},
        {x: 0, y: 600},
        {x: 0, y: 670},
        {x: 0, y: 735},
        {x: 0, y: 800}
      ]
    }
    this.walk = this.walk.bind(this);
    this.handleDir = this.handleDir.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
  }
  walk() {
    let shapes = (this.state.direction === 'left') ? this.state.shapes : this.state.shapesRight
    this.setState({ 
      y: shapes[this.state.time % shapes.length].y, 
      time: this.state.time + 1} ) 
  }
  changeDirection() {
    let dir = 'left'
    if (this.state.direction === 'left') {
      dir = 'right'
    }
    console.log(dir)
    this.setState({
      direction: dir
    })
  }
  handleDir() {
    this.changeDirection();
  }
  componentDidMount() {
    setInterval(()=>{ 
      this.walk()
    },100); 
  }
  render() {
   
    
    return (
      <div className="sprite">
        <div style={{
        backgroundPosition: '' + this.state.y +'px ' + this.state.x + 'px'
      }} 
        id="panda"></div>
         
        <button onClick={this.handleDir}>Change dir</button>
      </div>
    );
  }
}