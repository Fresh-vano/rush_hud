import React from 'react';
import './trivia.scss';
import isSvg from '../isSvg';


import {configs, actions} from './../../App';

export default class Trivia extends React.Component<any, { image?: string, show: boolean }> {
	constructor(props: any) {
		super(props);
		this.state = {
            show: false
		}
	}

	componentDidMount() {
        configs.onChange((data:any) => {
            if(!data) return;
            const trivia = data.trivia;
            if(!trivia) return;
            if(`trivia_image` in trivia){
                this.setState({image:trivia[`trivia_image`]});
            }});
        actions.on("triviaState", (state: any) => {
            this.setState({show: state === "show"})
        });
        actions.on("toggleTrivia", () => {
            this.setState({show: !this.state.show})
        });
	}
	
	render() {
        const encoding = this.state.image && isSvg(Buffer.from(this.state.image, 'base64')) ? 'svg+xml':'png';
		return (
			<div className={`trivia_container ${this.state.show ? 'show': 'hide'}`}>
                <div className="image_container">
                    {this.state.image ? <img src={`data:image/${encoding};base64,${this.state.image}`}/>:''}
                </div>
            </div>
		);
	}

}
