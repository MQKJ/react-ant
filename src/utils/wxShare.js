import wx from 'weixin-js-sdk';
import axios from 'axios';
// import {base64encode} from './base64.js';
import {api1} from '../api.js';
const queryString = require('querystring');

function shareAction (isHide) {
  if (isHide) {
    wx.ready(function () {
      hiddenShare();
    });
    return;
  }
    var origin = location.origin;
    var title = '80万出行保障等你来抢';
    var pathname = location.pathname.substr(location.pathname.length - 11); // 获取进入页面的路径

    var param = ''; // 转发时带的参数
      // http://10.136.192.33:8081/?activitycode=CXB&sign=aaa&companycode=1&channel=agnt&agentNum=23456789&agentName=%E8%AF%B6%E5%98%BF&openId=opKa3jvrAaa-JavEY9QXZtTSJ5YE&ssid=ofa3VjsPATakFhTceU7v8fX_asr4&userType=agnt

    // var BuyParam = JSON.parse(sessionStorage.getItem('agentParame')); // 来自首页的缓存

    var RedParam = JSON.parse(sessionStorage.getItem('AgentForParam')); // 来自购买成功页的缓存

    var CusParam = JSON.parse(sessionStorage.getItem('CusForParam')); // 来自客户首页的缓存
    var desc = '';
    // var imgUrl = '';
    // console.log(typeof (pathname));
    // console.log(pathname);
    if (pathname === '/BuySuccess') { // 从页面购买成功页进来的
      // {"activityCode":"CXB","companyCode":"1","agentNum":"23456789","ssid":"ofa3VjsPATakFhTceU7v8fX_asr4","totalPolicyNo":"WX00CXB201804261019160940EkDresO","channelType":"agnt"}
      desc = '你被从天而降的礼物砸中啦！赶快参与游戏分抢巨额出行保障吧，更有精美礼品等着你哦~~~';
      param = {
        SSID: RedParam.ssid, // 代理人家园openid,
        AGENTNUM: RedParam.agentNum, // 代理人工号
        COMPANY: RedParam.companyCode, // 公司编码
        TOTALPOLICYNO: RedParam.totalPolicyNo, // 总保单号
        ACTIVITYCODE: RedParam.activityCode, // 活动编码
        CHANNELTYPE: RedParam.channelType // 渠道编码
      };
    } else { // 不是从购买成功页面进来的
      // {"activityCode":"CXB","agentNum":"23456789","companyCode":"1","totalPolicyNo":"WX00CXB201804181017029980xl0m4uD","channelType":"agnt","ssid":"ofa3VjsPATakFhTceU7v8fX_asr4"}
      desc = '我被从天而降的礼物砸中啦！你也快来参与游戏分抢巨额出行保障吧，更有精美礼品等着你哦~~~';
      param = {
        SSID: CusParam.ssid, // 代理人家园openid,
        AGENTNUM: CusParam.agentNum, // 代理人工号
        COMPANY: CusParam.companyCode, // 公司编码
        TOTALPOLICYNO: CusParam.totalPolicyNo, // 总保单号
        ACTIVITYCODE: CusParam.activityCode, // 活动编码
        CHANNELTYPE: CusParam.channelType // 渠道编码
      };
    };
    // console.log(param);
    param = queryString.stringify(param);
    var imgUrl = `${origin}${api1}/innercenter/CXBA/static/img/wxshare.png`;
    var link = `${origin}${api1}/innercenter/cxbOrderForward/validateActivity?${param}`;
    wx.ready(function () {
      wx.hideMenuItems({
          menuList: ['menuItem:openWithSafari', 'menuItem:openWithQQBrowser',
              'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone',
              'menuItem:share:email', 'menuItem:copyUrl'] // 要隐藏的菜单项，所有menu项见附录3
      });
      // share to 朋友圈
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function () {},
        cancel: function () {}
      });
      // share to 朋友
      wx.onMenuShareAppMessage({
        title: title,
        link: link,
        desc: desc,
        imgUrl: imgUrl,
        success: function () {},
        cancel: function () {}
      });
    });
  }
function hiddenShare () {
  wx.hideAllNonBaseMenuItem();
}
export default function getSign (flag, isShare) {
  // console.log(location.href, 'qwwqweqew');
    axios.post(api1 + '/innercenter/wechatsign/signature?url=' + encodeURIComponent(window.location.href.split('#')[0])).then(res => {
      if (res && res.data) {
        var data = res.data;
        wx.config({
          // debug: true,
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['hideAllNonBaseMenuItem', 'previewImage', 'chooseImage', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems']
        });
        if (isShare !== 'noAction') shareAction(flag);
      } else {
        // console.log('微信签名响应数据有误');
      }
    }).catch(res => {
      // console.log('微信签名接口失败');
    });
  };
