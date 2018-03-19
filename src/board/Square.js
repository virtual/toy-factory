import React, { Component } from 'react';
import Panda from '../sprites/Panda';

export default class Square extends Component {
  constructor() {
    super();
  }
  render() {
    let html = [];
    if (this.props.panda) {
      html.push(<Panda/>)
    }
    return (
      <div class="square">
        {html}
      </div>
    );
  }
}