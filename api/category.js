import request from '@/utils/request'

// 获取商品分类
export function getList(data) {
	return request({
		url: '/api/category',
		method: 'get',
		data
	});
}
