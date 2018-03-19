import React, { Component } from 'react'; 
import Grid from './board/Grid';
import Header from './header/Header';
import './App.css';

class App extends Component {

  render() {
    let rows = 10;
    let sq;
    return (
      <div className="App">
        <Header/>
        <Grid rows={rows} />
      </div>
    );
  }
}

export default App;
