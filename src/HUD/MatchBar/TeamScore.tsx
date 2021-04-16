import React from "react";
import * as I from "csgogsi-socket";
import WinIndicator from "./WinIndicator";
import { Timer } from "./MatchBar";
import TeamLogo from './TeamLogo';
import PlantDefuse from "../Timers/PlantDefuse"
import { Match } from "../../api/interfaces";

interface IProps {
  team: I.Team;
  orientation: "left" | "right";
  timer: Timer | null;
  showWin: boolean;
}

export default class TeamScore extends React.Component<IProps> {
  render() {
    const { orientation, timer, team, showWin } = this.props;
    return (
      <>
        <div className={`team ${orientation} ${team.side}`}>
          <TeamLogo team={team} />
          <div className="team-name">{team.name}</div>
          <PlantDefuse timer={timer} side={orientation} />
          <WinIndicator team={team} show={showWin}/>
        </div>
      </>
    );
  }
}
