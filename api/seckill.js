import request from '@/utils/request'

// 获取秒杀分类
export function getClass(data) {
	return request({
		url: '/api/seckill/index',
		method: 'get',
		data
	});
}
// 获取秒杀列表
export function getList(data,id) {
	return request({
		url: '/api/seckill/list/'+id,
		method: 'get',
		data
	});
}