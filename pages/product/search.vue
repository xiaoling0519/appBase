<template>
	<view class="content">
		<!-- 兼容小程序搜索 -->
		<!-- #ifdef MP || APP-PLUS -->
		<view class="vheight"></view>
		<view class="input-box flex">
			<view class=" input-content flex">
				<view class="iconfont iconsearch"></view>
				<view class="input"><input type="text" v-model="keyword" placeholder="请输入搜索内容" /></view>
			</view>
			<view class="input-button flex" @click="navTo"><text>搜索</text></view>
		</view>
		<!-- #endif -->
		<swiper :current="tabCurrentIndex" class="swiper-box " duration="300">
			<swiper-item class="search-hot">
				<view class="title"><text>热门搜索</text></view>
				<view class="hot-list">
					<view @click="clickHotText(ls)" class="list-item" :key="ind" v-for="(ls, ind) in list">
						<text>{{ ls }}</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="search-hot position-relative">
				<view class="navbar">
					<view class="nav-item" @click="defaultSearch()">默认</view>
					<view class="nav-item" :class="{ current: searchType === 1 }" @click="sortTab(1)">
						<text>销量优先</text>
						<view class="p-box">
							<text :class="{ active: searchType === 1 && numberOrder === 1 }" class="iconfont iconfold"></text>
							<text :class="{ active: searchType === 1 && numberOrder === 2 }" class="iconfont iconfold xia"></text>
						</view>
					</view>
					<view class="nav-item" :class="{ current: searchType === 2 }" @click="sortTab(2)">
						<text>价格</text>
						<view class="p-box">
							<text :class="{ active: searchType === 2 && priceOrder === 1 }" class="iconfont iconfold"></text>
							<text :class="{ active: searchType === 2 && priceOrder === 2 }" class="iconfont iconfold xia"></text>
						</view>
					</view>
					<view class="nav-item" :class="{ current: newOrder == 1 }" @click="newGoodsTab()">新品</view>
				</view>
				<scroll-view scroll-y class="cate-list" @scrolltolower='getProducts'>
					<view class="guess-section">
						<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
							<view class="image-wrapper"><image :src="item.image" mode="aspectFill"></image></view>
							<text class="title clamp margin-c-20">{{ item.store_name }}</text>
							<view class="cmy-hr"></view>
							<view class="price margin-c-20 flex">
								<view>
									<text class="font-size-sm ">￥</text>
									{{ item.price }}
								</view>
								<view class="font-size-sm">
									<text class="font-color-gray">{{ item.sales }}人购买</text>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { searchKeyword, getProducts } from '@/api/product.js';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			arrlist: [], //热门关键词
			keyword: '', //关键字
			list: [], //搜索内容
			tabCurrentIndex: 0, //切换
			goodsList: [],
			limit: 6, //每次加载数据条数
			page: 1, //当前页数
			loadingType: 'more', //加载更多状态
			numberOrder: 1, //1 销量从低到高 2销量从高到低
			priceOrder: 1, //1 价格从低到高 2价格从高到低
			newOrder: 0, //0 不是新品 1是新品
			searchType: 0 //0为默认查询 1为销量 2 为价格
		};
	},
	// #ifndef MP
	//点击导航栏 buttons 时触发
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo();
		}
	},
	// 点击键盘搜索事件
	onNavigationBarSearchInputConfirmed(e) {
		this.navTo();
	},
	// 搜索栏内容变化事件
	onNavigationBarSearchInputChanged(e) {
		this.keyword = e.text;
	},
	// #endif
	onLoad() {
		this.loadData();
	},
	//下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.getProducts('refresh');
		},
	methods: {
		// 加载商品
		async getProducts(type, loading) {
			let obj = this;
			// 判断是否为加载数据
			if (type !== 'refresh') {
				//没有更多数据直接跳出方法
				if (obj.loadingType === 'nomore') {
					return;
				} else {
					// 设置当前为数据载入中
					obj.loadingType = 'loading';
				}
			} else {
				//当重新加载数据时更新状态为可继续添加数据
				obj.loadingType = 'more';
			}
			let data = {
				page: obj.page,
				limit: obj.limit,
				news: obj.newOrder,
				keyword: this.keyword
			};
			// 判断是否为销售数量排序
			if (this.searchType === 1) {
				data.salesOrder = obj.numberOrder === 1 ? 'asc' : 'desc';
			}
			// 判断是否为金额排序
			if (this.searchType === 2) {
				data.priceOrder = obj.priceOrder === 1 ? 'asc' : 'desc';
			}
			getProducts(data).then(e => {
				if (type === 'refresh') {
					obj.goodsList = [];
				}
				obj.goodsList = obj.goodsList.concat(e.data);
				//判断是否还有下一页，有是more  没有是nomore
				if (obj.limit == e.data.length) {
					obj.page++;
					obj.loadingType = 'more';
				} else {
					obj.loadingType = 'nomore';
				}
				// 判断是否为刷新数据
				if (type === 'refresh') {
					// 判断是否为点击搜索按钮跳转加载
					if (loading == 1) {
						uni.hideLoading();
					} else {
						uni.stopPullDownRefresh();
					}
				}
			});
		},
		// 点击关键词触发事件
		clickHotText(e) {
			this.keyword = e;
			this.navTo();
		},
		// 加载搜索关键字
		async loadData() {
			searchKeyword({})
				.then(e => {
					this.list = e.data;
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 点击触发搜索事件
		navTo() {
			this.tabCurrentIndex = 1;
			this.infoData()
		},
		// 默认搜索
		defaultSearch() {
			// 初始化查询
			this.numberOrder = '';
			this.priceOrder = '';
			this.newOrder = 0;
			this.searchType = 0;
			this.infoData();
		},
		// 是否为新品
		newGoodsTab() {
			this.newOrder = this.newOrder === 1 ? 0 : 1;
			this.infoData();
		},
		// 排序
		sortTab(nub) {
			this.searchType = nub;
			if (this.searchType === 1) {
				this.numberOrder = this.numberOrder === 1 ? 2 : 1;
			}
			if (this.searchType === 2) {
				this.priceOrder = this.priceOrder === 1 ? 2 : 1;
			}
			this.infoData();
		},
		// 查询切换后初始化
		infoData() {
			// 初始化页数
			this.page = 1;
			// 初始化数组
			uni.pageScrollTo({
				duration: 300,
				scrollTop: 0
			});
			// 加载数据
			this.getProducts('refresh', 1);
			uni.showLoading({
				title: '正在加载'
			});
		},
		navToDetailPage(item) {
			//测试数据没有写id，用title代替
			let id = item.id;
			uni.navigateTo({
				url: '/pages/product/product?id=' + id
			});
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	height: 100%;
	background-color: $page-color-base;
}
/* #ifdef MP || APP-PLUS */
.vheight{
	height: var(--status-bar-height);
	background-color: #FFFFFF;
}
.input-box {
	padding: 25rpx;
	background-color: #ffffff;
	height: 44px;
	.iconsearch {
		font-size: 50rpx;
	}
	.input-content {
		border-radius: 99rpx;
		flex-grow: 1;
		padding: 10rpx 30rpx;
		background-color: rgba(231, 231, 231, 0.7);
		.input {
			flex-grow: 1;
			input {
				font-size: $font-lg;
			}
		}
	}
	.input-button {
		padding-left: 20rpx;
		font-size: $font-lg;
		height: 100%;
	}
}
/* #endif */

.swiper-box {
	/* #ifndef MP */
	height: 100%;
	/* #endif */
	/* #ifdef MP */
	height: calc(100% - 44px);
	/* #endif */
	.search-hot {
		padding: 25rpx;
		.title {
			font-size: $font-lg;
			color: $font-color-light;
		}
		.hot-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;
			.list-item {
				padding: 10rpx 20rpx;
				border: 1px solid $border-color-dark;
				color: $font-color-dark;
				font-size: $font-base;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}
}

// 订单
%icon {
	margin-right: 10rpx;
	display: inline-block;
	padding: 2rpx 10rpx;
	border: 1rpx solid $color-yellow;
	color: $color-yellow;
	line-height: 1;
	font-size: $font-base;
	border-radius: 10rpx;
}
.guess-section {
	display: flex;
	flex-wrap: wrap;
	.guess-item {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 48%;
		margin-bottom: 4%;
		border-radius: $border-radius-sm;
		background-color: white;
		box-shadow: $box-shadow;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330rpx;
		border-radius: 3px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-base;
		color: $font-color-dark;
		font-weight: bold;
		line-height: 80rpx;
	}
	.price {
		font-size: $font-lg;
		color: $font-color-base;
		font-weight: bold;
		line-height: 1;
		line-height: 80rpx;
	}

	.icon {
		@extend %icon;
	}

	.detail {
		line-height: 1;
	}
	.tip {
		color: white;
		background-color: $color-yellow;
		line-height: 1.5;
		font-size: $font-sm;
		padding-left: 20rpx;
	}
}

.navbar {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	width: 100%;
	height: 40px;
	background: #fff;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 30rpx;
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
				width: 120rpx;
				height: 0;
				border-bottom: 4rpx solid $base-color;
			}
		}
	}
	.p-box {
		display: flex;
		flex-direction: column;
		.iconfont {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30rpx;
			height: 14rpx;
			line-height: 1;
			margin-left: 4rpx;
			font-size: 26rpx;
			color: #888;
			&.active {
				color: $base-color;
			}
		}
		.xia {
			transform: scaleY(-1);
		}
	}
	.cate-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 80rpx;
		position: relative;
		font-size: 44rpx;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			border-left: 1px solid #ddd;
			width: 0;
			height: 36rpx;
		}
	}
}
.cate-list {
	height: 100%;
	padding-top: 40px;
}
</style>
