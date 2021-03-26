import request from '@/utils/request'

//	积分列表
export function integrallist(data) {
	return request({
		url: '/api/integral/list',
		method: 'get',
		data
	});
}

