import Vue from 'vue'
import Vuex from 'vuex'
import user from './model/user'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// baseURL:"http://yrh.liuniu946.com",//'http://eb.shuibo.net',//请求地址配置 
		baseURL:'http://base.liuniu946.com',//请求地址配置 
		urlFile:'/index',//项目部署所在文件夹
		loginInterceptor:false,//是否打开强制登录
		// #ifdef H5 || MP-WEIXIN
		weichatInfo:{},//保存微信注册信息
		weichatObj:'',//微信对象
		// #endif
	},
	mutations: {
		//保存微信信息
		setWeiChatInfo(state, provider) {
			state.weichatInfo = provider;
		},
		//保存微信对象
		setWeiChatObj(state, provider) {
			state.weichatObj = provider;
		}
	},
	modules:{
		user
	},
	actions: {}
})

export default store
