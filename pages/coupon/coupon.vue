<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<!-- 空白页 -->
				<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
				<view v-for="(item, index) in tabItem.orderList" :key="index" class="row flex">
					<view class="list-money flex">
						<image :src="item._type == 2 ? '/static/img/img03.png' : '/static/img/img02.png'" mode="scaleToFill"></image>
						<view class="list-money-text">
							<view class="tit" :class="{ action: item._type == 2 }">
								<text>{{ item.coupon_price }}</text>
							</view>
							<view class="price">
								<text>满{{ item.use_min_price }}元</text>
							</view>
						</view>
					</view>
					<view class="list-interval position-relative">
						<view class="bottom"></view>
						<view class="top"></view>
					</view>
					<view class="row_list_right">
						<view class="right_top">
							<!-- <text class="right_name">【满减券】</text> -->
							<text class="right_title" :class="{ action: item._type == 2 }">{{ item.coupon_title }}</text>
						</view>
						<view class="right_time">
							<text>{{ item._add_time }}-{{ item._end_time }}</text>
						</view>
						<view class="right_use action" v-if="item._type == 2">
							<text>{{ item._msg }}</text>
						</view>
						<view class="right_use noAction" v-if="item._type == 0">
							<text>{{ item._msg }}</text>
						</view>
					</view>
				</view>
				<uni-load-more :status="tabItem.loadingType"></uni-load-more>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from '@/components/empty';
import { getCouponsList } from '@/api/coupon.js';
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
					text: '全部',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 1,
					text: '未使用',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 2,
					text: '已使用',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				}
			]
		};
	},
	onLoad(options) {
		this.loadData();
	},
	methods: {
		// 返回首页
		navTo() {
			uni.switchTab({
				url: '/pages/index/index'
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
			// 修改当前对象状态为加载中
			navItem.loadingType = 'loading';
			getCouponsList(
				{
					page: navItem.page,
					limit: navItem.limit
				},
				index
			)
				.then(({ data }) => {
					let da = data.map(e => {
						e.coupon_price = +e.coupon_price.replace(',', '');
						e.use_min_price = +e.use_min_price.replace(',', '');
						return e;
					});
					navItem.orderList = navItem.orderList.concat(da);
					console.log(navItem.orderList);
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
		}
	}
};
</script>

<style lang="scss">
// 卡卷可用时颜色
$card-color-action: #fc4141;

.swiper-box {
	height: calc(100% - 40px);
	.tab-content {
		padding: 25rpx 0px;
		font-size: 28rpx;
		color: #1b1b1b;
	}
}
.row {
	border-radius: 15rpx;
	margin: 0 25rpx;
	margin-bottom: 25rpx;
	height: 200rpx;
	overflow: hidden;
	background-color: #ffffff;
	.list-interval {
		border: 1px dashed $border-color-light;
		height: 100%;
		.top,
		.bottom {
			border-radius: 100rpx;
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			background-color: $page-color-base;
			right: -15rpx;
		}
		.top {
			top: -18rpx;
		}
		.bottom {
			bottom: -18rpx;
		}
	}
	.list-money {
		height: 100%;
		image {
			height: 100%;
			width: 20rpx;
		}
		.list-money-text {
			width: 220rpx;
			padding: 0 25rpx;
			text-align: center;
			color: $font-color-light;
			.tit {
				padding: 15rpx 0rpx;
				font-size: 55rpx;
				font-weight: bold;
				&.action {
					color: $card-color-action;
				}
			}
			.price {
				padding-bottom: 25rpx;
			}
		}
	}
	.row_list_right {
		flex-grow: 1;
		padding-left: 25rpx;
		line-height: 1;
		.right_time {
			color: $font-color-light;
			font-size: $font-sm;
		}
		.right_use {
			margin: 15rpx 0;
			padding: 10rpx;
			width: 140rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: $font-sm - 4rpx;
			&.action {
				background-color: $card-color-action;
			}
			&.noAction {
				background-color: $color-gray;
			}
		}
		.right_top {
			margin: 15rpx 0;
			font-size: $font-lg;
			height: 50rpx;
			color: $font-color-light;
			.right_name {
				font-weight: bold;
			}
			.right_title {
				font-weight: bold;
				&.action {
					color: $font-color-base;
				}
			}
		}
	}

	.iconlocation {
		font-size: 36rpx;
		color: $font-color-light;
	}
}
page,
.content {
	background: $page-color-base;
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
			color: #bc253a;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid #bc253a;
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
</style>
