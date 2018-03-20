import React, { Component } from 'react';
import Square from '../board/Square';

export default class Grid extends Component {
  render() {
    let html = [];
    
    for (var i = 0; i < this.props.rows; i++) {
      let row = [];
      for (var h = 0; h < 10; h++) {
        let r = Math.random();
        if (r < .96) {
          row.push(<Square/>)
        } else {
          row.push(<Square panda={true}/>)
        }
      }
      html.push(<div className="row">{row}</div>)
    }
    return (
      <div className="board">
        {html}
      </div>
    );
  }
}