import React from "react";
import * as I from "csgogsi-socket";

interface IProps {
    map: I.Map;
    isFreezetime: boolean;
}

export default class Pause extends React.Component<IProps> {
    render() {
        const { map, isFreezetime } = this.props;
        const round = map.round+1;
        return (
            <div id={`last_round`} className={round === 15 && isFreezetime ? 'show' : ''}>
                Последний раунд первой половины
            </div>
        );
    }
}
