import React from 'react';
import Player from './Player'
import * as I from 'csgogsi-socket';
import './players.scss';

interface Props {
  players: I.Player[],
  team: I.Team,
  side: 'right' | 'left',
  current: I.Player | null,
  isFreezetime: boolean,
  map: I.Map,
}

export default class TeamBox extends React.Component<Props> {
  top_player(id: string):boolean {
    var max_kill_left= 0, index_left='', index_right='',max_kill_right= 0, dead_left=0, dead_right=0;
    this.props.players.forEach(Player => {
      if(Player.team.side==="CT")
        if(Player.stats.kills>max_kill_left){
          max_kill_left=Player.stats.kills;
          dead_left=Player.stats.deaths;
          index_left = Player.steamid;
        }
      if(Player.team.side==="T"){
        if(Player.stats.kills>max_kill_right){
          max_kill_right=Player.stats.kills;
          dead_right=Player.stats.deaths;
          index_right = Player.steamid;
        }
      }
    });{
      if(max_kill_left<max_kill_right)
        if(id===index_left)
          return true;
      else if(max_kill_left===max_kill_right){
        if(dead_left>dead_right)
          if(id===index_right){
            return true;
          }
        else
          if(id===index_left)
            return true;
      }
      else
        if(id===index_right)
          return true;
      return false;
    }
  }
  render() {
    return (
      <div className={`teambox ${this.props.team.side} ${this.props.side}`}>
        {this.props.players.map(player => <Player
          players={this.props.players}
          key={player.steamid}
          player={player}
          isObserved={!!(this.props.current && this.props.current.steamid === player.steamid)}
          isFreezetime={this.props.isFreezetime}
          top_player={this.props.map.round+1>4&&this.top_player(player.steamid)&&this.props.isFreezetime}
        />)}
      </div>
    );
  }
}
