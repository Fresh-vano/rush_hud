import React from "react";
import * as I from "csgogsi-socket";
import { Timer } from "./MatchBar";
import TeamLogo from './TeamLogo';

interface IProps {
  team: I.Team;
  orientation: "left" | "right";
  timer: Timer | null;
  showWin: boolean,
  winState:boolean;
}

export default class TeamScore extends React.Component<IProps> {
  render() {
    const { orientation, team } = this.props;
    return (
      <>
        <div className={`team ${orientation} ${team.side}`}>
          <TeamLogo team={team} />
          <div className="team-name">{team.name}</div>
        </div>
      </>
    );
  }
}
