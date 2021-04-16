import React from "react";
import { Player } from "csgogsi-socket";
import Weapon from "./../Weapon/Weapon";
import Avatar from "./Avatar";
import TeamLogo from "./../MatchBar/TeamLogo";
import "./observed.scss";
import { apiUrl } from './../../api/api';
import { getCountry } from "./../countries";
import { ArmorHelmet, ArmorFull, HealthFull, Bullets } from './../../assets/Icons';
import { Veto } from "../../api/interfaces";

class Statistic extends React.PureComponent<{ label: string; value: string | number, }> {
	render() {
		return (
			<div className="stat">
				<div className="label">{this.props.label}</div>
				<div className="value">{this.props.value}</div>
			</div>
		);
	}
}

export default class Observed extends React.Component<{ player: Player | null, veto: Veto | null, round: number }> {
	getAdr = () => {
		const { veto, player } = this.props;
		if (!player || !veto || !veto.rounds) return null;
		const damageInRounds = veto.rounds.map(round => round.players[player.steamid]).filter(data => !!data).map(roundData => roundData.damage);
		return damageInRounds.reduce((a, b) => a + b, 0) / (this.props.round - 1);
	}
	render() {
		if (!this.props.player) return '';
		const { player } = this.props;
		const country = player.country || player.team.country;
		const weapons = Object.values(player.weapons).map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
		const currentWeapon = weapons.filter(weapon => weapon.state === "active")[0];
		const grenades = weapons.filter(weapon => weapon.type === "Grenade");
		const { stats } = player;
		const ratio = stats.deaths === 0 ? stats.kills : stats.kills / stats.deaths;

		return (
			<div className={`observed ${player.team.side}`}>
				<Avatar steamid={player.steamid} height={100} width={100} showCam={true} slot={player.observer_slot}/>
				<div className="obs_lane1 ">
					<div className="line1_left">
							<div className="obs_alias">
								<div className="obs_alias_text">{player.name}</div>
							</div>
					</div>
					<div className="line1_right">
						<div className="obs_health_section">
							<div className="obs_health_img"><HealthFull /></div>
							<div className="obs_health_text">{player.state.health}</div>
						</div>
						<div className="obs_armor_section">
							<div className="obs_armor_img">{player.state.helmet ? <ArmorHelmet /> : <ArmorFull />}</div>
							<div className="obs_armor_text">{player.state.armor}</div>
						</div>
					</div>
				</div>
				<div className="obs_lane2">
					<div className="lane2_left">
						<div className="kill"></div>
						<div className="value">{stats.kills}</div>
						<div className="death"></div>
						<div className="value">{stats.deaths}</div>
						<div className="assist"></div>
						<div className="value">{stats.assists}</div>
					</div>
				</div>
				<div className="obs_lane3">
					<div className="lane3_left">
						<div className="obs_bullets_section"><Bullets /></div>
						<div className="obs_ammo_section">
							<div className="obs_clip">{(currentWeapon && currentWeapon.ammo_clip) || "-"}</div>
							<div className="obs_reserve">/{(currentWeapon && currentWeapon.ammo_reserve) || "-"}</div>
						</div>
					</div>
					<div className="lane3_right">
						<div className="grenade_container">
						{grenades.map(grenade => <React.Fragment key={`${player.steamid}_${grenade.name}_${grenade.ammo_reserve || 1}`}>
							<Weapon weapon={grenade.name} active={grenade.state === "active"} isGrenade />
							{ 
							grenade.ammo_reserve === 2 ? <Weapon weapon={grenade.name} active={grenade.state === "active"} isGrenade /> : null }
						</React.Fragment>)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
