import request from '@/utils/request'

// 促销商品
export function groom4(data) {
	return request({
		url: '/api/groom/list/4',
		method: 'get',
		data
	});
}
// 精品推荐
export function groom1(data) {
	return request({
		url: '/api/groom/list/1',
		method: 'get',
		data
	});
}
// 新品首发
export function groom3(data) {
	return request({
		url: '/api/groom/list/3',
		method: 'get',
		data
	});
}

// 获取首页信息
export function loadIndexs(data) {
	return request({
		url: '/api/index',
		method: 'get',
		data
	});
}

