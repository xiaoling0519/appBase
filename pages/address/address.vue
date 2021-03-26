<template>
	<view class="content b-t">
		<view class="list" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text class="name">{{ item.real_name }}</text>
					<text class="mobile">{{ item.phone }}</text>
				</view>
				<view class="u-box">
					<text class="address">{{ item.province + item.city + item.district }} {{ item.detail }}</text>
				</view>
			</view>
			<view class="buttom">
				<view class="default-buttom" @click.stop="defaultUp(item,index)">
					<view class="iconfont iconroundcheckfill checkbox" :class="{ checked: item.is_default == 1 }"></view>
					<text class="text">设为默认地址</text>
				</view>
				<view class="operation">
					<view @click.stop="addAddress('edit', item)">
						<text class="iconfont iconedit"></text>
						<text class="text">编辑</text>
					</view>
					<view class="blank"></view>
					<view @click.stop="delAddress(item)">
						<text class="iconfont icondelete"></text>
						<text class="text">删除</text>
					</view>
				</view>
			</view>
		</view>
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
import { getAddressList,setAddressDefault,addressDel } from '@/api/address.js';
export default {
	data() {
		return {
			source: 0,
			addressList: []
		};
	},
	onLoad(option) {
		this.source = option.source||0
		this.loadAddress();
	},
	methods: {
		// 加载地址
		loadAddress() {
			getAddressList({
				page: 1,
				limit: 100
			}).then(({ data }) => {
				this.addressList = data;
			});
		},
		// 设为默认地址
		defaultUp(data,ind) {
			this.addressList=this.addressList.map((e) => {
				e.is_default=0
				return e
			})
			this.addressList[ind].is_default=1
			setAddressDefault({
				id: data.id
			}).then(({ data }) => {
				this.loadAddress();
			}).catch((e) => {
				console.log(e);
			});
		},
		//删除地址
		delAddress(item) {
			addressDel({
				id:item.id
			}).then(({data})=>{
				this.$api.msg('删除成功')
			})
			let s = this.addressList.indexOf(item);
			this.addressList.splice(s, 1);
		},
		//选择地址
		checkAddress(item) {
			if (this.source == 1) {
				//this.$api.prePage()获取上一页实例，在App.vue定义
				this.$api.prePage().addressData = item;
				uni.navigateBack();
			}
		},
		// 添加地址
		addAddress(type, item) {
			uni.navigateTo({
				url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
			});
		},
		//添加或修改成功之后回调
		refreshList() {
			// 重新加载地址
			this.loadAddress()
		}
	}
};
</script>

<style lang="scss">
page {
	padding-bottom: 120rpx;
	padding-top: 20rpx;
	background-color: $page-color-base;
}
.content {
	position: relative;
}
.list {
	align-items: center;
	padding: 20rpx 30rpx;
	background: #fff;
	margin: 20rpx;
	margin-top: 0;
	.buttom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 10rpx;
		.checkbox {
			font-size: 44rpx;
			line-height: 1;
			padding: 4rpx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}
		.checkbox.checked {
			color: $base-color;
		}
		.default-buttom {
			display: flex;
			align-items: center;
		}
		.operation {
			display: flex;
			align-items: center;
			.blank {
				width: 30rpx;
			}
		}
		.text {
			padding-left: 10rpx;
			font-size: 24rpx;
			color: #666666;
		}
	}
}
.wrapper {
	display: flex;
	flex-direction: column;
	flex: 1;
	border-bottom: 1px solid #f0f0f0;
	padding-bottom: 20rpx;
}
.address-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.address {
		font-size: $font-base + 2rpx;
		color: $font-color-dark;
	}
	.mobile {
		font-size: $font-base;
		color: rgba(51, 51, 51, 1);
	}
}
.u-box {
	font-size: $font-base;
	color: $font-color-light;
	margin-top: 16rpx;
	.name {
		margin-right: 30rpx;
	}
}
.icon-bianji {
	display: flex;
	align-items: center;
	height: 80rpx;
	font-size: 40rpx;
	color: $font-color-light;
	padding-left: 30rpx;
}

.add-btn {
	position: fixed;
	left: 30rpx;
	right: 30rpx;
	bottom: 16rpx;
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690rpx;
	height: 80rpx;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10rpx;
}
</style>
