import React from "react";
import { Player, WeaponRaw } from "csgogsi-socket";
import Weapon from "./../Weapon/Weapon";
import Avatar from "./Avatar";
import Armor from "./../Indicators/Armor";
import Bomb from "./../Indicators/Bomb";
import Defuse from "./../Indicators/Defuse";

interface IProps {
  players: Player[],
  player: Player,
  isObserved: boolean,
  isFreezetime: boolean,
  top_player:boolean;
}

export default class PlayerBox extends React.Component<IProps> {
  render() {
    const { player } = this.props;
    const { stats } = player;
    const weapons: WeaponRaw[] = Object.values(player.weapons).map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
    const primary = weapons.filter(weapon => !['C4', 'Pistol', 'Knife', 'Grenade', undefined].includes(weapon.type))[0] || null;
    const secondary = weapons.filter(weapon => weapon.type === "Pistol")[0] || null;
    const grenades = weapons.filter(weapon => weapon.type === "Grenade");
    const isLeft = player.team.orientation === "left";
    const top_player = this.props.top_player;
    if(isLeft){
    return (
      <div className={`player ${player.state.health === 0 ? "dead" : ""} ${this.props.isObserved ? 'active' : ''}`}>
        <div className="player_data">
          <Avatar steamid={player.steamid} height={80} width={80} showSkull={false}/>
          <div className={`glow ${"left"} ${top_player ? "TOP" : ""}`}></div>
          <div className={`hp_bar`} style={{ background:`linear-gradient(to left, rgba(0,0,0,0) ${100-player.state.health}%, ${player.team.side==="T" ? `var(--color-new-t)`:`var(--color-new-ct)`} ${100-player.state.health}%` }}></div>
          <div className="player_section_top">
            <div className="health">{player.state.health}</div>
            <div className="username"><div>{player.name}</div>
            </div>
          </div>
          <div className="player_section_center">
            <div className="money">${player.state.money}</div>
            <div className="weapon">{primary || secondary ? <Weapon weapon={primary ? primary.name : secondary.name} active={primary ? primary.state === "active" : secondary.state === "active"} /> : ""}</div>
            <div className="armor"><Armor player={player} /></div>
          </div>
          <div className="player_section_bottom">
            <div className="bomb"><Bomb player={player} /><Defuse player={player} /></div>
            <div className="grenades">
                {grenades.map(grenade => (
                  [
                    <Weapon key={`${grenade.name}-${grenade.state}`} weapon={grenade.name} active={grenade.state === "active"} isGrenade />,
                    grenade.ammo_reserve === 2 ? <Weapon key={`${grenade.name}-${grenade.state}-double`} weapon={grenade.name} active={grenade.state === "active"} isGrenade /> : null,
                  ]
                ))}
            </div>
            <div className="player_round_kills">
              <div className="kill">
                <div className="player_kills_img"></div>
                <div className="player_kills">{stats.kills}</div>
                <div className={`player_kill_background ${player.state.round_kills===0 ? "zero":""}`}>                 
                    <div className="player_kill_now">{player.state.round_kills}</div>
                  </div>
              </div>
              <div className="dead">
                <div className="player_dead_text">{stats.deaths}</div>
                <div className="player_dead"></div>
              </div>
            </div>
          </div>
          <div className="active_border"></div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className={`player ${player.state.health === 0 ? "dead" : ""} ${this.props.isObserved ? 'active' : ''}`}>
          <div className="player_data">
            <Avatar steamid={player.steamid} height={80} width={80} showSkull={false}/>
            <div className={`glow ${"right"} ${top_player ? "TOP" : ""}`}></div>
            <div className={`hp_bar`} style={{ background:`linear-gradient(to right, rgba(0,0,0,0) ${100-player.state.health}%, ${player.team.side==="T" ? `var(--color-new-t)`:`var(--color-new-ct)`} ${100-player.state.health}%` }}></div>
            <div className="player_section_top">
              <div className="health">{player.state.health}</div>
              <div className="username"><div>{player.name}</div>
              </div>
            </div>
            <div className="player_section_center">
              <div className="money">${player.state.money}</div>
              <div className="weapon">{primary || secondary ? <Weapon weapon={primary ? primary.name : secondary.name} active={primary ? primary.state === "active" : secondary.state === "active"} /> : ""}</div>
              <div className="armor"><Armor player={player} /></div>
            </div>
            <div className="player_section_bottom">
              <div className="bomb"><Bomb player={player} /><Defuse player={player} /></div>
              <div className="grenades">
                  {grenades.map(grenade => (
                    [
                      <Weapon key={`${grenade.name}-${grenade.state}`} weapon={grenade.name} active={grenade.state === "active"} isGrenade />,
                      grenade.ammo_reserve === 2 ? <Weapon key={`${grenade.name}-${grenade.state}-double`} weapon={grenade.name} active={grenade.state === "active"} isGrenade /> : null,
                    ]
                  ))}
              </div>
              <div className="player_round_kills">
                <div className="kill">
                  <div className="player_kills_img"></div>
                  <div className="player_kills">{stats.kills}</div>
                  <div className={`player_kill_background ${player.state.round_kills===0 ? "zero":""}`}>                 
                    <div className="player_kill_now">{player.state.round_kills}</div>
                  </div>
                </div>
                <div className="dead">
                  <div className="player_dead"></div>
                  <div className="player_dead_text">{stats.deaths}</div>
                </div>
              </div>
            </div>
            <div className="active_border"></div>
          </div>
         </div>
      );
    }
  }
}
