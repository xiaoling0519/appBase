<template>
	<view class="content">
		<uni-notice-bar single="true" text="每月25号到月底可提现上月结算余额"></uni-notice-bar>
		<view class="content-money">
			<view class="flex ">
				<view class="buttom">
					<view class="icon">{{ money | getMoneyStyle }}</view>
					<text class="text">可提现金额</text>
				</view>
				<view class="interval"></view>
				<view class="buttom">
					<view class=" icon">{{ freeze | getMoneyStyle }}</view>
					<text class="text">待审核提现金额</text>
				</view>
			</view>
		</view>
		<view class="row-box">
			<view class="title">提现金额</view>
			<view class="row">
				<text class="tit">￥</text>
				<input class="input" type="number" v-model="withdrawal" :placeholder="'最低提现金额' + minPrice + '元'" placeholder-class="placeholder" />
				<view class="buttom" @click="withdrawal = money">全部提现</view>
			</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="list" v-if="!weichatBsrowser">
			<radio-group @change="tabRadio">
				<label>
					<view class="box">
						<view class="icon iconfont iconweixin1"></view>
						<view class="title-box">
							<view class="title"><text>提现至微信</text></view>
						</view>
						<view class="right"><radio value="weixin" color="#5dbc7c" :checked="type == 'weixin'" /></view>
					</view>
				</label>
				<label>
					<view class="box">
						<view class="icon iconfont iconzhifubao"></view>
						<view class="title-box">
							<view class="title">
								<text v-if="aliData.fullname">提现至支付宝</text>
								<text v-else>请创建支付宝账号</text>
							</view>
							<view class="node">
								<text v-if="aliData.fullname">真实姓名({{ aliData.fullname }})</text>
							</view>
						</view>
						<view class="right"><radio value="alipay" color="#5dbc7c" :checked="type == 'alipay'" /></view>
					</view>
				</label>
				<label>
					<view class="box">
						<view class="icon iconfont"><image class="icon-img" src="/static/icon/i8.png" mode="aspectFit"></image></view>
						<view class="title-box">
							<view class="title">
								<text v-if="bankData.bankno">{{ bankData.bank + ' ' + bankData.bankno }}</text>
								<text v-else>请创建银行账号</text>
							</view>
							<view class="node">
								<text v-if="bankData.fullname">真实姓名({{ bankData.fullname }})</text>
							</view>
						</view>
						<view class="right"><radio value="bank" color="#5dbc7c" :checked="type == 'bank'" /></view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- #endif -->
		<button class="add-btn up" @click="confirm">提交申请</button>
		<button class="add-btn modified" v-if="!weichatBsrowser" @click="navTo('/pages/wallet/account')">账号管理</button>
	</view>
</template>

<script>
import { getMoneyStyle } from '@/utils/rocessor.js';
import { extractCash, extractBank, aliInfo, bankInfo } from '@/api/wallet.js';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
export default {
	filters: {
		getMoneyStyle
	},
	components: {
		uniNoticeBar
	},
	data() {
		return {
			type: 'weixin', //提现方式
			money: '0.00', //可提现金额
			freeze: '0.0', //冻结金额
			withdrawal: '', //提现金额
			minPrice: '', //最少提现金额
			aliData: {},
			bankData: {},
			// #ifdef H5
			weichatBsrowser: false
			// #endif
		};
	},
	onLoad(options) {
		// #ifdef H5
		this.weichatBsrowser = uni.getStorageSync('weichatBrowser');
		// #endif
		//加载提现信息
		this.loadData();
		// 加载提款账号信息
		this.loadAli();
		this.loadBank();
	},
	methods: {
		// 更新数据
		dataUp(){
			this.loadAli();
			this.loadBank();
		},
		//加载数据
		async loadAli(source) {
			aliInfo({}).then(e => {
				this.aliData = e.data;
			});
		},
		// 加载银行卡信息
		async loadBank() {
			bankInfo({}).then(e => {
				this.bankData = e.data;
			});
		},
		// 加载余额信息
		async loadData() {
			extractBank({}).then(({ data }) => {
				this.money = data.moneyCount;//可提现余额
				this.minPrice = data.minPrice;//最小提现
				this.freeze =data.inmoneyCount//提现中的余额
			});
		},
		// 跳转
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		// 切换选中对象
		tabRadio(e) {
			this.type = e.detail.value;
		},
		// 提交
		confirm() {
			let data = {
				extract_type: this.type, //bank -银行卡 alipay-支付宝 weixin-微信
				money: this.withdrawal, //金额
				money_type: 1//0佣金1余额
			}
			if (this.type=='alipay') {
				data.name = this.aliData.fullname;
				data.alipay_code = this.aliData.alino;
			}
			if (this.type=='bank') {
				data.name = this.bankData.fullname;
				data.bankname = this.bankData.bank;
				data.cardnum = this.bankData.bankno;
			}
			
			
			extractCash(data)
				.then(e => {
					uni.showToast({
						title: '提交成功',
						duration: 2000,
						position: 'top'
					});
				})
				.catch(e => {
					console.log();
				});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.content-money {
	padding: 30rpx 0;
	background: #ffffff;
}
.flex {
	background-color: #ffffff;
	text-align: center;
	margin: 0 30rpx;
	border-radius: $border-radius-sm;
	.buttom {
		font-size: $font-lg;
		width: 50%;
	}
	.interval {
		width: 2px;
		height: 60rpx;
		background-color: #eeeeee;
	}
	.icon {
		background-size: 100%;
		font-size: 42rpx;
		color: $font-color-dark;
		font-weight: bold;
		background-repeat: no-repeat;
		background-position: center;
	}
	.text {
		color: $font-color-light;
	}
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
			color: $font-color-spec;
			font-size: $font-base;
		}
	}
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
			.icon-img {
				height: 50rpx;
				width: 50rpx;
			}
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
</style>
