import React from "react";
import TeamBox from "./../Players/TeamBox";
import MatchBar from "../MatchBar/MatchBar";
import SeriesBox from "../MatchBar/SeriesBox";
import Observed from "./../Players/Observed";
import { CSGO, Team } from "csgogsi-socket";
import { Match } from "../../api/interfaces";
import RadarMaps from "./../Radar/RadarMaps";
import Trivia from "../Trivia/Trivia";
import SideBox from '../SideBoxes/SideBox';
import { GSI, actions } from "./../../App";
import MoneyBox from '../SideBoxes/Money';
import UtilityLevel from '../SideBoxes/UtilityLevel';
import Killfeed from "../Killfeed/Killfeed";
import MapSeries from "../MapSeries/MapSeries";
import Overview from "../Overview/Overview";
import Tournament from "../Tournament/Tournament";
import Pause from "../PauseTimeout/Pause";
import Timeout from "../PauseTimeout/Timeout";
import LastRound from "../PauseTimeout/LastRound"


interface Props {
  game: CSGO,
  match: Match | null
}

interface State {
  winner: Team | null,
  showWin: boolean,
  forceHide: boolean
}

export default class Layout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      winner: null,
      showWin: false,
      forceHide: false
    }
  }

  componentDidMount() {
    GSI.on('roundEnd', score => {
      this.setState({ winner: score.winner, showWin: true }, () => {
        setTimeout(() => {
          this.setState({ showWin: false })
        }, 4000)
      });
    });
    actions.on("boxesState", (state: string) => {
      if (state === "show") {
        this.setState({ forceHide: false });
      } else if (state === "hide") {
        this.setState({ forceHide: true });
      }
    });
  }

  getVeto = () => {
    const { game, match } = this.props;
    const { map } = game;
    if (!match) return null;
    const mapName = map.name.substring(map.name.lastIndexOf('/') + 1);
    const veto = match.vetos.find(veto => veto.mapName === mapName);
    if (!veto) return null;
    return veto;
  }

  top_player():string {
    const { game } = this.props;
    const isFreezetime = (game.round && game.round.phase === "freezetime") || game.phase_countdowns.phase === "freezetime";
    if(game.map.round+1<5||!isFreezetime)
      return '';
    const left = game.map.team_ct.orientation === "left" ? game.map.team_ct : game.map.team_t;
    const right = game.map.team_ct.orientation === "left" ? game.map.team_t : game.map.team_ct;
    var max_kill_left= 0, index_left='', index_right='',max_kill_right= 0, dead_left=0, dead_right=0;
    const leftPlayers = game.players.filter(player => player.team.side === left.side);
    const rightPlayers = game.players.filter(player => player.team.side === right.side);
    leftPlayers.forEach(player => {
      if(player.stats.kills>max_kill_left){
        max_kill_left=player.stats.kills;
        dead_left=player.stats.deaths;
        index_left = player.steamid;
      }
      else if(player.stats.deaths<=dead_left){
        max_kill_left=player.stats.kills;
        dead_left=player.stats.deaths;
        index_left = player.steamid;
      }
    });
    rightPlayers.forEach(player => {
      if(player.stats.kills>max_kill_right){
        max_kill_right=player.stats.kills;
        dead_right=player.stats.deaths;
        index_right = player.steamid;
      }
      else if(player.stats.deaths<=dead_right){
        max_kill_right=player.stats.kills;
        dead_right=player.stats.deaths;
        index_right = player.steamid;
      }
    });
    if(max_kill_left>max_kill_right)
      return  index_left;
    else 
      if(max_kill_left===max_kill_right)
        if(dead_left<dead_right)
          return index_left;
        else
          return index_right;
      else
        return index_right;
  }

  render() {
    const { game, match } = this.props;
    const left = game.map.team_ct.orientation === "left" ? game.map.team_ct : game.map.team_t;
    const right = game.map.team_ct.orientation === "left" ? game.map.team_t : game.map.team_ct;
    const leftPlayers = game.players.filter(player => player.team.side === left.side);
    const rightPlayers = game.players.filter(player => player.team.side === right.side);
    const isFreezetime = (game.round && game.round.phase === "freezetime") || game.phase_countdowns.phase === "freezetime";
    const { forceHide } = this.state;

    return (
      <div className="layout">
        <div className="league_box">
        <div className="league_box_img"></div>
          <div className="league_box_img_1"></div>
          <div className="league_box_img_2"></div>
          <div className="league_box_img_3"></div>
        </div>
        <div className={`players_alive`}>
          <div className="title_container">Players alive</div>
          <div className="counter_container">
            <div className={`team_counter ${left.side}`}>{leftPlayers.filter(player => player.state.health > 0).length}</div>
            <div className={`vs_counter`}>VS</div>
            <div className={`team_counter ${right.side}`}>{rightPlayers.filter(player => player.state.health > 0).length}</div>
          </div>
        </div>
        <Killfeed />
        <Overview match={match} map={game.map} players={game.players || []} />
        <RadarMaps match={match} map={game.map} game={game} />
        <MatchBar map={game.map} phase={game.phase_countdowns} bomb={game.bomb} match={match} isFreezetime={isFreezetime} />
        <Pause  phase={game.phase_countdowns}/>
        <Timeout map={game.map} phase={game.phase_countdowns} />
        <LastRound map={game.map} isFreezetime={isFreezetime}/>
        <SeriesBox map={game.map} phase={game.phase_countdowns} match={match} />

        <Tournament />

        <Observed player={game.player} veto={this.getVeto()} round={game.map.round+1}/>

        <TeamBox team={left} players={leftPlayers} side="left" current={game.player} isFreezetime={isFreezetime} map={game.map} top={this.top_player()}/>
        <TeamBox team={right} players={rightPlayers} side="right" current={game.player} isFreezetime={isFreezetime} map={game.map} top={this.top_player()}/>

        <Trivia />



        <MapSeries teams={[left, right]} match={match} isFreezetime={isFreezetime} map={game.map} />
        <div className={"boxes left"}>
          <SideBox side="left" hide={forceHide} />
          <UtilityLevel side={left.side} players={game.players} show={isFreezetime && !forceHide} />         
          <MoneyBox
            team={left.side}
            side="left"
            loss={Math.min(left.consecutive_round_losses * 500 + 1400, 3400)}
            equipment={leftPlayers.map(player => player.state.equip_value).reduce((pre, now) => pre + now, 0)}
            money={leftPlayers.map(player => player.state.money).reduce((pre, now) => pre + now, 0)}
            show={isFreezetime && !forceHide}
          />
        </div>
        <div className={"boxes right"}>
          <SideBox side="right" hide={forceHide} />
          <UtilityLevel side={right.side} players={game.players} show={isFreezetime && !forceHide} /> 
          <MoneyBox
            team={right.side}
            side="right"
            loss={Math.min(right.consecutive_round_losses * 500 + 1400, 3400)}
            equipment={rightPlayers.map(player => player.state.equip_value).reduce((pre, now) => pre + now, 0)}
            money={rightPlayers.map(player => player.state.money).reduce((pre, now) => pre + now, 0)}
            show={isFreezetime && !forceHide}
          />
        </div>
      </div>
    );
  }
}
