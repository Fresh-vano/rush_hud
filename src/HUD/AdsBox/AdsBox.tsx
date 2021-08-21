import React from 'react';
import './adsbox.scss'
import {configs, actions} from './../../App';
import isSvg from '../isSvg';

export default class AdsBox extends React.Component<any, {image1?: string, image2?: string, image3?: string, image4?: string, image5?: string, image6?: string, show: boolean, quantity: number}>{
  constructor(props: any) {
		super(props);
		this.state = {
      show: true,
      quantity:1
		}
	}

  componentDidMount() {
    actions.on("Ads show", (state: any) =>{
      this.setState({show: state === "show"})
    });
    configs.onChange((data:any) => {
      if(!data) return;
      const adsbox = data.ads_panel;
      if(!adsbox) return;
      if(`quantity_ads` in adsbox){
        this.setState({quantity:adsbox[`quantity_ads`]})
      }
      if(`ads_1` in adsbox){
        this.setState({image1:adsbox[`ads_1`]})
      }
      if(`ads_2` in adsbox){
        this.setState({image2:adsbox[`ads_2`]})
      }
      if(`ads_3` in adsbox){
        this.setState({image3:adsbox[`ads_3`]})
      }
      if(`ads_4` in adsbox){
        this.setState({image4:adsbox[`ads_4`]})
      }
      if(`ads_5` in adsbox){
        this.setState({image5:adsbox[`ads_5`]})
      }
      if(`ads_6` in adsbox){
        this.setState({image6:adsbox[`ads_6`]})
      }
    });
  }

  render(){
    const { image1, image2, image3, image4, image5, image6, show, quantity} = this.state;
    const encoding1 = image1 && isSvg(Buffer.from(image1, 'base64')) ? 'svg+xml':'png';
    const encoding2 = image2 && isSvg(Buffer.from(image2, 'base64')) ? 'svg+xml':'png';
    const encoding3 = image3 && isSvg(Buffer.from(image3, 'base64')) ? 'svg+xml':'png';
    const encoding4 = image4 && isSvg(Buffer.from(image4, 'base64')) ? 'svg+xml':'png';
    const encoding5 = image5 && isSvg(Buffer.from(image5, 'base64')) ? 'svg+xml':'png';
    const encoding6 = image6 && isSvg(Buffer.from(image6, 'base64')) ? 'svg+xml':'png';
    return(
      <div className={`league_box ${`_${quantity}`} ${show ? "show" : "hide"}`}>
        <div className={`image`}>
          <div className='ads_one'>
            {image1 ? <img src={`data:image/${encoding1};base64,${image1}`}/>:''}
          </div>
          <div className='ads_two'>
            {image2 ? <img src={`data:image/${encoding2};base64,${image2}`}/>:''}
          </div>
          <div className='ads_three'>
            {image3 ? <img src={`data:image/${encoding3};base64,${image3}`}/>:''}
          </div>
          <div className='ads_four'>
            {image4 ? <img src={`data:image/${encoding4};base64,${image4}`}/>:''}
          </div>
          <div className='ads_five'>
            {image5 ? <img src={`data:image/${encoding5};base64,${image5}`}/>:''}
          </div>
          <div className='ads_six'>
            {image6 ? <img src={`data:image/${encoding6};base64,${image6}`}/>:''}
          </div>
        </div>
      </div>
    );
  }
}