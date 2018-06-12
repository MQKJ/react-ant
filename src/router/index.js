import Vue from 'vue';
import Router from 'vue-router';
const BuySuccess = () => import('@/components/BuySuccess');
const TravelSecurity = () => import('@/components/TravelSecurity');
const ClientMyOrder = () => import('@/components/ClientMyOrder');
const PurchasePage = () => import('@/components/PurchasePage');
const TruePurchasePage = () => import('@/components/TruePurchasePage');
const Friendrank = () => import('@/components/Friendrank');
const PaySuccess = () => import('@/components/PaySuccess');
const BuyFail = () => import('@/components/BuyFail');
const SingleTreasureBox = () => import('@/components/SingleTreasureBox');
const blank = () => import('@/components/blank');
const TrueTravelSecurity = () => import('@/components/TrueTravelSecurity');
const EVN = require('../../config/evn');

Vue.use(Router);

var bases = '';

if (EVN === 'test') {
  bases = '/blastoise/innercenter/CXBA';
} else if (EVN === 'production') {
  bases = '/innercenter/CXBA';
}

export default new Router({
  mode: 'history',
  base: bases,
  routes: [
    {
      path: '/BuySuccess',
      name: 'BuySuccess',
      meta: {
        title: '出行保'
      },
      component: BuySuccess
    },
    {
      path: '/TravelSecurity',
      name: 'TravelSecurity',
      meta: {
        title: '出行保'
      },
      component: TravelSecurity
    },
    {
      path: '/ClientMyOrder',
      name: 'ClientMyOrder',
      meta: {
        title: '出行保'
      },
      component: ClientMyOrder
    },
    {
      path: '/',
      name: 'PurchasePage',
      meta: {
        title: '出行保'
      },
      component: PurchasePage
    },
    {
      path: '/TruePurchasePage',
      name: 'TruePurchasePage',
      meta: {
        title: '出行保'
      },
      component: TruePurchasePage
    },
    {
      path: '/Friendrank',
      name: 'Friendrank',
      meta: {
        title: '出行保'
      },
      component: Friendrank
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      meta: {
        title: '出行保'
      },
      component: PaySuccess
    },
    {
      path: '/BuyFail',
      name: 'BuyFail',
      meta: {
        title: '出行保'
      },
      component: BuyFail
    },
    {
      path: '/SingleTreasureBox',
      name: 'SingleTreasureBox',
      meta: {
        title: '出行保'
      },
      component: SingleTreasureBox
    },
    {
      path: '/blank',
      name: 'blank',
      meta: {
        title: '出行保'
      },
      component: blank
    },
    {
      path: '/TrueTravelSecurity',
      name: 'TrueTravelSecurity',
      meta: {
        title: '出行保'
      },
      component: TrueTravelSecurity
    }
  ]
});
