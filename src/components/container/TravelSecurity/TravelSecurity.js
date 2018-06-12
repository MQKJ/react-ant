import React, { Component } from 'react';
import axios from 'axios';
import {Toast} from 'antd-mobile';
import CSSModules from 'react-css-modules';
import styles from './TravelSecurity.css';
import 'antd-mobile/dist/antd-mobile.css';
import redtext from './../../../assets/images/t-packet-redtext.png';
import redclickg from './../../../assets/images/t-packet-redclick.png';
import plane from './../../../assets/images/t-packet-plane.png';
import rank from './../../../assets/images/t-packet-rank.png';
import dian from './../../../assets/images/t-packet-dian.png';
import rule from './../../../assets/images/t-packet-rule.png';
import clause from './../../../assets/images/t-packet-clause.png';
import {Api, p} from  './../../../tool/print.js';
import wxInnerShare from './../../../utils/wxInnerShare.js';

class TravelSecurity extends Component{
    constructor(props) { //构造函数，在创建组件的时候调用一次
        super(props);
        this.state = {
            isShare: false,
            winbx: false,
            Rule: false, // 显示投保规则，false为隐藏状态
            mestrue: false, // vueLoading状态开始不显示，因为设计找转发状态
            loadingContent: '', // loading文字
            redactive: false,
            maskBx: false, // 弹层
            End: false, // 活动结束，true:结束
            Unusual: false // 活动异常, true:异常
        };
    }
    componentWillMount(){ //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
        this.activeState();
        this.GetOneString();
        this.GetTwoString();
        document.title = '出行保'; // title
        wxInnerShare(Api, false);
    }
    componentDidMount() { //在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs。

    }
    componentWillReceiveProps(nextProps) { //props是父组件传递给子组件的。父组件发生render的时候子组件就会调用componentWillReceiveProps（不管props有没有更新，也不管父子组件之间有没有数据交换）。

    }

    GetQueryString (name) { // 获取url参数（函数）
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]); return null;
    }
    TurnChinese (evn) {
        let vars = [];
        let hash;
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); // 截取连接上的参数
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        };
        return decodeURI(vars[evn]); // 将连接上参数为appName的值转换成中文
    }
    activeState () { // 活动状态判断
        let End =  String(this.GetQueryString`activityState`); // 截取链接上参数activityState
        p(End);
        // this.wxInnerShare(api1, false); // 允许转发
        if (End === '2') { // 如果参数为2，则活动一结束
            this.setState({
                maskBx: true, // 展示弹层
                End: true
            })
        } else if (End === '3') { // 如果参数为3，则活动异常p
            this.setState({
                maskBx: true, // 展示弹层
                End: true
            })
        } else {
            this.setState({
                maskBx: false, // 不展示弹层
                End: false,
                Unusual: false
            });
          p('活动进行中');
        }
    }
    GetOneString () { // 获取url参数（函数）
        let CusForParam = { // 客户打开页面获取参数上的
            activityCode: this.GetQueryString`activityCode`, // 活动编码
            agentNum: this.GetQueryString`agentNum`, // 代理人码
            companyCode: this.GetQueryString`comPany`, // 公司码
            totalPolicyNo: this.GetQueryString`totalPolicyNo`, // 总保单号
            channelType: this.GetQueryString`channelType`, // 渠道编码
            ssid: this.GetQueryString`ssid` // 代理人家园openid
        };
        sessionStorage.setItem('CusForParam', JSON.stringify(CusForParam)); // 缓存CusParam
    }
    GetTwoString () { // 获取url参数（函数）
        this.setState({
            mestrue: true, // 展示loading
            loadingContent: '页面加载中,请稍等!'
        });
        let openid = this.GetQueryString`openid`; // openid
        let userInfo = JSON.parse(this.GetQueryString`userInfo`); // 其他信息
        let headImgUrl = userInfo.headImgUrl; // 头像
        let nickName = this.TurnChinese(userInfo.nickName); // 昵称
        p(userInfo.nickName);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); // 缓存userInfo
        sessionStorage.setItem('openid', openid); // 缓存openid
        let CusParam = JSON.parse(sessionStorage.getItem('CusForParam')); // 来自客户首页的缓存
        this.parame1 = { // 客户个人信息保存参数
            openId: openid, // 客户openid
            cusIcon: headImgUrl, // 客户头像
            cusNickName: nickName, // 客户昵称
            activityCode: CusParam.activityCode
        };
        axios.post(Api+ '/innercenter/CXBEntre/saveCustomer', this.parame1).then((response) => { // 客户个人信息保存接口
           p('请求成功！');
            p(response.data);
            let flag = Boolean(response.data.flag);
            if (flag === true) {
                this.setState({
                    mestrue: false // 取消loading
                })
            } else {
                this.setState({
                    mestrue: true, // 展示loading
                    loadingContent: '获取用户信息失败，请重新获取！'
                })
            }
        }).catch((error) => {
            p(error);
            this.setState({
                mestrue: true, // 展示loading
                loadingContent: '网络繁忙，请稍后再试！'
            })
        })
    }
    takered (e) {
        e.preventDefault();
        this.setState({
            mestrue: true, // 展示loading
            loadingContent: '正在拆红包，请稍等！',
            winbx: false,
            redactive: false
        });
        let MyopenId = sessionStorage.getItem('openid');
        let CusParam = JSON.parse(sessionStorage.getItem('CusForParam')); // 来自客户首页的缓存
        this.parame1 = { // 拆红包参数
            totalPolicyNo: CusParam.totalPolicyNo, // 总保单号
            openId: MyopenId,
            activityCode: CusParam.activityCode // 活动编码
        };
        axios.post(Api + '/innercenter/CXBGetOrder/getOrder', this.parame1).then((response) => {
            this.setState({
                mestrue: false // 取消loading
            });
            p('请求成功！');
            p(response.data);
            let mes = response.data.mes;
            p(typeof (mes));
            if (mes === '0') { // 0的话是总保单超过30天过期了
                Toast.info('活动已经结束啦，下次记得来早点哦~~~！');
            } else if (mes === '1') { // 1是已经分抢过这个总保单号
                Toast.info('您已分抢过此保障，可至我的订单页面查看详情');
            } else if (mes === '3') { // 3是这个总保单已经被分抢完了
                Toast.info('哎呀，您来迟了一步，全部出行保障已被抢完，下次请早一点哦~~~');
            } else if (mes === '4') { // 4的话就是连续点击刷接口的情况
                Toast.info('系统繁忙，请稍后再试！');
            } else {
                this.setState({
                    winbx: true,
                    redactive: true
                });
                let RedData = JSON.parse(response.data.data);
                p(RedData); // 打印返回数据
                sessionStorage.setItem('RedData', JSON.stringify(RedData)); // 缓存抢到的保额信息
                // this.gotPiece = RedData.gotPiece; // 分抢额度
            }
        }).catch((error) => {
            this.setState({
                winbx: false,
                redactive: false,
                mestrue: false // 取消loading
            });
            Toast.info('网络繁忙，请稍后再试！');
            p(error);
            p('请求失败！');
        });
    }
    redActive (e) {
        e.preventDefault();
        this.setState({
            mestrue: true, // 展示loading
            loadingContent: '红包激活中，请稍等！'
        });
        let MyopenId = sessionStorage.getItem('openid');
        let RedData = JSON.parse(sessionStorage.getItem('RedData'));
        let CusParam = JSON.parse(sessionStorage.getItem('CusForParam')); // 来自客户首页的缓存
        this.Console(RedData);
        this.parame1 = { // 立即激活参数
            totalPolicyNo: RedData.totalPolicyNo, // 总保单号
            serialno: RedData.serialNo, // 分单流水号
            cOpenId: MyopenId, // 客户openid
            agentNo: RedData.agentNum, // 代理人工号
            activityCode: RedData.activityCode, // 活动编码
            userType: CusParam.channelType // 渠道编码
        };
        axios.post(Api + '/innercenter/orderActivateCheck/checkOrderActivate', this.parame1).then((response) => { // 立即激活接口

            this.setState({
                mestrue: false // 取消loading
            });
            p('请求成功！');
            p(response.data);
            let rspCode = String(response.data.rspCode); // 接口返回状态2001：入参存在问题，rspDesc包含具体问题；//2000：可以激活 // 2003:距离分抢时间超过90天，无法激活; //2002:系统异常
            if (rspCode === '2000') {
                console.log('可以激活');
                // this.Console(CusParam);
                console.log(response.data.info);
                // this.parame2 = {
                //   subtradeno: RedData.serialNo, // 分单流水号
                //   openid: MyopenId, // 客户openid
                //   comPany: CusParam.companyCode, // 公司码
                //   agentNum: CusParam.agentNum, // 代理人工号
                //   activityCode: RedData.activityCode, // 活动编码
                //   totalPolicyNo: RedData.totalPolicyNo // 总保单号
                // };
                // this.Console(this.parame2);
                // window.location.href = this.URL + '/YFQA/page/input.html?' + queryString.stringify(this.parame2);
                // window.location.href = this.URL + '/YFQA/page/input.html' + response.data.info;
            } else if (rspCode === '2001') {
                p('入参存在问题，rspDesc包含具体问题');
                Toast.info('参数有误！');
            } else if (rspCode === '2002') {
                p('系统异常');
                Toast.info('系统异常,请稍后再试！');
            } else if (rspCode === '2003') {
                p('距离分抢时间超过90天，无法激活;');
                Toast.info('已失效,无法激活！');
            } else {
                p('系统异常');
                Toast.info('系统异常,请稍后再试！');
            }
        }).catch((error) => {
            this.mestrue = false; // 取消loading
            p(error);
            p('请求失败！');
            Toast.info('网络繁忙,请稍后再试！');
        });
    }
    friendrank(e) {
        e.preventDefault();
        this.props.history.push('/Friendrank');
    }
    PacRule (e) {
        e.preventDefault();
        this.setState({Rule: true}); // 点击规则,显示投保规则
    }
    Clause (e) {
        e.preventDefault();
        this.setState({Rule: false}); // 点击确定或者X关闭投保规则
    }
    MyOrder(e) {
        e.preventDefault();
        this.props.history.push('/Friendrank');
    }
    ConfirmRc(e) {
        e.preventDefault();
        this.setState({Rule: false}); // 点击确定或者X关闭投保规则
    }
    render(){
        const winbx = this.state.winbx;
        const Rule = this.state.Rule; // 显示投保规则，false为隐藏状态
        const mestrue = this.state.mestrue; // vueLoading状态开始不显示，因为设计找转发状态
        const loadingContent = this.state.loadingContent; // loading文字
        const redactive = this.state.redactive;
        const maskBx = this.state.maskBx; // 弹层
        const End = this.state.End; // 活动结束，true:结束
        const Unusual = this.state.Unusual;// 活动异常, true:异常
        return (
            <div styleName="container1">
                <div styleName="content1">
                    <div styleName="pac-bx">
                        <div styleName="pac-red-bx">
                            {winbx === true ?
                                // 红包内容
                                <div styleName="redwinbx">
                                    <div styleName="red-win" >
                                        <div styleName="red-winbg">
                                            <div styleName="red-wintext">
                                            {/*// 文字描述*/}
                                            <p styleName="text-top">恭喜您</p>
                                            <p styleName="text-cen">抢到<span styleName="text-span">80万</span>出行保障！</p>
                                            <p styleName="text-bot">请在90天内激活，否则保障将失效哦</p>
                                            {/*// <p styleName="text-dres">成功激活保障可额外获得一次精美好礼抽奖机会！</p> -->*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               :
                                //  拆红包
                                <div styleName="">
                                    <div styleName="red-shang">
                                        <div styleName="shangbg">
                                        </div>
                                        <div styleName="shang-text">
                                            <img alt='' src={redtext}/>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/*// 红包遮盖*/}
                            <div styleName="red-top">
                                {/*// <!-- <img src="../assets/images/t-packet-redtop.png"> -->*/}
                            </div>
                        </div>
                    </div>
                    {/*// 以下是红包公共部分，星星和飞机*/}
                    <div styleName="red-float">
                        {/*// <!-- <img src="../assets/images/t-packet-float.png"> -->*/}
                    </div>
                    {redactive === true ?
                        // 激活按钮
                        <div styleName="red-active" onClick={this.redActive.bind(this)}>
                            {/*// <img src={activate}/>*/}
                        </div>
                        :
                        // 拆红包按钮
                        <div styleName="red-click" onClick={this.takered.bind(this)}>
                            <img alt=''src={redclickg}/>
                        </div>
                    }
                    {redactive === true ?
                        <div styleName="red-plane">
                            <img alt=''src={plane}/>
                        </div>
                        :
                        // 动画飞机
                        <div styleName="red-plane1" >
                            <img alt=''src={plane}/>
                        </div>
                    }

                    <div styleName="pac-train">
                        {/*// <img alt=''src={train}/>*/}
                    </div>
                    {/*// 好友排行*/}
                    <div styleName="pac-rank">
                        <img alt=''src={rank}  onClick={this.friendrank.bind(this)}/>
                    </div>
                    <div styleName="pac-rule-bx">
                        <div styleName="rule-bx">
                            <div styleName="rule-cont">
                                <div styleName="rule-top">
                                    <div styleName="rule-line">
                                        <div styleName=""></div>
                                    </div>
                                    <div styleName="rule-title">
                                        <p>活动规则</p>
                                    </div>
                                    <div styleName="rule-line">
                                        <div styleName=""></div>
                                    </div>
                                    <div styleName="clear"></div>
                                </div>
                                <div styleName="rule-content">
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt='' src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>一份保障每人拥有一次分抢机会。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>抢到保障后需要激活，如在90天后未激活，则保障失效。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>分抢多个保障可多次激活，同一保障期间内每人仅可激活一份保障，超出后无法再激活，可等已激活保障过期后再激活。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>成功激活保障后可获得一次抽奖机会，所获奖品将由代理人线下寄出。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                </div>
                            </div>
                            <div styleName="rule-cont">
                                <div styleName="rule-top">
                                    <div styleName="rule-line">
                                        <div styleName=""></div>
                                    </div>
                                    <div styleName="rule-title">
                                        <p>产品说明</p>
                                    </div>
                                    <div styleName="rule-line">
                                        <div styleName=""></div>
                                    </div>
                                    <div styleName="clear"></div>
                                </div>
                                <div styleName="rule-content">
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>产品名称：《泰康出行保保险产品计划》。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>投保年龄：18至60周岁（均含）。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text">
                                            <p>保险期间：7天，且同一保障期间内，每个被保险人限投一次。</p>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                    <div styleName="rule-ctext">
                                        <div styleName="ctext-img">
                                            <img alt=''src={dian}/>
                                        </div>
                                        <div styleName="ctext-text1">
                                            <p styleName="left">保障责任：</p>
                                            <div styleName="baoe">
                                                <p>乘坐飞机意外保额50万</p>
                                                <p>乘坐火车意外保额20万</p>
                                                <p>驾驶私有汽车意外保额10万</p>
                                            </div>
                                            <div styleName="clear"></div>
                                        </div>
                                        <div styleName="clear"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div styleName="clause-bx">
                            <div styleName="pac-clause" onClick={this.PacRule.bind(this)}>
                            <img alt=''src={rule}/>
                        </div>
                        <div styleName="pac-clause" onClick={this.Clause.bind(this)}>
                        <img alt=''src={clause}/>
                    </div>
                    <div styleName="clear"></div>
                </div>
            </div>
        </div>
        <div styleName="pac-order" onClick={this.MyOrder.bind(this)}>
            <p styleName="">我的订单</p>
        </div>
        {maskBx === true?
            // 弹层提示
            <div styleName="maskbx">
                {End === true?
                    // 活动结束
                    <div styleName="mask-textbx" >
                        <p styleName="maskp">活动已结束，<br/>下次记得来早点哦~~~</p>
                    </div>
                    : null
                }
                {Unusual === true?
                    // 活动异常
                    <div styleName="mask-textbx">
                        <p styleName="maskp">网络繁忙，请稍后再试！</p>
                    </div>
                    :
                    null
                }
            </div>
            :null
        }
        {Rule === true?
            // 投保规则
            <div styleName="maskbx1" >
                {/*// 活动结束*/}
                <div styleName="Rule-modal">
                    <div styleName="RuleBx">
                        <div styleName="R-title">
                            <div styleName="RT-left">
                                <p styleName="">投保规则</p>
                            </div>
                            <div styleName="RT-right">
                                <div styleName="RT-close" onClick={this.ConfirmRc.bind(this)}></div>
                            </div>
                            <div styleName="clear"></div>
                        </div>
                        <div styleName="R-con">
                            <div styleName="rule-ctext">
                                <div styleName="cnum">
                                    <p styleName="">1.投保年龄：</p>
                                </div>
                                <div styleName="ctext1">
                                    <p>18至60周岁（均含）</p>
                                </div>
                                <div styleName="clear"></div>
                            </div>
                            <div styleName="rule-ctext">
                                <div styleName="cnum1">
                                    <p styleName="">2.投/被保险人关系：</p>
                                </div>
                                <div styleName="ctext1">
                                    <p>本人</p>
                                </div>
                                <div styleName="clear"></div>
                            </div>
                            <div styleName="rule-ctext">
                                <div styleName="cnum">
                                    <p styleName="">3.保险金额：</p>
                                </div>
                                <div styleName="ctext">
                                    <p styleName="marginbx">乘坐飞机意外保额50万、乘坐火车意外保额20万、驾驶私有汽车意外保额10万</p>
                                </div>
                                <div styleName="clear"></div>
                            </div>
                            <div styleName="rule-ctext">
                                <div styleName="cnum">
                                    <p styleName="">4.保险期间：</p>
                                </div>
                                <div styleName="ctext">
                                    <p styleName="marginbx">7天，且同一保障期间内，每个被保险人限投一次</p>
                                </div>
                                <div styleName="clear"></div>
                            </div>
                            <div styleName="rule-ctext">
                                <div styleName="cnum left">
                                    <p styleName="">5.风险保额：</p>
                                </div>
                                <div styleName="ctext left">
                                    <p>不计入人身险风险保额</p>
                                </div>
                                <div styleName="clear"></div>
                            </div>
                            <div styleName="rule-ctext">
                                <div styleName="cnum left">
                                    <p styleName="">6.职业类别：</p>
                                </div>
                                <div styleName="ctext">
                                    <p>不限</p>
                                </div>
                                <div styleName="clear"></div>
                            </div>
                        </div>
                        <div styleName="R-bot">
                            <div styleName="RC-confirm"onClick={this.ConfirmRc.bind(this)}>
                                <p styleName="">
                                    确认
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            null
        }
        {mestrue === true?
            // loading
            <loading >
                {loadingContent}
            </loading>
            :
            null
        }

    </div>
        )
    }
}

export default CSSModules(TravelSecurity, styles, { allowMultiple:true });
