<template>
	<view class="container">
		<view class="container_text" >
			<image class="banner-img" src="/static/img/img01.png" mode="scaleToFill"></image>
		</view>
		<view class="loginTitle"><text>注册</text></view>
		<view class="login_text">
			<view class="login_input flex">
				<view class="login_img"><image src="/static/icon/img03.png"></image></view>
				<view class="login_name"><input class="uni-input" v-model="phone" focus placeholder="请输入手机号" /></view>
			</view>
			<view class="login_input flex">
				<view class="login_img"><image src="/static/icon/img04.png"></image></view>
				<view class="login_name"><input class="uni-input" type="password" v-model="password" focus placeholder="请输入密码" /></view>
			</view>
			<view class="login_input flex">
				<view class="login_img"><image src="/static/icon/img04.png"></image></view>
				<view class="login_name"><input class="uni-input" type="password" v-model="repassword" focus placeholder="请重复输入密码" /></view>
			</view>
			<view class="login_input flex" style="display: none;">
				<view class="login_img"><image src="/static/icon/img07.png"></image></view>
				<view class="login_name"><input class="uni-input" type="text" v-model="invitation" focus placeholder="请输入邀请码" /></view>
			</view>
			<view class="login_input flex">
				<view class="login_img"><image src="/static/icon/img06.png"></image></view>
				<view class="login_name flex">
					<input class="uni-input width" v-model="code" focus placeholder="请输入验证码" />
					<view class="code" @click="verification">{{ countDown == 0 ? '验证码' : countDown }}</view>
				</view>
			</view>
			<view><button type="green" @click="register" class="uni-button uni-button-green">注册账号</button></view>
			<view><button class="uni-button uni-button-green uni-button-green-plain" type="green" plain="true" hover-class="none" @click="login">返回登录</button></view>
		</view>
	</view>
</template>
<script>
import { register, verify } from '@/api/login.js';
export default {
	data() {
		return {
			phone: '', //用户
			password: '', //密码
			repassword: '',
			invitation: '', //邀请码
			code: '', //验证码
			time: '', //保存倒计时对象
			countDown: 0 ,//倒计时
		};
	},
	onLoad() {
		// 获取扫码邀请人id
		this.invitation = uni.getStorageSync('spread')||'';
	},
	watch: {
		// 监听倒计时
		countDown(i) {
			if (i == 0) {
				clearInterval(this.time);
			}
		}
	},
	methods: {
		// 注册
		register() {
			let obj = this;
			if (obj.phone == '') {
				obj.$api.msg('请输入电话号码');
				return;
			}
			if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.phone)) {
				obj.$api.msg('请输入正确的手机号');
				return;
			}
			if (obj.password == '') {
				obj.$api.msg('请输入密码');
				return;
			}
			if (obj.repassword == '') {
				obj.$api.msg('请再次输入密码');
				return;
			}
			if (obj.repassword != obj.password) {
				obj.$api.msg('两次密码不正确');
				return;
			}
			// if ((obj.invitation = '')) {
			// 	obj.$api.msg('请输入邀请码');
			// 	return;
			// }
			if (obj.code == '') {
				obj.$api.msg('请输入验证码');
				return;
			}
			register({
				account: obj.phone, //账号
				captcha: obj.code, //验证码
				password: obj.password ,//密码
				spread:this.invitation//上级推广人
			}).then(function(e) {
				uni.showToast({
					title:'注册成功',
					duration:2000,
					position:'top'
				});
				setTimeout(function () {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				},1000)
				
			});
			//调用注册接口，成功跳转登录页
		},
		//发送验证码
		verification() {
			let obj = this;
			if (this.phone == '') {
				this.$api.msg('请输入电话号码');
				return;
			}
			if (this.phone.length < 11) {
				this.$api.msg('请输入正确的手机号');
				return;
			}
			// 判断是否在倒计时
			if (obj.countDown > 0) {
				return false;
			} else {
				obj.countDown = 60;
				obj.time = setInterval(() => {
					obj.countDown--;
				}, 1000);
				//调用验证码接口
				verify({
					phone: obj.phone,
					type: 'register'
				})
					.then(({ data }) => {})
					.catch(err => {
						console.log(err);
					});
			}
		},
		login() {
			//返回登录
			uni.navigateTo({
				url: '/pages/public/login'
			});
		}
	}
};
</script>

<style lang="scss">
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

.forget {
	width: 100rpx;
	font-size: 24rpx;
	color: #ffffff;
	margin: 0px auto;
	border-bottom: 1px solid #ffffff;
}
.width {
	width: 325rpx !important;
}
.code {
	color: #5dbc7c;
	font-size: 23rpx;
	border-left: 1px solid #eeeeee;
	width: 150rpx;
	flex-shrink: 0;
	text-align: center;
}
uni-button {
	height: 80rpx !important;
	line-height: 80rpx !important;
}

</style>

