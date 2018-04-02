import React, { Component } from 'react';
import Square from '../board/Square';

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      playerPrev: {
        x: null,
        y: null
      },
      monsters: [],
      // player: [],
      boardReady: false
    }
    this.html = [];
    this.cols = 25;
    this.draw = this.draw.bind(this);
    this.redraw = this.redraw.bind(this);
    this.isItemInArray = this.isItemInArray.bind(this);
  }
  draw() {
    console.log('draw')
    this.html = [];
    this.monsters = [];
    for (var i = 0; i < this.props.rows; i++) {
      // let row = [];
      for (var h = 0; h < this.cols; h++) {
        let r = Math.random();
        if (h === this.props.playerPosition.x && i === this.props.playerPosition.y) {
          // console.log([h,i])
          // this.props.move(h,i);
          // row.push(<Square player={true}/>)
        } else {
          if (r > .96) { 
            this.monsters.push([h,i]);
            // row.push(<Square panda={true}/>)
          }
        }
      }
      this.setState({
        monsters: this.monsters 
      })
      
    }
    
  }
  isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] === item[0] && array[i][1] === item[1]) {
        return true; // Found it
      }
    }
    return false; // Not found
  }
  redraw() {
    console.log('redraw')
    this.html = [];
    for (var i = 0; i < this.props.rows; i++) {
      let row = [];
      for (var h = 0; h < this.cols; h++) {
        if (h === this.props.playerPosition.x && i === this.props.playerPosition.y) {
          console.log([h, i])
          row.push(<Square player={true} />)
        } else {
          if (this.isItemInArray(this.monsters, [i, h])) {
            row.push(<Square panda={true} />);
          } else {
            row.push(<Square />)
          }
        }
      }
      this.html.push(<div className="row">{row}</div>)
    } 
  }
  componentDidMount() {
    console.log('mount');
  }
  render() {
    if (!(this.state.boardReady)) {
      this.draw();
      this.setState({ boardReady: true})
    } else {
      this.redraw();
    }
    return (
      <div className="board">
        {this.html}
      </div>
    );
  }
}