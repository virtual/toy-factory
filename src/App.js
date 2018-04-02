import React, { Component } from 'react'; 
import Grid from './board/Grid';
import Header from './header/Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      player: {
        x: 1,
        y: 0
      }
    }
    this.move = this.move.bind(this);
    this.rows = 20;
    this.cols = 25;
  }

  move(x, y) {
    console.log('move',x,y)
    this.setState({
      player: {
        x: x,
        y: y
      }
    })
  }
  componentDidMount() {
    //this.move();
    /* arrow keys are only triggered by onkeydown, not onkeypress

keycodes are:

left = 37
up = 38
right = 39
down = 40
*/
    document.addEventListener('keydown', (event) => {
      console.log(event.keyCode)
      var x = this.state.player.x;
      var y = this.state.player.y;
      switch (event.keyCode) {
        case 37: // left
          x = ((x - 1) > 0) ? x - 1 : 0;
          this.move(x, y);
          break;
        case 39: // right
          x = ((x + 1) !== this.cols) ? x + 1 : x;
          this.move(x, y);
          break;
        case 38: // up
          y = ((y - 1) > 0) ? y - 1 : 0;
          this.move(x, y);
          break;
        case 40: // down
          y = ((y + 1) !== this.rows) ? y + 1 : y;
          this.move(x, y);
          break;

      }
    })
  }
  render() {
    
    let sq;

    return (
      <div className="App">
        <a className="forkme" href="https://github.com/virtual/toy-factory">
          <img src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"/>
          </a>
        <Header/>
        <Grid move={this.move} playerPosition={this.state.player} cols={this.cols} rows={this.rows} />
      </div>
    );
  }
}

export default App;
