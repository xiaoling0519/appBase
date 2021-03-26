<template>
	<view class="container">
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" v-model="account" type="text" placeholder="请填写手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">验证码</text>
			<input class="input" v-model="captcha" type="text" placeholder="请填写验证码" placeholder-class="placeholder" />
			<view class="code" @click="verification">{{ countDown == 0 ? '验证码' : countDown }}</view>
		</view>
		<view class="row b-b">
			<text class="tit">新密码</text>
			<input class="input" v-model="password" type="password" placeholder="请填写新密码" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" :class="{'bg-gray':loding}" @click="loding?'':confirm()">提交</button>
	</view>
</template>

<script>
import { verify } from '@/api/login.js';
import { mapState } from 'vuex';
import { registerReset } from '@/api/set.js';
export default {
	data() {
		return {
			time: '', //保存倒计时对象
			countDown: 0, //倒计时
			account: '', //手机号
			captcha: '', //验证码
			password: '' ,//新密码
			loding:false,//是否载入中
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	onLoad() {
		if(this.userInfo.phone == null){
			this.account = '';
		}else{
			this.account = this.userInfo.phone;
			this.show = false;
		}
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
		//发送验证码
		verification() {
			let obj = this;
			if (this.account == '') {
				this.$api.msg('请输入电话号码');
				return;
			}
			if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.account)) {
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
					phone: obj.account,
					type: ''
				})
					.then(({ data }) => {})
					.catch(err => {
						console.log(err);
					});
			}
		},
		confirm(e) {
			this.loding = true;
			registerReset({
				account: this.account,
				captcha: this.captcha,
				password: this.password,
			})
				.then(({ data }) => {
					this.loding = false;
					this.$api.msg('修改成功');
				})
				.catch(err => {
					this.loding = false;
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.container {
	padding-top: 30rpx;
}
.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30rpx;
	height: 110rpx;
	background: #fff;

	.tit {
		flex-shrink: 0;
		width: 120rpx;
		font-size: 30rpx;
		color: $font-color-dark;
	}
	.input {
		flex: 1;
		font-size: 30rpx;
		color: $font-color-dark;
	}
	.iconlocation {
		font-size: 36rpx;
		color: $font-color-light;
	}
}
.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690rpx;
	height: 80rpx;
	margin: 60rpx auto;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10rpx;
	// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}

.bg-gray{
	background-color: $color-gray;
}
.code {
	color: #5dbc7c;
	font-size: 23rpx;
	border-left: 1px solid #eeeeee;
	width: 150rpx;
	flex-shrink: 0;
	text-align: center;
}
</style>
