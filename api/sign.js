import request from '@/utils/request'

// 获取签到列表
export function signList(data) {
	return request({
		url: '/api/sign/list',
		method: 'get',
		data
	});
}
// 点击签到
export function integral(data) {
	return request({
		url: '/api/sign/integral',
		method: 'post',
		data
	});
}

// 签到信息
export function signUser(data) {
	return request({
		url: '/api/sign/user',
		method: 'post',
		data
	});
}