import request from '@/utils/request'

//获取优惠券列表
export function getCouponsList(data,types) {
	//优惠券状态 0全部 1未使用 2已使用
	return request({
		url: '/api/coupons/user/'+types,
		method: 'get',
		data
	});
}

//领取优惠券
export function setCoupons(data) {
	return request({
		url: '/api/coupon/receive',
		method: 'post',
		data
	});
}

//获取可使用优惠券
export function couponsOrder(data,price) {
	return request({
		url: '/api/coupons/order/'+price,
		method: 'get',
		data
	});
}