import request from '@/utils/request'

// 修改用户信息
export function userEdit(data) {
	return request({
		url: '/api/user/edit',
		method: 'post',
		data
	});
}

//退出登录
export function logout(data) {
	return request({
		url: '/api/logout',
		method: 'get',
		data
	});
}
//修改密码
export function registerReset(data) {
	return request({
		url: '/api/register/reset',
		method: 'post',
		data
	});
}

//绑定手机
export function binding(data) {
	return request({
		url: '/api/binding',
		method: 'post',
		data
	});
}
// #ifdef APP-PLUS
//苹果生成账户
export function applelogin(data) {
	return request({
		url: '/api/applelogin',
		method: 'post',
		data
	});
}
// #endif