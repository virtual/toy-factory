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
      // monsters: [],
      // healthpotions: [],
      // player: [],
      // boardReady: false
    }
    this.html = [];
    
    this.draw = this.draw.bind(this);
    this.redraw = this.redraw.bind(this);
  }
  draw() {
    console.log('draw')
    this.html = [];
    let monsters = [];
    let healthpotions = [];
    
    for (var i = 0; i < this.props.rows; i++) {
      // let row = [];
      for (var h = 0; h < this.props.cols; h++) {
        if (h === 0 || i === 0 || h === this.props.cols - 1 || i === this.props.rows -1) {
          this.props.walls.push([h,i])
        }
        let r = Math.random();
        if (h === this.props.playerPosition.x && i === this.props.playerPosition.y) {
          // console.log([h,i])
          this.props.move(h,i);
          // row.push(<Square player={true}/>)
        } else {
          if ((h != 0 && i != 0 && h != this.props.cols - 1 && i != this.props.rows -1) && r > .97) { 
            if (!(this.props.isItemInArray(this.props.walls, [h, i]))) {
              //console.log('true')
              if (r > .985) {
                monsters.push([h,i]);
              } else {
                healthpotions.push([h, i]);
              }
            }
            // row.push(<Square panda={true}/>)
          }
        }
      }
      // console.log('monsters');
      // console.log(monsters);
      this.props.updateMonsters(monsters);
      this.props.updateHealthPots(healthpotions);
      
    }
    
  }
  
  redraw() {
    // console.log('redraw')
    this.html = [];
    for (var i = 0; i < this.props.rows; i++) {
      let row = [];
      for (var h = 0; h < this.props.cols; h++) {
        let classnames = '';
        let panda = false;
        if (h === this.props.playerPosition.x && i === this.props.playerPosition.y) {
          classnames += 'player'
        } 
        else if ((this.props.weaponPos) && 
          (h === this.props.weaponPos.x && i === this.props.weaponPos.y)) {
          classnames += 'weapon'
        } else {
          if (this.props.isItemInArray(this.props.walls, [h, i])) {
            classnames += 'wall'
          } else 
          if (this.props.isItemInArray(this.props.getHealthPots(), [h, i])) {
            classnames += 'healthpotion'
          } else 
          // if (this.props.isItemInArray(this.weapon, [h, i])) {
          //   classnames += 'weapon'
          // }  else
          if (this.props.isItemInArray(this.props.getMonsters(), [h, i])) {
            panda = true;
          }  
        }
        row.push(<Square darkness={this.props.darkness} playerPosition={this.props.playerPosition} classnames={classnames} x={h} y={i} panda={panda} />)
      }
      this.html.push(<div className="row">{row}</div>)
    } 
  }
  componentDidMount() {
    console.log('mount');
  }
  render() {
    if ((this.props.gameState === 'new')) {
      this.draw();
      this.props.setGameState('play');
      // this.setState({ boardReady: true})
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