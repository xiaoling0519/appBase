<template>
	<view>
	</view>
</template>
<script>
import { getUserInfo } from '@/api/login.js';
import { mapMutations,mapState } from 'vuex';
// #ifdef H5
import { wechatAuth } from '@/api/wx';
// #endif
// #ifdef MP-WEIXIN
import { wechatMpAuth } from '@/api/wx';
// #endif
export default {
	computed: {
		...mapState(['urlFile'])
	},
	onLoad(option) {
		let obj = this;
		// 判断是否需要保存定向地址
		// #ifdef H5
		this.loadH5()
		// #endif
		// #ifdef MP-WEIXIN
		this.loadMp(option)
		// #endif
	},
	methods: {
		...mapMutations('user',['login', 'setUserInfo']),
		// #ifdef H5
		loadH5() {
			let obj = this;
			let url = window.location.href;
			let code = url.match(/code=([0-9]|[a-z]|[A-Z])*/g)[0].replace('code=', '');
			let spread = uni.getStorageSync('spread')||'';
			wechatAuth({
				code: code,
				spread:spread,
			}).then(({ data }) => {
				obj.wchatAuth(data);
			}).catch((e) => {
				uni.showModal({
					title: '错误',
					content: JSON.stringify(e),
					showCancel: false,
				});
			});;
		},
		// #endif
		// #ifdef MP-WEIXIN
		loadMp(option) {
			let obj = this;
			// 获取登录授权页数据
			let user = obj.$api.prePage().userInfo;
			// #ifndef MP
			// 获取推广人id
			let spread_spid = uni.getStorageSync('spread') || '';
			// #endif
			// #ifdef MP
			// 小程序推广人
			let spread_code = uni.getStorageSync('spread_code') || '';
			// #endif
			wechatMpAuth({
				code: option.code,
				iv: user.target.iv,
				encryptedData: user.target.encryptedData,
				// #ifndef MP
				spread_spid: spread_spid,
				// #endif
				// #ifdef MP
				spread_code:spread_code
				// #endif
			}).then(({ data }) => {
				obj.wchatAuth(data);
			}).catch((e) => {
				uni.showModal({
					title: '错误',
					content: JSON.stringify(e),
					showCancel: false,
				});
			});
		},
		// #endif
		wchatAuth(data) {
			let obj = this;
			// 保存token
			uni.setStorageSync('token', data.token);
			// 获取用户基础信息
			getUserInfo({}).then(e => {
				obj.login();
				// 保存返回用户数据
				obj.setUserInfo(e.data);
				let ur = uni.getStorageSync('present')|| '/pages/index/index';
				// 用于处理缓存bug
				if (ur=='pages/product/product') {
					ur = '/pages/index/index'
				}
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
			}).catch((e) => {
				uni.showModal({
					title: '错误',
					content: JSON.stringify(e),
					showCancel: false,
				});
			});;
		}
	}
};
</script>
<style></style>
