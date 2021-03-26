<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<pickerAddress class="input" @change="onCityClick">{{addressDetail||'请选择地址'}}</pickerAddress>
			<text class="iconfont iconlocation"></text>
		</view>
		<view class="row b-b">
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>

		<uni-list class="margin-t-20">
			<uni-list-item
				title="设为默认"
				:switch-checked="addressData.default"
				:show-switch="true"
				:show-arrow="false"
				switch-color="#5dbc7c"
				@switchChange="switchChange"
			></uni-list-item>
		</uni-list>

		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import  pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
import { addressEdit } from '@/api/address.js';
export default {
	components: {
		uniList,
		uniListItem,
		pickerAddress,
		uniPopup
	},
	data() {
		return {
			addressDetail: '',
			addressData: {
				name: '',
				mobile: '',
				address: {
					province: '',
					city: '',
					district: ''
				},
				area: '',
				default: false
			}
		};
	},
	onLoad(option) {
		let title = '新增收货地址';
		if (option.type === 'edit') {
			title = '编辑收货地址';
			let data = JSON.parse(option.data);
			console.log(data);

			this.addressData = {
				name: data.real_name,
				mobile: data.phone,
				address: {
					province: data.province,
					city: data.city,
					district: data.district
				},
				area: data.detail,
				default: data.is_default == 1,
				id: data.id
			};
			this.addressDetail = data.province + data.city + data.district;
		}
		this.manageType = option.type;
		uni.setNavigationBarTitle({
			title
		});
	},
	methods: {
		// 选中城市切换
		onCityClick({data}) {
			let address = this.addressData.address;
			address.province = data[0];
			address.city = data[1];
			address.district = data[2];
			this.addressDetail = data.join('');
		},
		//地图选择地址
		chooseLocation() {
			uni.chooseLocation({
				success: data => {
					console.log(data);
					this.addressData.addressName = data.name;
					this.addressData.address = data.name;
				}
			});
		},
		// 设置是否为默认地址
		switchChange(e) {
			this.addressData.default = e.value;
		},
		//提交
		confirm() {
			let obj = this;
			let data = this.addressData;
			if (!data.name) {
				this.$api.msg('请填写收货人姓名');
				return;
			}
			if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
				this.$api.msg('请输入正确的手机号码');
				return;
			}
			if (!data.address) {
				this.$api.msg('请在地图选择所在位置');
				return;
			}
			if (!data.area) {
				this.$api.msg('请填写门牌号信息');
				return;
			}

			//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
			addressEdit({
				real_name: data.name,
				phone: data.mobile,
				address: {
					province: data.address.province,
					city: data.address.city,
					district: data.address.district
				},
				detail: data.area,
				is_default: data.default,
				id: data.id||""
			}).then(function(e) {
				obj.$api.prePage().refreshList();
				uni.showToast({
					title:'提交成功',
					duration:2000
				});
				setTimeout(function() {
					uni.navigateBack();
				}, 800);
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16rpx;
}

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
.default-row {
	margin-top: 16rpx;
	.tit {
		flex: 1;
	}
	switch {
		transform: translateX(16rpx) scale(0.9);
	}
}
.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690rpx;
	height: 80rpx;
	margin: 60rpx auto;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10rpx;
	// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}

.alert-box {
	background-color: #ffffff;
}
</style>
