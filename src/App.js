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
  }

  move(x, y) {
    console.log(x,y)
    this.setState({
      player: {
        x: x,
        y: y
      }
    })
  }
  componentDidMount() {
    //this.move();
    document.addEventListener('keypress', (event) => {
      var key = ("" + event.key).toUpperCase();
      console.log(key);
      switch (key) {
        case "A":
          this.move(3, 5);
          break;
      }
    })
  }
  render() {
    let rows = 10;
    let sq;

    return (
      <div className="App">
        <Header/>
        <Grid playerPosition={this.state.player} rows={rows} />
      </div>
    );
  }
}

export default App;
