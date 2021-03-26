<template>
	<view class="container">
		<view class="container_text">
			<image class="banner-img" src="/static/img/img01.png" mode="scaleToFill"></image>
		</view>
		<view class="loginTitle"><text>登录</text></view>
		<view class="login_text">
			<view class="login_input flex">
				<view class="login_img"><image src="/static/icon/img03.png"></image></view>
				<view class="login_name"><input class="uni-input" v-model="username" focus placeholder="请输入手机号" /></view>
			</view>
			<view class="login_input flex">
				<view class="login_img"><image src="/static/icon/img04.png"></image></view>
				<view class="login_name"><input class="uni-input" type="password" v-model="passward" focus placeholder="请输入密码" /></view>
			</view>
			<view><button type="green" class="uni-button uni-button-green" @click="toLogin">登录</button></view>
			<view><button type="green" class="uni-button uni-button-green uni-button-green-plain" plain="true" hover-class="none" @click="register">注册</button></view>
			<navigator url="./forget"><view class="forget">忘记密码</view></navigator>
			<view class="flex other">
				<view class="fenge"></view>
				<view class="qita">其他方式登录</view>
				<view class="fenge"></view>
			</view>
			<!-- #ifndef APP-PLUS -->
					<view class="weixin" @click="wecahtLogin"><image src="/static/img/img05.png"></image></view>
					<view class="weixin_text" @click="wecahtLogin">微信登录</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<block v-if="!is_ios">
						<view class="weixin" @click="wecahtLogin"><image src="/static/img/img05.png" mode="scaleToFill"></image></view>
						<view class="weixin_text" @click="wecahtLogin">微信登录</view>
					</block>
					<block v-else>
						<view class="ios_login flex" @click="wecahtLogin('weixin')">
							<text class="iconfont iconweixin"></text>
							<text class="weixin_text">微信登录</text>
						</view>
						<view v-if='is_apple_login' class="ios_login flex" @click="wecahtLogin('apple')">
							<image class="loginIcon" src="/static/icon/appleIcon.png" mode=" scaleToFill"></image>
							<text class="weixin_text">通过Apple登录</text>
						</view>
					</block>
					<!-- #endif -->
				</view>
			</view>
</template>

<script>
import { mapMutations } from 'vuex';
import { login, getUserInfo} from '@/api/login.js';
// #ifdef APP-PLUS
// applelogin接口需要开发编写，基础项目中可能没有
import { applelogin } from '@/api/set.js';
// loginWx接口需要开发编写，基础项目中可能没有
import { loginWx } from '@/api/login.js';
// #endif
// #ifdef H5
import { loginWinxin } from '@/utils/wxAuthorized';
// #endif
export default {
	data() {
		return {
			username: '',
			passward: '',
			// #ifdef APP-PLUS
			is_ios: false ,//判断是否为ios手机
			is_apple_login:false,//是否有ios授权登录功能
			// #endif
		};
	},
	onLoad() {
		let obj = this;
		// #ifdef APP-PLUS
		let system = uni.getStorageSync('platform');
		// 判断是否为ios
		if (system == 'ios') {
			obj.is_ios = true;
		}
		uni.getSystemInfo({
			success(e) {
				if(+e.system.split('.')[0]>=13){
					obj.is_apple_login=true;
				}
			}
		})
		// #endif
	},
	methods: {
		...mapMutations('user', ['setUserInfo', 'login']),
		// 微信登录
		wecahtLogin(type) {
			let obj = this;
			// #ifdef H5
			let weichatBrowser = uni.getStorageSync('weichatBrowser');
			if (weichatBrowser) {
				loginWinxin();
			}
			// #endif
			// #ifdef APP-PLUS
			uni.login({
				provider: type,
				success(e) {
					uni.getUserInfo({
						provider: type,
						success(es) {
							if(type==='weixin'){
								loginWx(es.userInfo)
									.then(e => {
										uni.setStorageSync('token', e.data.token);
										getUserInfo({}).then(e => {
											obj.login();
											// 保存返回用户数据
											obj.setUserInfo(e.data);
											//成功跳转首页
											uni.switchTab({
												url: '/pages/index/index'
											});
										});
									})
									.catch(e => {
										console.log(e);
										uni.showModal({
											content: JSON.stringify(e),
											success() {},
											fail() {}
										});
									});
							}
							if(type==='apple'){
								console.log(es.userInfo);
								applelogin({
									account: es.userInfo.openId,
								})
									.then(function(e) {
										console.log(e,'token')
										uni.setStorageSync('token', e.data.token);
										getUserInfo({}).then(e => {
											obj.login();
											// 保存返回用户数据
											obj.setUserInfo(e.data);
											//成功跳转首页
											uni.switchTab({
												url: '/pages/index/index'
											});
										});
										
									})
									.catch(function(e) {
										console.log(e);
									});
							}
							
						},
						fail(es) {
							uni.showModal({
								content: JSON.stringify(es),
								success() {
									// obj.login();
									// // 保存返回用户数据
									// obj.setUserInfo(e.data);
									// //成功跳转首页
									// uni.switchTab({
									// 	url: '/pages/index/index'
									// });
								}
							});
						}
					});
				},
				fail(e) {
					uni.showModal({
						title: '提示',
						content: JSON.stringify(e),
						showCancel: false
					});
				}
			});
			// #endif
		},
		//登录
		async toLogin() {
			let obj = this;
			obj.logining = true;
			if (obj.username == '') {
				obj.$api.msg('请输入手机号');
				return;
			}
			if (obj.passward == '') {
				obj.$api.msg('请输入密码');
				return;
			}
			login({
				account: obj.username,
				password: obj.passward
			})
				.then(function(e) {
					uni.setStorageSync('token', e.data.token);
					getUserInfo({}).then(e => {
						obj.login();
						// 保存返回用户数据
						obj.setUserInfo(e.data);
						let ur = uni.getStorageSync('present')|| '/pages/index/index';
						//成功跳转首页
						uni.switchTab({
							url: ur,
							fail(e) {
								uni.navigateTo({
									url: ur,
									fail(e) {
										uni.navigateTo({
											url: '/pages/index/index',
										});
									}
								});
							}
						});
					});
				})
				.catch(function(e) {
					console.log(e);
				});
		},
		//跳转注册页
		register() {
			uni.navigateTo({
				url: `/pages/public/register`
			});
		},
		// 后退
		navBack() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	
	.ios_login {
		width: 260rpx;
		border-radius: 12rpx;
		justify-content: center;
		border: 1px solid #212121;
		margin: 24rpx auto;
		padding: 10rpx;
		background-color: #212121;
		color: #ffffff;
		.loginIcon {
			width: 50rpx;
			height: 50rpx;
		}
		.weixin_text {
			line-height: 1;
			margin-left: 20rpx;
			color: #ffffff !important;
		}
	}
	
	/* #endif */
	.ios_login {
		width: 350rpx;
		border-radius: 12rpx;
		justify-content: center;
		border: 1px solid #212121;
		margin: 24rpx auto;
		padding: 15rpx;
		background-color: #212121;
		color: #ffffff;
		font-size: 32rpx;
		.loginIcon {
			font-size: 35rpx;
			width: 35rpx;
			height: 35rpx;
		}
		.weixin_text {
			line-height: 1;
			margin-left: 20rpx;
			color: #ffffff !important;
		}
	}
	
page {
	height: 100%;
}
.container {
	width: 100%;
	height: 100%;
	background-size: 100%;
}
.container_text {
	width: 100%;
	height: 500rpx;
	top: 0rpx;
	.banner-img {
		width: 100%;
		height: 100%;
	}
}
.login_text {
	margin: auto 30rpx;
	position: relative;
	padding: 100rpx 102rpx;
	background-color: #ffffff;
	margin-top: -180rpx;
	border-radius: 20rpx;
	.login_input {
		border-bottom: 1px solid #f0f0f0;
		margin-bottom: 65rpx;
		.login_img image {
			height: 35rpx;
			width: 29rpx;
			margin-right: 20rpx;
		}
		.uni-input {
			text-align: left;
			width: 470rpx;
			font-size: 28rpx !important;
		}
		.login_name {
			color: #333333;
		}
	}

	.other {
		margin-top: 60rpx;
		.fenge {
			width: 30%;
			height: 2rpx;
			background-color: #eeeeee;
		}
		.qita {
			font-size: 28rpx;
			color: #999999;
		}
	}
	.weixin {
		width: 75rpx;
		height: 75rpx;
		margin: 25rpx auto;
	}
	.weixin image {
		width: 100%;
		height: 100%;
	}
	.weixin_text {
		text-align: center;
		font-size: 28rpx;
		color: #999999;
	}
	.forget {
		font-size: 28rpx;
		width: 100%;
		text-align: right;
		color: #999999;
	}

	.uni-button-green {
		color: #ffffff;
		background-color: #5dbc7c;
		margin: 40rpx 10rpx;
		border-radius: 50rpx;
	}
	.uni-button-green-plain {
		border: 1px solid #5dbc7c;
		margin: 40rpx 10rpx;
		border-radius: 50rpx;
		color: #5dbc7c;
		background-color: #ffffff;
	}
	.uni-button {
		height: 85rpx;
		line-height: 85rpx;
	}
}
.loginTitle {
	position: absolute;
	top: 250rpx;
	width: 100%;
	text-align: center;
	color: white;
	font-size: 40rpx;
}
</style>
