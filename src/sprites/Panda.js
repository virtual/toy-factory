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
      shapes: [ // 2305
        {x: 0, y: 0},
        {x: 0, y: 3.4},
        {x: 0, y: 6.3},
        {x: 0, y: 9.5},
        {x: 0, y: 12.7},
        {x: 0, y: 16},
        {x: 0, y: 19.5},
        {x: 0, y: 23},
        {x: 0, y: 26.3},
        {x: 0, y: 29.3},
        {x: 0, y: 32.3},
        {x: 0, y: 35},
        {x: 0, y: 37.6},
        {x: 0, y: 40.2},
        {x: 0, y: 42.7},
        {x: 0, y: 99.4},
        {x: 0, y: 96.6},
        {x: 0, y: 93.8},
        {x: 0, y: 91}
      ],
      shapesRight: [        
        {x: 0, y: 88},
        {x: 0, y: 85.3},
        {x: 0, y: 82.1},
        {x: 0, y: 79}
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
      <div className="square">
        <div style={{
        backgroundPosition: '' + this.state.y +'% ' + this.state.x + '%'
      }} 
        id="panda"></div>
         
        <button onClick={this.handleDir}>Change dir</button>
      </div>
    </div>
    );
  }
}