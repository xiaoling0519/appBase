<template>
	<view class="lyy-bg4">
		<view class="lyy-f-a">
			<view class="lyy-f-b lyy-flex">
				<view class="lyy-f-c item" @click="goProduct(items)" v-for="(items, ind) in goodsList" :key="ind">
					<view class="content">
						<view><image :src="items.image" class="lyy-f-image" /></view>
						<view class="lyy-f-word1 lyy-f-jl ellipsis">{{ items.title }}</view>
						<view class="lyy-flex2">
							<view class="lyy-flex3">
								<view class="lyy-f-word2 lyy-f-jl">￥{{ items.price * 1 }}</view>
							</view>
							<view class="lyy-a-tu2 lyy-flex2">
								<view class="lyy-a-tu3"><image src="../../static/img/img11.png" class="lyy-a-tu5" /></view>
								<view class="lyy-a-tu4">{{ items.people }}人拼</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { getCombinationList } from '@/api/groupBooking.js';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			goodsList: [],
			loadingType: 'more', //加载更多状态
			limit: 20, //每次加载数据条数
			page: 1 //当前页数
		};
	},
	onLoad(options) {
		this.loadData();
	},
	//下拉刷新
	onPullDownRefresh() {
		this.loadData('refresh');
	},
	//监听页面是否滚动到底部加载更多
	onReachBottom() {
		this.loadData();
	},
	methods: {
		//加载商品 ，带下拉刷新和上滑加载
		async loadData(type = 'add', loading) {
			let obj = this;
			let data = {
				page: obj.page,
				limit: obj.limit
			};
			//没有更多直接返回
			if (type === 'add') {
				if (obj.loadingType === 'nomore') {
					return;
				}
				obj.loadingType = 'loading';
			} else {
				obj.loadingType = 'more';
			}

			// 加载商品信息
			getCombinationList(data)
				.then(e => {
					if (type === 'refresh') {
						// 清空数组
						obj.goodsList = [];
					}
					obj.goodsList = obj.goodsList.concat(e.data);
					//判断是否还有下一页，有是more  没有是nomore
					if (obj.limit == e.data.length) {
						obj.page++;
						obj.loadingType = 'more';
					} else {
						obj.loadingType = 'nomore';
					}
					if (type === 'refresh') {
						if (loading == 1) {
							uni.hideLoading();
						} else {
							uni.stopPullDownRefresh();
						}
					}
				})
				.catch();
		},
		goProduct(e) {
			uni.navigateTo({
				url: '/pages/product/product?type=2&id=' + e.id
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
// 拼团列表
.lyy-f-a {
	margin: 0px 15px;

	.lyy-flex {
		/* 内部模块1*/
		display: flex;
		justify-content: space-between;
	}
	.lyy-f-b {
		flex-wrap: wrap;
		.lyy-f-c {
			flex: 0 0 50%;
			/* width: 50%; */
			margin: 10px 0px 0px 0px;
		}

		.item:nth-child(2n + 1) .content {
			margin: 0px 7.5px 0px 0px;
			border-radius: 10px;
		}
	}

	.lyy-f-b .content {
		background-color: white;
		.lyy-f-image {
			width: 100%;
			height: 340rpx;
			border-radius: 10rpx 10rpx 0rpx 0rpx;
		}
		.ellipsis {
			width: 165px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.lyy-f-jl {
			padding: 5px 7px;
		}
		.lyy-f-word1 {
			font-size: 12px;
			color: rgba(50, 50, 50, 1);
			line-height: 20px;
			width: 300rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.item:nth-child(2n) .content {
		margin: 0px 0 0px 7.5px;
		border-radius: 10px;
	}

	.lyy-f-word3 {
		font-size: 12px;
		text-decoration: line-through;
		color: rgba(139, 139, 139, 1);
	}

	.lyy-f-word5 {
		font-size: 20rpx;
		color: rgba(153, 153, 153, 1);
		margin: 20rpx 0px 0px 0px;
	}

	.lyy-f-word4 {
		height: 26px;
		background: #6fb22f;
		color: white;
		text-align: center;
	}

	.lyy-f-d {
		height: 24rpx;
		border: 1px solid rgba(252, 91, 98, 1);
		border-radius: 3px;
		font-size: 20rpx;
		text-align: center;
		width: 50rpx;
		color: rgba(252, 91, 98, 1);
		margin: 23rpx 0rpx 0rpx 0rpx;
		line-height: 24rpx;
	}

	.lyy-flex2 {
		display: flex;
		padding-right: 10rpx;
		align-items: center;
		.lyy-flex3 {
			flex: 1;
			.lyy-f-word2 {
				font-size: 14px;
				color: rgba(241, 13, 59, 1);
			}
		}
		&.lyy-a-tu2 {
			height: 34rpx;
			background: rgba(255, 255, 255, 1);
			border: 1px solid #fc5b62;
			border-radius: 2px;
			margin: 10rpx 0rpx;

			.lyy-a-tu3 {
				height: 30rpx;
				background-color: #fc5b62;
				padding: 0px 6px;
				text-align: center;
				.lyy-a-tu5 {
					width: 20rpx;
					height: 20rpx;
					margin-top: 6rpx;
					display: block;
				}
			}

			.lyy-a-tu4 {
				margin-left: 4rpx;
				font-size: 24rpx;
				line-height: 30rpx;
				color: #fc5b62;
				padding: 0px 10rpx;
				text-align: center;
			}
		}
	}
}
</style>
