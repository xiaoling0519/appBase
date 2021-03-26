<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="input-box flex" @click="clickSearch">
			<view class=" input-content flex">
				<view class="iconfont iconsearch"></view>
				<view class="input"><input type="text" disabled placeholder="请输入搜索内容" /></view>
			</view>
		</view>
		<view class="mp-height"></view>
		<!-- #endif -->
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{ backgroundColor: '#5DBC7C' }"></view>
			<swiper class="carousel" autoplay="true" duration="400" interval="5000" @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="bannerNavToUrl(item)"><image :src="item.pic" /></swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{ swiperCurrent + 1 }}</text>
				<text class="sign">/</text>
				<text class="num">{{ swiperLength }}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item">
				<image src="/static/icon/c3.png"></image>
				<text>联盟礼包</text>
			</view>
			<navigator url="/pages/groupBooking/index">
				<view class="cate-item">
					<image src="/static/icon/c5.png"></image>
					<text>超值拼团</text>
				</view>
			</navigator>
			<navigator url="/pages/seckill/seckill">
				<view class="cate-item">
					<image src="/static/icon/c7.png"></image>
					<text>限时秒杀</text>
				</view>
			</navigator>
			<navigator url="/pages/sign/index">
				<view class="cate-item">
					<image src="/static/icon/c8.png"></image>
					<text>每日签到</text>
				</view>
			</navigator>
		</view>

		<view class="ad-1"><image src="/static/temp/ad1.jpg" mode="scaleToFill"></image></view>
		<scroll-view class="coupon-box clamp" :scroll-x="true">
			<view v-for="(item, index) in couponArray" :key="item.id" class="coupon-list">
				<view class="row flex">
					<view class="list-money flex">
						<image :src="item.is_use ? '/static/img/img02.png' : '/static/img/img03.png'" mode="scaleToFill"></image>
						<view class="list-money-text">
							<view class="tit" :class="{ noAction: item.is_use }">
								<text>{{ item.coupon_price }}</text>
							</view>
						</view>
					</view>
					<view class="list-interval position-relative">
						<view class="bottom"></view>
						<view class="top"></view>
					</view>
					<view class="row_list_right">
						<view class="right_top"><text class="right_title" :class="{ noAction: item.is_use }">满减券</text></view>
						<view class="right_time">
							<text>满{{ item.use_min_price }}使用</text>
						</view>
					</view>
					<view class="right_use" :class="{ noAction: item.is_use }" @click="setCoupons(item)">
						<text>{{ item.is_use ? '已领取' : '立即领取' }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 秒杀楼层 -->
		<seckill></seckill>
		<!-- 拼团楼层 -->

		<view class="recommend flex">
			<view class="recommend_list" @click="change(ls.id)" v-for="ls in recommend">
				<view class="re_title" v-bind:class="{ active_color: ls.id == checkid }">{{ ls.re_title }}</view>
				<view class="re_name" v-bind:class="{ active_color: ls.id == checkid }">{{ ls.re_name }}</view>
				<image class="selected_icon" v-bind:class="{ active: ls.id == checkid }" src="/static/img/img04.png"></image>
			</view>
		</view>
		<swiper id="list-box" @change="listChange" :style="{ height: swiperHeight + 'px' }" :current="checkid">
			<swiper-item>
				<!-- <scroll-view scroll-y="true" class="list-box-h"> -->
				<view class="guess-section">
					<view v-for="(item, index) in bastList" :key="index" class="guess-item" @click="navToDetailPage(item)">
						<view class="image-wrapper"><image :src="item.image" mode="scaleToFill"></image></view>
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
				<!-- </scroll-view> -->
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="list-box-h">
					<view class="guess-section">
						<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
							<view class="image-wrapper"><image :src="item.image" mode="scaleToFill"></image></view>
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
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="guess-section">
						<view v-for="(item, index) in bastBanner" :key="index" class="guess-item" @click="navToDetailPage(item)">
							<navigator :url="item.link">
								<view class="image-wrapper"><image :src="item.image" mode="scaleToFill"></image></view>
								<text class="title clamp margin-c-20">{{ item.store_name }}</text>
								<view class="cmy-hr"></view>
								<view class="price margin-c-20 flex">
									<view>
										<text class="font-size-sm ">￥</text>
										{{ item.price }}
									</view>
									<view class="font-size-sm">
										<text class="font-color-gray">库存{{ item.stock + item.unit_name }}</text>
									</view>
								</view>
							</navigator>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

		<!-- 精品 商品 -->
		<view class="f-header m-t">
			<view class="f-left-icon"></view>
			<view class="tit-box"><text class="tit">精品推荐</text></view>
			<navigator url="/pages/product/classify?type=1"><text class="iconfont iconenter">更多</text></navigator>
		</view>
		<view class="guess-section">
			<view v-for="(item, index) in bastList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="item.image" mode="scaleToFill"></image></view>
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
		<!-- 最新 商品 -->
		<view class="f-header m-t">
			<view class="f-left-icon"></view>
			<view class="tit-box"><text class="tit">最新商品</text></view>
			<navigator url="/pages/product/classify?type=3"><text class="iconfont iconenter">更多</text></navigator>
		</view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="item.image" mode="scaleToFill"></image></view>
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
		<!-- 促销 商品 -->
		<view class="f-header m-t">
			<view class="f-left-icon"></view>
			<view class="tit-box"><text class="tit">促销商品</text></view>
			<navigator url="/pages/product/classify?type=4"><text class="iconfont iconenter">更多</text></navigator>
		</view>
		<view class="guess-section">
			<view v-for="(item, index) in bastBanner" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="item.image" mode="scaleToFill"></image></view>
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
		<!-- 会员升级专区 -->
		<!-- <view class="f-header m-t">
			<view class="f-left-icon"></view>
			<view class="tit-box"><text class="tit">会员升级专区</text></view>
			<text class="iconfont iconenter">更多</text>
		</view> -->
		<!-- <view class="uservip flex">
			<image @error="onImageError('userServant', 0)" lazy-load :src="userServant[0].image" mode="aspectFill"></image>
			<view class="detail">
				<view class="title">满园春1999元会员升级礼包</view>
				<view class="icon">自营</view>
				<view class="flex price-box">
					<view class="price">
						<text class="font-size-sm">￥</text>
						18888
					</view>
					<view class="text">115人购买</view>
				</view>
			</view>
		</view> -->

		<!-- 精品推荐 -->
		<!-- <view class="f-header m-t">
			<view class="f-left-icon"></view>
			<view class="tit-box"><text class="tit">精品推荐</text></view>
			<text class="iconfont iconenter">更多</text>
		</view> -->
		<!-- <view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image @error="onImageError('goodsList', index)" lazy-load :src="item.image" mode="aspectFill"></image></view>
				<text class="title clamp margin-c-20">
					<text class="icon">自营</text>
					{{ item.title }}
				</text>
				<view class="hr"></view>
				<view class="price margin-c-20 flex">
					<view>
						<text class="font-size-sm ">￥</text>
						{{ item.price }}
					</view>
					<view class="font-size-sm">
						<view class='detail'>
							<text class="icon">代理价</text>
							<text></text>
						</view>
						<view class="detail">
							<text class="font-color-yellow">会员价</text>
							<text class="font-color-yellow">7.5折</text>
						</view>
					</view>
				</view>
				<view class="tip">兑换价￥44+44积分</view>
			</view>
		</view> -->
	</view>
</template>

<script>
import seckill from './seckill';
import { loadIndexs } from '@/api/index.js';
import { setCoupons } from '@/api/coupon.js';
import { interceptor } from '@/utils/loginUtils';
import { mapState } from 'vuex';
export default {
	components: {
		seckill
	},
	watch: {
		//自适应swiper高度
		checkid(newValue, oldValue) {
			let obj = this;
			if (newValue == 0) {
				let bHeight = Math.ceil(obj.bastList.length / 2);
				obj.swiperHeight = Math.ceil(obj.pageProportion * 520 * bHeight);
			}
			if (newValue == 1) {
				let bHeight = Math.ceil(obj.goodsList.length / 2);
				obj.swiperHeight = Math.ceil(obj.pageProportion * 520 * bHeight);
			}
			if (newValue == 2) {
				let bHeight = Math.ceil(obj.bastBanner.length / 2);
				obj.swiperHeight = Math.ceil(obj.pageProportion * 520 * bHeight);
			}
		},
		// 初次加载页面高度时修改页面高度
		bastList(newValue, oldValue) {
			let obj = this;
			let bHeight = Math.ceil(newValue.length / 2);
			obj.$nextTick(function() {
				uni.createSelectorQuery()
					.select('#list-box')
					.fields(
						{
							size: true
						},
						function(data) {
							obj.pageProportion = data.width / 750;
							obj.swiperHeight = Math.ceil(obj.pageProportion * 520 * bHeight);
						}
					)
					.exec();
			});
		}
	},
	data() {
		return {
			pageProportion: 0, //保存页面基于750宽度的比例
			swiperHeight: 0,
			checkid: 0,
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [], //轮播列表
			goodsList: [], //最新商品列表
			bastList: [], //精品推荐列表
			bastBanner: [], //促销商品列表
			menusList: [], //头部菜单
			userServant: [
				{
					image: ''
				}
			], //用户推广服务
			couponArray: [], //可领取优惠券
			recommend: [
				{
					id: 0,
					re_title: '精选',
					re_name: '为你推荐'
				},
				{
					id: 1,
					re_title: '最新',
					re_name: '最新好货优选'
				},
				{
					id: 2,
					re_title: '便宜好货',
					re_name: '90天便宜好货'
				}
			],
			actTime: new Date()
		};
	},
	computed: {
		...mapState(['loginInterceptor']),
		...mapState('user', ['hasLogin'])
	},
	onLoad: function(option) {
		// #ifndef MP
		if (option.spread) {
			// 存储其他邀请人
			uni.setStorageSync('spread', option.spread);
		}
		// #endif
		// #ifdef MP
		if (option.scene) {
			// 存储小程序邀请人
			uni.setStorage({
				key: 'spread_code',
				data: option.scene
			});
		}
		// #endif
	},
	onShow: function() {
		// 判断是否强制登录
		if (this.loginInterceptor && !this.hasLogin) {
			// 登录拦截
			interceptor();
		}
		this.loadData();
	},
	//下拉刷新
	onPullDownRefresh() {
		this.loadData();
	},
	// #ifndef MP
	// 监听导航栏输入框点击事件
	onNavigationBarSearchInputClicked(e) {
		//跳转到搜索页面
		this.clickSearch();
	},
	//点击导航栏 buttons 时触发
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.$api.msg('点击了扫描');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			uni.navigateTo({
				url: '/pages/notice/notice'
			});
		}
	},
	// #endif
	methods: {
		// 监听切换事件
		listChange(e) {
			this.checkid = e.detail.current;
		},
		// 點擊搜索框
		clickSearch() {
			uni.navigateTo({
				url: '/pages/product/search'
			});
		},
		// 点击触发领取优惠券
		setCoupons(item) {
			// 判断是否已经领取了优惠券
			let obj = this;
			uni.showModal({
				title: '领取提示',
				content: '是否领取优惠券',
				success(e) {
					if (e.confirm) {
						setCoupons({ couponId: item.id }).then(e => {
							item.is_use = true;
							uni.showToast({
								title: '领取成功',
								type: 'top',
								duration: 2000
							});
						});
					}
				}
			});
		},
		//商品种类切换
		change(item) {
			let id = item;
			this.checkid = id;
			if (this.checkid == 1) {
				// console.log(1);
				this.detail = this.selected_detail;
			} else if (this.checkid == 2) {
				// console.log(2);
				this.detail = this.new_product;
			} else {
				this.detail = this.cheap_good;
			}
		},
		// 监听图片加载完成
		onImageError(key, index) {
			this[key][index].image = '/static/error/errorImage.jpg';
		},
		// 请求载入数据
		async loadData() {
			loadIndexs({})
				.then(({ data }) => {
					let goods = data.info;
					this.carouselList = data.banner;
					this.swiperLength = this.carouselList.length;
					this.menusList = data.menus;
					this.goodsList = goods.firstList; //最新商品
					this.bastList = goods.bastList; //精品推荐
					this.bastBanner = data.benefit; //促销单品
					this.$set(this, 'couponArray', data.couponList); //保存卡包券

					uni.stopPullDownRefresh();
				})
				.catch(e => {
					uni.stopPullDownRefresh();
				});
		},
		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			this.titleNViewBackground = this.carouselList[index].background;
		},
		//详情页
		navToDetailPage(item) {
			let id = item.id;
			uni.navigateTo({
				url: '/pages/product/product?id=' + id
			});
		},

		// 轮播图跳转
		bannerNavToUrl(item) {
			// #ifdef H5
			if (item.wap_url.indexOf('http') > 0) {
				window.location.href = item.wap_url;
			}
			// #endif
			//测试数据没有写id，用title代替
			uni.navigateTo({
				url: item.wap_url
			});
		}
	}
};
</script>

<style lang="scss">
/* #ifdef MP */
.mp-height {
	height: 44px;
}
.input-box {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 25rpx;
	background-color: #ffffff;
	z-index: 999;
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
page {
	.cate-section {
		position: relative;
		z-index: 5;
		border-radius: 16rpx 16rpx 0 0;
		margin-top: -20rpx;
	}
	.carousel-section {
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
		.carousel {
			.carousel-item {
				padding: 0;
			}
		}
		.swiper-dots {
			left: 45rpx;
			bottom: 40rpx;
		}
	}
}
/* #endif */

page {
	background: #f7f8f7;
}
.m-t {
	margin-top: 16rpx;
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;
	padding-top: 10px;
	overflow: hidden;

	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 426rpx;
		transition: 0.4s;
	}
	.carousel {
		width: 100%;
		height: 240rpx;
		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28rpx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: $border-radius-sm;
		}
	}
}
.swiper-dots {
	display: flex;
	position: absolute;
	left: 60rpx;
	bottom: 15rpx;
	width: 72rpx;
	height: 36rpx;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
	background-size: 100% 100%;
	.num {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50px;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
		line-height: 36rpx;
	}

	.sign {
		position: absolute;
		top: 0;
		left: 50%;
		line-height: 36rpx;
		font-size: 12rpx;
		color: #fff;
		transform: translateX(-50%);
	}
}
/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30rpx 22rpx;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2rpx;
		color: $font-color-dark;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88rpx;
		height: 88rpx;
		margin-bottom: 14rpx;
		border-radius: 50%;
		opacity: 0.7;
	}
}
// 中间广告图片
.ad-1 {
	width: 100%;
	height: 210rpx;
	padding: 10rpx 0;
	background: #fff;
	image {
		width: 100%;
		height: 100%;
	}
}
/*公用边框样式*/
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
.f-header {
	display: flex;
	align-items: center;
	height: 92rpx;
	padding: 6rpx 30rpx 8rpx;
	image {
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}
	.tit-box {
		@extend %font-title-box;
	}
	.tit {
		@extend %font-title;
	}
	.iconenter {
		font-size: $font-lg + 2rpx;
		color: $font-color-light;
	}
	.f-left-icon {
		@extend %f-left-icon;
	}
	.iconfont {
		font-size: $font-sm - 2rpx;
	}
}
// 会员升级礼包
.uservip {
	border-radius: $border-radius-sm;
	background-color: white;
	box-shadow: $box-shadow;
	height: 300rpx;
	margin: 0 30rpx;
	image {
		height: 100%;
		width: 300rpx;
	}
	.detail {
		position: relative;
		padding: 20rpx;
		height: 100%;
		.icon {
			@extend %icon;
		}
		.price-box {
			position: absolute;
			bottom: 20rpx;
			width: calc(100% - 40rpx);
			.price {
				font-size: $font-lg + 2rpx;
				font-weight: bold;
				color: $font-color-base;
			}
			.text {
				color: $color-gray;
				font-size: $font-sm;
			}
		}
		.title {
			font-size: $font-lg;
			font-weight: bold;
		}
	}
}

/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30rpx;
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

// 推荐
.recommend {
	width: 95%;
	height: 155rpx;
	margin: 0rpx auto;
	padding-top: 30rpx;
	font-size: 26rpx;
	text-align: center;
	color: #333333;
	align-items: flex-start;

	.recommend_list {
		width: 33%;
	}
	.re_title {
		font-size: 32rpx;
		font-weight: bold;
	}
	.re_name {
		color: #999999;
		padding-top: 10rpx;
	}
	.selected_icon {
		width: 25rpx;
		height: 10rpx;
		margin: 0px auto;
		display: none;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.active {
		display: block;
	}
	.active_color {
		color: #dc4d46 !important;
	}
}

// 列表
.list-box-h {
	height: 1550rpx;
}
// 优惠券
.coupon-list {
	display: inline-block;
}
.row {
	border-radius: 15rpx;
	margin: 25rpx;
	height: 155rpx;
	// width: 552rpx;
	overflow: hidden;
	background-color: #ffffff;
	padding-right: 25rpx;
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
		min-width: 155rpx;
		text-align: center;
		image {
			height: 100%;
			width: 20rpx;
		}
		.list-money-text {
			flex-grow: 1;
			padding: 0 25rpx;
			.tit {
				text-align: center;
				padding: 15rpx 0rpx;
				font-size: 55rpx;
				color: $color-red;
				font-weight: bold;
				&.noAction {
					color: $font-color-light;
				}
			}
			.price {
				padding-bottom: 25rpx;
				color: $font-color-light;
			}
		}
	}
	.row_list_right {
		// flex-grow: 1;
		min-width: 200rpx;
		padding-left: 25rpx;
		line-height: 1;
		.right_time {
			padding: 10rpx 0rpx;
			color: $font-color-light;
			font-size: $font-sm;
		}
		.right_top {
			margin: 15rpx 0;
			.right_name {
				font-size: $font-base;
				color: #bc253a;
				font-weight: bold;
			}
			.right_title {
				font-size: $font-base;
				color: $font-base;
				font-weight: bold;
				&.noAction {
					color: $font-color-light;
				}
			}
		}
	}
	.right_use {
		margin: 15rpx 0;
		padding: 10rpx;
		width: 160rpx;
		text-align: center;
		color: #fff;
		background-color: #bc253a;
		border-radius: 50rpx;
		font-size: $font-sm;
		&.noAction {
			background-color: $font-color-light;
		}
	}
	.iconlocation {
		font-size: 36rpx;
		color: $font-color-light;
	}
}
</style>
