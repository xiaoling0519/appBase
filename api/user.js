import request from '@/utils/request'

// 订单统计信息
export function orderData(data) {
	return request({
		url: '/api/order/data',
		method: 'get',
		data
	});
}

// 获取用户信息
export function userinfo(data) {
	return request({
		url: '/api/userinfo',
		method: 'get',
		data
	});
}