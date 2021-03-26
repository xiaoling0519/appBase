<script>
/**
 * vuex管理登陆状态，具体可以参考官方登陆模板示例
 */
import { mapMutations } from 'vuex';
// #ifdef H5
import { weixindata, setRouter } from './utils/wxAuthorized';
// #endif
// #ifdef APP-PLUS
import { getUpApp } from './utils/upApp.js';
// #endif
export default {
	data() {
		return {
			/* 保存微信信息 */
			appData: {}
		};
	},
	methods: {
		...mapMutations('user', ['setUserInfo', 'login', 'hasLogin'])
	},
	onLaunch: function(urlObj) {
		let obj = this;
		// 加载缓存中的用户信息
		let userInfo = uni.getStorageSync('userInfo') || '';
		// 判断是否拥有用户信息
		if (userInfo.uid) {
			//更新登陆状态
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					obj.setUserInfo(res.data);
					obj.login(res.data);
				}
			});
		}
		// #ifdef H5
		// 保存路由对象
		setRouter(this.$router);
		//判断是否已经缓存浏览器
		let bool = uni.getStorageSync('weichatBrowser') || '';
		if (bool === '') {
			//判断是否为微信浏览
			bool = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
			// 保存当前是否为微信内核浏览器
			uni.setStorageSync('weichatBrowser', bool);
		}
		if (bool) {
			// 加载微信信息
			weixindata();
		}
		// #endif
		// #ifdef APP-PLUS
		// 判断是否升级
		getUpApp();
		// 获取当前运行系统
		let system = uni.getStorageSync('platform') || '';
		if (!system) {
			uni.setStorage({
				key: 'platform',
				data: uni.getSystemInfoSync().platform
			});
		}
		// #endif
	},
	onShow: function() {
		// 加载拦截
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*全局公共样式和字体图标*/
@import '/static/css/cmy.css';
view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
	box-sizing: border-box;
}
/* 骨架屏替代方案 */
.Skeleton {
	background: #f3f3f3;
	padding: 20rpx 0;
	border-radius: 8rpx;
}

/* 图片载入替代方案 */
.image-wrapper {
	font-size: 0;
	background: #f3f3f3;
	border-radius: 4px;
	image {
		width: 100%;
		height: 100%;
		transition: 0.6s;
		opacity: 0;
		&.loaded {
			opacity: 1;
		}
	}
}
// 设置富文本中图片最大宽度
uni-rich-text img {
	max-width: 100% !important;
}
/*边框*/
.b-b:after,
.b-t:after {
	position: absolute;
	z-index: 3;
	left: 0;
	right: 0;
	height: 0;
	content: '';
	transform: scaleY(0.5);
	border-bottom: 1px solid $border-color-base;
}

.b-b:after {
	bottom: 0;
}

.b-t:after {
	top: 0;
}

/* button样式改写 */
uni-button,
button {
	height: 80rpx;
	line-height: 80rpx;
	font-size: $font-lg + 2rpx;
	font-weight: normal;

	&.no-border:before,
	&.no-border:after {
		border: 0;
	}
}

uni-button[type='default'],
button[type='default'] {
	color: $font-color-dark;
}

/* input 样式 */
.input-placeholder {
	color: #999999;
}

.placeholder {
	color: #999999;
}
// 边距样式
@for $i from 1 to 4 {
	.margin-l-#{$i * 10} {
		margin-left: $i * 10rpx !important;
	}
	.margin-r-#{$i * 10} {
		margin-right: $i * 10rpx !important;
	}
	.margin-t-#{$i * 10} {
		margin-top: $i * 10rpx !important;
	}
	.margin-b-#{$i * 10} {
		margin-bottom: $i * 10rpx !important;
	}
	.margin-#{$i * 10} {
		margin: $i * 10rpx !important;
	}
	.margin-v-#{$i * 10} {
		margin-top: $i * 10rpx !important;
		margin-bottom: $i * 10rpx !important;
	}
	.margin-c-#{$i * 10} {
		margin-left: $i * 10rpx !important;
		margin-right: $i * 10rpx !important;
	}
	.padding-l-#{$i * 10} {
		padding-left: $i * 10rpx !important;
	}
	.padding-r-#{$i * 10} {
		padding-right: $i * 10rpx !important;
	}
	.padding-t-#{$i * 10} {
		padding-top: $i * 10rpx !important;
	}
	.padding-b-#{$i * 10} {
		padding-bottom: $i * 10rpx !important;
	}
	.padding-#{$i * 10} {
		padding: $i * 10rpx !important;
	}
	.padding-v-#{$i * 10} {
		padding-top: $i * 10rpx !important;
		padding-bottom: $i * 10rpx !important;
	}
	.padding-c-#{$i * 10} {
		padding-left: $i * 10rpx !important;
		padding-right: $i * 10rpx !important;
	}
}
// 字体大小
.font-size-sm {
	font-size: $font-sm;
}
.font-size-base {
	font-size: $font-base;
}
.font-size-lg {
	font-size: $font-lg;
}
// 字体颜色
.font-color-yellow {
	color: $color-yellow;
}
.font-color-gray {
	color: $color-gray;
}
.font-color-red {
	color: $color-red;
}
// 边框颜色
.border-color-yellow {
	border: 1rpx solid $color-yellow;
}

// 修改默认背景颜色
uni-page-wrapper {
	background-color: $page-color-base;
}
page {
	background-color: $page-color-base;
	// 设置默认字体
	font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial, sans-serif, Droid Sans Fallback;
}
</style>
