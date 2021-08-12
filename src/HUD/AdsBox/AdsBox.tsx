import React from 'react';
import './adsbox.scss'
import {configs, actions} from './../../App';
import isSvg from '../isSvg';

export default class AdsBox extends React.Component<any, {image?: string, show: boolean}>{
  constructor(props: any) {
		super(props);
		this.state = {
      show: true
		}
	}

  componentDidMount() {
    actions.on("Ads show", (state: any) =>{
      this.setState({show: state === "show"})
    });
    configs.onChange((data:any) => {
      if(!data) return;
      const adsbox = data.trivia;
      if(!adsbox) return;
      if(`button_image` in adsbox){
        this.setState({image:adsbox[`button_image`]})
    }
    });
  }

  render(){
    const { image, show} = this.state;
    const encoding = image && isSvg(Buffer.from(image, 'base64')) ? 'svg+xml':'png';
    return(
      <div className="league_box">
        <div className="image_container">
          {this.state.image ? <img src={`data:image/${encoding};base64,${image}`}/>:''}
        </div>
        <div className={`image ${show ? "show" : "hide"}`}>
          <div className='two'></div>
          <div className='three'></div>
          <div className='four'></div>
          <div className='five'></div>
          <div className='six'></div>
          <div className='seven'></div>
        </div>
      </div>
    );
  }
}