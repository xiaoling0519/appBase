<template>
	<view class="content">
		<!-- #ifdef MP -->
		<image class="bg-img" src="/static/img/img09.png" mode=" scaleToFill"></image>
		<view class="logo-img-box">
			<image class="logo-img" src="/static/img/img10.png" mode=" aspectFit"></image>
			<button class="userInfo" type="warn" open-type="getUserInfo" @getuserinfo="userInfoData">
				<text class="iconfont iconweixin"></text>
				<text>微信授权登录</text>
			</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
// #ifdef H5
import { loginWinxin } from '@/utils/wxAuthorized';
// #endif
// #ifdef MP-WEIXIN
import { loginWinxinMp } from '@/utils/wxMinProgram';
// #endif
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			userInfo: {}, //授权用户信息
			code: '' //授权code
		};
	},
	onLoad(option) {
		this.loadData();
	},
	methods: {
		loadData() {
			// #ifdef H5
			loginWinxin();
			// #endif
			// #ifdef MP-WEIXIN
			loginWinxinMp({}).then(e => {
				this.code = e.code;
			});
			// #endif
		},
		// 用户确认授权
		userInfoData(e) {
			console.log(e);
			this.userInfo = e;
			uni.navigateTo({
				url: '/pages/redirect/redirect?code=' + this.code
			});
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	height: 100%;
}
.bg-img,
.logo-img-box {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.logo-img {
	margin-top: 20vh;
	margin-left: 176rpx;
	width: 385rpx;
	height: 394rpx;
}
.userInfo {
	margin: 0 100rpx;
	margin-top: 50rpx;
	color: #ffffff;
	border-radius: 99rpx;
	background-color: $base-color;
}
</style>
