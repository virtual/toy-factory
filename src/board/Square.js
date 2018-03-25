import React, { Component } from 'react';
import Panda from '../sprites/Panda';
import Player from '../sprites/Player';

export default class Square extends Component {
  constructor() {
    super();
  }
  render() {
    let html = [];
    if (this.props.panda) {
      html.push(<Panda/>)
    }
    if (this.props.player) {
      html.push(<Player/>)
    }
    return (
      <div className="square">
        {html}
      </div>
    );
  }
}