import React, { Component } from 'react';
import Panda from '../sprites/Panda';
import Player from '../sprites/Player';
import Wall from '../sprites/Wall'; 

export default class Square extends Component {
  constructor() {
    super();
     
    this.log = this.log.bind(this);
  }
  log(e) {
    //this.clicks.push([e.target.dataset.x,e.target.dataset.y]);
    console.log([e.target.dataset.x,e.target.dataset.y]);
    //console.log(this.clicks);
  }
  render() {
    let html = [];
    if (this.props.panda) {
      html.push(<Panda/>)
    }
  
    let classes = "square " + this.props.classnames;

    if (this.props.darkness) {
      if (Math.abs(this.props.playerPosition.x - this.props.x) < 3 && 
        Math.abs(this.props.playerPosition.y - this.props.y) < 3) {
        classes += " show";
      } else {
        classes += " hide";
      }
    }

    return (
      <div className={classes} data-x={this.props.x} data-y={this.props.y} onClick={this.log}>
        {html}
      </div>
    );
  }
}