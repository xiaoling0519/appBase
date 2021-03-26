<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty === true" class="empty">
			<image src="/static/error/emptyCart.png" class="emptyImg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{ 'b-b': index !== cartList.length - 1 }">
						<view class="image-wrapper">
							<image
								:src="item.productInfo.image"
								:class="[item.loaded]"
								mode="aspectFill"
								lazy-load
								@load="onImageLoad('cartList', index)"
								@error="onImageError('cartList', index)"
							></image>
							<view class="iconfont iconroundcheckfill checkbox" :class="{ checked: item.checked }" @click="check('item', index)"></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{ item.productInfo.store_name }}</text>
							<text class="attr">{{ item.attr_val }}</text>
							<text class="price">¥{{ item.productInfo.price }}</text>
							<uni-number-box
								class="step"
								:min="1"
								:max="item.productInfo.stock"
								:value="item.cart_num > item.productInfo.stock ? item.productInfo.stock : item.cart_num"
								:isMax="item.cart_num >= item.productInfo.stock ? true : false"
								:isMin="item.cart_num === 1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box>
						</view>
						<text class="del-btn iconfont iconclose" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<view class="iconfont iconroundcheckfill icon-checked-box" @click="check('all')" :class="{ 'icon-checked': allChecked }"></view>
					<view class="clear-btn" @click="allChecked ? clearCart() : ''" :class="{ show: allChecked }"><text>清空</text></view>
				</view>
				<view class="total-box">
					<text class="price">¥{{ total }}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
import { getCartList, getCartNum, cartDel } from '@/api/cart.js';
import { mapState } from 'vuex';
import uniNumberBox from '@/components/uni-number-box.vue';
import { saveUrl, interceptor } from '@/utils/loginUtils.js';
export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: false, //空白页现实  true|false
			cartList: []
		};
	},
	onShow() {
		// 只有登录时才加载数据
		if (this.hasLogin) {
			this.loadData();
		}
	},
	watch: {
		//显示空白页
		cartList(e) {
			let empty = e.length === 0 ? true : false;
			if (this.empty !== empty) {
				this.empty = empty;
			}
		}
	},
	computed: {
		...mapState('user', ['hasLogin'])
	},
	methods: {
		//请求数据
		async loadData() {
			let obj = this;
			getCartList({})
				.then(function(e) {
					// 获取当前购物车物品增加数量
					let nub = obj.cartList.length;
					// 获取之前对象数组
					let aArray = obj.cartList.reverse();
					// 获取返回数据对象数组
					let bArray = e.data.valid.reverse();
					obj.cartList = bArray
						.map((item, ind) => {
							// 设置返回数据默认为勾选状态
							item.checked = true;
							// 获取相同数组之前对象的数据
							let carlist = aArray[ind];
							// 判断之前是否已经加载完毕
							if (carlist && carlist.loaded == 'loaded') {
								item.loaded = 'loaded';
							}
							return item;
						})
						.reverse();
					obj.calcTotal(); //计算总价
				})
				.catch(function(e) {
					console.log(e);
				});
		},
		//监听image加载完成
		onImageLoad(key, index) {
			// 修改载入完成后图片class样式
			this.$set(this[key][index], 'loaded', 'loaded');
		},
		//监听image加载失败
		onImageError(key, index) {
			this[key][index].image = '/static/error/errorImage.jpg';
		},
		// 跳转到登录页
		navToLogin() {
			// 保存地址
			saveUrl();
			// 登录拦截
			interceptor();
		},
		//选中状态处理
		check(type, index) {
			if (type === 'item') {
				this.cartList[index].checked = !this.cartList[index].checked;
			} else {
				const checked = !this.allChecked;
				const list = this.cartList;
				list.forEach(item => {
					item.checked = checked;
				});
				this.allChecked = checked;
			}
			this.calcTotal(type);
		},
		//数量
		numberChange(data) {
			let arr = this.cartList[data.index];
			arr.cart_num = data.number;
			getCartNum({ id: arr.id, number: data.number })
				.then(e => {
					console.log(e);
				})
				.catch(function(e) {
					console.log(e);
				});
			this.calcTotal();
		},
		//删除
		deleteCartItem(index) {
			let list = this.cartList;
			let row = list[index];
			let id = row.id;
			cartDel({
				ids: id
			});
			this.cartList.splice(index, 1);
			uni.hideLoading();
			this.calcTotal();
		},
		//清空
		clearCart() {
			uni.showModal({
				content: '清空购物车？',
				success: e => {
					if (e.confirm) {
						let st = this.cartList.map(e => {
							return e.id;
						});
						cartDel({
							ids: st.join(',')
						}).then(e => {
							console.log(e);
						});
						this.cartList = [];
					}
				}
			});
		},
		//计算总价
		calcTotal() {
			let list = this.cartList;
			if (list.length === 0) {
				this.empty = true;
				return;
			}
			let total = 0;
			let checked = true;
			list.forEach(item => {
				if (item.checked === true) {
					total += item.productInfo.price * item.cart_num;
				} else if (checked === true) {
					checked = false;
				}
			});
			this.allChecked = checked;
			this.total = Number(total.toFixed(2));
		},
		//创建订单
		createOrder() {
			let list = this.cartList;
			let goodsData = [];
			list.forEach(item => {
				if (item.checked) {
					goodsData.push(item.id);
				}
			});

			uni.navigateTo({
				url: '/pages/order/createOrder?id=' + goodsData.join(',')
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-bottom: 134rpx;
	background-color: $page-color-base;
	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;
		.emptyImg {
			width: 300rpx;
			height: 250rpx;
			margin-bottom: 30rpx;
		}
		.empty-tips {
			display: flex;
			font-size: $font-sm + 2rpx;
			color: $font-color-disabled;
			.navigator {
				color: $uni-color-primary;
				margin-left: 16rpx;
			}
		}
	}
}
/* 购物车列表项 */
.cart-item {
	display: flex;
	position: relative;
	padding: 30rpx 40rpx;
	.image-wrapper {
		width: 230rpx;
		height: 230rpx;
		flex-shrink: 0;
		position: relative;
		image {
			border-radius: 8rpx;
		}
	}
	.checkbox {
		position: absolute;
		left: -16rpx;
		top: -16rpx;
		z-index: 8;
		font-size: 44rpx;
		line-height: 1;
		padding: 4rpx;
		color: $font-color-disabled;
		background: #fff;
		border-radius: 50px;
	}
	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		position: relative;
		padding-left: 30rpx;
		.title,
		.price {
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
			height: 40rpx;
			line-height: 40rpx;
		}
		.attr {
			font-size: $font-sm + 2rpx;
			color: $font-color-light;
			height: 50rpx;
			line-height: 50rpx;
		}
		.price {
			height: 50rpx;
			line-height: 50rpx;
		}
		.step {
			margin-top: 20rpx;
		}
	}
	.del-btn {
		padding: 4rpx 10rpx;
		font-size: 34rpx;
		height: 50rpx;
		color: $font-color-light;
	}
}
/* 底部栏 */
.action-section {
	/* #ifdef H5 */
	margin-bottom: 100rpx;
	/* #endif */
	position: fixed;
	left: 30rpx;
	bottom: 30rpx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 690rpx;
	height: 100rpx;
	padding: 0 30rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16rpx;
	.checkbox {
		height: 52rpx;
		position: relative;
		.icon-checked-box {
			border-radius: 50rpx;
			background-color: #ffffff;
			width: 52rpx;
			height: 100%;
			position: relative;
			z-index: 5;
			font-size: 53rpx;
			line-height: 1;
			color: $font-color-light;
		}
		.icon-checked {
			color: $base-color;
		}
	}
	.clear-btn {
		position: absolute;
		left: 26rpx;
		top: 0;
		z-index: 4;
		width: 0;
		height: 52rpx;
		line-height: 52rpx;
		padding-left: 38rpx;
		font-size: $font-base;
		color: #fff;
		background: $font-color-disabled;
		border-radius: 0 50px 50px 0;
		opacity: 0;
		transition: 0.2s;
		&.show {
			opacity: 1;
			width: 120rpx;
		}
	}
	.total-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40rpx;
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.coupon {
			font-size: $font-sm;
			color: $font-color-light;
			text {
				color: $font-color-dark;
			}
		}
	}
	.confirm-btn {
		padding: 0 38rpx;
		margin: 0;
		border-radius: 100px;
		height: 76rpx;
		line-height: 76rpx;
		font-size: $font-base + 2rpx;
		background: $base-color;
	}
}
/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
	color: $base-color;
}
</style>
