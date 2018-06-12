import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button } from 'antd-mobile';
import wxInnerShare from './../../../utils/wxInnerShare.js';
import './PaySuccess.css';
import 'antd-mobile/dist/antd-mobile.css';
import logoImg from './../../../assets/images/t-success-transmit.png';
import {Api, p} from  './../../../tool/print.js';
import CSSModules from 'react-css-modules';
import styles from './PaySuccess.css';

class PaySuccess extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShare: false
        };
    }
    componentWillMount(){ //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
        document.title = '出行保'; // title
        wxInnerShare(Api, false);
        // p('1');
    }
    shareWX (e) {
        e.preventDefault();
        this.setState({isShare: true});
        this.props.history.push('/TravelSecurity?activityCode=CXB&agentNum=01000368&comPany=1&totalPolicyNo=WX00CXB201805141338239531CLn6uah&channelType=agnt&ssid=oA6GYjj8bxjPExBDoVuCvrB9xUfM&openid=opKa3jh1cU4jk71UwAp4ZUiVGcGM&userInfo=%7B%22city%22%3A%22%E5%BB%8A%E5%9D%8A%22,%22country%22%3A%22%E4%B8%AD%E5%9B%BD%22,%22headImgUrl%22%3A%22http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTLwrVme0CHTMwSVbZWGCHPv9N3shld4aGicMsSUvrfibqr3njtj1MS8QsBJRmwUkJEmhiboyznooGRVg%2F132%22,%22nickName%22%3A%22%E8%8F%85%E5%8F%8C%E9%B9%A4%22,%22openId%22%3A%22opKa3jh1cU4jk71UwAp4ZUiVGcGM%22,%22province%22%3A%22%E6%B2%B3%E5%8C%97%22,%22sex%22%3A%221%22,%22unionId%22%3A%22oKS-RtxJfGIqp1tv9kBVIorsI2Xc%22%7D');
        console.log(this.state);
    }
    render(){
        const isShare = this.state.isShare;
        return (
            <div styleName ='container'>
                <div styleName ='content'>
                    <div styleName="suc-bx">
                        <div styleName="suc-prosit" >
                            <div styleName="img-bx"></div>
                        </div>
                        {/*<div styleName="suc-prosit">*/}
                            {/*<div styleName="img-bx2"></div>*/}
                        {/*</div>*/}
                        <div styleName="suc-click">
                            <p styleName="click-p" onClick={this.shareWX.bind(this)}>戳我去分享</p>
                        </div>
                    </div>
                </div>
                {isShare === true ?
                    <div styleName="mask-bx">
                        <div styleName="transmit-bx">
                            <img alt=''src={logoImg}/>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default  CSSModules(PaySuccess, styles);
