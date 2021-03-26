<template>
	<view class="seckillBox">
		<scroll-view scroll-x="true" class="class-box flex b-t" :scroll-left="scrollLeft" :scroll-with-animation="true">
			<view @click="tabClass(idx)" class="item" :style="{ width: topNavWidth }" v-for="(item, idx) in indexList" :key="idx">
				<view class="time" :class="{ action: idx == classIndex }">{{ item.time }}</view>
				<view class="status" :class="{ action: idx == classIndex }">{{ item.state }}</view>
			</view>
		</scroll-view>
		<swiper class="list-Box" :current="classIndex" @change="swiperChange" duration="500">
			<swiper-item class="list-item" v-for="(ls, idx) in indexList">
				<view class=" b-b position-relative">
					<view class="title-box flex ">
						<view class="title-box-left">
							<text v-if="ls.status == 1">抢购中先下先得哦！</text>
							<text v-if="ls.status == 2">精品好货即将开抢！</text>
							<text v-if="ls.status == 0">本场已结束，下次早点来哦！</text>
						</view>
						<view class="title-box-right flex">
							<text class="tip" v-if="ls.status == 1">距离结束</text>
							<text class="tip" v-if="ls.status == 2">距离开始</text>
							<uni-countdown
								color="#F9F9F8"
								background-color="#666666"
								v-if="ls.status == 1 || ls.status == 2"
								:show-day="false"
								:hour="ls.stopTimeH"
								:minute="ls.stopTimeM"
								:second="ls.stopTimeS"
							></uni-countdown>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="list" @scrolltolower="getList(classIndex)">
					<view class="goodsList-item flex" :key="ind" v-for="(lss, ind) in ls.dataList">
						<image :src="lss.image" lazy-load mode="scaleToFill"></image>
						<view class="goodsList-content">
							<view class="title clamp">
								<text>{{ lss.title }}</text>
							</view>
							<view class="slider flex">
								<view class="slider-box"><view class="slider-action" :style="{ width: lss.percent + '%' }"></view></view>
								<view class="sales-nub">已抢{{ lss.percent + '%' }}</view>
							</view>
							<view class="goods-money flex">
								<view class="money-box">
									<view class="money">
										<text class="font-size-sm">￥</text>
										{{ lss.price }}
									</view>
									<view class="otMoney-box">
										<text class="otMoney">￥{{ lss.ot_price }}</text>
									</view>
								</view>
								<view @click="navProduct(ls, ind)" class="cart" :class="{ 'seckill-action': ls.status == 1 }">
									{{ ls.status == 1 ? '去抢购' : ls.status == 2 ? '未开始' : '已结束' }}
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="ls.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { getList, getClass } from '@/api/seckill.js';
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { timeComputed } from '@/utils/rocessor.js';
export default {
	components: {
		uniCountdown,
		uniLoadMore
	},
	data() {
		return {
			indexList: [], //分类列表
			showTime: '', //显示的时间
			showTImeId: '', //显示时间id用于查询数据
			// 判断是否所有活动已经结束
			stop: false, //活动是否已经结束
			show: false, //是否显示活动
			status: 0, //获取状态值1为有活动开始中 2为活动未开始 0为活动已经结束
			topNavWidth: '25%', //设置导航默认宽度
			classIndex: 0, //当前进行中的活动
			itemWidht: 0 //顶部分类宽度
		};
	},
	computed: {
		// 计算左侧距离
		scrollLeft() {
			if (this.classIndex > 1) {
				return this.itemWidht * (this.classIndex - 1.5);
			} else {
				return 0;
			}
		}
	},
	onLoad: function(e) {
		// 载入分类
		this.getClass();
	},
	methods: {
		//抢购时间切换时触发效果
		swiperChange(e) {
			this.classIndex = e.target.current;
			this.getList(this.classIndex, 'tabChange');
		},
		// 获取项目宽度
		numClassWidht() {
			uni.createSelectorQuery()
				.select('.seckillBox')
				.fields(
					{
						size: true
					},
					data => {
						// 设置项目宽度
						this.itemWidht = Math.floor((data.width / 750) * 187.5);
					}
				)
				.exec();
		},
		// 切换当前选中的秒杀活动
		tabClass(ind) {
			// 保存当前选中的对象
			this.classIndex = ind;
		},
		// 跳转到商品详情
		navProduct(ls, ind) {
			if (ls.status == 1) {
				let data = ls.dataList[ind];

				uni.navigateTo({
					url: '/pages/product/product?id=' + data.id + '&type=1' + '&stoptime=' + this.indexList[this.classIndex].stop
				});
			}
		},
		// 获取商品
		getList(ind, source) {
			// 获取数据对象
			let date = this.indexList[ind];
			console.log(date, source);
			if (source === 'tabChange' && date.loaded === true) {
				//tab切换只有第一次需要加载数据
				return;
			}
			if (date.loadingType === 'noMore') {
				//防止重复加载
				return;
			}
			if (date.loadingType === 'loading') {
				//防止重复加载
				return;
			}
			// 修改当前对象状态为加载中
			date.loadingType = 'loading';
			getList(
				{
					page: date.page,
					limit: date.limit
				},
				date.id
			)
				.then(e => {
					date.dataList.push(...e.data);
					// 查询翻页增加
					date.page++;
					// 判断是否可以继续加载
					if (date.limit == e.data.length) {
						date.loadingType = 'more';
					} else {
						date.loadingType = 'noMore';
					}
					// 设置当前数据已加载完毕
					this.$set(date, 'loaded', true);
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 获取秒杀时间段
		getClass() {
			let obj = this;
			getClass({})
				.then(({ data }) => {
					obj.indexList = data.seckillTime.map((e, ind) => {
						// 初始化翻页页数
						e.page = 1;
						// 初始每次加载的数据条数
						e.limit = 6;
						// 创建储存订单数据
						e.dataList = [];
						// 初始化加载
						e.loadingType = 'more';
						let ar = e;
						// 判断是否为进行中的活动
						if (ar.status === 1) {
							// 计算倒计时时间
							obj.timeComputed(ar.stop * 1000, ar);
						} else {
							// 获取距离开始还需要多少时间
							let arTime = ar.time.split(':');
							let h = arTime[0];
							let m = arTime[1];
							let time = new Date();
							// 设置时间
							time.setHours(h, m, 0);
							// 计算倒计时时间
							obj.timeComputed(time.getTime(), ar);
						}

						return e;
					});
					// 获取当前活动中的下标值
					obj.classIndex = data.seckillTimeIndex;
					// 获取当前显示中对象的数据
					obj.$nextTick(() => {
						obj.getList(obj.classIndex);
					});
					if (obj.indexList.length <= 4) {
						// 当数量小于等于4的时候自适应宽度
						obj.topNavWidth = 100 / obj.indexList.length + '%';
					} else {
						// 页面渲染完毕后加载scroll-view左侧距离
						obj.$nextTick(() => {
							obj.numClassWidht();
						});
					}
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 计算倒计时时间
		timeComputed(da, ar) {
			let obj = this;
			// 计算时间，保存需要多少时间到期
			let stopTime = timeComputed(da);
			console.log(stopTime);
			ar.stopTimeH = stopTime.hours;
			ar.stopTimeM = stopTime.minutes;
			ar.stopTimeS = stopTime.seconds;
		}
	}
};
</script>

<style lang="scss">
page,
.seckillBox {
	min-height: 100%;
	height: 100%;
}
// 头部时间段样式
.class-box {
	white-space: nowrap;
	height: 60px;
	.item {
		text-align: center;
		display: inline-block;
		color: $font-color-base;
		padding: 11.5px 5px;
		background-color: #ffffff;
		line-height: 1;
		.time {
			font-size: 16px;
			padding-bottom: 3px;
			&.action {
				color: $color-red;
			}
		}
		.status {
			font-size: 12px;
			margin: 0 auto;
			width: 60px;
			padding: 3px 0;
			&.action {
				color: #ffffff;
				border-radius: 99px;
				background-color: $color-red;
			}
		}
	}
}
// 列表上方标题样式
.title-box {
	margin-top: 10px;
	padding: 10px;
	background-color: #ffffff;
	.title-box-left {
		font-size: 15px;
		color: $font-color-base;
	}
	.title-box-right {
		.tip {
			font-size: 15px;
			color: #999999;
			padding-right: 5px;
		}

		/deep/ .uni-countdown__number {
			border-radius: 3px;
			width: 22px;
		}
		/deep/ .uni-countdown__splitor,
		/deep/ .uni-countdown__number {
			height: 20px;
			line-height: 18px;
		}
	}
}
// 列表样式
.list-Box {
	height: calc(100% - 60px);
	.list {
		height: calc(100% - 55px);
	}
}
// 商品列表
$slider-color: #fe9398; //滑块左侧颜色
.goodsList-item {
	background-color: #ffffff;
	padding: 30rpx;
	border-bottom: 1px solid $border-color-light;
	image {
		flex-shrink: 0;
		border-radius: $border-radius-sm;
		height: 180rpx;
		width: 180rpx;
	}
	.slider {
		margin-top: 15rpx;
		justify-content: flex-start;
		.slider-box {
			width: 196rpx;
			border-radius: 99px;
			border: 1px solid $slider-color;
			height: 16rpx;
			.slider-action {
				background-color: $slider-color;
				height: 100%;
			}
		}
		.sales-nub {
			color: $font-color-light;
			font-size: 24rpx;
			padding-left: 20rpx;
		}
	}
	.goodsList-content {
		margin-left: 20rpx;
		flex-grow: 1;
		height: 180rpx;
		position: relative;
		.title {
			font-size: $font-base;
			color: $font-color-dark;
			font-weight: 500;
			width: 0;
			min-width: 100%;
		}
		.goods-money {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			.money-box {
				.money {
					font-size: $font-lg + 10rpx;
					color: $color-red;
					font-weight: bold;
				}
				.otMoney-box {
					font-size: $font-sm;
					.otMoney {
						color: $font-color-light;
						padding-right: 20rpx;
						text-decoration: line-through;
					}
					.sales {
						color: $font-color-light;
					}
				}
			}
			.cart {
				font-size: $font-base;
				border-radius: 99px;
				padding: 15rpx 30rpx;
				line-height: 1;
				color: #ffffff;
				background-color: $color-gray;
				&.seckill-action {
					border: 1px solid $color-red;
					background-color: $color-red;
				}
			}
		}
	}
}
</style>
