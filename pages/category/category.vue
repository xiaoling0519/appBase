<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{ active: item.id === currentId }" @click="tabtap(item)">{{ item.cate_name }}</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in flist" :key="item.id" class="s-list" :id="'main-' + item.id">
				<text class="s-item">{{ item.cate_name }}</text>
				<view class="t-list ">
					<view @click="navToList(item.id, titem.id)" class="t-item" v-for="titem in item.children" :key="titem.id">
						<image :src="titem.pic"></image>
						<text>{{ titem.cate_name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getList } from '@/api/category.js';
export default {
	data() {
		return {
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
		};
	},
	onLoad() {
		this.loadData();
	},
	// 监听导航栏输入框点击事件
	onNavigationBarSearchInputClicked(e) {
		uni.navigateTo({
			url: '/pages/product/search'
		});
	},
	methods: {
		// 载入数据
		async loadData() {
			let obj = this;
			getList({})
				.then(({ data }) => {
					obj.flist = data.map(function(s) {
						return s;
					});
				})
				.catch(err => {
					console.log(err);
				});
		},
		//一级分类点击
		tabtap(item) {
			console.log(item);
			// 判断有没有初始化页面高度对象数据
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			// 获取当前点击的id
			this.currentId = item.id;
			this.tabScrollTop = item.top;
		},
		//右侧栏滚动
		asideScroll(e) {
			// 判断有没有初始化页面高度对象数据
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let box = 0; //列表包裹框高度初始化
			let bottom = 10; //距离页面底部多少像素左侧列表切换到最后一个一级分类
			// 查询当前页面对象
			let view = uni.createSelectorQuery().select('.content');
			view.fields(
				{
					id: true,
					dataset: true,
					rect: true,
					size: true,
					scrollOffset: true
				},
				function(e) {
					// 保存包裹框高度
					box = e.height;
				}
			).exec();
			// 获取所有距离顶部大于滚轮距离页面高度的所有分类
			let tabs = this.flist.filter(item =>( item.top-10) <= scrollTop).reverse();
			if (tabs.length > 0) {
				// 判断是否已经到达滚轮底部
				if (box + scrollTop + bottom >= e.detail.scrollHeight) {
					this.currentId = this.flist[this.flist.length - 1].id;
				} else {
					this.currentId = tabs[0].id;
				}
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.flist.forEach(item => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view.fields(
					{
						size: true
					},
					data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}
				).exec();
			});
			this.sizeCalcState = true;
		},
		navToList(sid, tid) {
			// 点击导航跳转到详细页面
			uni.navigateTo({
				url: '/pages/product/list?fid='+this.currentId+'&sid='+sid+'&tid='+tid
			});
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	height: 100%;
	background-color: #f8f8f8;
}

.content {
	display: flex;
}
.left-aside {
	flex-shrink: 0;
	width: 200rpx;
	height: 100%;
	background-color: #fff;
}
.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100rpx;
	font-size: 28rpx;
	color: $font-color-base;
	position: relative;
	&.active {
		color: $base-color;
		background: #f8f8f8;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36rpx;
			width: 8rpx;
			background-color: $base-color;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}

.right-aside {
	flex: 1;
	overflow: hidden;
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.s-item {
	display: flex;
	align-items: center;
	height: 70rpx;
	padding-top: 8rpx;
	font-size: 28rpx;
	color: $font-color-dark;
}
.t-list {
	display: flex;
	flex-wrap: wrap;
	border-radius: 15rpx;
	width: 100%;
	background: #fff;
	padding-top: 12rpx;
	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}
.t-item {
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 171rpx;
	font-size: 26rpx;
	color: #666;
	padding-bottom: 20rpx;

	image {
		width: 140rpx;
		height: 140rpx;
	}
}
</style>
