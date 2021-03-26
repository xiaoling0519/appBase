<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">昵称</text>
			<input class="input" type="text" v-model="name" placeholder="修改昵称" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { userEdit } from '@/api/set.js';
export default {
	data() {
		return {
			name: ''
		};
	},

	computed: {
		...mapState('user', ['userInfo'])
	},
	onShow(option) {
		this.name = this.userInfo.nickname + '';
	},
	methods: {
		switchChange(e) {
			this.addressData.default = e.value;
		},
		confirm() {
			userEdit({ nickname: this.name, avatar: this.userInfo.avatar })
				.then(e => {
					this.$api.msg('修改成功');
					setTimeout(()=> {
						uni.switchTab({
							url:'/pages/user/user'
						});
					}, 1000);
					console.log(e);
				})
				.catch(e => {
					console.log(e);
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16upx;
}

.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	height: 110upx;
	background: #fff;

	.tit {
		flex-shrink: 0;
		width: 120upx;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.input {
		flex: 1;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.iconlocation {
		font-size: 36upx;
		color: $font-color-light;
	}
}
.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	margin: 60upx auto;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
