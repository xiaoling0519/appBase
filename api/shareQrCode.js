import request from '@/utils/request'

// 修改用户信息
export function spreadBanner(data) {
	return request({
		url: '/api/spread/banner',
		method: 'get',
		data
	});
}