<template>
	<view class="content">
		<view class="row b-b b-t">
			<text class="order-status" @click="item.delivery_type == 'express'?towuliu(item):''">{{ item._status ? item._status._msg : '' }}</text>
		</view>

		<view class="address-box position-relative">
			<view class="address-top flex">
				<view class="title">{{ item.real_name }}</view>
				<view class="phone">{{ item.user_phone }}</view>
			</view>
			<view class="addrdss-detail">{{ item.user_address }}</view>
			<image class="a-bg" :src="addressImg"></image>
		</view>
		<view class="order-item">
			<view class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.cartInfo" :key="goodsIndex">
				<image class="goods-img" :src="goodsItem.productInfo.image" mode="aspectFill"></image>
				<view class="right position-relative">
					<view class="flex">
						<text class="title">{{ goodsItem.productInfo.store_name }}</text>
						<view class="title-right">
							<view class="price">{{ goodsItem.productInfo.price }}</view>
							<view class="attr-box">
								{{ goodsItem.attrInfo ? goodsItem.attrInfo.suk : '' }} x {{ goodsItem.cart_num + '' + (goodsItem.productInfo.unit_name ||'') }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="row b-b flex">
			<text class="tit">订单总价</text>
			<view class="input">￥{{ payAllMoney }}</view>
		</view>
		<view class="row b-b flex" v-if="vipMoney > 0">
			<text class="tit">vip优惠</text>
			<view class="input">-￥{{ vipMoney }}</view>
		</view>
		<view class="row b-b flex">
			<text class="tit">邮费</text>
			<view class="input">{{ item.pay_postage > 0 ? '￥' + item.pay_postage : '免邮费' }}</view>
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

		<view class="orderDetialBox">
			<view class="f-header m-t">
				<view class="f-left-icon"></view>
				<view class="tit-box"><text class="tit">订单信息</text></view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title">订单编号:</text>
					<view class="text">{{ item.order_id }}</view>
				</view>
				<view class="buttom-right" @click="copyOrderId(item.order_id)">复制单号</view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title">下单时间:</text>
					<view class="text">{{ item._add_time }}</view>
				</view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title">订单类型:</text>
					<view class="text">{{ item | orderType }}</view>
				</view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title">订单状态:</text>
					<view class="text">{{ item._status._title || '' }}</view>
				</view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title">支付方式:</text>
					<view class="text">{{ item._status._payType||""  }}</view>
				</view>
			</view>
		</view>

		<view class="orderDetialBox" v-if="item.delivery_id">
			<view class="item flex">
				<view class="title-left flex">
					<text class="title">配送方式:</text>
					<view class="text">{{ item.delivery_type == 'express' ? '发货' : item.delivery_type == 'send' ? '送货' : '' }}</view>
				</view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title" v-if="item.delivery_type == 'express'">快递公司:</text>
					<text class="title" v-if="item.delivery_type == 'send'">送货人员:</text>
					<view class="text">{{ item.delivery_name }}</view>
				</view>
				<view v-if="status._type != 1 && status._type != 0" class="buttom-right" @click="towuliu(item)">查看物流</view>
			</view>
			<view class="item flex">
				<view class="title-left flex">
					<text class="title" v-if="item.delivery_type == 'express'">快递单号:</text>
					<text class="title" v-if="item.delivery_type == 'send'">联系方式:</text>
					<view class="text">{{ item.delivery_id }}</view>
				</view>
			</view>
		</view>
		<view class="btHeight">
			
		</view>
		<view class="group-nav flex bg-white b-t" v-if="item.combination_id>0">
			<navigator :url="'/pages/groupBooking/detail?id='+item.pink_id">
				<view class="bottom  border-radius-all bg-danger text-white padding-c-30 font-size-lg padding-v-10">查看拼团</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import { orderDetail } from '@/api/order.js';
export default {
	filters: {
		orderType: function(item) {
			if (item.combination_id > 0) {
				return '拼团订单';
			} else if (item.seckill_id > 0) {
				return '秒杀订单';
			} else if (item.bargain_id > 0) {
				return '砍价订单';
			} else {
				return '普通订单';
			}
		}
	},
	data() {
		return {
			refund: '', //退款理由
			reason: '', //备注
			value: ['1', '2', '3', '4', '5', '6', '7', '8', 9, 10, 11, 12, 13],
			orderId: '',
			item: {
				_status: {}
			},
			vipMoney: 0, //vip优惠金额
			addressImg:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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'
		};
	},
	// #ifdef APP-PLUS || H5
	onBackPress(e){
		uni.navigateTo({
			url: '/pages/order/order?state='+this.item._status._type
		});
		return true;  
	},
	// #endif
	onLoad(option) {
		this.orderId = option.id;
		this.loadOrder();
	},
	computed: {
		payAllMoney() {
			return this.vipMoney + +this.item.total_price;
		}
	},
	methods: {
		// 载入订单详细
		loadOrder() {
			let obj = this;
			orderDetail({}, obj.orderId).then(e => {
				obj.item = e.data;
				obj.item.cartInfo.forEach(e => {
					// 计算vip优惠金额
					obj.vipMoney += e.vip_truePrice;
				});
				console.log(e);
			});
		},
		// 查看快递单号
		towuliu(item){
			let delivery_id = item.delivery_id;
			 window.location.href = "https://m.kuaidi100.com/result.jsp?nu="+ delivery_id
		},
		// 复制订单编号
		copyOrderId(text) {
			// #ifndef H5
			uni.setClipboardData({
				data: text,
				success: e => {
					uni.showToast({
						title: '复制成功',
						duration: 1500
					});
				}
			});
			// #endif
			// #ifdef H5
			let inputH = document.querySelector('#copyOrder input');
			// 获取需要复制的文字
			const copyStr = text;
			// 创建input标签存放需要复制的文字
			const oInput = document.createElement('input');
			// 把文字放进input中，供复制
			oInput.value = copyStr;
			// 添加文
			document.body.appendChild(oInput);
			// 选中创建的input
			oInput.select();
			// 执行复制方法， 该方法返回bool类型的结果，告诉我们是否复制成功
			const copyResult = document.execCommand('copy');
			// 操作中完成后 从Dom中删除创建的input
			document.body.removeChild(oInput);
			// 根据返回的复制结果 给用户不同的提示
			if (copyResult) {
				uni.showToast({
					title: '已复制到粘贴板',
					duration: 2000
				});
			} else {
				this.$api.msg('复制失败');
			}
			// #endif
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}

// 订单详细
.orderDetialBox {
	margin-top: 20rpx;
	padding: 0 30rpx;
	background-color: #ffffff;
	font-size: $font-base;
	color: $font-color-base;
	.item {
		height: 80rpx;
		.text {
			padding-left: 10rpx;
		}
		.buttom-right {
			width: 180rpx;
			border-radius: 99rpx;
			padding: 10rpx;
			text-align: center;
			border: 1px solid $border-color-light;
		}
	}
}
// 地址信息
.address-box {
	margin-top: 20rpx;
	padding: 30rpx;
	padding-bottom: 35rpx;
	background-color: #ffffff;
	line-height: 1;
	.address-top {
		margin-bottom: 30rpx;
		.title {
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.phone {
			font-size: $font-base;
			color: $font-color-light;
		}
	}
	.addrdss-detail {
		font-size: $font-base;
		color: $font-color-base;
	}
	.a-bg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5rpx;
	}
}

.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30rpx;
	height: 80rpx;
	background: #fff;
	.order-status {
		font-size: $font-lg;
		color: $color-red;
		font-weight: 500;
	}
	.refund {
		font-size: 30rpx;
		color: $font-color-dark;
	}
	.noRefund {
		font-size: 30rpx;
		color: $font-color-light;
	}
	.tit {
		flex-shrink: 0;
		width: 120rpx;
		font-size: 30rpx;
		color: $font-color-dark;
	}
	.input {
		text-align: right;
		flex: 1;
		font-size: 30rpx;
		color: $font-color-dark;
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
	margin-top: 20rpx;
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
			height: 100%;
			.title {
				align-self: flex-start;
				font-size: $font-base + 2rpx;
				color: $font-color-dark;
			}
			.title-right {
				flex-shrink: 0;
				text-align: right;
				align-self: flex-start;
			}
			.attr-box {
				font-size: $font-sm + 2rpx;
				color: $font-color-light;
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
// 标题头
.f-header {
	display: flex;
	align-items: center;
	height: 80rpx;
	.tit-box {
		@extend %font-title-box;
	}
	.tit {
		@extend %font-title;
	}
	.f-left-icon {
		@extend %f-left-icon;
	}
}
// 共有底部高度
$btHeight:100rpx;
.btHeight{
	height: $btHeight;
}
// 拼团按钮
.group-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	height:$btHeight;
	width: 100%;
	justify-content: flex-end;
	padding-right: 30rpx;
	.bottom {
	}
}
</style>
