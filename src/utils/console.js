import EVN from '../../config/evn.js';

let Console = (e) => {
	if (EVN !== 'production') { // 只有测试环境和本地环境展示console.log()
        console.log(e);
    }
};

export default Console;
