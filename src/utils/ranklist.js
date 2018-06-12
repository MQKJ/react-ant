import axios from 'axios';
function OrderList (api1, event1, event2) {
	let parame1 = {
          totalPolicyNo: event1,
          activityCode: event2
          // userType: '3289282'
        };
    // http://titantest.mobile.taikang.com/innercenter/panicBuyingOrder/queryPanicBuyingOrderList?totalPolicyNo=6438734743&activityCode=CXB
    axios.get(api1 + '/innercenter/panicBuyingOrder/queryPanicBuyingOrderList', {params: parame1}).then((response) => {
      console.log('请求成功！');
      console.log(response.data.info);
      let Data = JSON.parse(response.data.info);
      console.log(Data);
      sessionStorage.setItem('Data', JSON.stringify(Data));
    }).catch((error) => {
      console.log(error);
      console.log('请求失败！');
    });
}

export {OrderList};
