//身份证验证	
export function isCardNo(card) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
	var reg =
		/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
	if (reg.test(card) === false) {
		console.log(card);
		return false;

	}
	return true
}

// 金额显示变化
export function getMoneyStyle(value = 0) {
	if (typeof value == 'string') {
		value = (+value).toFixed(2)
	}
	if (typeof value == 'number') {
		value = value.toFixed(2)
	}
	// 将字符串转为数组
	let n = value.split("");
	// 反转数组并复制循环处理
	let arr = n.reverse().map(function(e, ind, ar) {
		// 判断当前下标是否为3的整数倍数且不为最后一个下标
		if (ind % 3 == 0 && ind / 3 > 1 && ind != ar.length) {
			return e + ','
		} else {
			return e
		}
	})
	// 反转数组回复原来排序并合并回字符串
	arr = arr.reverse().join('')
	return arr;
}

// 倒计时计算
// 计算倒计时时间
export function timeComputed(time) {
	// 获取当前时间
	const actTime = (new Date()).getTime();
	// 获取到期时间
	let stopTime = time - actTime;
	// 判断是否小于0
	if (stopTime < 0) {
		stopTime = stopTime * -1
	}
	let day = Math.floor(stopTime / 1000 / 60 / 60 / 24) //获取剩余天数
	let hours = Math.floor((stopTime / 1000 / 60 / 60) % 24); //获取剩余小时数
	let minutes = Math.floor((stopTime / 1000 / 60) % 60); //获取分钟
	let seconds = Math.floor((stopTime / 1000) % 60); //获取秒数
	return {
		hours, //倒计时小时数
		minutes, //倒计时分钟数
		seconds, //倒计时秒数
		day //倒计时天数
	}
}

// 调用打开地图方法
export function openMap(e) {
	const that = this
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success(res) {
				//这里判断是否有地位权限
				if (!res.authSetting['scope.userLocation']) {
					wx.showModal({
						title: '提示',
						content: '请求获取位置权限',
						success: function(res) {
							if (res.confirm == false) {
								// 授权失败
								reject()
								return false;
							}
							wx.openSetting({
								success(res) {
									//如果再次拒绝则返回页面并提示
									if (!res.authSetting['scope.userLocation']) {
										wx.showToast({
											title: '此功能需获取位置信息，请重新设置',
											duration: 3000,
											icon: 'none'
										})
									} else {
										//允许授权，调用地图
										resolve()
									}
								}
							})
						}
					})
				} else {
					//如果有定位权限，调用地图
					resolve()
				}
			}
		})
	})
}
//时间戳转换成时间
export function getTime(time) {
	const num =13 - (time+'').length;
	let l = 1;//倍数
	for (let i = 0; i < num; i++) {
		l+='0';
	}
	// 重新解析为数字
	l = parseInt(l)
	const date = new Date(parseInt(time) * l);
	const year = date.getFullYear();
	const mon = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minu = date.getMinutes();
	const sec = date.getSeconds();
	return year + '-' + mon + '-' + day + ' ' + hours + ':' + minu + ':' + sec;
}
