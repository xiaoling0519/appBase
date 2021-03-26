import store from '../store/index.js'
const getUpAppUrl = 'https://itunes.apple.com/cn/lookup?id=1524593346'
const iosAppStroeUrl =
	'https://apps.apple.com/cn/app/%E6%BB%A1%E5%9B%AD%E6%98%A5%E7%BA%BF%E4%B8%8A%E5%95%86%E5%9F%8E/id1524593346';

// 获取app是否需要升级
export function getUpApp () {
	// 获取当前运行系统
	let hj = uni.getSystemInfoSync().platform;
	// 获取仓库app数据对象
	let app = store.state.isShowIllegality;
	// 当前系统为安卓则显示数据
	if (hj === 'android') {
		// 设置默认显示数据
		app = true;
		store.commit('changeState', {
			name: 'app',
			value: app
		});
	}
	uni.request({
		url: getUpAppUrl,
		method: 'POST',
		data: {},
		success: res => {
			let r = res.data;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				// 保存线上版本号
				let version = r.results[0].version;
				// 获取线上版本
				const arr = r.results[0].version.split('.');
				// 获取当前系统
				const arr1 = wgtinfo.version.split('.');
				for (let i = 0; i < arr.length; i++) {
					// 线上版本号
					const x = +arr[i];
					// 线下版本号
					const y = +arr1[i];
					// 判断当前版本是否为小于等于线上版本
					if (x <= y) {
						// 只有ios才需要显示
						if (hj === 'ios') {
							// 设置显示数据
							app = true;
							store.commit('changeState', {
								name: 'app',
								value: app
							});
						}
						// 当版本较低时更新数据
						if (x < y) {
							uni.showModal({
								title: '提示',
								content: '请更新应用',
								showCancel: false,
								success(e) {
									if (hj === 'ios') {
										plus.runtime.openURL(
											iosAppStroeUrl
										);
									}
									if (hj === 'android') {
										// plus.runtime.openURL('http://lxscimg.liuniu946.com/lxscV' + version + '.apk');
										_self.downApp(version);
									}
								}
							});
						}
						return;
					}
				}
			});
		},
	});
}
// 下载app
export function downApp (version) {
	plus.nativeUI.showWaiting('下载升级包...');
	plus.downloader
		.createDownload('http://lxscimg.liuniu946.com/lxscV' + version + '.apk', {}, (d, status) => {
			if (status == 200) {
				installApp(d.filename); // 安装app
			} else {
				plus.nativeUI.alert('下载升级包失败！');
			}
			plus.nativeUI.closeWaiting();
		})
		.start();
}
// 安装app
export function installApp (path) {
	plus.nativeUI.showWaiting('安装升级包...');
	plus.runtime.install(
		path, {},
		function() {
			plus.nativeUI.closeWaiting();
			uni.showToast({
				icon: 'none',
				title: '升级完成，准备重新载入'
			});
			setTimeout(_ => {
				uni.hideToast();
				plus.runtime.restart();
			}, 1000);
		},
		function(e) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.alert('安装升级包失败[' + e.code + ']：' + e.message);
		}
	);
}
