import React from "react";
import { C4, Defuse } from "./../../assets/Icons";
import { Timer } from "../MatchBar/MatchBar";
import { Player } from "csgogsi";

interface IProps {
  timer: Timer | null,
  show: boolean;
}

export default class Bomb extends React.Component<IProps> {
  getCaption = (type: "defusing" | "planting", player: Player | null) => {
    if(!player||this.props.show) return null;
    if(type === "defusing"){
      return <>
        <div className={'CT'}>{player.name}</div>
      </>;
    }
    return <>
      <div className={'T'}>{player.name}</div>
    </>;
  }
  render() {
    const { timer, show } = this.props;
    return (
      <>
      <div className={`defuse_plant_container ${timer && timer.active && !show ? 'show' :'hide'} ${timer && timer.type==="defusing" ? 'ct' : ''} ${timer && timer.type==="planting" ? 't' : ''}`}>
        <div className={`defuse_plant_background ${timer && timer.active ? 'show' :'hide'}`}></div>
        <div className={"container"}>
          <div className="defuse_plant_icon">{timer && timer.type==="defusing" ? <Defuse/> : "" }{timer && timer.type==="planting" ? <C4/> : "" }</div>
          {
            timer ?
            <div className={`defuse_plant_caption`}>
              {this.getCaption(timer.type, timer.player)}
            </div> : null
          }
        </div>
        <div className={`defuse_timer`} style={{ width: `${100-((timer && timer.width) || 100)}%`}}></div>
      </div>
      </>
    );
  }
}
