<template>
	<view class="container">
		<uni-list>
		    <uni-list-item title="个人资料" @click="navTo('/pages/userinfo/userinfo')" ></uni-list-item>
			<uni-list-item title="修改密码" @click="navTo('/pages/set/password')" ></uni-list-item>
		    <uni-list-item title="实名认证" @click="navTo('/pages/address/address')" ></uni-list-item>
		    <uni-list-item title="收货地址" @click="navTo('/pages/address/address')" ></uni-list-item>
		</uni-list>
		<uni-list class="margin-t-20">
		    <uni-list-item title="消息推送" :switch-checked='true' :show-switch="true" :show-arrow="false" switch-color='#5dbc7c'  @switchChange='switchChange'> 
			</uni-list-item>
		</uni-list>
		
		<uni-list class="margin-t-20">
		    <uni-list-item title="清除缓存" ></uni-list-item>
		    <uni-list-item title="检查更新" >
				<template slot="right">
					当前版本 1.0.3
				</template>
			</uni-list-item>
		</uni-list>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import { logout } from '@/api/set.js';
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		components: {
			uniList,uniListItem
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('user',['logout']),
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			//退出登录
			toLogout(){
				let obj = this;
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
							logout({}).then((e) => {
								uni.navigateBack();
							}).catch((e) => {
								console.log(e);
							})
				    		obj.logout();
				    	}
				    }
				});
			},
			//switch切换触发方法
			switchChange(e){
				console.log(e);
				let statusTip = e.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20rpx $page-row-spacing;
		line-height:60rpx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40rpx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
			margin-right:10rpx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16rpx) scale(.84);
		}
	}
</style>
