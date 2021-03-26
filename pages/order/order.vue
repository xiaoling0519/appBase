<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view @click="goToOrderDetail(item)" v-for="(item, index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text class="time">{{ item._add_time }}</text>
							<text class="state" :style="{ color: item.stateTipColor }">{{ item._status._title }}</text>
							<text v-if="item.status === 4" class="del-btn iconfont icondelete" @click="deleteOrder(index)"></text>
						</view>

						<scroll-view v-if="item.cartInfo.length > 1" class="goods-box" scroll-x>
							<view v-for="(goodsItem, goodsIndex) in item.cartInfo" :key="goodsIndex" class="goods-item">
								<image class="goods-img" :src="goodsItem.productInfo.image" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view v-if="item.cartInfo.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.cartInfo" :key="goodsIndex">
							<image class="goods-img" :src="goodsItem.productInfo.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ goodsItem.productInfo.store_name }}</text>
								<text class="attr-box">{{ goodsItem.attrInfo ? goodsItem.attrInfo.suk : '' }} x {{ goodsItem.cart_num }}</text>
								<text class="price">{{ moneyNum(goodsItem.productInfo.price)}}</text>
							</view>
						</view>

						<view class="price-box">
							共
							<text class="num">{{ item.cartInfo.length }}</text>
							件商品 邮费
							<text class="price">{{ moneyNum(item.pay_postage)}}</text>
							实付款
							<text class="price">{{ moneyNum(item.pay_price)}}</text>
						</view>
						<view class="action-box b-t" v-if="item.status != 5">
							<button v-if="item._status._title == '未支付'" class="action-btn" @click.stop="cancelOrder(item)">取消订单</button>
							<button v-if="item._status._title == '未支付'" @click.stop="orderPay(item)" class="action-btn recom">立即支付</button>
							<button v-if="item._status._title == 3" class="action-btn">评价</button>
							<button v-if="item._status._title == '待收货'" @click.stop="orderTake(item, index)" class="action-btn">确认收货</button>
							<button v-if="item._status._title == '未发货'" class="action-btn" @click.stop="orderRefund(item)">申请退款</button>
						</view>
					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from '@/components/empty';
import { orderList, orderCancel, orderDel, orderTake } from '@/api/order.js';
export default {
	components: {
		uniLoadMore,
		empty
	},
	data() {
		return {
			tabCurrentIndex: 0,
			navList: [
				{
					state: 0,
					text: '待付款',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 1,
					text: '待发货',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 2,
					text: '待收货',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 3,
					text: '待评价',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 4,
					text: '已完成',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				}
			]
		};
	},

	onLoad(options) {
		/**
		 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
		 * 替换onLoad下代码即可
		 */
		this.tabCurrentIndex = +options.state;
		// #ifndef MP
		this.loadData();
		// #endif
		// #ifdef MP
		if (options.state == 0) {
			this.loadData();
		}
		// #endif
	},
	// #ifdef APP-PLUS || H5
	onBackPress(e){
		uni.switchTab({
			url: '/pages/user/user',
		});
		return true;
	},
	// #endif
	methods: {
		// 转换金额为数字
		moneyNum(value){
				return +value;
		},
		// 确认收货
		orderTake(item, index) {
			let obj = this;
			uni.showModal({
				title: '是否确认收货？',
				success: () => {
					orderTake({
						uni: item.order_id
					})
						.then(e => {
							obj.navList[obj.tabCurrentIndex].orderList.splice(index, 1);
							uni.showToast({
								title: '收货成功'
							});
						})
						.catch(e => {
							console.log(e);
						});
				}
			});
		},
		//跳转到订单详情
		goToOrderDetail(e) {
			uni.navigateTo({
				url: '/pages/order/orderDetail?id=' + e.order_id
			});
		},
		// 申请退款
		orderRefund(e) {
			uni.navigateTo({
				url: '/pages/order/orderRefund?id=' + e.order_id
			});
		},
		// 订单支付
		orderPay(e) {
			uni.navigateTo({
				url: '/pages/money/pay?type=1&ordid=' + e.order_id + '&money=' + e.pay_price
			});
		},
		//获取订单列表
		loadData(source) {
			//这里是将订单挂载到tab列表下
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			let state = navItem.state;
			if (source === 'tabChange' && navItem.loaded === true) {
				//tab切换只有第一次需要加载数据
				return;
			}
			if (navItem.loadingType === 'loading') {
				//防止重复加载
				return;
			}
			if (navItem.loadingType === 'noMore') {
				//防止重复加载
				return;
			}
			// 修改当前对象状态为加载中
			navItem.loadingType = 'loading';

			orderList({
				type: state,
				page: navItem.page,
				limit: navItem.limit
			})
				.then(({ data }) => {
					let arr = data.map(e => {
						let b = this.orderStateExp(e.status);
						e.stateTip = b.stateTip;
						e.stateTipColor = b.stateTipColor;
						return e;
					});
					navItem.orderList = navItem.orderList.concat(arr);
					// console.log(navItem.orderList);
					navItem.page++;
					if (navItem.limit == data.length) {
						//判断是否还有数据， 有改为 more， 没有改为noMore
						navItem.loadingType = 'more';
						return;
					} else {
						//判断是否还有数据， 有改为 more， 没有改为noMore
						navItem.loadingType = 'noMore';
					}
					uni.hideLoading();
					this.$set(navItem, 'loaded', true);
				})
				.catch(e => {
					console.log(e);
				});
		},

		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
			this.loadData('tabChange');
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		//删除订单
		deleteOrder(index) {
			uni.showLoading({
				title: '请稍后'
			});
			setTimeout(() => {
				this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
				uni.hideLoading();
			}, 600);
		},
		//取消订单
		cancelOrder(item) {
			uni.showModal({
				title: '订单取消',
				content: '是否取消订单？',
				success: e => {
					if (e.confirm) {
						uni.showLoading({
							title: '请稍后'
						});
						orderCancel({ id: item.order_id })
							.then(e => {
								uni.showToast({
									title: '取消成功',
									duration: 2000,
									position: 'top'
								});
							})
							.catch(e => {
								console.log(e);
							});
						//取消订单后删除待付款中该项
						let list = this.navList[this.tabCurrentIndex].orderList;
						let index = list.findIndex(val => val.id === item.id);
						index !== -1 && list.splice(index, 1);
						uni.hideLoading();
					}
				}
			});
		},

		//订单状态文字和颜色
		orderStateExp(state) {
			let stateTip = '',
				stateTipColor = '#fa436a';
			switch (+state) {
				case 0:
					stateTip = '待付款';
					break;
				case 1:
					stateTip = '待发货';
					break;
				case 2:
					stateTip = '待收货';
					break;
				case 3:
					stateTip = '待评价';
					break;
				case 4:
					stateTip = '已完成';
					stateTipColor = '#5dbc7c';
					break;
				case 9:
					stateTip = '订单已关闭';
					stateTipColor = '#909399';
					break;

				//更多自定义
			}
			return { stateTip, stateTipColor };
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	background: $page-color-base;
	height: 100%;
}

.swiper-box {
	height: calc(100% - 40px);
}
.list-scroll-content {
	height: 100%;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: $font-color-dark;
		position: relative;
		&.current {
			color: $base-color;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}

.uni-swiper-item {
	height: auto;
}
.order-item {
	display: flex;
	flex-direction: column;
	padding-left: 30rpx;
	background: #fff;
	margin-top: 16rpx;
	.i-top {
		display: flex;
		align-items: center;
		height: 80rpx;
		padding-right: 30rpx;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;
		.time {
			flex: 1;
		}
		.state {
			color: $base-color;
		}
		.del-btn {
			padding: 10rpx 0 10rpx 36rpx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;
			&:after {
				content: '';
				width: 0;
				height: 30rpx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	/* 多条商品 */
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

	.price-box {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20rpx 30rpx;
		font-size: $font-sm + 2rpx;
		color: $font-color-light;
		.num {
			margin: 0 8rpx;
			color: $font-color-dark;
		}
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2rpx 0 8rpx;
			}
		}
	}
	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100rpx;
		position: relative;
		padding-right: 30rpx;
	}
	.action-btn {
		width: 160rpx;
		height: 60rpx;
		margin: 0;
		margin-left: 24rpx;
		padding: 0;
		text-align: center;
		line-height: 60rpx;
		font-size: $font-sm + 2rpx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after {
			border-radius: 100px;
		}
		&.recom {
			color: $base-color;
			&:after {
				border-color: $base-color;
			}
		}
		&.evaluate {
			color: $color-yellow;
			&:after {
				border-color: $color-yellow;
			}
		}
	}
}

/* load-more */
.uni-load-more {
	display: flex;
	flex-direction: row;
	height: 80rpx;
	align-items: center;
	justify-content: center;
}

.uni-load-more__text {
	font-size: 28rpx;
	color: #999;
}

.uni-load-more__img {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.uni-load-more__img > view {
	position: absolute;
}

.uni-load-more__img > view view {
	width: 6px;
	height: 2px;
	border-top-left-radius: 1px;
	border-bottom-left-radius: 1px;
	background: #999;
	position: absolute;
	opacity: 0.2;
	transform-origin: 50%;
	animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
	transform: rotate(90deg);
	top: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
	transform: rotate(180deg);
	top: 11px;
	right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
	transform: rotate(270deg);
	bottom: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
	top: 11px;
	left: 0;
}

.load1,
.load2,
.load3 {
	height: 24px;
	width: 24px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}

.load1 view:nth-child(1) {
	animation-delay: 0s;
}

.load2 view:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
</style>
