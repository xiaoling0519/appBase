let state = {
	userInfo: {}, //用户信息
	orderInfo: {
		complete_count: 0, //完成
		received_count: 0, //待收货
		unshipped_count: 0, //待发货
		order_count: 0, //订单总数
		unpaid_count: 0 //待付款
	}, //订单信息
	hasLogin: false, //是否登录
}

let mutations = {
	// 登录
	login(state) {
		state.hasLogin = true;
	},
	// 退出登录
	logout(state, provider) {
		state.hasLogin = false;
		// 清空基础信息
		state.userInfo = {};
		state.orderInfo = {
			complete_count: 0, //完成
			received_count: 0, //待收货
			unshipped_count: 0, //待发货
			order_count: 0, //订单总数
			unpaid_count: 0 //待付款
		};
		// 清除缓存用户信息
		uni.removeStorage({
			key: 'userInfo'
		})
		// 清除缓存token
		uni.removeStorage({
			key: 'token'
		})
	},
	// 保存用户信息
	setUserInfo(state, provider) {
		state.userInfo = provider;
		uni.setStorage({ //缓存用户登陆状态
			key: 'userInfo',
			data: provider
		})
	},
	// 保存订单信息
	setOrderInfo(state, provider) {
		state.orderInfo = provider;
	}

}

let getters = {}

export default {
	namespaced: true,
	state,
	mutations,
	getters
}
