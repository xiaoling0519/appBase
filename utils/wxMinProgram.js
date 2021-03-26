import store from '../store';
//微信登录
/**
 * @param {string} 当前页面地址信息
 */
export function loginWinxinMp() {
	let pages = getCurrentPages();
	// 获取跳转前页面
	let page = pages[pages.length - 2];
	let queryUrl = '';
	for (let key in page.options) {
		queryUrl += key + '=' + page.options[key] + "&";
	}
	// 获取当页面路由地址
	let path ='/' + page.route + '?' + queryUrl;
	// 保存跳转前页面
	uni.setStorageSync('present', path);
	return new Promise(function (resolve,reject) {
		wx.login({
			success(e) {
				console.log(e);
				resolve(e)
			},
			fill:function (e) {
				reject(e);
			}
		})
	})
};
