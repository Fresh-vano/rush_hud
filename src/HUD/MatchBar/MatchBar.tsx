import React from "react";
import * as I from "csgogsi-socket";
import "./matchbar.scss";
import TeamScore from "./TeamScore";
import Bomb from "./../Timers/BombTimer";
import Countdown from "./../Timers/Countdown";
import { GSI } from "../../App";
import { Match } from "../../api/interfaces";
import { Timer } from "../../assets/Icons";
import PlantDefuse from "../Timers/PlantDefuse";

function stringToClock(time: string | number, pad = true) {
  if (typeof time === "string") {
    time = parseFloat(time);
  }
  const countdown = Math.abs(Math.ceil(time));
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown - minutes * 60;
  if (pad && seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

interface IProps {
  match: Match | null;
  map: I.Map;
  phase: I.PhaseRaw,
  bomb: I.Bomb | null,
  isFreezetime: boolean;
}

export interface Timer {
  width: number;
  active: boolean;
  countdown: number;
  side: "left"|"right";
  type: "defusing" | "planting";
  player: I.Player | null;
}

interface IState {
  defusing: Timer,
  planting: Timer,
  winState: {
    side: "left"|"right",
    show: boolean
  }
}

export default class TeamBox extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      defusing: {
        width: 100,
        active: false,
        countdown: 10,
        side: "left",
        type: "defusing",
        player: null
      },
      planting: {
        width: 100,
        active: false,
        countdown: 10, // Fake
        side: "right",
        type: "planting",
        player: null
      },
      winState: {
        side: 'left',
        show: false
      }
    }
  }
  plantStop = () => this.setState(state => {
    state.planting.active = false;
    return state;
  });

  setWidth = (type: 'defusing' | 'planting', width: number) => {
    this.setState(state => {
      state[type].width = width;
      return state;
    })
  }

  initPlantTimer = () => {
    const bomb = new Countdown(time => {
      let width = time * 100;
      this.setWidth("planting", width/3);
    });
    GSI.on("bombPlantStart", player => {
      if(!player || !player.team) return;
      this.setState(state => {
        state.planting.active = true;
        state.planting.side = player.team.orientation;
        state.planting.player = player;
      })
    })
    GSI.on("data", data => {
      if(!data.bomb || !data.bomb.countdown || data.bomb.state !== "planting") return this.plantStop();
      this.setState(state => {
        state.planting.active = true;
      })
      return bomb.go(data.bomb.countdown);
    });
  }

  defuseStop = () => this.setState(state => {
    state.defusing.active = false;
    state.defusing.countdown = 10;
    return state;
  });

  initDefuseTimer = () => {
    const bomb = new Countdown(time => {
      let width = time > this.state.defusing.countdown ? this.state.defusing.countdown*100 : time * 100;
      this.setWidth("defusing", width/this.state.defusing.countdown);
    });
    GSI.on("defuseStart", player => {
      if(!player || !player.team) return;
      this.setState(state => {
        state.defusing.active = true;
        state.defusing.countdown = !Boolean(player.state.defusekit) ? 10 : 5;
        state.defusing.side = player.team.orientation;
        state.defusing.player = player;
        return state;
      })
    })
    GSI.on("data", data => {
      if(!data.bomb || !data.bomb.countdown || data.bomb.state !== "defusing") return this.defuseStop();
      this.setState(state => {
        state.defusing.active = true;
        return state;
      })
      return bomb.go(data.bomb.countdown);
    });
  }

  resetWin = () => {
    setTimeout(() => {
      this.setState(state => {
        state.winState.show = false;
        return state;
      })
    }, 6000);
  }

  componentDidMount(){
    this.initDefuseTimer();
    this.initPlantTimer();
    GSI.on("roundEnd", score => {
      this.setState(state => {
        state.winState.show = true;
        state.winState.side = score.winner.orientation;
        return state;
      }, this.resetWin);
    });
  }
  getRoundLabel = () => {
    const { map } = this.props;
    const round = map.round + 1;
    if (round <= 30) {
      return `Round ${round} / 30`;
    }
    const additionalRounds = round - 30;
    const OT = Math.ceil(additionalRounds/6);
    return `OT ${OT} (${additionalRounds - (OT - 1)*6} / 6)`;
  }


  render() {
    const { defusing, planting, winState } = this.state;
    const { bomb, map, phase, isFreezetime, match } = this.props;
    const time = stringToClock(phase.phase_ends_in);
    const left = map.team_ct.orientation === "left" ? map.team_ct : map.team_t;
    const right = map.team_ct.orientation === "left" ? map.team_t : map.team_ct;
    const isPlanted = bomb && (bomb.state === "defusing" || bomb.state === "planted");
    const bo = (match && Number(match.matchType.substr(-1))) || 0;
    const amountOfMaps = (match && Math.floor(Number(match.matchType.substr(-1)) / 2) + 1) || 0;
    let leftTimer: Timer | null = null, rightTimer: Timer | null = null;
    let time10: number = +time.substring(2);
    if(defusing.active || planting.active){
      if(defusing.active){
        if(defusing.side === "left") leftTimer = defusing;
        else rightTimer = defusing;
      } else {
        if(planting.side === "left") leftTimer = planting;
        else rightTimer = planting;
      }
    }
    return (
      <>
        <div id={`matchbar`}>
          <TeamScore team={left} orientation={"left"} timer={leftTimer} showWin={winState.show && winState.side === "left"} winState={winState.show}/>
          <div className={`score_section_left ${left.side}`}>
            <div className="best_of">
              {new Array(amountOfMaps).fill(0).map((_, i) => (
                <div key={i} className={`block ${left.matches_won_this_series > i ? "win" : ""}`} />
              ))}
            </div>
            <div className={`score left ${left.side}`}>{left.score}</div>
          </div>
          <div className={`timer ${winState.show ? "win" : ""}`}>
            <div className={`WinIndicator ${winState.show ? "show" : ""} ${winState.side === "right" ? `${right.side}` : `${left.side}`}`}>
              <div id="Win">WINS</div>
              <div id="under_line">the round</div>
            </div>
            <div id="series_text">{ bo ? `Best of ${bo}` : '' }</div>
            <div className={`round_timer_text ${isFreezetime && time10<=5 ? 'freezetime':''} ${isPlanted|| winState.show ? "hide":""}`}>{time}</div>
            <div id="round_now">{this.getRoundLabel()}</div>
            <Bomb winState={winState.show}/>
            <PlantDefuse timer={leftTimer ? leftTimer : rightTimer} show={winState.show}/>
          </div>
          <TeamScore team={right} orientation={"right"} timer={rightTimer} showWin={winState.show && winState.side === "right"} winState={winState.show}/>
          <div className={`score_section_right ${right.side}`}>
            <div className="best_of">
            {new Array(amountOfMaps).fill(0).map((_, i) => (
                <div key={i} className={`block ${right.matches_won_this_series > i ? "win" : ""}`} />
              ))}
            </div>
            <div className={`score right ${right.side}`}>{right.score}</div>
          </div>
        </div>
      </>
    );
  }
}
