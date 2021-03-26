<template>
	<view>
		<view class="title-box">
			<view class=" title-conetnt  position-relative">
				<view class="title-img"><image src="/static/img/img08.png" mode="aspectFit"></image></view>
				<view class="title-content-box">
					<view class="title-text">已连续签到</view>
					<view class="title-day-text">
						<text class="title-day">{{actionDay}}</text>
						<text>天</text>
					</view>
					<view class="title-button" :class="{'signAction':signTrue}" @click="signTrue?'':integral()">{{signTrue?'已签到':'立即签到'}}</view>
				</view>
			</view>
			<view class="title-tip"><text>共获得{{sum_integral}}积分,总签到{{allSign}}天</text></view>
		</view>
		<calendar class="sign-date-box" :checks="signList" checksClass="" :checkTextShow="true" checksIcon="/static/img/img07.png"></calendar>
	</view>
</template>

<script>
import calendar from '../../components/ss-calendar/ss-calendar.vue';
import { signList, integral,signUser } from '@/api/sign.js';
export default {
	components: {
		calendar
	},
	data() {
		return {
			money: '', //保存当前月份
			year: '', //保存当前年份
			day: '', //保存当前日期
			signList: [] ,//签到日子列表
			actionDay:0,//连续签到天数
			allSign:0,//累计签到
			sum_integral:0,//累计获得积分
			signTrue:false,
		};
	},
	onLoad() {
		this.signUser();
		this.getData();
		this.loadList();
	},
	methods: {
		// 获取当前时间
		getData(current) {
			const date = current ? new Date(current) : new Date();
			this.year = date.getFullYear();//保存当前年份
			this.month = date.getMonth() + 1;//保存当前月份
			this.day = date.getDate();//保存当前日期
		},
		//获取签到用户信息
		signUser(){
			signUser({all:1}).then(({data}) => {
				this.actionDay = data.sign_num;//连续签到天数
				this.allSign = data.sum_sgin_day;//累计签到天数
				this.sum_integral = data.sum_integral;//累计总积分
			})
		},
		// 签到
		integral() {
			integral({})
				.then(e => {
					// 改为已签到
					this.signTrue = true;
					this.actionDay++;
					// 保存签到成功
					this.signList.push(this.day);
					uni.showToast({
						title: '签到成功',
						duration: 2000,
						position: 'top'
					});
				})
				.catch(e => {
					console.log(e);
				});
		},
		// 获取签到列表
		loadList() {
			let obj = this;
			let present = this.day; //保存当前天数用于后续计算
			let actionDay = 0; //用于计算活跃天数
			let arr = []; //保存返回数组；
			signList({
				page: 1,
				limit: 31
			}).then(e => {
				arr = e.data.map((e, ind) => {
					let time = e.add_time.split('-');
					let day = parseInt(time[2].replace(/^0/i, ''));
					let year = time[0];
					let month = +time[1];
					if (obj.year == year && obj.month == month) {
						return day;
					}
				});
				this.signList = arr;
				// 判断今天是否已经签到
				if(arr[0]==this.day){
					this.signTrue = true;
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.sign-date-box {
	margin: 25rpx;
	border-radius: 15rpx;
	margin-top: -70rpx;
}
.title-box {
	background-color: $base-color;
	padding-top: 120rpx;
	color: #ffffff;
	height: 590rpx;
	.title-conetnt {
		height: 350rpx;
		width: 350rpx;
		margin: 0 auto;
		text-align: center;
		.title-img {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			image {
				height: 100%;
				width: 100%;
			}
		}
		.title-content-box {
			position: absolute;
			width: 100%;
			.title-day-text {
				padding: 20rpx;
				font-size: $font-base - 2rpx;
				.title-day {
					font-size: 60rpx;
				}
			}
			.title-text {
				font-size: 26rpx;
				padding-top: 100rpx;
			}
			.title-button {
				background-color: #fe7e51;
				border-radius: 99rpx;
				width: 200rpx;
				height: 64rpx;
				margin: 0 auto;
				line-height: 64rpx;
				text-align: center;
				font-size: $font-base;
				&.signAction{
					background-color: $font-color-light;
				}
			}
		}
	}
}
.title-tip {
	color: #ffffff;
	font-size: $font-base - 2rpx;
	padding-top: 20rpx;
	text-align: center;
	margin-top: -40rpx;
}
</style>
