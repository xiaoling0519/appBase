<template>
	<view class="container">
		<!-- 空白页 -->
		<empty v-if="favoriteList.length < 1"></empty>
		<view class="favorites flex" v-for="ls in favoriteList" @click="toproduct(ls.pid)">
			<view class="favorites_img"><image :src="ls.image"></image></view>
			<view class="favorites_list">
				<view class="favorites_name">{{ ls.store_name }}</view>
				<view class="favorites_peice flex">
					<view>
						<text>￥{{ ls.price }}</text>
					</view>
					<view @click.prevent.stop="del(ls.pid)" v-show="delshow" class="icon_del">
						<text class="iconfont icondelete"></text>
						<text>取消</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getcollectList, delcollect } from '@/api/favorite.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from '@/components/empty';
export default {
	components: {
		uniLoadMore,
		empty
	},
	data() {
		return {
			tabCurrentIndex: 0,
			favoriteList: '',
			delshow: true
		};
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		//获取收藏夹列表
		loadData() {
			let obj = this;
			getcollectList({
				page: '1',
				limit: '10'
			})
				.then(function(e) {
					obj.favoriteList = e.data;
					console.log(obj.favoriteList);
				})
				.catch(function(e) {
					console.log(e);
				});
		},
		//删除收藏夹商品
		del(item) {
			let obj = this;
			uni.showModal({
				title: '提示',
				content: '是否取消收藏该商品',
				success: e => {
					if (e.confirm) {
						delcollect({
							id: item,
							category: 'product'
						})
							.then(function(e) {
								uni.showToast({
									title: '已取消收藏',
									duration: 1500,
								});
								obj.loadData();
							})
							.catch(function(e) {
								console.log(e);
							});
					}
				}
			});
		},
		//跳转商品详情页
		toproduct(item) {
			let id = item;
			uni.navigateTo({
				url: `/pages/product/product?id=${id}`
			});
		}
		// //跳转忘记密码
		// forget() {
		// 	uni.navigateTo({
		// 		url: `/pages/public/forget`
		// 	});
		// },
		// // 后退
		// navBack() {
		// 	uni.navigateBack();
		// }
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
	padding: 15rpx 0rpx;
	font-size: 28rpx;
}
.favorites {
	width: 90%;
	background-color: #ffffff;
	// height:100%;
	border-radius: 15rpx;
	margin: 15rpx auto;
	padding: 25rpx 25rpx;
	margin-bottom: 25rpx;
}
.favorites_img {
	width: 80px !important;
	height: 80px;
}
.favorites_img image {
	width: 100%;
	height: 100%;
}
.favorites_list {
	width: 70%;
	padding-left: 20rpx;
}
.icon_del {
	color: $font-color-base;
	z-index: 9999;
	font-weight: bold;
}
.favorites_name {
	height: 80rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.favorites_peice {
	margin-top: 25rpx;
	color: #db1935;
	font-weight: bold;
}
</style>
