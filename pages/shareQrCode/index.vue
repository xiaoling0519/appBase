<template>
	<view class="content">
		<!-- <view class="qrimg">
			<tki-qrcode
				:cid="cid"
				ref="qrcode"
				:val="val"
				:size="size"
				:unit="unit"
				:background="background"
				:foreground="foreground"
				:pdground="pdground"
				:icon="icon"
				:iconSize="iconSize"
				:lv="lv"
				:onval="onval"
				:loadMake="loadMake"
				:usingComponents="usingComponents"
				@result="qrR"
			/>
		</view> -->
		<!-- #ifndef MP-ALIPAY -->
		<canvas :class="{ qrimg: !loading }" @longtap="alertCanv" id="qrShareBox" canvas-id="qrShareBox" class="tki-qrcode-canvas" />
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<canvas :class="{ qrimg: !loading }" @longtap="alertCanv" id="qrShareBox" class="tki-qrcode-canvas" />
		<!-- #endif -->
		<view :style="{ display: loading ? 'none' : 'block' }" class="tki-qrcode-canvas"><image :src="ctxSrc" mode="scaleToFill" class="tki-qrcode-canvas"></image></view>
		<view class="share-bottom flex" :class="{ 'action-share-bottom': !loading }" @click="loading ? showImg() : ''">
			<text>{{ loading ? '点击生成图片' : '长按二维码下载' }}</text>
		</view>
	</view>
</template>

<script>
// import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import { spreadBanner } from '@/api/shareQrCode.js';
export default {
	// components: { tkiQrcode },
	data() {
		return {
			cid: 'tki-qrcode-canvas', //canvasId，页面存在多个二维码组件时需设置不同的ID
			size: 180, //生成的二维码大小
			unit: 'upx', //大小单位尺寸
			// show: true,//默认使用组件中的image标签显示二维码
			val: '', //要生成的内容
			background: '#ffffff', //二维码背景色
			foreground: '#333333', //二维码前景色
			pdground: '#333333', //二维码角标色
			icon: '', //二维码图标URL（必须是本地图片，网络图需要先下载至本地）
			iconSize: 40, //二维码图标大小
			lv: 3, //容错级别
			onval: false, //监听val值变化自动重新生成二维码
			loadMake: false, //组件初始化完成后自动生成二维码，val需要有值
			usingComponents: false, //是否使用了自定义组件模式（主要是为了修复非自定义组件模式时 v-if 无法生成二维码的问题）
			showLoading: false, //是否显示loading
			loadingText: '二维码生成中', //loading文字
			src: '', // 二维码生成后的图片地址或base64
			ratio: 1, //页面比例用于计算
			ctxSrc: '', //要显示的图片
			loading: true,//是否载入图片中
			canHeight: '',//画布高度
			canWeidth: ''//画布宽度
		};
	},
	onLoad() {
		this.loadCodeList()
	},
	onReady() {
		let obj = this;
		let query = uni.createSelectorQuery();
		// 获取页面比例
		query
			.select('.content')
			.fields(
				{
					size: true
				},
				e => {
					// 保存比例
					this.ratio = e.width / 750;
				}
			)
			.exec();
		// 获取画布宽高信息
		query
			.select('#qrShareBox')
			.fields(
				{
					size: true
				},
				e => {
					// 保存画布宽高信息
					obj.canHeight = e.height;
					obj.canWeidth = e.width;
				}
			)
			.exec();
	},
	methods: {
		loadCodeList() {
			// 加载二维码信息
			spreadBanner({
				// #ifdef H5
				type: 2,
				// #endif
				// #ifdef MP
				type: 1
				// #endif
			}).then(e => {
				// #ifdef MP
				// 保存二维码图片
				uni.downloadFile({
					url: e.data[0].wap_posterQr,
					success(res) {
						if (res.errMsg == 'downloadFile:ok') {
							obj.src = res.tempFilePath;
							// 生成画布
							obj.loadImg(obj.src);
							uni.hideLoading();
						}
						console.log(res);
					},
					fail(e) {
						console.log(e);
					}
				})
				// #endif
				// #ifdef H5
					// 保存二维码图片
					this.src =  e.data[0].wap_posterQr;
					// 生成画布
					this.loadImg(e.data[0].wap_posterQr);
				// #endif
				
			}).catch((e) => {
					uni.showModal({
						title: '生成失败请刷新页面',
						showCancel: false
					});
					uni.hideLoading();
				});;
		},
		// 长按画布事件
		alertCanv() {
			uni.showModal({
				title: '请先点击生成图片再下载',
				showCancel: false
			});
		},
		// 生成图片
		showImg() {
			uni.showLoading({
				title: '图片生成中',
				mask: true
			});
			let obj = this;
			//因为和uni.showLoading载入效果冲突需要延迟执行生成图片方法
			setTimeout(function() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: obj.canWeidth,
					height: obj.canHeight,
					destWidth: obj.canWeidth,
					destHeight: obj.canHeight,
					fileType: 'jpg',
					quality: 1,
					canvasId: 'qrShareBox',
					success: res => {
						uni.hideLoading();
						uni.showModal({
							title: '创建成功，长按二维码下载图片',
							showCancel: false
						});
						// 显示生成的图片
						obj.loading = false;
						// 保存图片base64
						obj.ctxSrc = res.tempFilePath;
					},
					fail(e) {
						console.log(e);
					}
				});
			}, 50);
		},
		// 开始渲染画布
		loadImg(src) {
			const obj = this;
			const cavWidth=523;//画布宽度
			const cavHeight=700;//画布高度
			const ratio = obj.ratio;//获取页面比例
			const ctxBg = '/static/img/img14.jpg'; //画布背景
			let context = uni.createCanvasContext('qrShareBox');
			const codeSize = obj.size * ratio; //计算二维码大小
			const codeX = ((cavWidth - obj.size) * ratio) / 2; //二维码所在x轴位置
			const codeY = cavHeight * ratio; //二维码所在y轴位置
			const codeBoxColor = '#FFFFFF'; //包裹框颜色
			const codeBoxWidht = 0; //包裹边框宽度
			const codeBoxSize = (codeBoxWidht / 2) * ratio; //计算二维码白色包裹框大小
			const codeBoxX = codeX - codeBoxSize; //包裹框初始X轴
			const codeBoxY = codeY - codeBoxSize; //包裹框初始Y轴
			const codeBoxEnd = codeSize + codeBoxWidht * ratio; //计算包裹框大小
			const fontTop = codeY + codeBoxEnd + (codeBoxWidht + 20) * this.ratio; //文字距离上边距高度
			const fontSize = 24 * ratio; //文字大小
			const fontText = ''; //文字内容
			const fontLeft = (codeSize - fontSize * fontText.length) / 2 + codeX; //文字左侧距离
			// 插入背景图片
			context.drawImage(ctxBg, 0, 0, obj.canWeidth, obj.canHeight);
			// // 插入文字
			context.setFontSize(fontSize);
			context.fillText(fontText, fontLeft, fontTop);
			// 插入边框
			context.beginPath();//开始画线
			context.setLineJoin('round'); //边框类型
			context.setLineWidth(codeBoxWidht * ratio);
			context.setStrokeStyle(codeBoxColor); //设置包裹框颜色
			context.strokeRect(codeBoxX, codeBoxY, codeBoxEnd, codeBoxEnd);
			context.stroke();//渲染线条
			// 插入二维码
			context.drawImage(src, codeX, codeY, codeSize, codeSize);
			// 开始渲染
			context.draw();
		},
		// 創建二维码
		creatQrcode() {
			this.$refs.qrcode._makeCode();
		},
		// 保存二维码到图库
		saveQrcode() {
			this.$refs.qrcode._saveCode();
		},
		// 生成二维码后返回base64
		qrR(res) {
			this.src = res;
		},
		//清空二维码（清空二维码会触发result回调 返回值为空）
		clearQrcode(e) {
			this.$refs.qrcode._clearCode();
			this.val = '';
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-top: 30rpx;
}
// #qrShareBox {
// 	position: absolute;
// 	left: -9999rpx;
// 	top: -9999rpx;
// }

.qrimg {
	position: absolute;
	left: -9999rpx;
	top: -9999rpx;
}
.tki-qrcode-canvas {
	// width: 700rpx;
	// height: 1245rpx;
	width: 532rpx;
	height: 945rpx;
	margin: 0 auto;
}
.share-bottom {
	width: 560rpx;
	height: 80rpx;
	color: #ffffff;
	background-color: $base-color;
	margin: 0 auto;
	font-size: $font-lg - 2rpx;
	margin-top: 30rpx;
	border-radius: 99rpx;
	justify-content: center;
	&.action-share-bottom {
		background-color: $color-gray;
	}
}
</style>
