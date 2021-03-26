import request from '@/utils/request'

// 获取用户消费记录
export function spreadCommission(data,state) {
	return request({
		url: '/api/spread/commission/'+state,
		method: 'get',
		data
	});
}

// 获取账户余额
export function userBalance(data) {
	return request({
		url: '/api/user/balance',
		method: 'get',
		data
	});
}

// 提现
export function extractCash(data) {
	return request({
		url: '/api/extract/cash',
		method: 'post',
		data
	});
}

// 提现信息
export function extractBank(data) {
	return request({
		url: '/api/extract/bank',
		method: 'get',
		data
	});
}
// #ifdef H5
// 公众号充值
export function rechargeWechat(data) {
	return request({
		url: '/api/recharge/wechat',
		method: 'post',
		data
	});
}
// #endif
// #ifdef MP
// 小程序充值
export function rechargeRoutine(data) {
	return request({
		url: '/api/recharge/routine',
		method: 'post',
		data
	});
}
// #endif
// 获取提现支付宝账号
export function aliInfo(data) {
	return request({
		url: '/api/ali/info',
		method: 'get',
		data
	});
}
//获取默认银行卡账号
export function bankInfo(data) {
	return request({
		url: '/api/bank/info',
		method: 'get',
		data
	});
}
// 保存提现支付宝账号
export function setAliInfo(data) {
	return request({
		url: '/api/ali/edit',
		method: 'post',
		data
	});
}
//保存默认银行卡账号
export function setBankInfo(data) {
	return request({
		url: '/api/bank/edit',
		method: 'post',
		data
	});
}




