<template>
	<view class="seckill-section m-t" v-if="show">
		<view class="s-header">
			<view class="f-left-icon"></view>
			<view class="tit-box"><text class="tit">限时秒杀</text></view>
			<view class="tip-box">
				<text class="tip" v-if="status == 1">{{ showTime }}点场结束</text>
				<text class="tip" v-if="status == 2">距离下场开始</text>
				<text class="tip" v-if="status == 0">当天活动已结束</text>
				<uni-countdown v-if="status == 1 || status == 2" :show-day="false" :hour="stopTimeH" :minute="stopTimeM" :second="stopTimeS"></uni-countdown>
			</view>
			<view class="textNav iconfont iconenter" @click="navTo('/pages/seckill/seckill')">更多</view>
		</view>
		<scroll-view class="floor-list" scroll-x>
			<view class="scoll-wrapper position-relative" @click="navTo('/pages/seckill/seckill')">
				<view v-for="(item, index) in list" :key="index" class="floor-item">
					<image class="list-image" :src="item.image" mode="aspectFill"></image>
					<text class="title clamp">{{ item.title }}</text>
					<text class="price">￥{{ item.price }}</text>
				</view>
				<view v-if="list.length == 0" class="floor-item ">
					<image class="list-image" mode="aspectFill"></image>
					<text class="title clamp"></text>
					<text class="price"></text>
				</view>
				<view v-if="list.length == 0" class="noGoodsBg"><view>敬请期待</view></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import { getList, getClass } from '@/api/seckill.js';
import { timeComputed } from '@/utils/rocessor.js';
export default {
	components: {
		uniCountdown
	},
	data() {
		return {
			list: [],
			page: 1,
			limit: 10,
			showTime: '', //显示的时间
			showTImeId: '', //显示时间id用于查询数据
			stopTimeH: 0,
			stopTimeM: 0,
			stopTimeS: 0,
			// 判断是否所有活动已经结束
			stop: false, //活动是否已经结束
			show: false, //是否显示活动
			status: 0 //获取状态值1为有活动开始中 2为活动未开始 0为活动已经结束
		};
	},
	created: function(e) {
		// 载入分类
		this.getClass();
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url
			});
		},
		getList() {
			getList(
				{
					page: this.page,
					limit: this.limit
				},
				this.showTImeId
			)
				.then(e => {
					this.list = e.data;
				})
				.catch(e => {
					console.log(e);
				});
		},
		getClass() {
			let obj = this;
			getClass({})
				.then(({ data }) => {
					let arr = data.seckillTime;
					// 用于判断是否有数据
					let showDate = false;
					for (var i = 0; i < arr.length; i++) {
						let ar = arr[i];
						if (ar.status === 1 || ar.status === 2) {
							obj.status = ar.status;
							// 保存要显示的场次时间
							obj.showTime = ar.time;
							// 保存要显示活动商品的id
							obj.showTImeId = ar.id;
							// 保存当前状态值
							// 计算倒计时时间
							if (ar.status === 1) {
								obj.timeComputed(ar.stop * 1000);
							} else {
								// 获取需要开始
								let arTime = ar.time.split(':');
								let h = arTime[0];
								let m = arTime[1];
								let time = new Date();
								// 设置时间
								time.setHours(h, m, 0);
								obj.timeComputed(time.getTime());
							}
							// 获取商品列表
							obj.getList();
							// 保存当前有活动在举行
							showDate = true;
							// 任务查询结束跳出循环
							break;
						}
					}
					// 判断是否有活动
					if (arr.length > 0) {
						obj.show = true;
					}
					// 判断今天活动是否已经全部结束
					if (!showDate) {
						// 保存活动结束最后一个小时的活动商品
						obj.showTImeId = arr[arr.length - 1].id;
						// 活动已经结束
						obj.status = 0;
						// 获取结束时的商品
						obj.getList();
						console.log(obj.status);
					}
					// 如果所有场次均已经结束
				})
				.catch(e => {
					uni.showModal({
						title: JSON.stringify(e)
					});
				});
		},
		// 计算倒计时时间
		timeComputed(da) {
			let obj = this;
			let stopTime = timeComputed(da)
			obj.stopTimeH =stopTime.hours;
			obj.stopTimeM = stopTime.minutes;
			obj.stopTimeS =stopTime.seconds;
		}
	}
};
</script>

<style lang="scss">
/* 秒杀专区 */
.seckill-section {
	padding: 4rpx 30rpx 24rpx;
	.s-header {
		display: flex;
		align-items: center;
		height: 92rpx;
		line-height: 1;
		.tit-box {
			flex-shrink: 0;
		}
		.tit {
			@extend %font-title;
		}
		.f-left-icon {
			@extend %f-left-icon;
		}
		.textNav {
			line-height: 1;
			padding: 15rpx 0;
			flex-shrink: 0;
			flex-grow: 1;
			min-width: 100rpx;
		}
		.tip-box {
			flex-grow: 1;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.tip {
			font-size: $font-sm;
			color: $font-color-light;
			padding-left: 10rpx;
			padding-right: 10rpx;
		}
		.timer {
			display: inline-block;
			width: 40rpx;
			height: 36rpx;
			text-align: center;
			line-height: 36rpx;
			margin-right: 14rpx;
			font-size: $font-sm + 2rpx;
			color: #fff;
			border-radius: 2px;
			background: rgba(0, 0, 0, 0.8);
		}
		.iconenter {
			font-size: $font-sm;
			color: $font-color-light;
			flex: 1;
			text-align: right;
		}
	}
	.floor-list {
		white-space: nowrap;
		background-color: white;
		padding: 20rpx;
		border-radius: 5rpx;
		box-shadow: $box-shadow;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
		.noGoodsBg {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			color: $font-color-light;
		}
		.floor-item {
			width: 150rpx;
			margin-right: 20rpx;
			font-size: $font-sm + 2rpx;
			color: $font-color-dark;
			line-height: 1.8;
			.list-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 6rpx;
			}
			.price {
				color: $color-red;
			}
		}
	}
}
</style>
