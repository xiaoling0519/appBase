import service from './newRequest.js'
import store from '../store';
import {
	saveUrl,
	interceptor
} from '@/utils/loginUtils.js';
// 请求完成后拦截
service.interceptors.response(
	response => {
		try {
			let res = response.data;
			// 解析字符串为数字
			if (res.status !== 200) {
				console.log(res.status);
				if (res.status == 410000) {
					// 调用退出登录方法清空用户信息
					store.commit('user/logout');
					// 判断是否开启强制登录
					uni.showModal({
						title: "登陆",
						content: '您未登录！是否马上登录？',
						success: (e) => {
							// 判断是否点击确认按钮
							if (e.confirm) {
								// 保存当前页面地址
								saveUrl()
								// 跳转页面
								interceptor()
							}
						}
					})
				} else {
					if (res.msg != '系统出现异常') {
						uni.showToast({
							title: res.msg,
							duration: 1500,
							mask: false,
							icon: 'none',
						})

					}
				}
				return Promise.reject(res)
			} else {
				return res
			}
		} catch (e) {
			console.log(e);
		}
	},
	error => {
		uni.showToast({
			title: "加载错误请重试",
			duration: 1500,
			mask: false,
			icon: 'none',
		})
		return Promise.reject(error)
	}
)

// 请求前拦截器
service.interceptors.request(
	config => {
		let token = uni.getStorageSync('token') || '';
		// console.log(config);
		if (!config.header) {
			config.header = {
				"Authori-zation": 'Bearer ' + token,
			}
		} else {
			// 添加key请求头
			config.header["Authori-zation"] = 'Bearer ' + token;
		}
		return config
	},
	error => {
		// 错误处理
		console.log(error)
		return Promise.reject(error)
	}
)
let upFilse = service.upFilse;
export {
	upFilse
};
export default service.open;
