import React from 'react';

interface Props {
    side: 'left' | 'right',
    team: 'CT' | 'T',
    loss: number,
    equipment: number,
    money: number,
    show: boolean,
}

export default class Money extends React.PureComponent<Props> {
	render() {
		return (
			<div className={`moneybox ${this.props.side} ${this.props.team} ${this.props.show ? "show" : "hide"}`}>
                <div className="money_container">
                    <div className="title">Бонус за проигрыш</div>
                    <div className="value">${this.props.loss}</div>
                </div>
                <div className="money_container">
                    <div className="title">Деньги команды</div>
                    <div className="value">${this.props.money}</div>
                </div>
                <div className="money_container">
                    <div className="title">Стоимость снаряжения</div>
                    <div className="value">${this.props.equipment}</div>
                </div>
            </div>
		);
	}
}
