<template>
	<view class="content">
		<view class="content-money">
			<view class="money-box">
				<view class="text">可提现佣金（元）</view>
				<view class="money">{{ money | getMoneyStyle }}</view>
			</view>
			<view class="moneyTx" @click="navto('./withdrawal')">提现</view>
			<view class="flex buttom-box">
				<view class="buttom" @click="navto('/pages/wallet/recharge')">
					<view class="icon"><image class="icon-img" src="/static/icon/i6.png" mode="aspectFit"></image></view>
					<text>统计</text>
				</view>
				<view class="interval"></view>
				<view class="buttom" @click="navto('./withdrawal')">
					<view class="icon"><image class="icon-img" src="/static/icon/i7.png" mode="aspectFit"></image></view>
					<text>提现</text>
				</view>
			</view>
		</view>
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabCurrentIndex" :style="{'height':maxheight+'px'}" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item, index) in tabItem.orderList" :key="index" class="order-item flex">
						<view class="title-box">
							<view class="title">
								<text>{{ item.title }}</text>
							</view>
							<view class="time">
								<text>{{ item.add_time }}</text>
							</view>
						</view>
						<view class="money">
							<text>{{ (item.pm == 0 ? '-' : '+') + item.number }}</text>
						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { spreadCommission, userBalance } from '@/api/wallet.js';
import { mapState, mapMutations } from 'vuex';
import { getMoneyStyle } from '@/utils/rocessor.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from '@/components/empty';
export default {
	filters: {
		getMoneyStyle
	},
	components: {
		empty,
		uniLoadMore
	},
	onReady() {
		// 初始化获取页面宽度
		uni.createSelectorQuery()
			.select('.content')
			.fields(
				{
					size: true
				},
				data => {
					console.log(data);
					console.log(Math.floor((data.width / 750) * 300));
					// 保存头部高度
					this.maxheight =data.height - Math.floor((data.width / 750) * 570);
					console.log(this.maxheight);
				}
			)
			.exec();
	},
	data() {
		return {
			// 头部图高度
			maxheight:'',
			tabCurrentIndex: 0,
			navList: [
				{
					state: 0,
					text: '收入',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				},
				{
					state: 1,
					text: '支出',
					loadingType: 'more',
					orderList: [],
					page: 1, //当前页数
					limit: 10 //每次信息条数
				}
			],
			money: ''
		};
	},
	onLoad(options) {},
	onShow() {
		this.loadData();
		// 获取用户余额
		userBalance({}).then(({ data }) => {
			this.money = data.commissionCount;
		});
	},
	methods: {
		// 页面跳转
		navto(e) {
			uni.navigateTo({
				url: e
			});
		},
		//获取收入支出信息
		async loadData(source) {
			//这里是将订单挂载到tab列表下
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			let state = navItem.state+3;
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

			spreadCommission(
				{
					page: navItem.page,
					limit: navItem.limit
				},
				state
			)
				.then(({ data }) => {
					if (data.length > 0) {
						navItem.orderList = navItem.orderList.concat(data[0].list);
						console.log(navItem.orderList);
						navItem.page++;
					}
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
page {
	background: #ffffff;
	height: 100%;
}
.content-money {
	padding-bottom: 30rpx;
	background: $page-color-base;
	.moneyTx{
		position: absolute;
		top: 150rpx;
		right: 0rpx;
		width: 150rpx;
		padding:10rpx 30rpx;
		border: 2px solid #FFFFFF;
		border-top-left-radius: 99rpx;
		border-bottom-left-radius: 99rpx;
		color: #FFFFFF;
		line-height: 1;
		font-size: $font-base;
	}
	.buttom-box {
		background-color: #ffffff;
		text-align: center;
		margin: 0 30rpx;
		padding: 20rpx 0;
		border-radius: $border-radius-sm;
		margin-top: -60rpx;
		.buttom {
			font-size: $font-lg;
			flex-grow: 1;
		}
		.interval {
			width: 2px;
			height: 60rpx;
			background-color: #eeeeee;
		}
		.icon {
			height: 50rpx;
			width: 48rpx;
			margin: 0 auto;
			.icon-img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.money-box {
	background-color: $base-color;
	padding-top: var(--status-bar-height);
	height: 368rpx;
	color: #ffffff;
	text-align: center;
	.text {
		padding-top: 147rpx;
		font-size: $font-sm;
	}
	.money {
		font-size: 56rpx;
	}
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
// 列表

.swiper-box {
	padding-top: 10rpx;
	.order-item {
		padding: 20rpx 30rpx;
		line-height: 1.5;
		.title-box {
			.title {
				font-size: $font-lg;
				color: $font-color-base;
			}
			.time {
				font-size: $font-base;
				color: $font-color-light;
			}
		}
		.money {
			color: #fd5b23;
			font-size: $font-lg;
		}
	}
}
.list-scroll-content {
	height: 100%;
}
.content {
	height: 100%;
	.empty-content {
		background-color: #ffffff;
	}
}
</style>
