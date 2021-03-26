<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots :circular="true" duration="400">
				<swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index">
					<view class="image-wrapper"><image :src="item" class="loaded" mode="scaleToFill"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section seckill-box-title" v-if="goodsType == 1">
			<view class="title flex">
				<view class="title-box">
					<text class="price-tip">¥</text>
					<text class="price">{{ goodsObjact.price }}</text>
					<!-- <text class="m-price" v-if="goodsObjact.ot_price > goodsObjact.price">¥{{ goodsObjact.ot_price }}</text> -->
					<!-- <text class="coupon-tip">7折</text> -->
				</view>
				<view class="flex timeStop">
					<view>距离结束</view>
					<uni-countdown
						color="#ffffff"
						background-color="#D65B3F"
						splitor-color="#FFFFFF"
						:show-day="false"
						:hour="seckillObj.stopTimeH"
						:minute="seckillObj.stopTimeM"
						:second="seckillObj.stopTimeS"
					></uni-countdown>
				</view>
			</view>
		</view>

		<view class="introduce-section">
			<text class="title" v-if="goodsType == 0 || goodsType == 2">{{ goodsObjact.store_name }}</text>
			<text class="title" v-if="goodsType == 1">{{ goodsObjact.title }}</text>
			<view class="price-box" v-if="goodsType == 0 || goodsType == 2">
				<text class="price-tip">¥</text>
				<text class="price">{{ goodsObjact.price }}</text>
				<text class="m-price" v-if="goodsObjact.ot_price > goodsObjact.price">¥{{ goodsObjact.ot_price }}</text>
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>销量: {{ goodsObjact.sales + goodsObjact.ficti }}</text>
				<text>库存: {{ goodsObjact.stock }}</text>
				<text>邮费: {{ goodsObjact.postage }}</text>
			</view>
		</view>

		<!--  分享 -->
		<view class="share-section" @click="share" v-if="goodsType == 0">
			<view class="share-icon">
				<text class="iconfont iconfavorfill"></text>
				返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="iconfont iconprompt"></text>
			<view class="share-btn">
				立即分享
				<text class="iconfont iconenter"></text>
			</view>
		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec()" v-if="goodsType == 0">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text">{{ specSelectedName }}</text>
				</view>
				<text class="iconfont iconenter"></text>
			</view>
			<view class="c-row b-b" @click="toggleSpec()">
				<text class="tit">购买数量</text>
				<view class="con">
					<text class="selected-text">{{ goodsNumber }}</text>
				</view>
				<text class="iconfont iconenter"></text>
			</view>
			<view class="c-row b-b" v-if="goodsType == 1">
				<text class="tit">限购数量</text>
				<view class="con">
					<text class="selected-text">{{ goodsObjact.num + goodsObjact.unit_name }}</text>
				</view>
			</view>
			<view class="c-row b-b" v-if="goodsType == 0">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="iconfont iconenter"></text>
			</view>
			<view class="c-row b-b" v-if="goodsType == 0">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view>
			<view class="c-row b-b" v-if="goodsType == 0">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view>

		<view class="shop-box flex">
			<view class="flex">
				<image :src="system_store.image" mode=" aspectFit" class="shop-img"></image>
				<text class="font-size-lg">Chobits旗舰店</text>
			</view>
			<view class="shop-button">进店逛逛</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="iconfont iconenter"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header"><text>图文详情</text></view>
			<rich-text class="detail-centent" :nodes="goodsObjact.description"></rich-text>
			<!-- 底部高度撑开 -->
			<view :class="{ contentBottomHeight: goodsType == 1 || goodsType == 2, goodsBottom: goodsType == 0 }"></view>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom" v-if="goodsType == 0">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="iconfont iconhomefill"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="iconfont iconcartfill"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{ active: goodsObjact.userCollect }" @click="toFavorite(goodsObjact)">
				<text class="iconfont iconlikefill"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec(1)">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="toggleSpec(2)">加入购物车</button>
			</view>
		</view>

		<!-- 秒杀商品购买 -->
		<view class="goods-pay-box flex" :class="{ stop: seckillObj.stop }" v-if="goodsType == 1">
			<view class="goods-pay bgLine" v-if="!seckillObj.stop" @click="toggleSpec(1)"><text>立即购买</text></view>
			<view class="goods-pay-stop" v-else>活动已结束</view>
		</view>

		<!-- 拼团商品购买 -->
		<view class="goods-pay-box flex" v-if="goodsType == 2">
			<view class="goods-pay bg-warning" @click="navToProductGoods">
				<view class="goods-buttom-money">¥{{ goodsObjact.product_price }}</view>
				<view class="goods-buttom">单独购买</view>
			</view>
			<view class="goods-pay bg-danger" @click="toggleSpec(1)">
				<view class="goods-buttom-money">¥{{ goodsObjact.price }}</view>
				<view class="goods-buttom">我要拼团</view>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec()">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="actionImage"></image>
					<view class="right">
						<text class="price">¥{{ actionPrice * goodsNumber }}</text>
						<text class="stock">库存：{{ goodsObjact.stock }}件</text>
						<view class="selected" v-if="goodsType == 0">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{ sItem }}</text>
						</view>
					</view>
				</view>
				<view v-for="(item, index) in specList" :key="index" class="attr-list">
					<text>{{ item.attr_name }}</text>
					<view class="item-list">
						<text
							v-for="(childItem, childIndex) in item.attr_value"
							:key="childIndex"
							class="tit"
							:class="{ selected: childItem.check }"
							@click="selectSpec(childItem, item, index)"
						>
							{{ childItem.attr }}
						</text>
					</view>
				</view>
				<view class="attr-list">
					<text>购买数量</text>
					<view class="item-list">
						<uni-number-box class="step" :isMin="true" :value="goodsNumber" :min="1" :max="goodsNumberMax" @eventChange="numberChange"></uni-number-box>
					</view>
				</view>
				<button class="btn" @click.stop="buy">完成</button>
			</view>
		</view>
		<view :class="{ seckillBottom: goodsType == 1, goodsBottom: goodsType == 0 }"></view>
		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
import share from '@/components/share';
import uniNumberBox from '@/components/uni-number-box.vue';
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import { goodsDetail, cartAdd, collectAdd, collectDel, seckillGoods, groupGoods } from '@/api/product.js';
import { mapState } from 'vuex';
// #ifdef H5
import { weixindata } from '@/utils/wxAuthorized';
// #endif
export default {
	components: {
		share,
		uniNumberBox,
		uniCountdown
	},
	data() {
		return {
			type: 1, //默认支付方式add为
			goodsNumber: 1, //购买数量
			goodsid: '', //商品id
			specClass: 'none', //显示隐藏弹窗
			shareList: [], //分享列表
			goodsObjact: {}, //保存商品数据
			//图片循环
			imgList: [],
			specList: [],
			// 对比对象
			productValue: [], //商品规格列表
			actionPrice: 0, //默认选中商品价格
			actionImage: '', //默认选中图片
			uniqueId: '', //选中的商品分类
			specSelected: [], //选中的分类
			specSelectedName: '', //选中分类名称
			goodsNumberMax: 0, //最大可购买数量
			system_store: {}, //商店信息
			shopId: '', //商店id
			goodsType: 0, //商品类型1秒杀商品0为普通商品2为拼团商品
			// 秒杀数据保存
			seckillObj: {
				stopTime: 0, //结束时间
				stop: false, //是否结束
				stopTimeH: 0, //小时
				stopTimeM: 0, //分钟
				stopTimeS: 0 //秒钟
			},
			// 拼团数据保存
			pink: {
				id: '', //拼团编号
				uid: '', //用户编号
				people: '', //拼团人数
				price: '', //拼团价格
				stop_time: '', //拼团结束时间
				nickname: '', //团长昵称
				avatar: '', //团长头像
				count: '', //拼团剩余人数
				h: '', //时
				i: '', //分
				s: '' //秒
			}
		};
	},
	async onLoad(options) {
		let obj = this;
		//保存商品id
		this.goodsid = options.id;
		// 判断有无人邀请
		if (options.spread) {
			// 存储邀请人
			uni.setStorageSync('spread', option.spread);
		}
		// 判断是否为秒杀商品
		if (options.type == 1) {
			// 保存商品类型
			this.goodsType = 1;
			// 保存结束时间
			this.seckillObj.stopTime = options.stoptime;
			// 获取当前时间毫秒数
			let stoptime = options.stoptime * 1000;
			// 获取当前时间
			let acitonTime = new Date();
			// 判断当前时间是否大于结束时间
			if (acitonTime.getTime() > stoptime) {
				// 当前秒杀时间已经结束
				this.seckillObj.stop = true;
			} else {
				// 计算倒计时
				this.timeComputed(stoptime, this.seckillObj);
			}
			this.seckillGoods();
			return;
		}
		if (options.type == 2) {
			// 保存当前拼团商品类型
			this.goodsType = 2;
			// 家在数据
			this.groupGoods();
			return;
		}

		if (this.goodsType == 0) {
			// 加载普通商品详情
			this.goodsDetail();
		}

		// 注册邀请信息
		// #ifdef H5
		let bool = uni.getStorageSync('weichatBrowser') || '';
		if (bool) {
			weixindata();
		}
		// #endif
	},
	computed: {
		// #ifdef H5
		...mapState(['weichatObj', 'baseURL', 'urlFile']),
		...mapState('user', ['userInfo'])
		// #endif
	},
	methods: {
		navToProductGoods() {
			uni.redirectTo({
				url: '/pages/product/product?id=' + this.goodsObjact.product_id
			});
		},
		// 获取拼团商品详情
		groupGoods() {
			let obj = this;
			groupGoods({}, this.goodsid).then(function({ data }) {
				obj.pink = data.pink[0]; //保存拼团信息
				obj.imgList = data.storeInfo.images; //保存轮播图
				obj.goodsNumberMax = 1; //保存默认选中最大可购买商品数量
				// 保存商品数据
				obj.setGoodsData(data);
			});
		},
		// 获取秒杀商品详情
		seckillGoods() {
			let obj = this;
			seckillGoods({}, this.goodsid).then(function({ data }) {
				obj.imgList = data.storeInfo.images; //保存轮播图
				// 保存商品数据
				obj.goodsNumberMax = goods.num; //保存默认选中最大可购买商品数量
				obj.setGoodsData(data);
			});
		},
		// 计算倒计时时间
		timeComputed(da, ar) {
			let obj = ar;
			// 设置到期时间
			let time = new Date(da);
			// 获取当前时间
			let actTime = new Date();
			// 获取到期时间具体值
			let tH = time.getHours();
			let tM = time.getMinutes();
			let tS = time.getSeconds();
			// 获取当前时间具体值
			let aH = actTime.getHours();
			let aM = actTime.getMinutes();
			let aS = actTime.getSeconds();
			// 计算时间，保存需要多少时间到期
			obj.stopTimeH = tH - aH;
			obj.stopTimeM = tM - aM;
			obj.stopTimeS = tS - aS;
		},
		// 获取商品信息
		goodsDetail() {
			let obj = this;
			goodsDetail({}, this.goodsid).then(function({ data }) {
				obj.imgList = data.storeInfo.slider_image; //保存轮播图
				obj.goodsNumberMax = goods.stock; //保存默认选中最大可购买商品数量
				// 保存商品数据
				obj.setGoodsData(data);
			});
		},
		// 保存商品信息
		setGoodsData(data) {
			let obj = this;
			let goods = data.storeInfo;
			obj.goodsObjact = goods;
			obj.specList = data.productAttr; //保存分类列表
			obj.productValue = data.productValue; //保存分类查询数据
			obj.actionPrice = goods.price; //保存默认选中商品价格
			obj.actionImage = goods.image_base; //保存默认选中商品图片
			obj.shopId = data.mer_id; //保存商店id
			// 处理图片间空白问题
			if (obj.goodsObjact.description != null) {
				obj.goodsObjact.description = obj.goodsObjact.description.replace(/<img/g, '<img class="rich-img"').replace(/<p>\S*<img/g, '<p class="pHeight"><img');
			}
			// #ifdef H5
			obj.$nextTick(function() {
				obj.shareDate();
			});
			// #endif
		},
		// #ifdef H5
		// 加载微信html5页面分享方法
		shareDate() {
			let obj = this;
			// 保存分享人id链接
			let url = window.location.href + '&spread=' + this.userInfo.uid;
			// 判断是否微信浏览器
			let bool = uni.getStorageSync('weichatBrowser') || '';
			if (bool) {
				// 过滤微信强制添加的链接地址
				url = url.replace(/[\?,&]{0,1}from=singlemessage/g, '');
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
		// 购买数量变化
		numberChange(e) {
			this.goodsNumber = e.number;
		},
		//规格弹窗开关
		toggleSpec(str) {
			if (this.specClass === 'show') {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			} else if (this.specClass === 'none') {
				this.specClass = 'show';
			}
			// 判断是否为数字
			if (typeof str == 'number') {
				// 保存当前购买类型
				this.type = str;
			}
		},
		//选择规格
		selectSpec(item, arr, ind) {
			arr.attr_value.forEach(function(e) {
				e.check = false;
			});
			item.check = true;
			this.specSelected[ind] = item.attr;
			let str = this.specSelected.join(',');
			this.specSelectedName = this.specSelected.join(' ');
			if (this.productValue[str]) {
				let data = this.productValue[str];
				this.actionPrice = data.price;
				this.goodsNumberMax = data.stock;
				this.actionImage = data.image;
				this.uniqueId = data.unique;
			}
		},
		//分享
		share() {
			this.$refs.share.toggleMask();
		},
		//收藏
		toFavorite(item) {
			let obj = this;
			item.userCollect = !item.userCollect;
			// 判断是否已经收藏
			if (!item.userCollect) {
				collectDel({ id: obj.goodsid, category: 'product' }).then(function(e) {
					uni.showToast({
						title: '成功取消收藏',
						type: 'top',
						duration: 1500
					});
				});
			} else {
				collectAdd({ id: obj.goodsid, category: 'product' }).then(function(e) {
					uni.showToast({
						title: '成功加入收藏',
						type: 'top',
						duration: 1500
					});
				});
			}
		},
		// 立即购买
		buy() {
			let obj = this;
			// 创建传值对象
			let data = {
				cartNum: obj.goodsNumber, //商品数量
				uniqueId: obj.uniqueId, //商品标签
				new: '1', //商品是否新增加到购物车1为不加入0为加入
				mer_id: obj.shopId
			};
			// 判断是否为加入购物车
			if (obj.type == 2) {
				data.new = 0;
			}
			// 判断是否为普通商品
			if (obj.goodsType == 0) {
				data.productId = obj.goodsid; //商品编号
			}
			// 判断是否为秒杀商品
			if (obj.goodsType == 1) {
				data.secKillId = obj.goodsid; //秒杀商品编号
				data.productId = obj.goodsObjact.product_id; //商品编号
				// 判断是否秒杀已经结束
				if (obj.seckillObj.stop) {
					uni.showModal({
						title: '提示',
						content: '当前活动已经结束',
						showCancel: false
					});
					return;
				}
			}
			// 判断是否为拼团商品
			if (obj.goodsType == 2) {
				data.combinationId = obj.goodsid; //拼团编号
				data.productId = obj.goodsObjact.product_id; //商品编号
			}
			cartAdd(data)
				.then(function(e) {
					let da = e.data;
					console.log(e);
					if (obj.type == 1) {
						// 跳转到支付页
						uni.navigateTo({
							url: '/pages/order/createOrder?id=' + da.cartId
						});
					}
					if (obj.type == 2) {
						uni.showToast({
							title: '成功加入购物车',
							type: 'top',
							duration: 2000
						});
						obj.toggleSpec();
					}
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 阻止触发上级事件
		stopPrevent() {}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
/* #ifdef MP */
.rich-img {
	width: 100% !important;
	height: auto;
}
// 处理图片间白色间距问题
.pHeight{
	line-height: 0;
}
/* #endif */
//秒杀、拼团底部高度
.contentBottomHeight {
	height: 110rpx;
}
//默认商品底部高度
.goodsBottom {
	height: 160rpx;
}
.iconenter {
	font-size: $font-base + 2rpx;
	color: #888;
}
.carousel {
	/* #ifdef APP-PLUS */
	padding-top: var(--status-bar-height);
	/* #endif */
	height: 722rpx;
	position: relative;
	swiper {
		height: 100%;
	}
	.image-wrapper {
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-content: center;
		height: 750rpx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
// 秒杀
.seckill-box-title {
	background: linear-gradient(90deg, rgba(239, 78, 81, 1) 0%, rgba(244, 113, 59, 1) 100%) !important;
	.price,
	.price-tip,
	.timeStop,
	.m-price {
		color: #ffffff !important;
	}
	.price-tip {
		font-size: $font-base;
	}
	.price {
		font-size: 45rpx !important;
		font-weight: bold;
	}
	.timeStop {
	}
}
// 底部拼团、秒杀支付按钮
.goods-pay-box {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 95;
	width: 750rpx;
	height: 100rpx;
	line-height: 1;
	color: #ffffff;
	text-align: center;
	font-size: $font-lg;
	.bgLine {
		background: linear-gradient(90deg, rgba(239, 78, 81, 1) 0%, rgba(244, 113, 59, 1) 100%);
	}
	// 拼团支付按钮
	.goods-pay {
		display: flex;
		align-content: center;
		flex-wrap: wrap;
		justify-content: center;
		.goods-buttom,
		.goods-buttom-money {
			width: 100%;
		}
		.goods-buttom-money {
			font-size: $font-base;
		}
	}
	.goods-pay-stop,
	.goods-pay {
		padding: 15rpx 0;
		height: 100%;
		width: 100%;
	}
	.goods-pay-stop {
		background: $color-gray;
		line-height: 70rpx;
	}
}
/* 标题简介 */
.introduce-section {
	background: #fff;
	padding: 20rpx 30rpx;
	.title {
		font-size: 32rpx;
		color: $font-color-dark;
		height: 50rpx;
		line-height: 50rpx;
	}
	.price-box {
		display: flex;
		align-items: baseline;
		height: 64rpx;
		padding: 10rpx 0;
		font-size: 26rpx;
		color: $uni-color-primary;
	}
	.price {
		font-size: $font-lg + 2rpx;
	}
	.m-price {
		margin: 0 12rpx;
		color: $font-color-light;
		text-decoration: line-through;
	}
	.coupon-tip {
		align-items: center;
		padding: 4rpx 10rpx;
		background: $uni-color-primary;
		font-size: $font-sm;
		color: #fff;
		border-radius: 6rpx;
		line-height: 1;
		transform: translateY(-4rpx);
	}
	.bot-row {
		display: flex;
		align-items: center;
		height: 50rpx;
		font-size: $font-sm;
		color: $font-color-light;
		text {
			flex: 1;
		}
	}
}
/* 分享 */
.share-section {
	display: flex;
	align-items: center;
	color: $font-color-base;
	background: linear-gradient(left, #fdf5f6, #fbebf6);
	padding: 12rpx 30rpx;
	.share-icon {
		display: flex;
		align-items: center;
		width: 70rpx;
		height: 30rpx;
		line-height: 1;
		border: 1px solid $uni-color-primary;
		border-radius: 4rpx;
		position: relative;
		overflow: hidden;
		font-size: 22rpx;
		color: $uni-color-primary;
		&:after {
			content: '';
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			left: -20rpx;
			top: -12rpx;
			position: absolute;
			background: $uni-color-primary;
		}
	}
	.iconfavorfill {
		position: relative;
		z-index: 1;
		font-size: 24rpx;
		margin-left: 2rpx;
		margin-right: 10rpx;
		color: #fff;
		line-height: 1;
	}
	.tit {
		font-size: $font-base;
		margin-left: 10rpx;
	}
	.iconprompt {
		padding: 10rpx;
		font-size: 30rpx;
		line-height: 1;
	}
	.share-btn {
		flex: 1;
		text-align: right;
		font-size: $font-sm;
		color: $uni-color-primary;
	}
	.iconenter {
		font-size: $font-sm;
		margin-left: 4rpx;
		color: $uni-color-primary;
	}
}

.c-list {
	font-size: $font-sm + 2rpx;
	color: $font-color-base;
	background: #fff;
	.c-row {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		position: relative;
	}
	.tit {
		width: 140rpx;
	}
	.con {
		flex: 1;
		color: $font-color-dark;
		.selected-text {
			margin-right: 10rpx;
		}
	}
	.bz-list {
		height: 40rpx;
		font-size: $font-sm + 2rpx;
		color: $font-color-dark;
		text {
			display: inline-block;
			margin-right: 30rpx;
		}
	}
	.con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: $font-color-dark;
		line-height: 40rpx;
	}
	.red {
		color: $uni-color-primary;
	}
}

/* 评价 */
.eva-section {
	display: flex;
	flex-direction: column;
	padding: 20rpx 30rpx;
	background: #fff;
	margin-top: 16rpx;
	.e-header {
		display: flex;
		align-items: center;
		height: 70rpx;
		font-size: $font-sm + 2rpx;
		color: $font-color-light;
		.tit {
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
			margin-right: 4rpx;
		}
		.tip {
			flex: 1;
			text-align: right;
		}
		.iconenter {
			margin-left: 10rpx;
		}
	}
}
.eva-box {
	display: flex;
	padding: 20rpx 0;
	.portrait {
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100px;
	}
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-base;
		color: $font-color-base;
		padding-left: 26rpx;
		.con {
			font-size: $font-base;
			color: $font-color-dark;
			padding: 20rpx 0;
		}
		.bot {
			display: flex;
			justify-content: space-between;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
}
/*  详情 */
.detail-desc {
	background: #fff;
	margin-top: 16rpx;
	/deep/ img {
		max-width: 100% !important;
		display: inline !important;
	}
	/deep/ div {
		max-width: 100% !important;
	}
	.d-header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		font-size: $font-base + 2rpx;
		color: $font-color-dark;
		position: relative;

		text {
			padding: 0 20rpx;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		&:after {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300rpx;
			height: 0;
			content: '';
			border-bottom: 1px solid #ccc;
		}
	}
}

/* 规格选择弹窗 */
.attr-content {
	padding: 10rpx 30rpx;
	.a-t {
		display: flex;
		image {
			width: 170rpx;
			height: 170rpx;
			flex-shrink: 0;
			margin-top: -40rpx;
			border-radius: 8rpx;
		}
		.right {
			display: flex;
			flex-direction: column;
			padding-left: 24rpx;
			font-size: $font-sm + 2rpx;
			color: $font-color-base;
			line-height: 42rpx;
			.price {
				font-size: $font-lg;
				color: $uni-color-primary;
				margin-bottom: 10rpx;
			}
			.selected-text {
				margin-right: 10rpx;
			}
		}
	}
	.attr-list {
		display: flex;
		flex-direction: column;
		font-size: $font-base + 2rpx;
		color: $font-color-base;
		padding-top: 30rpx;
		padding-left: 10rpx;
	}
	.item-list {
		padding: 20rpx 0 0;
		display: flex;
		flex-wrap: wrap;
		text {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 100rpx;
			min-width: 60rpx;
			height: 60rpx;
			padding: 0 20rpx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.selected {
			background: #fbebee;
			color: $uni-color-primary;
		}
	}
}

/*  弹出层 */
.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;

	&.show {
		display: block;
		.mask {
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		.mask {
			animation: hidePopup 0.2s linear both;
		}
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		min-height: 30vh;
		border-radius: 10rpx 10rpx 0 0;
		background-color: #fff;
		.btn {
			height: 66rpx;
			line-height: 66rpx;
			border-radius: 100rpx;
			background: $uni-color-primary;
			font-size: $font-base + 2rpx;
			color: #fff;
			margin: 30rpx auto 20rpx;
		}
	}
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(120%);
		}
	}
}

/* 底部操作菜单 */
.page-bottom {
	position: fixed;
	left: 30rpx;
	bottom: 30rpx;
	z-index: 95;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 690rpx;
	height: 100rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16rpx;
	.p-b-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-sm;
		color: $font-color-base;
		width: 96rpx;
		height: 80rpx;
		.iconfont {
			font-size: 40rpx;
			line-height: 48rpx;
			color: $font-color-light;
		}
		&.active,
		&.active .iconfont {
			color: $uni-color-primary;
		}
		.icon-fenxiang2 {
			font-size: 42rpx;
			transform: translateY(-2rpx);
		}
		.iconlikefill {
			font-size: 46rpx;
		}
	}
	.action-btn-group {
		display: flex;
		height: 76rpx;
		border-radius: 100px;
		overflow: hidden;
		margin-left: 20rpx;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28rpx;
			width: 0;
			border-right: 1px solid rgba(255, 255, 255, 0.5);
		}
		.action-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180rpx;
			height: 100%;
			font-size: $font-base;
			padding: 0;
			border-radius: 0;
			background: transparent;
			&.buy-now-btn {
				background-color: #303e49;
			}
			&.add-cart-btn {
				background-color: $base-color;
			}
		}
	}
}
// 商店头
.shop-box {
	background-color: #ffffff;
	margin-top: 20rpx;
	margin-bottom: 10rpx;
	padding: 20rpx;
	.shop-img {
		border-radius: 300rpx;
		height: 80rpx;
		width: 80rpx;
		margin-right: 20rpx;
	}
	.shop-button {
		border-radius: 100rpx;
		padding: 10rpx 20rpx;
		color: $color-red;
		border: 1px solid $color-red;
		font-size: $font-lg;
		line-height: 1;
	}
}
</style>
