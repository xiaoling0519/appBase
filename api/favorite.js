import request from '@/utils/request'

//获取收藏夹列表
export function getcollectList(data) {
	return request({
		url: '/api/collect/user',
		method: 'get',
		data
	});
}
// 取消收藏
export function delcollect(data) {
	return request({
		url: '/api/collect/del',
		method: 'post',
		data
	});
}
