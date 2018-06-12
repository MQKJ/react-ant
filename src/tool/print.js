
let EVN = 'test'; // 环境变量
// let EVN = 'local';
// let EVN = 'prod';
let p; // console.log
let Api;
if (EVN === 'test' || EVN === 'local') { // 测试、本地环境下
    Api = 'api1';
    p = (data) => {console.log(data)};
} if (EVN === 'prod') { // 生产环境下
    Api = 'api2';
    p = () => {};
}

export {Api, p}