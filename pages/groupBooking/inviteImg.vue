<template>
	<view class="box">
		<image class="inviteImg" :src="image" ></image>
		<view class="lyy-b-but">长按图片下载</view>
		<!-- <view class="lyy-b-but" @click="domImg">点击下载图片</view> -->
	</view>
</template>

<script>
	import { getCombinationPoster } from '@/api/groupBooking.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				image:'',//海报
				ptId:'',//拼团id
			}
		},
		computed: {
			...mapState(['baseURL','urlFile'])
		},
		onLoad(option) {
			// 保存拼团id
			this.ptId = option.id;
			// 保存团长id
			this.spread = option.spread;
			// 加载分享图
			this.getCombinationPoster();
		},
		methods: {
			// 加载海报
			getCombinationPoster() {
				let obj = this;
				getCombinationPoster({
					id:obj.ptId,
					// #ifdef H5|APP-PLUS
					url:obj.baseURL+obj.urlFile+'/#/pages/groupBooking/detail?id='+obj.ptId+'&spread='+obj.spread,
					from:'wechat',//来源wechat公众号
					// #endif
					// #ifdef MP
					from:'routine',//来源routine小程序
					url:'/pages/groupBooking/detail?id='+obj.ptId
					// #endif
				}).then((e) => {
					obj.image = e.data.url;
				}).catch((e) => {
					console.log(e);
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		height: 100%;
	}
	.box{
		.inviteImg{
			width: 750rpx;
			height: 1200rpx;
		}
	}
	.lyy-b-but {
		height: 80rpx;
		background: #fc5b62;
		border-radius: 100rpx;
		text-align: center;
		color: white;
		line-height: 80rpx;
		font-size: 32rpx;
		margin:  0 100rpx;
	}
</style>
