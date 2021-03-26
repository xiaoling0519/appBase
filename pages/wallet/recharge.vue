<template>
	<view class="content">
		<view class="row-box">
			<view class="title">充值金额</view>
			<view class="row">
				<text class="tit">￥</text>
				<input class="input" type="number" v-model="money" placeholder="请输入充值金额" placeholder-class="placeholder" />
			</view>
		</view>

		<view class="list">
			<radio-group @change="tabRadio">
				<!-- #ifdef APP-PLUS -->
				<label>
					<view class="box">
						<view class="icon iconfont iconzhifubao"></view>
						<view class="title-box">
							<view class="title"><text>支付宝充值</text></view>
						</view>
						<view class="right"><radio value="alipay" color="#5dbc7c" :checked="type == 'alipay'" /></view>
					</view>
				</label>
				<label>
					<view class="box">
						<view class="icon iconfont iconweixin1"></view>
						<view class="title-box">
							<view class="title"><text>微信充值</text></view>
							<view class="node"><text>真实姓名(代勇明)</text></view>
						</view>
						<view class="right"><radio value="weixin" color=" #5dbc7c" :checked="type == 'weixin'" /></view>
					</view>
				</label>
				<!-- #endif -->
			</radio-group>
		</view>
		<button class="add-btn up" :class="{ 'active-bg': payLoding }" @click="!payLoding ? confirm() : ''">确认充值</button>
	</view>
</template>

<script>
import { getMoneyStyle } from '@/utils/rocessor.js';
// #ifdef H5
import { rechargeWechat } from '@/api/wallet.js';
// #endif
// #ifdef MP
import { rechargeRoutine } from '@/api/wallet.js';
// #endif
import { mapState } from 'vuex';
export default {
	filters: {
		getMoneyStyle
	},
	data() {
		return {
			type: 'weixin',
			money: '', //充值金额
			payLoding: false //是否加载中
		};
	},
	onLoad(options) {},
	computed: {
		// #ifdef H5
		...mapState(['weichatObj'])
		// #endif
	},
	methods: {
		// 跳转
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		// 切换选中对象
		tabRadio(e) {
			this.type = e;
		},
		// 提交
		confirm() {
			let obj = this;
			obj.payLoding = true;
			// #ifdef H5
			rechargeWechat({ price: this.money, from: this.type })
				.then(e => {
					let da = e.data.data;
					obj.weichatObj.chooseWXPay({
						timestamp: da.timestamp,
						nonceStr: da.nonceStr,
						package: da.package,
						signType: da.signType,
						paySign: da.paySign,
						success: function(res) {
							uni.showToast({
								title: '充值成功',
								duration: 2000,
								position: 'top'
							});
						}
					});
					obj.payLoding = false;
				})
				.catch(e => {
					obj.payLoding = false;
					console.log(e);
				});
			// #endif
			// #ifdef MP
			rechargeRoutine({ price: this.money})
				.then(e => {
					let da = e.data;
						wx.requestPayment({
								timeStamp: da.timestamp,
								nonceStr: da.nonceStr,
								package: da.package,
								signType: da.signType,
								paySign: da.paySign,
								success: function(res) {
									uni.redirectTo({
										url: '/pages/money/paySuccess'
									});
								},
								
							})
					
					obj.payLoding = false;
				})
				.catch(e => {
					obj.payLoding = false;
					console.log(e);
				});
			// #endif
		},
		//获取订单列表
		loadData(source) {
			console.log(source);
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
			navItem.loadingType = 'loading';
			setTimeout(() => {
				let orderList = [];
				orderList.forEach(item => {
					navItem.orderList.push(item);
				});
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				//判断是否还有数据， 有改为 more， 没有改为noMore
				navItem.loadingType = 'more';
			}, 600);
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.add-btn {
	&.modified {
		color: $base-color;
	}
	&.up {
		background-color: $base-color;
		color: #fff;
	}
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690rpx;
	height: 80rpx;
	margin: 0 auto;
	margin-top: 30rpx;
	font-size: $font-lg;
	border-radius: 10rpx;
	// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
.row-box {
	margin-top: 30rpx;
	padding: 20rpx 30rpx;
	background: #fff;
	.title {
		font-size: $font-base + 2rpx;
		color: $font-color-dark;
	}
	.row {
		display: flex;
		align-items: center;
		position: relative;
		height: 80rpx;
		.tit {
			flex-shrink: 0;
			width: 40rpx;
			font-size: 30rpx;
			color: $font-color-dark;
		}
		.input {
			flex: 1;
			font-size: 30rpx;
			color: $font-color-dark;
		}
		.iconlocation {
			font-size: 36rpx;
			color: $font-color-light;
		}

		.buttom {
			color: $font-color;
			font-size: $font-base;
		}
	}
}
.list {
	padding-left: 30rpx;
	margin-top: 30rpx;
	background-color: #ffffff;
	.box {
		display: flex;
		align-items: center;
		width: 100%;
		height: 120rpx;
		border-bottom: 1px solid $border-color-light;
		.icon {
			font-size: 48rpx;
			padding-right: 20rpx;
		}
		.iconweixin1 {
			color: #18bf16;
		}
		.iconzhifubao {
			color: #08aaec;
		}
		.title-box {
			flex-grow: 1;
			text-align: left;
			.title {
				font-size: $font-base + 2rpx;
				color: $font-color-base;
			}
			.node {
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}
}
/deep/ .uni-radio-input {
	width: 45rpx;
	height: 45rpx;
}

.active-bg {
	background-color: $color-gray !important;
}
</style>
