import React, { Component } from 'react'; 
import Grid from './board/Grid';
import Header from './header/Header';
import Scoreboard from './board/Scoreboard';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      player: {
        x: 2,
        y: 2
      },
      points: 0,
      health: 100,
      weapon: "none",
      darkness: false,
      monsters: [],
      healthPots: [],
      weaponPos: {
        x: 3,
        y: 10
      }
    }
    this.move = this.move.bind(this);
    this.isItemInArray = this.isItemInArray.bind(this);
    this.removeItemInArray = this.removeItemInArray.bind(this);
    this.toggleDarkness = this.toggleDarkness.bind(this);
    this.notWall = this.notWall.bind(this);
    this.updateMonsters = this.updateMonsters.bind(this);
    this.updateHealthPots = this.updateHealthPots.bind(this);
    this.getMonsters = this.getMonsters.bind(this);
    this.getHealthPots = this.getHealthPots.bind(this);
    this.changeHealth = this.changeHealth.bind(this);
    this.removeWeaponPos = this.removeWeaponPos.bind(this);
    this.upgradeWeapon = this.upgradeWeapon.bind(this);
    this.getDmgMod = this.getDmgMod.bind(this);
    this.rows = 25;
    this.cols = 30;

    this.walls = [
      [6, 0],[6, 1],[6, 2],[6, 5],[6, 6],[5, 6],[2, 6],[1, 6],[0, 6],
      [0, 9], [1, 9],[2, 9],[3, 9],[4, 9],[7, 9],[8, 9],[8, 10],
      [8, 11],[8, 14],[8, 15],[8, 16],[8, 17],[7, 17],[19, 17],
      [16, 17],[15, 17],[14, 17],[14, 18],[14, 19],[14, 22],[14, 23],
      [14, 24],[14, 0],[14, 1],[14, 2],[14, 3],[13, 3],[12, 3],[12, 6],[13, 6],
      [14, 6],[17, 6],[18, 6],[19, 6],[20, 17],[21, 17],[22, 17],[23, 17],
      [26, 17],[27, 17],[28, 17],[23, 16],[23, 15],[23, 14],[23, 13],[23, 10],
      [24, 10],[25, 10],[26, 10],[27, 10],[28, 10],[20, 6],[23, 6],[24, 6],
      [25, 6],[26, 6],[27, 6],[28, 6],[15, 9],[15, 10],[15, 11],[15, 12],
      [15, 13],[14, 11],[13, 11],[16, 11],[17, 11],[1,17],[2,17],[3,17],[4,17]
    ];
  }
  toggleDarkness() {
    let dark = (this.state.darkness) ? false : true;
    this.setState({
      darkness: dark
    })
  }
  upgradeWeapon() {
    let upgrade = "paintbrush";
    switch (this.state.weapon) {
      case "none":
      upgrade = "paintbrush";
      break;
      case "paintbrush":
      upgrade = "dagger"
    }
    this.setState({
      weapon: upgrade
    })
  }
  removeWeaponPos() {
    this.setState({
      weaponPos: null 
    });
  }
  getHealthPots() {
    return this.state.healthPots;
  }
  updateHealthPots(arr) {
    this.setState({
      healthPots: arr 
    });
  }
  getMonsters() {
    return this.state.monsters;
  }
  updateMonsters(monsters) {
    this.setState({
      monsters: monsters
    });
  }
  removeItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] === item[0] && array[i][1] === item[1]) {
        array.splice(i, 1);
        console.log(array)
        return array; // Found it
      }
    }
    return array; // Not found
  }
  isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] === item[0] && array[i][1] === item[1]) {
        return true; // Found it
      }
    }
    return false; // Not found
  }
  move(x, y) {
    // console.log('move',x,y)
    this.setState({
      player: {
        x: x,
        y: y
      }
    })
  }
  addExp(exp) {
    this.setState({
      points: this.state.points + exp
    }) 
  }
  changeHealth(value) {
    this.setState({
      health: this.state.health + value
    }) 
  }
  getDmgMod() {
    let dmg = .1;
    switch(this.state.weapon){
      case "none":
      dmg = .1;
      break;
      case "paintbrush":
      dmg = .3;
      break;
    }
    return dmg;
  }
  notWall(x, y) {
    // console.log(this.walls, x,y)
    if (this.isEnemy(x,y)){
      // console.log('enemy!!!!')
      if (Math.random() > this.getDmgMod()) {
        this.changeHealth(-10);
        return false
      } else {
        this.addExp(10);
        this.updateMonsters(this.removeItemInArray(this.getMonsters(), [x,y]));
        return true
      }
    }
    if (this.isHealthPot(x,y)){
      this.changeHealth(10);
        this.updateHealthPots(this.removeItemInArray(this.getHealthPots(), [x,y]));
        return true
      
    }
    if (this.isWeapon(x,y)) {
      this.removeWeaponPos();
      this.upgradeWeapon();
    }
    // console.log('not wall?, ('+x+','+y+') ',!(this.isItemInArray(this.walls, [x,y])))
    return (!(this.isItemInArray(this.walls, [x,y]))); 
  }
  isEnemy(x, y) {
    // console.log('enemy?, ('+x+','+y+') ',!(this.isItemInArray(this.getMonsters(), [x,y])))
    return ((this.isItemInArray(this.state.monsters, [x,y]))); 
  }
  isHealthPot(x, y) {
    // console.log('hp?, ('+x+','+y+') ',!(this.isItemInArray(this.getHealthPots(), [x,y])))
    return ((this.isItemInArray(this.state.healthPots, [x,y]))); 
  }
  isWeapon(x, y) {
    let w = (this.state.weaponPos && x === this.state.weaponPos.x && y === this.state.weaponPos.y) ? true : false;
    if (w) {
      console.log('YARR!')
    }
    // console.log('weapon?, ('+x+','+y+') ',!()
    return w;
    // return ((this.isItemInArray(this.state.healthPots, [x,y]))); 
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
      // console.log(event.keyCode)
      var x = this.state.player.x;
      var y = this.state.player.y;
      switch (event.keyCode) {
        case 37: // left
          x = ((x - 1) >= 0) && (this.notWall(x-1,y)) ? x - 1 : x;
          this.move(x, y);
          break;
        case 39: // right
          x = ((x + 1) !== this.cols) && (this.notWall(x+1,y)) ? x + 1 : x;
          this.move(x, y);
          break;
        case 38: // up
          y = ((y - 1) >= 0) && (this.notWall(x,y-1)) ? y - 1 : y;
          this.move(x, y);
          break;
        case 40: // down
          y = ((y + 1) !== this.rows && (this.notWall(x,y+1))) ? y + 1 : y;
          this.move(x, y);
          break;

      }
    })
  }
  render() {
    
    let sq;

    return (
      <div className="App">
        <button className="toggleDark" onClick={this.toggleDarkness}>Toggle Darkness</button>
        <a className="forkme" href="https://github.com/virtual/toy-factory">
          <img src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"/>
          </a>
        <Header/>
        <Scoreboard health={this.state.health} weapon={this.state.weapon} points={this.state.points}/>
        <Grid 
        weaponPos={this.state.weaponPos} removeWeaponPos={this.state.removeWeaponPos}
        getHealthPots={this.getHealthPots} updateHealthPots={this.updateHealthPots} 
        getMonsters={this.getMonsters} updateMonsters={this.updateMonsters} 
        darkness={this.state.darkness} isItemInArray={this.isItemInArray} 
        walls={this.walls} move={this.move} playerPosition={this.state.player} 
        cols={this.cols} rows={this.rows} />
      </div>
    );
  }
}

export default App;
