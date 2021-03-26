<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="carousel" autoplay="true" duration="400" interval="5000">
				<swiper-item v-for="(item, index) in bannerImg" :key="index" class="carousel-item" @click="bannerNavToUrl(item)">
					<image :src="item.img" mode=" scaleToFill" />
				</swiper-item>
			</swiper>
		</view>
		<view class="type-title-box flex">
			<view class="title-border"></view>
			<view class="title-content">
				<text v-if="type == 1">精品推荐</text>
				<text v-if="type == 2">热门榜单</text>
				<text v-if="type == 3">首发新品</text>
				<text v-if="type == 4">促销单品</text>
			</view>
			<view class="title-border"></view>
		</view>

		<view class="goodsList-box">
			<view class="goodsList-item flex" :key="ind" v-for="(ls, ind) in list">
				<image :src="ls.image" mode=" scaleToFill"></image>
				<view class="goodsList-content">
					<view class="title">
						<text>{{ ls.store_name }}</text>
					</view>
					<view class="goods-money flex">
						<view class="money-box">
							<view class="money">
								<text class="font-size-sm">￥</text>
								{{ ls.price }}
							</view>
							<view class="otMoney-box">
								<text class="otMoney">￥{{ ls.ot_price }}</text>
								<text class="sales">已售{{ ls.sales }}件</text>
							</view>
						</view>
						<view @click="navTo(ls)" class="cart iconfont iconcart"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { groomList } from '@/api/product.js';
export default {
	data() {
		return {
			list: [],
			bannerImg: []
		};
	},
	onLoad(option) {
		// 获取查询对象
		this.type = option.type;
		// 加载基础数据
		this.loadData();
	},
	methods: {
		navTo: function(ls) {
			uni.navigateTo({
				url: '/pages/product/product?id=' + ls.id
			});
		},
		// 请求载入数据
		async loadData() {
			groomList({}, this.type)
				.then(({ data }) => {
					// 保存轮播图
					this.bannerImg = data.banner;
					// 保存商品信息
					this.list = data.list;
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 轮播图跳转
		bannerNavToUrl(item) {
			// #ifdef H5
			if (item.wap_link.indexOf('http') > 0) {
				window.location.href = item.wap_link;
			}
			// #endif
			if (item.wap_link) {
				uni.navigateTo({
					url: item.wap_link
				});
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.carousel-section {
	padding: 0;
	.titleNview-placing {
		padding-top: 0;
		height: 0;
	}
	.swiper-dots {
		left: 45rpx;
		bottom: 40rpx;
	}
	.carousel {
		width: 100%;
		height: 360rpx;
		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
}
// 中间标题样式
.type-title-box {
	padding: 40rpx;
	.title-content {
		height: 100%;
		width: 200rpx;
		text-align: center;
		font-size: $font-lg;
		font-weight: 500;
		color: $font-color-dark;
	}
	.title-border {
		width: 250rpx;
		height: 2rpx;
		background-color: #e9e9e9;
	}
}
// 商品列表
.goodsList-box {
	.goodsList-item {
		margin-bottom: 40rpx;
		background-color: #ffffff;
		padding: 30rpx;
		image {
			flex-shrink: 0;
			border-radius: $border-radius-sm;
			height: 180rpx;
			width: 180rpx;
		}
		.goodsList-content {
			margin-left: 20rpx;
			flex-grow: 1;
			height: 180rpx;
			position: relative;
			.title {
				font-size: $font-base;
				color: $font-color-dark;
				font-weight: 500;
			}
			.goods-money {
				position: absolute;
				left: 0;
				bottom: 0;
				width:100%;
				.money-box {
					.money {
						font-size: $font-lg;
						color: $color-red;
						font-weight: bold;
					}
					.otMoney-box {
						font-size: $font-sm;
						.otMoney {
							color: $font-color-dark;
							padding-right: 20rpx;
						}
						.sales {
							color: $font-color-light;
						}
					}
				}
				.cart {
					border: 1px solid $color-red;
					color: $color-red;
					font-size: $font-base;
					font-weight: bold;
					border-radius: 99px;
					width: 55rpx;
					height: 55rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}
</style>
