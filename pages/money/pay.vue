<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ money }}</text>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon iconfont iconweixin"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio"><radio value="" color="#5dbc7c" :checked="payType == 1"></radio></label>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon iconfont iconzhifubao"></text>
				<view class="con"><text class="tit">支付宝支付</text></view>
				<label class="radio"><radio value="" color="#5dbc7c" :checked="payType == 2"></radio></label>
			</view>
			<!-- #endif -->
			<view class="type-item" @click="changePayType(3)">
				<text class="icon iconfont iconyue"></text>
				<view class="con">
					<text class="tit">余额支付</text>
					<text>可用余额 ¥{{ now_money }}</text>
				</view>
				<label class="radio"><radio value="" color="#5dbc7c" :checked="payType == 3"></radio></label>
			</view>
		</view>
		<text class="mix-btn" :class="{ clickbg: payLoding }" @click="!payLoding ? confirm() : ''">确认支付</text>
	</view>
</template>

<script>
import { computedOrderkey, balance, createOrderkey, orderPay } from '@/api/money.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			payType: 1, //支付类型
			// #ifdef H5
			payName: 'weixin',
			// #endif
			// #ifdef MP-WEIXIN
			payName: 'weixin',
			// #endif
			orderInfo: {},
			money: 0.0, //订单金额
			now_money: 0.0, //余额
			orderKey: '',
			orderId: '', //保存订单id
			payLoding: false, //判断是否支付中
			type: '', //判断是否从订单中进入
			// #ifdef H5
			froms: '', //保存h5中数据来源对象
			// #endif
			pinkid: '' //保存拼团商品id
		};
	},
	computed: {
		// #ifdef H5
		...mapState(['weichatObj'])
		// #endif
	},
	onLoad(options) {
		if (options.type == 1) {
			this.type = 1;
			this.orderId = options.ordid;
			this.money = options.money;
		} else {
			this.orderKey = options.key;
			let prepage = this.$api.prePage();
			computedOrderkey({
				orderkey: this.orderKey,
				couponId: prepage.couponChecked.id, //优惠券编号
				addressId: prepage.addressData.id, //地址编号
				useIntegral: prepage.checkedPoints ? 1 : 0
			}).then(({ data }) => {
				// 获取支付金额
				this.money = data.result.pay_price;
			});
		}
		// 保存pinkid
		if (options.pinkid) {
			this.pinkid = options.pinkid;
		}
		// 载入余额
		balance({}).then(({ data }) => {
			// 获取余额
			this.now_money = data.now_money;
		});
	},
	methods: {
		//选择支付方式
		changePayType(type) {
			this.payType = type;
			if (this.payType == 1) {
				this.payName = 'weixin';
			}
			if (this.payType == 2) {
				this.payName = 'ali';
			}
			if (this.payType == 3) {
				this.payName = 'yue';
			}
		},
		// 支付金额
		orderMoneyPay() {
			let obj = this;
			orderPay({
				uni: obj.orderId,
				// #ifdef H5
				from: obj.froms ? 'weixin' : 'H5', //来源
				// #endif
				// #ifdef MP-WEIXIN
				from: 'routine', //来源
				// #endif
				// #ifdef APP-PLUS
				from: 'app', //来源
				// #endif
				paytype: obj.payName //支付类型  weixin-微信 yue-余额
			})
				.then(e => {
					// 判断是否为余额支付
					if (obj.payName == 'yue' && e.data.status == 'SUCCESS') {
						if (e.status == 200) {
							obj.paySuccessTo();
						} else {
							obj.$api.msg(msg);
						}
					}
					if (obj.payName == 'weixin' || obj.payName == 'routine') {
						let da = e.data.result.jsConfig;
						let data = {
							// #ifdef H5
							timestamp: da.timestamp,
							// #endif
							// #ifdef MP
							timeStamp: da.timestamp,
							// #endif
							nonceStr: da.nonceStr,
							package: da.package,
							signType: da.signType,
							paySign: da.paySign,
							success: function(res) {
								obj.paySuccessTo();
							},
							fail: () => {
								uni.navigateTo({
									url: '/pages/order/order?state=0'
								});
							}
						};
						// #ifdef H5
						if(obj.payName == 'weixin'){
						obj.weichatObj.chooseWXPay(data);
						}
						// #endif
						// #ifdef MP-WEIXIN
						if(obj.payName == 'routine'){
							wx.requestPayment(data);
						}
						// #endif
					}
					obj.payLoding = false;
				})
				.catch(e => {
					// 支付完成
					obj.payLoding = false;
					console.log(e);
				});
		},
		// 支付成功跳转
		paySuccessTo() {
			uni.redirectTo({
				url: '/pages/money/paySuccess?orderid=' + this.orderId
			});
		},
		//确认支付
		confirm: async function() {
			let obj = this;
			// 判断是否余额不足
			if (obj.payName == 'yue' && +obj.now_money < obj.money) {
				uni.showModal({
					title: '提示',
					content: '账户余额不足！',
					showCancel: false,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
			// 支付中
			obj.payLoding = true;
			// #ifdef H5
			// 获取当前是否为微信浏览器
			obj.froms = uni.getStorageSync('weichatBrowser') || '';
			// #endif
			// 判断是否为未支付订单中跳转进入
			if (obj.type != 1) {
				// 初次生成订单
				obj.firstCreateOrder();
			} else {
				// 已经生成订单未支付
				obj.orderMoneyPay();
			}
		},
		// 初次订单创建
		firstCreateOrder() {
			let obj = this;
			// 获取下单页面数据
			let prepage = obj.$api.prePage();

			let data = {
				real_name: prepage.addressData.real_name, //联系人名称
				phone: prepage.addressData.phone, //联系人号码
				couponId: prepage.couponChecked.id, //优惠券编号
				addressId: prepage.addressData.id, //支付地址id
				useIntegral: prepage.checkedPoints ? 1 : 0, //是否积分抵扣1为是0为否
				payType: obj.payName, //支付类型  weixin-微信 yue-余额
				mark: prepage.desc, //备注
				// #ifdef H5
				from: obj.froms ? 'weixin' : 'H5', //来源
				// #endif
				// #ifdef MP-WEIXIN
				from: 'routine', //来源
				// #endif
				// #ifdef APP-PLUS
				from: 'app', //来源
				// #endif
				shipping_type: 1 //提货方式 1 快递 2自提
			};
			// 判断是否拼团商品
			if (obj.pinkid) {
				data.pinkId = obj.pinkid;
			}
			// 生成订单
			createOrderkey(data, obj.orderKey)
				.then(({ data, status, msg }) => {
					// 判断是否支付失败
					if (data.status == 'ORDER_EXIST') {
						uni.showModal({
							title: '提示',
							content: msg,
							showCancel: false
						});
						obj.payLoding = false;
						return;
					}
					// 保存订单号
					obj.orderId = data.result.orderId;
					// 判断是否为余额支付
					if (obj.payName == 'yue') {
						if (status == 200 && data.status == 'SUCCESS') {
							obj.paySuccessTo();
						} else {
							obj.$api.msg(msg);
						}
					} else {
						// 立即支付
						obj.orderMoneyPay();
					}
				})
				.catch(e => {
					obj.payLoding = false;
					console.log(e);
				});
		}
	}
};
</script>

<style lang="scss">
.app {
	width: 100%;
}

.price-box {
	background-color: #fff;
	height: 265upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	color: #909399;

	.price {
		font-size: 50upx;
		color: #303133;
		margin-top: 12upx;
		&:before {
			content: '￥';
			font-size: 40upx;
		}
	}
}

.pay-type-list {
	margin-top: 20upx;
	background-color: #fff;
	padding-left: 60upx;
	.type-item {
		height: 120upx;
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 60upx;
		font-size: 30upx;
		position: relative;
	}

	.icon {
		width: 100upx;
		font-size: 52upx;
	}
	.iconyue {
		color: #fe8e2e;
	}
	.iconweixin {
		color: #36cb59;
	}
	.iconzhifubao {
		color: #01aaef;
	}
	.tit {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 4upx;
	}
	.con {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-sm;
		color: $font-color-light;
	}
}
.mix-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 630upx;
	height: 80upx;
	margin: 80upx auto 30upx;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	/* box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4); */
}

.clickbg {
	background-color: $color-gray !important;
}
</style>
