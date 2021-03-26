import request from '@/utils/request'

// 登录
export function login(data) {
	return request({
		url: '/api/login',
		method: 'post',
		data
	});
}
// 注册
export function register(data) {
	return request({
		url: '/api/register',
		method: 'post',
		data
	});
}
// 验证码
export function verify(data) {
	// type=register为注册
	// type=login为登录
	return request({
		url: '/api/register/verify',
		method: 'post',
		data
	});
}

// 获取用户信息
export function getUserInfo(data) {
	return request({
		url: '/api/userinfo',
		method: 'get',
		data
	});
}

// 短信登录
export function loginMobile(data) {
	return request({
		url: '/api/login/mobile',
		method: 'post',
		data
	});
}
// #ifdef APP-PLUS
// 微信授权登录
export function loginWx(data) {
	return request({
		url: '/api/wechat/appauth',
		method: 'get',
		data
	});
}
// #endif

