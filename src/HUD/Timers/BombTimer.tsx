import React from "react";
import { GSI } from "./../../App";
import BombTimer from "./Countdown";
import { C4 } from "./../../assets/Icons";

interface IProps {
  winState:boolean;
  phase?:string;
}

export default class Bomb extends React.Component<IProps, any, { width: number; show: boolean; times:number}> {
  constructor(props: any) {
    super(props);
    this.state = {
      width: 100,
      show: false,
    };
  }
  
  hide = () => {
    this.setState({ show: false, width: 100 });
  };
  componentDidMount() {
    const bomb = new BombTimer(time => {
      let width = time > 40 ? 4000 : time * 100;
      this.setState({ width: width / 40 });
      this.setState({times: time});
    });
    bomb.onReset(this.hide);
    GSI.on("data", data => {
      if (data.bomb && data.bomb.countdown) {
        if (data.bomb.state === "planted") {
          this.setState({ show: true });
          return bomb.go(data.bomb.countdown);
        }
        if (data.bomb.state !== "defusing") {
          this.hide();
        }
      } else {
        this.hide();
      }
    });
  }

  render() {
    const { times } = this.state;
    let bomb_time
    if(times !== undefined)
      bomb_time = times>10 ? String(times).substring(0,2) : String(times).substring(0,3);
    console.log(this.state.show)
    return (
      <div id={`bomb_container`}>
        <div className={`bomb_timer ${this.state.show && !this.props.winState && bomb_time !== "-0." ? "show" : "hide"}`} style={{ width: `${100 - this.state.width}%` }}></div>
        <div className="container">
          <div className={`bomb_icon ${this.state.show && bomb_time !== "-0." ? "show" : "hide"} ${(this.state.width<=24 && this.state.width>10) && this.state.show? "slow":""} ${this.state.width<10 && this.state.show? "fast":""}`}>
            <C4 fill="#ffffff"/>
          </div>
          <div className="bomb_text">{this.state.show && bomb_time!=="-0."? bomb_time : null}</div>
        </div>
      </div>
    );
  }
}
