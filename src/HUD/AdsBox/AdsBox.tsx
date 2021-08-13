import React from 'react';
import './adsbox.scss'
import {configs, actions} from './../../App';
import isSvg from '../isSvg';

export default class AdsBox extends React.Component<any, {image: Array<string>, show: boolean, quantity?:number}>{
  constructor(props: any) {
		super(props);
		this.state = {
      show: true,
      image:["","","","","",""]
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
      switch (this.state.quantity){
        case 1:{
          if(`ads_1` in adsbox){
            this.setState({image:adsbox[`ads_1`][0]})
          }
          break;
        }
        case 2:{
          if(`ads_1` in adsbox){
          this.setState({image:adsbox[`ads_1`][0]})
          }
          if(`ads_2` in adsbox){
            this.setState({image:adsbox[`ads_2`][1]})
            }
          break;
        }
        case 3:{
          if(`ads_1` in adsbox){
          this.setState({image:adsbox[`ads_1`]})
          }
          if(`ads_2` in adsbox){
            this.setState({image:adsbox[`ads_2`]})
          }
          if(`ads_3` in adsbox){
            this.setState({image:adsbox[`ads_3`]})
          }
          break;
        }
        case 4:{
          if(`ads_1` in adsbox){
          this.setState({image:adsbox[`ads_1`]})
          }
          if(`ads_2` in adsbox){
            this.setState({image:adsbox[`ads_2`]})
          }
          if(`ads_3` in adsbox){
            this.setState({image:adsbox[`ads_3`]})
          }
          if(`ads_4` in adsbox){
            this.setState({image:adsbox[`ads_4`]})
          }
          break;
        }
        case 5:{
          if(`ads_1` in adsbox){
          this.setState({image:adsbox[`ads_1`]})
          }
          if(`ads_2` in adsbox){
            this.setState({image:adsbox[`ads_2`]})
          }
          if(`ads_3` in adsbox){
            this.setState({image:adsbox[`ads_3`]})
          }
          if(`ads_4` in adsbox){
            this.setState({image:adsbox[`ads_4`]})
          }
          if(`ads_5` in adsbox){
            this.setState({image:adsbox[`ads_5`]})
          }
          break;
        }
        case 6:{
          if(`ads_1` in adsbox){
          this.setState({image:adsbox[`ads_1`]})
          }
          if(`ads_2` in adsbox){
            this.setState({image:adsbox[`ads_2`]})
          }
          if(`ads_3` in adsbox){
            this.setState({image:adsbox[`ads_3`]})
          }
          if(`ads_4` in adsbox){
            this.setState({image:adsbox[`ads_4`]})
          }
          if(`ads_5` in adsbox){
            this.setState({image:adsbox[`ads_5`]})
          }
          if(`ads_6` in adsbox){
            this.setState({image:adsbox[`ads_6`]})
          }
          break;
        }
      }
      console.log(this.state.image[adsbox[`ads_1`]])
    });
  }

  render(){
    const { image, show, quantity} = this.state;
    const encoding = image && isSvg(Buffer.from(image[0], 'base64')) ? 'svg+xml':'png';
    return(
      <div className={`league_box ${quantity}`}>
        <div className="image_container">
          {image ? <img src={`data:image/${encoding};base64,${image}`}/>:''}
        </div>
        <div className={`image ${show ? "show" : "hide"}`}>
          <div className='ads_one'>
            {image ? <img src={`data:image/${encoding};base64,${image}`}/>:''}
          </div>
          <div className='ads_two'></div>
          <div className='ads_three'></div>
          <div className='ads_four'></div>
          <div className='ads_five'></div>
          <div className='ads_six'></div>
        </div>
      </div>
    );
  }
}