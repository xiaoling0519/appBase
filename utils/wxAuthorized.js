import {
	wechatConfig,
	share
} from '@/api/wx';
import store from '../store';
// 保存wx对象
let weixinObj = require('jweixin-module');
// 保存分享数据
let shareData = '';
// 保存注册返回appId数据
let appId = '';
//保存路由对象
let router=''；
//微信登录
/**
 * @param {string} 当前页面地址信息
 */
export function loginWinxin() {
	console.log('1');
	let pages, page, path;
	try {
		pages = getCurrentPages();
		// 获取跳转前页面
		page = pages[pages.length - 1];
		// 获取跳转前路由地址
		path = page.route;
	} catch (e) {
		console.log(e);
		//TODO handle the exception
	}
	// 判断是否在登录页
	if (path != 'pages/redirect/redirect') {
		weixinObj.ready(() => {
			console.log('2');
			// 调用
			try {
				console.log(shareData);
				weixinSq(shareData, path);
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		});
	}
};
// 微信授权登录
function weixinSq(data, path) {
	// 微信授权后跳转页面
	try {
		let ul = encodeURIComponent(store.state.baseURL + store.state.urlFile + '/pages/redirect/redirect');
		// 打开微信授权页面
		let url =
			'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
			appId +
			'&redirect_uri=' +
			ul +
			'&response_type=code&scope=snsapi_userinfo&state=' +
			new Date().getTime() +
			'#wechat_redirect';
		window.location.href = url;
	} catch (e) {
		console.log(e);
		//TODO handle the exception
	}
};

// 微信注册
export function weixindata(config) {
	let url;
	if(router.mode==="history"){
		url = window.location.href
	}
	if(router.mode==="hash"){
		url = store.state.baseURL+store.state.urlFile;
	}
	
	//注册微信信息
	wechatConfig({
			url
		})
		.then(({
			data
		}) => {
			// 保存appId
			appId = data.appId
			// 微信信息配置
			weixinObj.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			weixinObj.ready((e) => {
				// 判断有无自定义数据
				if (config) {
					shareLoad(config)
				} else {
					// 判断是否已经缓存了默认数据
					if (shareData) {
						shareLoad()
					} else {
						// 请求获取默认数据
						share({}).then(({
							data
						}) => {
							shareData = data.data
							shareLoad()
						});
					}
				}
			})

		})
		.catch(e => {
			console.log(e);
		});
}

// 加载分享数据
function shareLoad(config) {
	let mess;
	if (config) {
		mess = {
			link: config.link, // 分享链接
			imgUrl: config.imgUrl,
			desc: config.desc,
			title: config.title,
			success: config.success,
			fail: config.fail
		}
	} else {
		const  userInfo  = uni.getStorageSync('userInfo')
		console.log(userInfo);
		const url = window.location.href + '?spread=' + userInfo.uid;
		url = url.replace(/[\?,&]{0,1}from=singlemessage/g, '');
		mess = {
			title: shareData.title,
			link: url, // 分享链接
			imgUrl: shareData.img, // 分享图标
			desc: shareData.synopsis,
			success: function() {
				// uni.showModal({
				// 	title: '分享',
				// 	content: '分享成功',
				// 	showCancel: false,
				// 	success: res => {
				//    console.log('分享成功回调接口');
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			}
		}
	}
	// 获取仓库数据
	// 分享好友
	weixinObj.updateAppMessageShareData(mess);
	// 分享朋友圈
	weixinObj.updateTimelineShareData(mess)
}

// 保存路由对象
export function setRouter (route) {
	router = route
}

export default {
	weixinObj,
	shareData,
	appId,
	setRouter
}
