<template>
	<view>
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<!-- 地址 -->
		<navigator v-if="tabCurrentIndex == 0" url="/pages/address/address?source=1" class="address-section">
			<view class="order-content" v-if="addressData.real_name">
				<text class="iconfont iconlocation"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{ addressData.real_name }}</text>
						<text class="mobile">{{ addressData.phone }}</text>
					</view>
					<text class="address">{{ addressData.province + addressData.city + addressData.district }} {{ addressData.detail }}</text>
				</view>
				<text class="iconfont iconenter"></text>
			</view>
			<view class="order-content" v-if="!addressData.real_name">
				<view class="addAddress">
					<text class="iconfont iconaddition"></text>
					<text>添加收货地址</text>
				</view>
			</view>

			<image class="a-bg" :src="addressImg"></image>
		</navigator>
		<navigator v-if="tabCurrentIndex == 1" url="/pages/address/shopList" class="address-section">
			<view class="order-content" v-if="shopAddress.name">
				<text class="iconfont iconlocation"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{ shopAddress.name }}</text>
						<text class="mobile">{{ shopAddress.mobile }}</text>
					</view>
					<text class="address">{{ shopAddress.address }} {{ shopAddress.area }}</text>
				</view>
				<text class="iconfont iconenter"></text>
			</view>
			<view class="order-content" v-if="!shopAddress.name">
				<text class="addAddress">
					<text class="iconfont iconaddition"></text>
					<text>添加收货地址</text>
				</text>
			</view>

			<image class="a-bg" :src="addressImg"></image>
		</navigator>

		<view class="goods-section" v-for="(ls, ind) in shopList" :key="ind">
			<!-- <view class="g-header b-b">
				<image class="logo" :src="ls.productInfo.image"></image>
				<text class="name">{{ ls.name }}</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item">
				<image :src="ls.productInfo.image"></image>
				<view class="right">
					<text class="title clamp">{{ ls.productInfo.store_name }}</text>
					<text class="spec">{{ ls.productInfo.attrInfo ? ls.productInfo.attrInfo.suk : '默认' }}</text>
					<view class="price-box">
						<text class="price">￥{{ ls.productInfo.attrInfo ? ls.productInfo.attrInfo.price : ls.productInfo.price }}</text>
						<text class="number">{{ 'x ' + ls.cart_num + (ls.productInfo.unit_name || '') }}</text>
						<!-- <view><text class="price">￥{{lss.price}}</text></view> -->
						<!-- <view class="number">
							<uni-number-box class="step" :value="lss.number" :index="indx" @eventChange="numberChange"></uni-number-box>
						</view> -->
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b" @click="couponListshow ? toggleMask('show') : ''">
				<view class="cell-icon">券</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active" v-if="couponListshow && !couponChecked.coupon_price">选择优惠券</text>
				<text class="cell-tip red" v-if="couponChecked.coupon_price">-￥{{ couponChecked.coupon_price }}</text>
				<text class="cell-tip disabled" v-if="!couponListshow && !couponChecked.coupon_price">没有优惠券</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b" v-if="moneyAll.storeFreePostage > 0">
				<view class="cell-icon hb">减</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip disabled">满{{ moneyAll.storeFreePostage }}包邮</text>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥35</text>
			</view> -->
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">积分抵扣{{ '（当前积分：' + integralAll + '）' }}</text>
				<view class="cell-tip"><radio @click="checkedPoints = !checkedPoints" color=" #5dbc7c" :checked="checkedPoints" /></view>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">{{ Postage }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{ payAllMoney }}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="checkedPoints && integralShow">
				<text class="cell-tit clamp">积分抵扣</text>
				<text class="cell-tip">-￥{{ integralMoney }}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="moneyAll.vipPrice > 0">
				<text class="cell-tit clamp">VIP优惠</text>
				<text class="cell-tip">-￥{{ moneyAll.vipPrice }}</text>
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{ payPrice }}</text>
			</view>
			<text class="submit" :class="{ submitNo: !payType }" @click="payType ? submit() : ''">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState === 0 ? 'none' : maskState === 1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" @click="checkedCp(item)" v-for="(item, index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{ item.coupon_title }}</text>
							<text class="time">领取时间{{ item.add_time }}</text>
						</view>
						<view class="right">
							<text class="price">{{ item.coupon_price }}</text>
							<text>满{{ item.use_min_price }}可用</text>
						</view>
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">有效期至{{ item.end_time }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { confirm } from '@/api/order.js';
import { couponsOrder } from '@/api/coupon.js';
import { computedOrderkey } from '@/api/money.js';
import { userinfo } from '@/api/user.js';
import { cartAdd } from '@/api/product.js';
export default {
	data() {
		return {
			addressImg:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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',
			// 当前选中的支付方式
			tabCurrentIndex: 0,
			navList: [
				{
					state: 0,
					text: '快递配送'
				},
				{
					state: 1,
					text: '到店自提'
				}
			],
			maskState: 0, //优惠券面板显示状态
			desc: '', //备注
			payType: 1, //1微信 2支付宝
			// 优惠券列表
			couponList: [],
			couponListshow: false, //是有可以显示优惠券列表
			couponChecked: {}, //选中的优惠券
			// 收货地址
			addressData: {},
			// 店铺地址
			shopAddress: {
				name: '',
				mobile: '',
				addressName: '',
				address: '',
				area: '',
				default: false
			},
			// 商品列表
			shopList: [],
			// 购物车id
			cartId: '',
			//购物金额详情
			moneyAll: {
				storeFreePostage: 0, //邮费优惠
				storePostage: 0, //邮费
				totalPrice: 0, //总支付金额
				vipPrice: 0 //vip优惠价
			},
			payPrice: 0, //总支付金额
			orderKey: '', //订单id
			checkedPoints: false, //判断是否积分抵扣
			integralAll: 0, //可使用的积分
			integralMoney: 0, //积分抵扣金额
			integralShow: false, //是否显示积分抵扣金额
			payType: true, //是否可支付
			pinkid: '' //保存拼团商品id
		};
	},
	onLoad(option) {
		// 判断是否为拼团商品
		if (option.type == 'pink') {
			this.pinkid = option.pinkId;
			this.cartAdd(option);
		} else {
			// 保存当前商品在购物车中的id
			this.cartId = option.id;
			this.loadData();
		}
		this.userinfo();
	},
	watch: {
		checkedPoints(newValue, oldValue) {
			this.integralShow = false;
			this.payMoneyNub();
		}
	},
	computed: {
		Postage() {
			let money = +this.moneyAll.storePostage;
			if (money == 0) {
				return '免运费';
			} else {
				return '￥' + money;
			}
		},
		payAllMoney() {
			return +this.moneyAll.totalPrice + +this.moneyAll.vipPrice;
		}
	},
	methods: {
		// 添加商品到购物车
		cartAdd(opt) {
			let obj = this;
			cartAdd({
				cartNum: 1, //商品数量
				new: 1, //商品是否新增加到购物车1为不加入0为加入
				mer_id: +opt.merid, //商店id
				combinationId: +opt.gid, //拼团商品id
				productId: +opt.pid //普通商品id
			})
				.then(function(e) {
					let da = e.data;
					// 獲取购物车号
					obj.cartId = da.cartId;
					// 加载数据
					obj.loadData();
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 加载用户基础信息
		userinfo() {
			userinfo({}).then(({ data }) => {
				this.integralAll = data.integral;
			});
		},
		// 计算支付金额
		payMoneyNub() {
			computedOrderkey({
				orderkey: this.orderKey,
				useIntegral: this.checkedPoints ? 1 : 0, //是否积分抵扣
				couponId: this.couponChecked.id, //优惠券编号
				addressId: this.addressData.id //地址编号
			})
				.then(({ data }) => {
					this.payType = true;
					this.integralShow = true;
					// 获取支付金额
					this.payPrice = +data.result.pay_price;
					this.integralMoney = data.result.deduction_price;
				})
				.catch(e => {
					console.log(e);
					this.integralShow = false;
					this.payType = false;
				});
		},
		// 是否使用积分
		checkedIntegral() {
			this.checkedPoints = !this.checkedPoints;
		},
		// 选中优惠券
		checkedCp(item) {
			this.couponChecked = item;
			this.payMoneyNub();
		},
		// 加载优惠券列表
		couponsOrder(money) {
			couponsOrder({}, money).then(e => {
				if (e.data.length > 0) {
					this.couponListshow = true;
				}
				this.couponList = e.data;
			});
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		//显示优惠券面板
		toggleMask(type) {
			let timer = type === 'show' ? 10 : 300;
			let state = type === 'show' ? 1 : 0;
			this.maskState = 2;
			setTimeout(() => {
				this.maskState = state;
			}, timer);
		},
		loadData() {
			let obj = this;
			confirm({ cartId: obj.cartId+'' }).then(({ data }) => {
				obj.addressData = data.addressInfo || {};
				obj.shopList = data.cartInfo; //商品列表
				obj.moneyAll = data.priceGroup; //金额数据
				obj.orderKey = data.orderKey; //订单key
				// 计算金额
				this.payMoneyNub();
				// 加载优惠券
				obj.couponsOrder(data.priceGroup.totalPrice);
			});
		},
		// 购买数量变化
		numberChange(data) {
			this.number = data.number;
		},
		// 修改支付方式
		changePayType(type) {
			this.payType = type;
		},
		// 提交订单
		submit() {
			if (this.checkedPoints && this.shopList.length > 1) {
				this.$api.msg('积分商品只可单件购买');
				return false;
			}
			if (!this.addressData.real_name) {
				this.$api.msg('请选择收货地址');
				return false;
			}
			let url =  '/pages/money/pay?key='+ this.orderKey
			if(this.pinkid){
				url += '&pinkid='+this.pinkid
			}
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-bottom: 100rpx;
}
.navbar {
	display: flex;
	height: 80rpx;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: $font-lg + 4rpx;
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
				width: 140rpx;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}
.address-section {
	padding: 30rpx 0;
	background: #fff;
	position: relative;
	border-top: 1px solid $border-color-light;
	.order-content {
		min-height: 100rpx;
		display: flex;
		align-items: center;
		.addAddress {
			text-align: center;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.iconaddition {
				font-size: 55rpx;
				line-height: 1;
				border-radius: 100rpx;
				margin-right: 20rpx;
			}
		}
	}

	.iconlocation {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90rpx;
		color: #888;
		font-size: 44rpx;
	}

	.cen {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 28rpx;
		color: $font-color-dark;
	}

	.name {
		font-size: 34rpx;
		margin-right: 24rpx;
	}

	.address {
		margin-top: 16rpx;
		margin-right: 20rpx;
		color: $font-color-light;
	}

	.icon-you {
		font-size: 32rpx;
		color: $font-color-light;
		margin-right: 30rpx;
	}

	.a-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		height: 5rpx;
	}
}

.goods-section {
	margin-top: 16rpx;
	background: #fff;
	padding-bottom: 1px;

	.g-header {
		display: flex;
		align-items: center;
		height: 84rpx;
		padding: 0 30rpx;
		position: relative;
	}

	.logo {
		display: block;
		width: 50rpx;
		height: 50rpx;
		border-radius: 100px;
	}

	.name {
		font-size: 30rpx;
		color: $font-color-base;
		margin-left: 24rpx;
	}

	.g-item {
		display: flex;
		margin: 20rpx 30rpx;

		image {
			flex-shrink: 0;
			display: block;
			width: 140rpx;
			height: 140rpx;
			border-radius: 4rpx;
		}

		.right {
			flex: 1;
			padding-left: 24rpx;
			overflow: hidden;
		}

		.title {
			font-size: 30rpx;
			color: $font-color-dark;
		}

		.spec {
			font-size: 26rpx;
			color: $font-color-light;
		}

		.price-box {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: $font-color-dark;
			padding-top: 10rpx;

			.price {
				margin-bottom: 4rpx;
				color: $color-red;
			}
			.number {
				font-size: 26rpx;
				color: $font-color-base;
				margin-left: 20rpx;
			}
		}

		.step-box {
			position: relative;
		}
	}
}
.yt-list {
	margin-top: 16rpx;
	background: #fff;
}
.yt-list-cell {
	display: flex;
	align-items: center;
	padding: 10rpx 30rpx 10rpx 40rpx;
	line-height: 70rpx;
	position: relative;

	&.cell-hover {
		background: #fafafa;
	}

	&.b-b:after {
		left: 30rpx;
	}

	.cell-icon {
		height: 32rpx;
		width: 32rpx;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		line-height: 32rpx;
		background: #f85e52;
		border-radius: 4rpx;
		margin-right: 12rpx;

		&.hb {
			background: #ffaa0e;
		}

		&.lpk {
			background: #3ab54a;
		}
	}

	.cell-more {
		align-self: center;
		font-size: 24rpx;
		color: $font-color-light;
		margin-left: 8rpx;
		margin-right: -10rpx;
	}

	.cell-tit {
		flex: 1;
		font-size: 26rpx;
		color: $font-color-light;
		margin-right: 10rpx;
	}

	.cell-tip {
		font-size: 26rpx;
		color: $font-color-dark;
		&.disabled {
			color: $font-color-light;
		}
		&.active {
			color: $base-color;
		}
		&.red {
			color: $base-color;
		}
	}

	&.desc-cell {
		.cell-tit {
			max-width: 90rpx;
		}
	}
	.desc {
		flex: 1;
		text-align: right;
		font-size: $font-base;
		color: $font-color-dark;
	}
}

/* 支付列表 */
.pay-list {
	padding-left: 40rpx;
	margin-top: 16rpx;
	background: #fff;
	.pay-item {
		display: flex;
		align-items: center;
		padding-right: 20rpx;
		line-height: 1;
		height: 110rpx;
		position: relative;
	}
	.icon-weixinzhifu {
		width: 80rpx;
		font-size: 40rpx;
		color: #6bcc03;
	}
	.icon-alipay {
		width: 80rpx;
		font-size: 40rpx;
		color: #06b4fd;
	}
	.icon-xuanzhong2 {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		font-size: 40rpx;
		color: $base-color;
	}
	.tit {
		font-size: 32rpx;
		color: $font-color-dark;
		flex: 1;
	}
}

.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 995;
	display: flex;
	align-items: center;
	width: 100%;
	height: 90rpx;
	justify-content: space-between;
	font-size: 30rpx;
	background-color: #fff;
	z-index: 998;
	color: $font-color-base;
	box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
	.price-content {
		padding-left: 30rpx;
	}
	.price-tip {
		color: $font-color-base;
		margin-left: 8rpx;
	}
	.price {
		font-size: 36rpx;
		color: $font-color-base;
	}
	.submit {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280rpx;
		height: 100%;
		color: #fff;
		font-size: 32rpx;
		background-color: $base-color;
		&.submitNo {
			background-color: $font-color-disabled;
		}
	}
}

/* 优惠券面板 */
.mask {
	display: flex;
	align-items: flex-end;
	position: fixed;
	left: 0;
	top: var(--window-top);
	bottom: 0;
	width: 100%;
	background: rgba(0, 0, 0, 0);
	z-index: 9995;
	transition: 0.3s;
	.mask-content {
		width: 100%;
		max-height: 70vh;
		background: #f3f3f3;
		transform: translateY(100%);
		transition: 0.3s;
		overflow-y: scroll;
	}
	&.none {
		display: none;
	}
	&.show {
		background: rgba(0, 0, 0, 0.4);

		.mask-content {
			transform: translateY(0);
		}
	}
}

/* 优惠券列表 */
.coupon-item {
	display: flex;
	flex-direction: column;
	margin: 20rpx 24rpx;
	background: #fff;
	.con {
		display: flex;
		align-items: center;
		position: relative;
		height: 120rpx;
		padding: 0 30rpx;
		&:after {
			position: absolute;
			left: 0;
			bottom: 0;
			content: '';
			width: 100%;
			height: 0;
			border-bottom: 1px dashed #f3f3f3;
			transform: scaleY(50%);
		}
	}
	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		overflow: hidden;
		height: 100rpx;
	}
	.title {
		font-size: 32rpx;
		color: $font-color-dark;
		margin-bottom: 10rpx;
	}
	.time {
		font-size: 24rpx;
		color: $font-color-light;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		color: $font-color-base;
		height: 100rpx;
	}
	.price {
		font-size: 44rpx;
		color: $base-color;
		&:before {
			content: '￥';
			font-size: 34rpx;
		}
	}
	.tips {
		font-size: 24rpx;
		color: $font-color-light;
		line-height: 60rpx;
		padding-left: 30rpx;
	}
	.circle {
		position: absolute;
		left: -6rpx;
		bottom: -10rpx;
		z-index: 10;
		width: 20rpx;
		height: 20rpx;
		background: #f3f3f3;
		border-radius: 100px;
		&.r {
			left: auto;
			right: -6rpx;
		}
	}
}
</style>
