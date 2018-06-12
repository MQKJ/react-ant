var IsIOS = ''; // ios终端
var IOSLow = '';
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	var str = navigator.userAgent.toLowerCase();
	var ver = str.match(/cpu iphone os (.*?) like mac os/);
	var Edition = ver[1].replace(/_/g, '.');
	// alert(Number(Edition));
	var EditionNum = Edition.substr(0, 2); // 截取版本好的前两位
	// alert(Number(EditionNum));
	// console.log(typeof (Edition));
	if (Number(EditionNum) === 11) { // 判断版本是否为IOS  11版本（包括11.3）
		IsIOS = true; // 是ios系统
		IOS11 = true; // 系统版本为11版本
	} else if (Number(EditionNum) > 0 &&  Number(EditionNum) !== 11) {
		IsIOS = true; // 是ios系统
		IOS11 = false; // 系统版本为小于11版本
	} else {
		IsIOS = false; // 不是是ios系统
		IOS11 = ''; // 版本为空
	}
}
export default {IsIOS, IOS11};
