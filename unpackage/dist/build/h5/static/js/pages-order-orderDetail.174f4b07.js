(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-orderDetail"],{"28da":function(t,e,i){"use strict";i.r(e);var a=i("b477"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},"2b97":function(t,e,i){var a=i("cdde");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("4daf19dd",a,!0,{sourceMap:!1,shadowMode:!1})},"6a5a":function(t,e,i){"use strict";var a=i("2b97"),s=i.n(a);s.a},"6c61":function(t,e,i){"use strict";var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.confirm=n,e.orderList=d,e.orderDetail=o,e.orderCancel=r,e.orderDel=l,e.refund=c,e.refundReason=v,e.orderTake=u;var s=a(i("04c2"));function n(t){return(0,s.default)({url:"/api/order/confirm",method:"post",data:t})}function d(t){return(0,s.default)({url:"/api/order/list",method:"get",data:t})}function o(t,e){return(0,s.default)({url:"/api/order/detail/"+e,method:"get",data:t})}function r(t){return(0,s.default)({url:"/api/order/cancel",method:"post",data:t})}function l(t){return(0,s.default)({url:"/api/order/del",method:"get",data:t})}function c(t){return(0,s.default)({url:"/api/order/refund/verify",method:"post",data:t})}function v(t){return(0,s.default)({url:"/api/order/refund/reason",method:"get",data:t})}function u(t){return(0,s.default)({url:"/api/order/take",method:"post",data:t})}},b477:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac6a");var a=i("6c61"),s={filters:{orderType:function(t){return t.combination_id>0?"拼团订单":t.seckill_id>0?"秒杀订单":t.bargain_id>0?"砍价订单":"普通订单"}},data:function(){return{refund:"",reason:"",value:["1","2","3","4","5","6","7","8",9,10,11,12,13],orderId:"",item:{_status:{}},vipMoney:0,addressImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"}},onBackPress:function(t){return uni.navigateTo({url:"/pages/order/order?state="+this.item._status._type}),!0},onLoad:function(t){this.orderId=t.id,this.loadOrder()},computed:{payAllMoney:function(){return this.vipMoney+ +this.item.total_price}},methods:{loadOrder:function(){var t=this;(0,a.orderDetail)({},t.orderId).then(function(e){t.item=e.data,t.item.cartInfo.forEach(function(e){t.vipMoney+=e.vip_truePrice}),console.log(e)})},towuliu:function(t){var e=t.delivery_id;window.location.href="https://m.kuaidi100.com/result.jsp?nu="+e},copyOrderId:function(t){document.querySelector("#copyOrder input");var e=t,i=document.createElement("input");i.value=e,document.body.appendChild(i),i.select();var a=document.execCommand("copy");document.body.removeChild(i),a?uni.showToast({title:"已复制到粘贴板",duration:2e3}):this.$api.msg("复制失败")}}};e.default=s},cdde:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */.f-header .tit[data-v-bbd01516]{font-size:%?34?%;color:#303133;line-height:1;font-weight:700}.f-header .tit-box[data-v-bbd01516]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}\n/*功能栏左侧小图标*/.f-header .f-left-icon[data-v-bbd01516]{height:%?34?%;width:%?8?%;background-image:-webkit-linear-gradient(#5dbc7c,#71d094);background-image:linear-gradient(#5dbc7c,#71d094);margin-right:%?10?%;border-radius:%?10?%}uni-page-body[data-v-bbd01516]{background:#f8f8f8}.orderDetialBox[data-v-bbd01516]{margin-top:%?20?%;padding:0 %?30?%;background-color:#fff;font-size:%?28?%;color:#606266}.orderDetialBox .item[data-v-bbd01516]{height:%?80?%}.orderDetialBox .item .text[data-v-bbd01516]{padding-left:%?10?%}.orderDetialBox .item .buttom-right[data-v-bbd01516]{width:%?180?%;border-radius:%?99?%;padding:%?10?%;text-align:center;border:1px solid #ebeef5}.address-box[data-v-bbd01516]{margin-top:%?20?%;padding:%?30?%;padding-bottom:%?35?%;background-color:#fff;line-height:1}.address-box .address-top[data-v-bbd01516]{margin-bottom:%?30?%}.address-box .address-top .title[data-v-bbd01516]{font-size:%?32?%;color:#303133}.address-box .address-top .phone[data-v-bbd01516]{font-size:%?28?%;color:#909399}.address-box .addrdss-detail[data-v-bbd01516]{font-size:%?28?%;color:#606266}.address-box .a-bg[data-v-bbd01516]{position:absolute;bottom:0;left:0;width:100%;height:%?5?%}.row[data-v-bbd01516]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;padding:0 %?30?%;height:%?80?%;background:#fff}.row .order-status[data-v-bbd01516]{font-size:%?32?%;color:#dd524d;font-weight:500}.row .refund[data-v-bbd01516]{font-size:%?30?%;color:#303133}.row .noRefund[data-v-bbd01516]{font-size:%?30?%;color:#909399}.row .tit[data-v-bbd01516]{-webkit-flex-shrink:0;flex-shrink:0;width:%?120?%;font-size:%?30?%;color:#303133}.row .input[data-v-bbd01516]{text-align:right;-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133}.row .input.payColor[data-v-bbd01516]{color:#dd524d}.row .iconlocation[data-v-bbd01516]{font-size:%?36?%;color:#909399}.add-btn[data-v-bbd01516]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;margin:%?60?% auto;font-size:%?32?%;color:#fff;background-color:#5dbc7c;border-radius:%?10?%}\n/* 多条商品 */.order-item[data-v-bbd01516]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding-left:%?30?%;background:#fff;margin-top:%?20?%\n  /* 单条商品 */}.order-item .goods-box-single[data-v-bbd01516]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?20?% 0}.order-item .goods-box-single .goods-img[data-v-bbd01516]{display:block;width:%?120?%;height:%?120?%}.order-item .goods-box-single .right[data-v-bbd01516]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:0 %?30?% 0 %?24?%;overflow:hidden;height:100%}.order-item .goods-box-single .right .title[data-v-bbd01516]{-webkit-align-self:flex-start;align-self:flex-start;font-size:%?30?%;color:#303133}.order-item .goods-box-single .right .title-right[data-v-bbd01516]{-webkit-flex-shrink:0;flex-shrink:0;text-align:right;-webkit-align-self:flex-start;align-self:flex-start}.order-item .goods-box-single .right .attr-box[data-v-bbd01516]{font-size:%?26?%;color:#909399}.order-item .goods-box-single .right .price[data-v-bbd01516]{font-size:%?30?%;color:#303133}.order-item .goods-box-single .right .price[data-v-bbd01516]:before{content:"\\FFE5";font-size:%?24?%;margin:0 %?2?% 0 %?8?%}.f-header[data-v-bbd01516]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%}.btHeight[data-v-bbd01516]{height:%?100?%}.group-nav[data-v-bbd01516]{position:fixed;bottom:0;left:0;height:%?100?%;width:100%;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;padding-right:%?30?%}body.?%PAGE?%[data-v-bbd01516]{background:#f8f8f8}',""])},de4e:function(t,e,i){"use strict";var a,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"row b-b b-t"},[i("v-uni-text",{staticClass:"order-status",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),"express"==t.item.delivery_type&&t.towuliu(t.item)}}},[t._v(t._s(t.item._status?t.item._status._msg:""))])],1),i("v-uni-view",{staticClass:"address-box position-relative"},[i("v-uni-view",{staticClass:"address-top flex"},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(t.item.real_name))]),i("v-uni-view",{staticClass:"phone"},[t._v(t._s(t.item.user_phone))])],1),i("v-uni-view",{staticClass:"addrdss-detail"},[t._v(t._s(t.item.user_address))]),i("v-uni-image",{staticClass:"a-bg",attrs:{src:t.addressImg}})],1),i("v-uni-view",{staticClass:"order-item"},t._l(t.item.cartInfo,function(e,a){return i("v-uni-view",{key:a,staticClass:"goods-box-single"},[i("v-uni-image",{staticClass:"goods-img",attrs:{src:e.productInfo.image,mode:"aspectFill"}}),i("v-uni-view",{staticClass:"right position-relative"},[i("v-uni-view",{staticClass:"flex"},[i("v-uni-text",{staticClass:"title"},[t._v(t._s(e.productInfo.store_name))]),i("v-uni-view",{staticClass:"title-right"},[i("v-uni-view",{staticClass:"price"},[t._v(t._s(e.productInfo.price))]),i("v-uni-view",{staticClass:"attr-box"},[t._v(t._s(e.attrInfo?e.attrInfo.suk:"")+" x "+t._s(e.cart_num+""+(e.productInfo.unit_name||"")))])],1)],1)],1)],1)}),1),i("v-uni-view",{staticClass:"row b-b flex"},[i("v-uni-text",{staticClass:"tit"},[t._v("订单总价")]),i("v-uni-view",{staticClass:"input"},[t._v("￥"+t._s(t.payAllMoney))])],1),t.vipMoney>0?i("v-uni-view",{staticClass:"row b-b flex"},[i("v-uni-text",{staticClass:"tit"},[t._v("vip优惠")]),i("v-uni-view",{staticClass:"input"},[t._v("-￥"+t._s(t.vipMoney))])],1):t._e(),i("v-uni-view",{staticClass:"row b-b flex"},[i("v-uni-text",{staticClass:"tit"},[t._v("邮费")]),i("v-uni-view",{staticClass:"input"},[t._v(t._s(t.item.pay_postage>0?"￥"+t.item.pay_postage:"免邮费"))])],1),t.item.coupon_id>0?i("v-uni-view",{staticClass:"row b-b flex"},[i("v-uni-text",{staticClass:"tit"},[t._v("优惠券")]),i("v-uni-view",{staticClass:"input"},[t._v("-￥"+t._s(t.item.coupon_price))])],1):t._e(),t.item.use_integral>0?i("v-uni-view",{staticClass:"row b-b flex"},[i("v-uni-text",{staticClass:"tit"},[t._v("积分抵扣")]),i("v-uni-view",{staticClass:"input"},[t._v("-￥"+t._s(t.item.use_integral))])],1):t._e(),i("v-uni-view",{staticClass:"row b-b flex"},[i("v-uni-text",{staticClass:"tit "},[t._v("实付")]),i("v-uni-view",{staticClass:"input payColor"},[t._v("￥"+t._s(t.item.pay_price))])],1),i("v-uni-view",{staticClass:"orderDetialBox"},[i("v-uni-view",{staticClass:"f-header m-t"},[i("v-uni-view",{staticClass:"f-left-icon"}),i("v-uni-view",{staticClass:"tit-box"},[i("v-uni-text",{staticClass:"tit"},[t._v("订单信息")])],1)],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},[i("v-uni-text",{staticClass:"title"},[t._v("订单编号:")]),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.item.order_id))])],1),i("v-uni-view",{staticClass:"buttom-right",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copyOrderId(t.item.order_id)}}},[t._v("复制单号")])],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},[i("v-uni-text",{staticClass:"title"},[t._v("下单时间:")]),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.item._add_time))])],1)],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},[i("v-uni-text",{staticClass:"title"},[t._v("订单类型:")]),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t._f("orderType")(t.item)))])],1)],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},[i("v-uni-text",{staticClass:"title"},[t._v("订单状态:")]),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.item._status._title||""))])],1)],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},[i("v-uni-text",{staticClass:"title"},[t._v("支付方式:")]),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.item._status._payType||""))])],1)],1)],1),t.item.delivery_id?i("v-uni-view",{staticClass:"orderDetialBox"},[i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},[i("v-uni-text",{staticClass:"title"},[t._v("配送方式:")]),i("v-uni-view",{staticClass:"text"},[t._v(t._s("express"==t.item.delivery_type?"发货":"send"==t.item.delivery_type?"送货":""))])],1)],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},["express"==t.item.delivery_type?i("v-uni-text",{staticClass:"title"},[t._v("快递公司:")]):t._e(),"send"==t.item.delivery_type?i("v-uni-text",{staticClass:"title"},[t._v("送货人员:")]):t._e(),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.item.delivery_name))])],1),1!=t.status._type&&0!=t.status._type?i("v-uni-view",{staticClass:"buttom-right",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.towuliu(t.item)}}},[t._v("查看物流")]):t._e()],1),i("v-uni-view",{staticClass:"item flex"},[i("v-uni-view",{staticClass:"title-left flex"},["express"==t.item.delivery_type?i("v-uni-text",{staticClass:"title"},[t._v("快递单号:")]):t._e(),"send"==t.item.delivery_type?i("v-uni-text",{staticClass:"title"},[t._v("联系方式:")]):t._e(),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.item.delivery_id))])],1)],1)],1):t._e(),i("v-uni-view",{staticClass:"btHeight"}),t.item.combination_id>0?i("v-uni-view",{staticClass:"group-nav flex bg-white b-t"},[i("v-uni-navigator",{attrs:{url:"/pages/groupBooking/detail?id="+t.item.pink_id}},[i("v-uni-view",{staticClass:"bottom  border-radius-all bg-danger text-white padding-c-30 font-size-lg padding-v-10"},[t._v("查看拼团")])],1)],1):t._e()],1)},n=[];i.d(e,"b",function(){return s}),i.d(e,"c",function(){return n}),i.d(e,"a",function(){return a})},fa36:function(t,e,i){"use strict";i.r(e);var a=i("de4e"),s=i("28da");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("6a5a");var d,o=i("f0c5"),r=Object(o["a"])(s["default"],a["b"],a["c"],!1,null,"bbd01516",null,!1,a["a"],d);e["default"]=r.exports}}]);