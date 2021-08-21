import React from 'react';
import './playersAlive.scss'
import * as I from "csgogsi-socket";

interface IProps {
    game:I.CSGO
}

export default class PayersAlive extends React.Component<IProps>{
    render(){
        const {game} = this.props;
        const left = game.map.team_ct.orientation === "left" ? game.map.team_ct : game.map.team_t;
        const right = game.map.team_ct.orientation === "left" ? game.map.team_t : game.map.team_ct;
        const leftPlayers = game.players.filter(player => player.team.side === left.side);
        const rightPlayers = game.players.filter(player => player.team.side === right.side);
        return(
            <div className={`players_alive`}>
                <div className="title_container">Players alive</div>
                <div className="counter_container">
                    <div className={`team_counter ${left.side}`}>{leftPlayers.filter(player => player.state.health > 0).length}</div>
                    <div className={`vs_counter`}>VS</div>
                    <div className={`team_counter ${right.side}`}>{rightPlayers.filter(player => player.state.health > 0).length}</div>
                </div>
            </div>
        );
    }
}