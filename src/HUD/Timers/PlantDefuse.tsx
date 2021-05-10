import React from "react";

import { Timer } from "../MatchBar/MatchBar";
import { Player } from "csgogsi";

interface IProps {
  timer: Timer | null;
  side: "right" | "left"
  show: boolean;
}

export default class Bomb extends React.Component<IProps> {
  getCaption = (type: "defusing" | "planting", player: Player | null) => {
    if(!player||this.props.show) return null;
    if(type === "defusing"){
      return <>
        <div className={'CT'}>{player.name} is defusing</div>
      </>;
    }
    return <>
      <div className={'T'}>{player.name} is planting</div>
    </>;
  }
  render() {
    const { side, timer } = this.props;
    return (
      <div className={`defuse_plant_container ${side} ${timer && timer.active ? 'show' :'hide'}`}>
        {
          timer ?
          <div className={`defuse_plant_caption`}>
            {this.getCaption(timer.type, timer.player)}
          </div> : null
        }
          
          <div className="defuse_plant_bar"></div>
      </div>
    );
  }
}
