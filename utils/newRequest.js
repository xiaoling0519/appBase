import store from '../store'
let service = {
	baseURL: store.state.baseURL, // 请求头
	header: {
		'Content-Type': "application/x-www-form-urlencoded"
	},
	// 请求拦截器
	interceptors: {
		// 安装请求前拦截
		request: function(success, iserror) {
			service.request.success = success;
			service.request.error = iserror;
		},
		// 安装请求完成后拦截
		response: function(success, iserror) {
			service.response.success = success;
			service.response.error = iserror;
		}
	},
	// 请求前拦截
	request: {
		// 回调成功执行方法
		success: function(e) {
			return e
		},
		// 回调失败
		error: function(e) {
			return e
		}
	},
	// 请求完成后拦截
	response: {
		// 回调成功执行方法
		success: function(e) {
			return e
		},
		// 回调失败
		error: function(e) {
			return e
		}
	},
	// 开始请求
	open: async function(data) {
		return await new Promise(function(resolve, reject) {
			let requestData = ''; //保存处理完成后请求数据
			//console.log(data);
			// 请求前数据处理
			requestData = service.request.success(data);
			// 数据复制用于请求
			uni.request({
				url: service.baseURL + requestData.url,
				method: requestData.method || 'GET',
				data: requestData.data,
				header: data.header || service.header,
				success: res => {
					if (res.statusCode == 200) {
						try {
							resolve(service.response.success(res));
						} catch (e) {
							service.response.error(e)
						}
					}

				},
				// 请求失败数据处理
				fail: (err) => {
					service.response.error(err)
				}
			});
		})
	},
	// 上传文件
	upFilse: async function(data) {
		return await new Promise(function(resolve, reject) {
			let requestData = ''; //保存处理完成后请求数据
			try {
				// 请求前数据处理
				requestData = service.request.success(data);
			} catch (e) {
				// 请求报错拦截
				service.request.error(e);
			}
			let config = {
				// 上传图片的API
				upload_img_url: service.baseURL + requestData.url
			}

			let Uploader = {
				// 选择图片
				choose(num) {
					return new Promise((resolve, reject) => {
						uni.chooseImage({
							count: num,
							sourceType:'album',
							sizeType:'compressed',
							success(res) {
								// console.log(res);
								// 缓存文件路径
								resolve(res.tempFilePaths)
							},
							fail(err) {
								console.log(err)
								reject(err)
							}
						})
					})
				},
				// 上传图片
				upload_one(path) {
					return new Promise((resolve, reject) => {
						uni.showLoading({
							title: '上传中'
						})
						uni.uploadFile({
							url: config.upload_img_url, //仅为示例，非真实的接口地址
							filePath: path,
							name: 'file',
							header: {
								"Authori-zation": 'Bearer ' + uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								if ("string" === typeof uploadFileRes.data) {
									resolve(JSON.parse(uploadFileRes.data).data)
								} else {
									resolve(uploadFileRes.data.data)
								}
							},
							complete() {
								uni.hideLoading()
							}
						});
					})
				},
				// 上传多个图片
				upload(path_arr) {
					let num = path_arr.length;
					return new Promise(async (resolve, reject) => {
						let img_urls = []
						for (let i = 0; i < num; i++) {
							let img_url = await this.upload_one(path_arr[i]);
							img_urls.push(img_url)
						};
						resolve(img_urls)
					})
				},
				// 触发上传图片事件
				choose_and_upload(num) {
					return new Promise(async (resolve, reject) => {
						// 选择图片
						let path_arr = await this.choose(num);
						// 上传图片
						await this.upload(path_arr).then((e) => {
							resolve(e);
						}).catch((e) => {
							reject(e)
						});
					})
				}
			};
			Uploader.choose_and_upload(1).then((e) => {
				resolve(e);
			}).catch((e) => {
				console.log(e);
			})
		})
	},
};


export default service
