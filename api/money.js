import request from '@/utils/request'


// 统计金额
export function computedOrderkey(data) {
	return request({
		url: '/api/order/computed/'+data.orderkey,
		method: 'post',
		data
	});
}

// 创建订单
export function createOrderkey(data,key) {
	return request({
		url: '/api/order/create/'+key,
		method: 'post',
		data
	});
}
// 账户余额
export function balance(data) {
	return request({
		url: '/api/user/balance',
		method: 'get',
		data
	});
}

// 订单支付
export function orderPay(data) {
	return request({
		url: '/api/order/pay',
		method: 'post',
		data
	});
}

