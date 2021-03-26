import request from '@/utils/request'

// 订单确认
export function confirm(data) {
	return request({
		url: '/api/order/confirm',
		method: 'post',
		data
	});
}

// 订单列表
export function orderList(data) {
	return request({
		url: '/api/order/list',
		method: 'get',
		data
	});
}
// 订单详细
export function orderDetail(data,orderid) {
	return request({
		url: '/api/order/detail/'+orderid,
		method: 'get',
		data
	});
}

// 取消订单
export function orderCancel(data) {
	return request({
		url: '/api/order/cancel',
		method: 'post',
		data
	});
}

// 删除订单
export function orderDel(data) {
	return request({
		url: '/api/order/del',
		method: 'get',
		data
	});
}
// 申请退款
export function refund(data) {
	return request({
		url: '/api/order/refund/verify',
		method: 'post',
		data
	});
}
// 退款理由列表
export function refundReason(data) {
	return request({
		url: '/api/order/refund/reason',
		method: 'get',
		data
	});
}

// 确认收货
export function orderTake(data) {
	return request({
		url: '/api/order/take',
		method: 'post',
		data
	});
}