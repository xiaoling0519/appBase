<template>
	<view class="content">
		<view class="order-item">
			<scroll-view v-if="listStyle == 1" class="goods-box" scroll-x>
				<view v-for="(goodsItem, goodsIndex) in item.cartInfo" :key="goodsIndex" class="goods-item">
					<image class="goods-img" :src="goodsItem.productInfo.image" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view v-if="listStyle == 2" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.cartInfo" :key="goodsIndex">
				<image class="goods-img" :src="goodsItem.productInfo.image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{ goodsItem.productInfo.store_name }}</text>
					<text class="attr-box">{{ goodsItem.attrInfo ? goodsItem.attrInfo.suk : '' }} x {{ goodsItem.cart_num }}</text>
					<text class="price">{{ goodsItem.productInfo.price }}</text>
				</view>
			</view>
		</view>
		<view class="orderDetial">
			<view class="row b-b flex">
				<text class="tit">订单总价</text>
				<view class="input">￥{{ item.total_price }}</view>
			</view>
			<view class="row b-b flex">
				<text class="tit">邮费</text>
				<view class="input">{{ item.pay_postage > 0 ? '￥' +item.pay_postage : '免邮费' }}</view>
			</view>
			<view class="row b-b flex" v-if="item.coupon_id > 0">
				<text class="tit">优惠券</text>
				<view class="input">-￥{{ item.coupon_price }}</view>
			</view>
			<view class="row b-b flex" v-if="item.use_integral > 0">
				<text class="tit">积分抵扣</text>
				<view class="input">-￥{{ item.use_integral }}</view>
			</view>
			<view class="row b-b flex">
				<text class="tit ">实付</text>
				<view class="input payColor">￥{{ item.pay_price }}</view>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">退款理由</text>
			<picker mode="selector" :range="value" @change="bindChange">
				<view class="refund" v-if="refund">{{ refund || '请选择退款理由' }}</view>
				<view class="noRefund" v-else>请选择退款理由</view>
			</picker>
		</view>
		<view class="row b-b">
			<text class="tit">备注说明</text>
			<input class="input" type="text" v-model="reason" placeholder="请填写备注" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import { refund, refundReason, orderDetail } from '@/api/order.js';
export default {
	data() {
		return {
			refund: '', //退款理由
			reason: '', //备注
			value: ['1', '2', '3', '4', '5', '6', '7', '8', 9, 10, 11, 12, 13],
			orderId: '',
			item: {},
			listStyle: 2
		};
	},
	onLoad(option) {
		this.orderId = option.id;
		this.refundReason();
		this.loadOrder();
	},
	methods: {
		// 切换选中事件
		bindChange(e) {
			this.refund = this.value[e.detail.value];
		},
		// 加载退款理由
		refundReason() {
			refundReason({}).then(e => {
				this.value = e.data;
			});
		},
		loadOrder() {
			orderDetail({}, this.orderId).then(e => {
				this.item = e.data;
			});
		},
		//提交
		confirm() {
			if (!obj.refund) {
				uni.showModal({
					title: '错误',
					content: '请填写退货理由',
					showCancel: false
				});
				return false;
			}
			let obj = this;
			refund({
				text: obj.refund,
				uni: obj.orderId,
				refund_reason_wap_explain: obj.reason
			}).then(function(e) {
				uni.showToast({
					title:'提交成功',
					duration:1500
				})
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16rpx;
}
.orderDetial {
	.row {
		.input {
			text-align: right;
		}
	}
}
.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30rpx;
	height: 110rpx;
	background: #fff;
	.refund {
		font-size: 30rpx;
		color: $font-color-dark;
	}
	.noRefund {
		font-size: 30rpx;
		color: $font-color-light;
		padding-left: 20rpx;
	}
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
		padding-left: 20rpx;
		&.payColor {
			color: $color-red;
		}
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

/* 多条商品 */
.order-item {
	display: flex;
	flex-direction: column;
	padding-left: 30rpx;
	background: #fff;
	margin-top: 16rpx;
	.goods-box {
		height: 160rpx;
		padding: 20rpx 0;
		white-space: nowrap;
		.goods-item {
			width: 120rpx;
			height: 120rpx;
			display: inline-block;
			margin-right: 24rpx;
		}
		.goods-img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 20rpx 0;
		.goods-img {
			display: block;
			width: 120rpx;
			height: 120rpx;
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx 0 24rpx;
			overflow: hidden;
			.title {
				font-size: $font-base + 2rpx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box {
				font-size: $font-sm + 2rpx;
				color: $font-color-light;
				padding: 10rpx 12rpx;
			}
			.price {
				font-size: $font-base + 2rpx;
				color: $font-color-dark;
				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2rpx 0 8rpx;
				}
			}
		}
	}
}
</style>
