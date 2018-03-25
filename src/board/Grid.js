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
      boardReady: false
    }
    this.html = [];
    this.draw = this.draw.bind(this);
    this.redraw = this.redraw.bind(this);
  }
  draw() {
    this.html = [];
    for (var i = 0; i < this.props.rows; i++) {
      let row = [];
      for (var h = 0; h < 10; h++) {
        let r = Math.random();
        if (h === this.props.playerPosition.x && i === this.props.playerPosition.y) {
          console.log(h,i)
          row.push(<Square player={true}/>)
        } else {
          if (r < .96) {
            row.push(<Square/>)
          } else {
            row.push(<Square panda={true}/>)
          }
        }
      }
      this.html.push(<div className="row">{row}</div>)
    }
    
  }
  redraw() {
    console.log('redraw')
    //console.log(this.props.playerPosition.x)
    this.draw();
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