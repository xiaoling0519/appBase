<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<view class="row b-b">
					<text class="tit">姓名</text>
					<input class="input" v-model="tabItem.orderList.name" type="text" placeholder="提款人姓名" placeholder-class="placeholder" />
				</view>
				<view class="row b-b">
					<text class="tit">{{ tabIndex == 0 ? '账号' : '银行卡号' }}</text>
					<input class="input" v-model="tabItem.orderList.code" type="text" placeholder="请输入账号" placeholder-class="placeholder" />
				</view>
				<view class="row b-b" v-if="tabIndex == 1">
					<text class="tit">所属银行</text>
					<input class="input" v-model="tabItem.orderList.bankName" type="text" placeholder="请输入账号" placeholder-class="placeholder" />
				</view>
			</swiper-item>
		</swiper>

		<button class="add-btn up" @click="confirm">提交申请</button>
	</view>
</template>

<script>
import { aliInfo, bankInfo, setAliInfo, setBankInfo } from '@/api/wallet.js';
export default {
	data() {
		return {
			tabCurrentIndex: 0,
			navList: [
				{
					state: 0,
					text: '支付宝',
					loadingType: 'more',
					orderList: {
						name: '',
						code: '',
						id:''
					}
				},
				{
					state: 1,
					text: '银行卡',
					loadingType: 'more',
					orderList: {
						name: '',
						code: '',
						bankName: '',
						id:''
					}
				}
			]
		};
	},

	onLoad(options) {
		this.tabCurrentIndex = +options.state || 0;
		this.loadAli();
		this.loadBank();
	},

	methods: {
		//加载数据
		loadAli(source) {
			aliInfo({}).then(({data}) => {
				let order = this.navList[0].orderList;
				this.$set(order,'name',data.fullname)
				this.$set(order,'code',data.alino)
				this.$set(order,'id',data.id)
			});
		},
		loadBank() {
			bankInfo({}).then(({data}) => {
				let order = this.navList[1].orderList;
				this.$set(order,'name',data.fullname);
				this.$set(order,'code',data.bankno);
				this.$set(order,'bankName',data.bank);
				this.$set(order,'id',data.id)
			});
		},
		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		// 提交保存
		confirm() {
			let obj = this;
			let arr = obj.navList[obj.tabCurrentIndex].orderList;
			if (obj.tabCurrentIndex == 1) {
				obj.setBankInfo({
					fullname: arr.name,
					bank: arr.bankName,
					bankno: arr.code,
					id:arr.id
				});
			}
			if (obj.tabCurrentIndex == 0) {
				obj.setAliInfo({
					fullname: arr.name,
					alino: arr.code,
					id:arr.id
				});
			}
		},
		/* 保存银行卡详细 */
		setBankInfo(obj) {
			setBankInfo(obj)
				.then(e => {
					uni.showToast({
						title: '修改成功',
						duration: 2000,
						position: 'top'
					});
					this.$api.prePage().dataUp()
					setTimeout(() => {
						uni.navigateBack()
					},1500)
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 修改支付宝信息
		setAliInfo(obj) {
			setAliInfo(obj)
				.then(e => {
					uni.showToast({
						title: '修改成功',
						duration: 2000,
						position: 'top'
					});
					this.$api.prePage().dataUp()
					setTimeout(() => {
						uni.navigateBack()
					},1500)
				})
				.catch(e => {
					console.log(e);
				});
		},
	}
};
</script>

<style lang="scss">
.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30rpx;
	height: 110rpx;
	background: #fff;
	.tit {
		flex-shrink: 0;
		width: 120rpx;
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
}
page,
.content {
	background: $page-color-base;
	height: 100%;
}

.swiper-box {
	height: 750rpx;
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

.add-btn {
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
</style>
