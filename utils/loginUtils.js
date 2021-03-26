export function getActionPage() {
	let pages = getCurrentPages();
	return pages[pages.length - 1]
}
//登录拦截
export function interceptor() {
	let pages = getActionPage();
	// 获取当前页面
	let pageUrl = '/' + pages.route;
	let url = '/pages/public/login'
	// #ifdef H5
	// 判断是否为公众号调用微信授权登录
	let weichatBrowser = uni.getStorageSync('weichatBrowser');
	if (weichatBrowser) {
		url = '/pages/public/wxLogin';
	}
	// #endif
	// #ifdef MP-WEIXIN
	url = '/pages/public/wxLogin';
	// #endif
	if (pageUrl != url) {
		uni.navigateTo({
			url
		})
	}
}

// 保存页面
export function saveUrl() {
	let path = getPageUrl(true)
	uni.setStorageSync('present', path);
}

// 处理分享链接地址
export function getPageUrl(showSpeard=false) {
	let page = getActionPage();
	let path = '/' + page.route;
	let url = '';
	// 获取对象可枚举键值列表
	let objKeys = Object.keys(page.options);
	// 判断有无传值
	if (objKeys.length > 0) {
		// 循环赋值对象数据
		for (let a in page.options) {
			// 判断有无邀请人
			if (a != 'speard') {
				url += a + "=" + page.options[a] + "&"
			}else{
				// 判断是否需要存储邀请人
				if(showSpeard){
					url += a + "=" + page.options[a] + "&"
				}
			}
		}
		path += '?' + url.substr(0, url.length - 1);
	}
	// 返回处理邀请人后的邀请地址
	return path
}

//登录拦截
export function interceptor() {
	let pages = getActionPage();
	// 获取当前页面
	let pageUrl = '/' + pages.route;
	let url = '/pages/login/login'
	// #ifdef H5
	// 判断是否为公众号调用微信授权登录
	let weichatBrowser = uni.getStorageSync('weichatBrowser');
	if (weichatBrowser) {
		url = '/pages/public/wxLogin';
	}
	// #endif
	// #ifdef MP-WEIXIN
	url = '/pages/public/wxLogin';
	// #endif
	if (pageUrl != url) {
		uni.navigateTo({
			url
		})
	}
}
