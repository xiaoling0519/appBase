import request from '@/utils/request'

// 获取商品列表
export function getProducts(data) {
	// 	{
	// 参数名称	是否必须	示例	备注
	// sid			否			二级分类编号
	// cid			否			一级分类编号（！）
	// keyword		否			搜索
	// priceOrder	否			价格排序
	// salesOrder	否			销量排序
	// news			否			是否新品
	// page			否			分页参数起始值
	// limit		否			分页数步长值
	// }
	return request({
		url: '/api/products',
		method: 'get',
		data
	});
}
// 获取商品详情
export function goodsDetail(data, id) {
	return request({
		url: '/api/product/detail/' + id,
		method: 'get',
		data
	});
}
// 加入购物车
export function cartAdd(data) {
	return request({
		url: '/api/cart/add',
		method: 'post',
		data
	});
}

// 收藏商品
export function collectAdd(data) {
	return request({
		url: '/api/collect/add',
		method: 'post',
		data
	});
}

// 取消收藏商品
export function collectDel(data) {
	return request({
		url: '/api/collect/del',
		method: 'post',
		data
	});
}

// 获取搜搜关键字
export function searchKeyword(data) {
	return request({
		url: '/api/search/keyword',
		method: 'get',
		data
	});
}

// 获取热门分类信息
export function groomList(data,type) {
	// 获取产品类型 1 精品推荐 2 热门榜单 3首发新品 4促销单品
	return request({
		url: '/api/groom/list/'+type,
		method: 'get',
		data
	});
}


// 获取秒杀商品详细
export function seckillGoods(data,id) {
	return request({
		url: '/api/seckill/detail/'+id,
		method: 'get',
		data
	});
}

// 获取拼团商品详细
export function groupGoods(data,id) {
	return request({
		url: '/api/combination/detail/'+id,
		method: 'get',
		data
	});
}


