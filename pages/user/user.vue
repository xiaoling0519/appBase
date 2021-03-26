<template>
	<view class="container">
		<view class="vheigh"></view>
		<scroll-view class="content-box" scroll-y="true">
			<view class="user-section">
				<view class="bg"></view>
				<view class="user-info-box ">
					<view class="detail flex" @click="navTo('/pages/userinfo/userinfo')">
						<view class="portrait-box"><image class="portrait" :src="userInfo.avatar || '/static/error/missing-face.png'"></image></view>
						<view class="info-box">
							<view class="username">{{ userInfo.nickname || '游客' }}</view>
							<view class="font-size-sm" v-if="userInfo.uid">邀请码:{{ userInfo.uid }}</view>
						</view>
					</view>
					<view class="config iconfont">
						<text class="setting iconsetting" @click="navTo('/pages/set/set')"></text>
						<text class="message iconmessage" @click="navTo('/pages/notice/notice')"></text>
					</view>
				</view>
				<!-- 会员卡功能 -->
				<view class="vip-card-box">
					<image class="card-bg" src="/static/img/vip-card-bg.png" mode=""></image>
					<view class="b-btn">我要升级</view>
					<view class="tit">
						<text class="iconfont icon-iLinkapp-"></text>
						升级专享优惠权益
					</view>
					<text class="e-m">DCloud Union</text>
					<text class="e-b">开通会员开发无bug 一测就上线</text>
				</view>
			</view>

			<view
				class="cover-container"
				:style="[
					{
						transform: coverTransform,
						transition: coverTransition
					}
				]"
				@touchstart="coverTouchstart"
				@touchmove="coverTouchmove"
				@touchend="coverTouchend"
			>
				<image class="arc" src="/static/img/arc.png"></image>

				<view class="tj-sction">
					<view class="tj-item" @click="navTo('/pages/wallet/wallet')">
						<text class="num">{{ userInfo.now_money || '0.00' }}</text>
						<text>余额</text>
					</view>
					<view class="tj-item" @click="navTo('/pages/award/award')">
						<text class="num">{{ userInfo.brokerage_price || '0.00' }}</text>
						<text>佣金</text>
					</view>
					<view class="tj-item" @click="navTo('/pages/scoreAccumulate/scoreAccumulate')">
						<text class="num">{{ userInfo.integral || '0.00' }}</text>
						<text>积分</text>
					</view>
				</view>
				<!-- 订单 -->

				<view class="item-box">
					<!-- <view class="box-title flex borde-b">
						<view class="title"><text>我的订单</text></view>
						<view class="link" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover">
							<text>全部订单</text>
							<text class="iconfont iconenter"></text>
						</view>
					</view> -->
					<view class="order-section">
						<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
							<view class=" icon position-relative">
								<image class="icon-img" src="/static/icon/i1.png" mode="aspectFit"></image>
								<view class="corner" v-if="orderInfo.unpaid_count > 0">
									<text>{{ orderInfo.unpaid_count }}</text>
								</view>
							</view>
							<text>待付款</text>
						</view>
						<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
							<view class=" icon position-relative">
								<image class="icon-img" src="/static/icon/i2.png" mode="aspectFit"></image>
								<view class="corner" v-if="orderInfo.unshipped_count > 0">
									<text>{{ orderInfo.unshipped_count }}</text>
								</view>
							</view>
							<text>待发货</text>
						</view>
						<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
							<view class="icon position-relative">
								<image class="icon-img" src="/static/icon/i3.png" mode="aspectFit"></image>
								<view class="corner" v-if="orderInfo.received_count > 0">
									<text>{{ orderInfo.received_count }}</text>
								</view>
							</view>
							<text>待收货</text>
						</view>
						<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover" :hover-stay-time="50">
							<view class="icon position-relative">
								<image class="icon-img" src="/static/icon/i4.png" mode="aspectFit"></image>
								<!-- <view class="corner" v-if="orderInfo.complete_count > 0">
									<text>{{ orderInfo.complete_count }}</text>
								</view> -->
							</view>
							<text>已完成</text>
						</view>
					</view>
				</view>
				<view class="item-box">
					<!-- <view class="box-title flex borde-b">
						<view class="title"><text>我的资产</text></view>
					</view> -->
					<view class="order-section">
						<view class="order-item" @click="navTo('/pages/wallet/wallet')" hover-class="common-hover" :hover-stay-time="50">
							<view class="icon"><image class="icon-img" src="/static/icon/u1.png" mode="aspectFit"></image></view>
							<text>我的钱包</text>
						</view>
						<view class="order-item" @click="navTo('/pages/award/award')" hover-class="common-hover" :hover-stay-time="50">
							<view class="icon"><image class="icon-img" src="/static/icon/u2.png" mode="aspectFit"></image></view>
							<text>奖励明细</text>
						</view>
						<view class="order-item" @click="navTo('/pages/award/award')" hover-class="common-hover" :hover-stay-time="50">
							<view class="icon"><image class="icon-img" src="/static/icon/u3.png" mode="aspectFit"></image></view>
							<text>积分明细</text>
						</view>
						<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover" :hover-stay-time="50">
							<view class="icon"><image class="icon-img" src="/static/icon/u4.png" mode="aspectFit"></image></view>
							<text>通用币</text>
						</view>
					</view>
				</view>

				<!-- 浏览历史 -->
				<view class="history-section icon">
					<view class="sec-header">
						<text class="iconfont iconfavor"></text>
						<text>浏览历史</text>
					</view>
					<scroll-view scroll-x class="h-list">
						<image
							class="h-list-image"
							@click="navTo('/pages/product/product')"
							src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
							mode="aspectFill"
						></image>
					</scroll-view>
					<uni-list>
						<uni-list-item title="我的钱包" @click="navTo('/pages/wallet/wallet')" thumb="/static/icon/img11.png"></uni-list-item>
						<uni-list-item title="我的卡卷" @click="navTo('/pages/coupon/coupon')" thumb="/static/icon/img12.png"></uni-list-item>
						<uni-list-item title="我的收藏" @click="navTo('/pages/favorites/favorites')" thumb="/static/icon/img02.png"></uni-list-item>
						<uni-list-item title="商户入驻" @click="navTo('/pages/address/address')" thumb="/static/icon/img05.png"></uni-list-item>
						<uni-list-item title="邀请好友" @click="navTo('/pages/shareQrCode/index')" thumb="/static/icon/img10.png"></uni-list-item>
						<uni-list-item title="关于我们" @click="navTo('/pages/shareQrCode/index')" thumb="/static/icon/img09.png"></uni-list-item>
					</uni-list>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import { orderData, userinfo } from '@/api/user.js';
import { saveUrl, interceptor } from '@/utils/loginUtils.js';
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			userDowm: 0, //卡片升级专属高度
			userMaxDowm: 0 //卡片最高高度
		};
	},
	onShow() {
		// 判断是否已经登录
		if (this.hasLogin) {
			this.loadBaseData();
		}
	},
	onReady() {
		// 初始化获取页面宽度
		uni.createSelectorQuery()
			.select('.container')
			.fields(
				{
					size: true
				},
				data => {
					// 计算最多下拉的高度
					this.userDowm = Math.floor((data.width / 750) * 185);
					// 计算最大触发修改高度事件
					this.userMaxDowm = Math.floor((data.width / 750) * 250);
				}
			)
			.exec();
	},
	// #ifndef MP
	// onNavigationBarButtonTap(e) {
	// 	const index = e.index;
	// 	if (index === 0) {
	// 		this.navTo('/pages/set/set');
	// 	} else if (index === 1) {
	// 		// #ifdef APP-PLUS
	// 		const pages = getCurrentPages();
	// 		const page = pages[pages.length - 1];
	// 		const currentWebview = page.$getAppWebview();
	// 		currentWebview.hideTitleNViewButtonRedDot({
	// 			index
	// 		});
	// 		// #endif
	// 		uni.navigateTo({
	// 			url: '/pages/notice/notice'
	// 		});
	// 	}
	// },
	// #endif
	computed: {
		...mapState('user', ['userInfo', 'orderInfo', 'hasLogin'])
	},
	methods: {
		...mapMutations('user', ['setUserInfo', 'setOrderInfo']),
		// 加载初始数据
		loadBaseData() {
			userinfo({})
				.then(({ data }) => {
					this.setUserInfo(data);
					// 获取用户数据完毕后在获取订单数据防止多次跳转到登录页
					orderData({})
						.then(({ data }) => {
							this.setOrderInfo(data);
						})
						.catch(e => {
							this.setOrderInfo({
								complete_count: 0, //完成
								received_count: 0, //待收货
								unshipped_count: 0, //待发货
								order_count: 0, //订单总数
								unpaid_count: 0 //待付款
							});
						});
				})
				.catch(e => {
					console.log(e);
				});
		},
		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url) {
			if (!this.hasLogin) {
				// 保存地址
				saveUrl();
				// 登录拦截
				interceptor();
			} else {
				uni.navigateTo({
					url
				});
			}
		},

		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			// console.log(e);
			if (pageAtTop === false) {
				return;
			}

			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			// console.log(e);
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			let maxDowm = this.userMaxDowm;
			let Dowm = this.userDowm;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= Dowm && moveDistance < maxDowm) {
				moveDistance = Dowm;
			}

			if (moveDistance > 0 && moveDistance <= Dowm) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
}
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10rpx;
}
.container {
	height: 100%;
	background-color: $page-color-base;
}
.content-box {
	height: 100%;
}
.vheigh {
	height: var(--status-bar-height);
	background-color: $base-color;
}
.user-section {
	height: 435rpx;
	padding: 15rpx 30rpx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: $base-color;
	}
}
.user-info-box {
	height: 180rpx;
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	z-index: 1;
	.detail {
		height: 130rpx;
		.portrait-box {
			height: 100%;
			.portrait {
				width: 130rpx;
				height: 100%;
				border: 5rpx solid #fff;
				border-radius: 50%;
			}
		}
		.info-box {
			margin-left: 20rpx;
			line-height: 1.5;
			.username {
				font-size: $font-lg + 6rpx;
				height: 100%;
			}
		}
	}
	.config {
		font-size: 48rpx;
		height: 130rpx;
		.setting {
			margin-right: 51rpx;
		}
	}
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240rpx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16rpx 16rpx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20rpx 24rpx;
	.card-bg {
		position: absolute;
		top: 20rpx;
		right: 0;
		width: 380rpx;
		height: 260rpx;
	}
	.b-btn {
		position: absolute;
		right: 20rpx;
		top: 16rpx;
		width: 132rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}
	.tit {
		font-size: $font-base + 2rpx;
		color: #f7d680;
		margin-bottom: 28rpx;
		.iconfont {
			color: #f6e5a3;
			margin-right: 16rpx;
		}
	}
	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10rpx;
	}
}
.cover-container {
	background: $page-color-base;
	margin-top: -150rpx;
	padding: 0 30rpx;
	position: relative;
	background: #f5f5f5;
	padding-bottom: 20rpx;
	.arc {
		position: absolute;
		left: 0;
		top: -34rpx;
		width: 100%;
		height: 36rpx;
	}
}
.tj-sction {
	@extend %section;
	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 140rpx;
		font-size: $font-sm;
		color: #75787d;
	}
	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8rpx;
	}
}

.item-box {
	border-radius: 10rpx;
	background-color: white;
	margin-top: 20rpx;
	.box-title {
		line-height: 1;
		padding: 30rpx;
		.title {
			font-size: $font-lg;
			font-weight: bold;
		}
		.link {
			font-size: $font-base - 2rpx;
			color: $font-color-light;
		}
	}
	.order-section {
		@extend %section;
		padding: 28rpx 0;
		.order-item {
			@extend %flex-center;
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.iconfont {
			font-size: 48rpx;
			margin-bottom: 18rpx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan {
			font-size: 44rpx;
		}
		.icon {
			height: 50rpx;
			width: 48rpx;
			margin-bottom: 18rpx;
			background-size: 100%;
			background-repeat: no-repeat;
			background-position: center;
			.icon-img {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.history-section {
	// padding: 30rpx 0 0;
	margin-top: 20rpx;
	background: #fff;
	border-radius: 10rpx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40rpx;
		margin-left: 30rpx;
		padding-top: 30rpx;
		.iconfont {
			font-size: 44rpx;
			color: $color-red;
			margin-right: 16rpx;
			line-height: 40rpx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30rpx 30rpx 0;
		.h-list-image {
			display: inline-block;
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
			border-radius: 10rpx;
		}
	}
}
</style>
