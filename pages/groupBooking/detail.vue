<template>
	<view class="box">
		<!-- 拼团 -->
		<view class="lyy-a">
			<view class="lyy-a-p">
				<view class="lyy-a-f">
					<view><image :src="goods.image" class="lyy-a-tu" /></view>
					<view class="lyy-a-z">
						<view class="lyy-a-word lyy-a-word2">{{ goods.title }}</view>
						<view class="flex money-box">
							<view class="lyy-a-f lyy-a-word margin-r-20">
								<view class="lyy-a-word3">￥{{ goods.price }}</view>
							</view>
							<view class="lyy-a-tu2 lyy-a-f padding-c-20 border-radius-all">
								<view class="lyy-a-tu3"><image src="http://lxscimg.liuniu946.com/2019-11-02_5dbd110b5928a.png" class="lyy-a-tu5"></image></view>
								<view class="lyy-a-tu4 flex-shrink-false">{{ goods.people }}人拼</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lyy-hx"></view>
		<!-- 第二部分 -->
		<view class="lyy-b padding-t-20">
			<view class="lyy-b-p">
				<view class="lyy-b-jz flex">
					<view class="image1"><view class="lyy-b-word">剩余时间</view></view>
				</view>
				<view class="lyy-b-jz flex">
					<uni-countdown
						v-if="pinkBool == 0"
						color="#FFFFFF"
						splitor-color="#FC5B62"
						background-color="#FC5B62"
						border-color="#FC5B62"
						:show-day="false"
						:hour="stopTime.stopTimeH"
						:minute="stopTime.stopTimeM"
						:second="stopTime.stopTimeS"
					></uni-countdown>
				</view>
				<view class="lyy-b-jz flex">
					<span class="lyy-b-word2">{{ pinkT.people }}</span>
					<span class="lyy-b-word3">人成团，还差{{ peopleNub }}人</span>
				</view>
				<view class="lyy-b-jz flex">
					<view class="cmy-user-box">
						<view class="user-list">
							<view class="lyy-y bg-gray"><image :src="pinkT.avatar" class="user-list-img" /></view>
							<view class="lyy-y-word clamp">{{ pinkT.nickname }}</view>
						</view>
						<view class="user-list" v-for="(item , i) in people" :key='i'>
						    <view class="lyy-y bg-gray"><image :src="item.avatar" class="user-list-img" /></view>
						    <view class="lyy-y-word clamp">{{ item.nickname }}</view>
						</view>
						<view class="user-list" v-for="(l, i) in peopleNub" :key="i">
							<view class="lyy-y bg-gray"></view>
							<view class="lyy-y-word clamp">待邀请</view>
						</view>
					</view>
				</view>
				<view class="lyy-b-jz flex">
					<view class="lyy-b-but" v-if="status == 1 && pinkBool == 0" @click="invitation">邀请好友参团</view>
					<view class="lyy-b-but" v-if="status == 0&&pinkBool==0" @click="goBuy">立即加入</view>
					<!-- <view class="lyy-b-but" @click="goBuy">立即加入</view> -->
					<view class="lyy-b-but bg-gray" v-if="pinkBool == -1">拼团失败</view>
					<view class="lyy-b-but" v-if="pinkBool == 1">拼团成功</view>
				</view> 
			</view>
		</view>
		<view class="lyy-hx"></view>
		<!-- 第三部分 -->
		<view class="lyy-c">
			<view class="lyy-c-p">
				<view class="lyy-c-word">
					<view>拼团规则：</view>
					<view>1.点击商品进入商品详情，通过超值拼团进入订单支付 页，用户付款成功后，按页面提示分享给微信好友。</view>
					<view>2.好友通过分享，加入超值拼团，完成订单支付，待达成 拼团人数后，拼团成功。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import { getCombinationLisPink } from '@/api/groupBooking.js';
import { groupGoods } from '@/api/product.js';
import { timeComputed } from '@/utils/rocessor.js';
import { mapState } from 'vuex';
// 倒计时
export default {
	computed: {
		// 还需要报名的人数
		peopleNub() {
			return this.pinkT.people - 1 - this.people.length;
		}
	},
	data() {
		return {
			gp_id: 0, //拼团商品id
			goods: {}, //商品信息
			pinkT: {}, //拼团团长信息
			people: [], //拼团成员信息
			status: 0, //判断是否为团长
			gid: 0,
			user_info: {}, //当前用户信息
			// 倒计时
			stopTime: {
				stopTimeH: 0,
				stopTimeM: 0,
				stopTimeS: 0
			},
			pinkBool: 0, //拼团状态0为待拼团 -1为拼团失败 1为拼团成功
			userBool: 0, //判断用户是否已经参与拼团 0未参加 1为已参加
			spread: '', //默认没有邀请人
			userInfo: {} //当前用户信息
		};
	},
	onLoad(e) {
		// 保存拼团订单id
		this.gp_id = e.id;
		// 判断是否有人邀请
		if (e.spread) {
			// 存储邀请人
			this.spread = e.spread;
			uni.setStorageSync('spread', option.spread);
		}
	},
	onShow() {
		this.getData();
	},
	components: {
		uniCountdown
	},
	methods: {
		//前往参团
		goBuy() {
			let _self = this;
			uni.navigateTo({
				url: '/pages/order/createOrder?pinkId=' + this.gp_id + '&type=pink' + '&pid=' + this.goods.product_id + '&gid=' + this.goods.id + '&merid=' + this.goods.mer_id
			});
		},
		//邀请参团
		invitation() {
			let obj = this;
			// 判断拼团是否已经结束
			if (obj.userBool == 0) {
				uni.showModal({
					title: '提示',
					content: '该拼团已经结束！',
					showCancel: false,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/groupBooking/inviteImg?id=' + this.pinkT.id + '&spread=' + this.userInfo.uid,
				success: res => {},
				fail: e => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		// #ifdef H5
		// 加载微信html5页面分享方法
		shareDate() {
			let obj = this;
			// 判断是否微信浏览器
			let bool = uni.getStorageSync('weichatBrowser') || '';
			if (bool) {
				// 过滤微信强制添加的链接地址
				url = url.replace('?from=singlemessage', '');
				let data = {
					link: url, // 分享链接
					imgUrl: obj.goodsObjact.image, // 分享图标
					desc: obj.goodsObjact.store_info,
					title: obj.goodsObjact.store_name,
					success: function() {}
				};
				obj.weichatObj.updateAppMessageShareData(data);
				obj.weichatObj.updateTimelineShareData(data);
			}
		},
		// #endif
		// 获取拼团信息
		getData() {
			let obj = this;
			// let data = {gp_id:_self.gp_id},
			getCombinationLisPink({}, this.gp_id).then(e => {
				let r = e.data;
				// 保存拼团商品详细
				obj.goods = r.store_combination;
				// 保存团长信息
				obj.pinkT = r.pinkT;
				/* 计算倒计时 */
				obj.timeComputed(obj.pinkT.stop_time * 1000);
				// 获取拼团用户列表
				obj.people = r.pinkAll;
				// 获取当前是否已参与过这个拼团
				obj.userBool = r.userBool;
				// 判断当前用户是否为团长
				if (r.pinkT.uid == r.userInfo.uid) {
					// 显示邀请好用选项
					obj.status = 1;
				}
				// 保存当前登录用户信息
				obj.userInfo = r.userInfo;
				// 获取拼团是否已经过期
				obj.pinkBool = r.pinkBool;
				// #ifdef H5
				// 加载微信分享配置
				this.shareDate();
				// #endif
			});
		},
		// 计算倒计时时间
		timeComputed(da) {
			let obj = this;
			let stopTime = timeComputed(da);
			obj.stopTime.stopTimeH = stopTime.hours;
			obj.stopTime.stopTimeM = stopTime.minutes;
			obj.stopTime.stopTimeS = stopTime.seconds;
		}
	}
};
</script>

<style lang="scss">
.box {
	/* #ifdef APP-PLUS | MP */
	padding-top: var(--status-bar-height);
	/* #endif */
}
.lyy-c {
	width: 100%;
	background: rgba(255, 255, 255, 1);
	.lyy-c-word {
		font-size: 28rpx;
		color: rgba(102, 102, 102, 1);
		line-height: 50rpx;
	}

	.lyy-c-p {
		padding: 39rpx 30rpx;
	}
}

.lyy-wrap {
	background-color: #f4f4f4;
}

.lyy-hx {
	height: 14rpx;
}

.image1 {
	width: 200rpx;
	height: 33rpx;
	background: url('http://lxscimg.liuniu946.com/2019-11-02_5dbd0e10a2160.png') center center no-repeat;
	background-size: 200rpx auto;
}

.lyy-b {
	width: 100%;
	background-color: white;
	.lyy-b-p {
		padding: 30rpx 45rpx;
		.lyy-b-word2,
		.lyy-b-word3 {
			font-size: 28rpx;
			font-weight: bold;
		}
		.lyy-b-word2 {
			color: #fc5b62;
		}
		.lyy-b-word3 {
			color: #1d2023;
		}
		.lyy-b-jz {
			width: 100%;
			justify-content: center;
			margin-bottom: 20rpx;
			.lyy-y {
				width: 80rpx;
				height: 80rpx;
				margin: 0px 15rpx;
				border-radius: 40rpx;
				overflow: hidden;
				.user-list-img {
					width: 100%;
					height: 100%;
				}
			}
			.lyy-y-word {
				margin-top: 10rpx;
				font-size: 28rpx;
				text-align: center;
				width: 110rpx;
			}
			.lyy-b-but {
				width: 550rpx;
				height: 80rpx;
				background: #fc5b62;
				border-radius: 100rpx;
				text-align: center;
				color: white;
				line-height: 80rpx;
				font-size: 32rpx;
			}
			.cmy-user-box {
				.user-list {
					display: inline-block;
					line-height: 1;
				}
			}
		}
		.lyy-b-word {
			text-align: center;
			font-size: 26rpx;
			color: rgba(29, 32, 35, 1);
		}
	}
}

// 商品列表样式
.lyy-a {
	width: 100%;
	background-color: white;
	.lyy-a-p {
		padding: 22rpx 30rpx;
		.lyy-a-f {
			display: flex;
			align-items: center;
			.lyy-a-f2 {
				flex: 1;
			}
			.lyy-a-tu {
				width: 122rpx;
				height: 122rpx;
			}
			.lyy-a-z {
				padding-left: 30rpx;
				flex-grow: 1;
				.money-box {
					justify-content: flex-start;
					.lyy-a-tu2 {
						background: rgba(255, 255, 255, 1);
						border: 1rpx solid #fc5b62;
						.lyy-a-tu3 {
							background-color: #fc5b62;
							padding: 2px 4px 0px 4px;
							text-align: center;
							height: 26rpx;
							.lyy-a-tu5 {
								width: 20rpx;
								height: 20rpx;
								display: block;
							}
						}
						.lyy-a-tu4 {
							margin-left: 2px;
							font-size: 10px;
							color: #fc5b62;
							padding: 0px 10rpx;
							text-align: center;
						}
					}
				}
				.lyy-a-word {
					line-height: 56rpx;
					.lyy-a-word3 {
						font-size: 28rpx;
						font-weight: bold;
						color: #fc5b62;
					}
				}
				.lyy-a-word2 {
					font-size: 30rpx;
					color: rgba(29, 32, 35, 1);
				}
			}
		}
	}
}
</style>
