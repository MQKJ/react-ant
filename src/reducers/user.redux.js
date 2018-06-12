import axios from 'axios';
import querystring from 'query-string';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo: '',
    isAuth: '',
    msg: '',
    username: '',
    password: '',
    token: '',
    role: '',
    employeeName: '' || '藜麦'
}

export function user(state = initState, action) {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {...state, msg: '', redirectTo:'/', isAuth: true, ...action.data}
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false}
        case LOGOUT:
            return {...initState, redirectTo:'/login'}
        default:
            return state
    }
}

function errorMsg(msg) {
    return {
        type: ERROR_MSG,
        msg: msg
    }
}

export function login({username, password}) {
    if (!username || !password) {
        return errorMsg('用户密码必须输入');
    }

    let params = {};
    params.appId = '1';
    params.username = username;
    params.password = password;
    return dispatch => {
        axios.post('/server1/employeeInfo/login?username=shixx%40vipsdb.com&password=123456&appId=1')
            .then(res => {
                if (res.status === 200) {
                    console.log('登录成功');
                    console.log(res);
                    console.log(res.data);
                    localStorage.setItem('userDate', JSON.stringify(res.data));
                    let redirectTo = '';
                    // if (res.data.role === 'superAdmin') {
                    // 	redirectTo = '/workspace/attendance';
                    // } else {
                    // 	redirectTo = '/mobile/home';
                    // }
                    dispatch(loginSuccess({...res.data, username}));
                } else {
                    console.log('登录失败');
                    dispatch(errorMsg(res.data.msg));
                }
            }, res => {
                console.log('失败了');
            })
    }
}

function loginSuccess(data) {
    console.log('loginsuccess');
    console.log(typeof data);
    console.log(data);
    // let redirectTo = '';
    sessionStorage.setItem('token', data.token);
    // if (data.role === 'superAdmin') {
    // 	redirectTo = '/workspace/attendance';
    // }
    return {type: LOGIN_SUCCESS, data: data}
}

export function logout(){
    return { type:LOGOUT }
}


