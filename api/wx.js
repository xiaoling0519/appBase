import request from '@/utils/request'
// #ifdef H5
// 微信分享信息
export function share(data) {
	return request({
		url: '/api/share',
		method: 'get',
		data
	});
}
//微信配置
export function wechatConfig(data) {
	return request({
		url: '/api/wechat/config',
		method: 'get',
		data
	});
}
// 微信code地址
export function wechatAuth(data) {
	return request({
		url: '/api/wechat/auth',
		method: 'get',
		data
	});
}
// #endif
// #ifdef MP-WEIXIN
// 微信code地址
export function wechatMpAuth(data) {
	return request({
		url: '/api/wechat/mp_auth',
		method: 'post',
		data
	});
}
// #endif
