import request from '@/utils/request'

// 获取拼团列表
export function getCombinationList(data) {
	return request({
		url: '/api/combination/list',
		method: 'get',
		data
	});
}

//取消拼团
export function getCombinationLisRemove(data,id) {
	return request({
		url: '/api/combination/remove'+id,
		method: 'get',
		data
	});
}

//拼团开团页面数据
export function getCombinationLisPink(data,id) {
	return request({
		url: '/api/combination/pink/'+id,
		method: 'get',
		data
	});
}

// 获取拼团海报
export function getCombinationPoster(data) {
	return request({
		url: '/api/combination/poster',
		method: 'post',
		data
	});
}