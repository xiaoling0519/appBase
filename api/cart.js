import request from '@/utils/request'

export function getCartList(data) {
	return request({
		url: '/api/cart/list',
		method: 'get',
		data
	});
}

// 修改购物车数量
export function getCartNum(data) {
	return request({
		url: '/api/cart/num',
		method: 'post',
		data
	});
}
//删除购物车
export function cartDel(data) {
	return request({
		url: '/api/cart/del',
		method: 'post',
		data
	});
}
