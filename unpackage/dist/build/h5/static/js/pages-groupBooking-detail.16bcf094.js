(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-groupBooking-detail"],{"08b2":function(t,e,a){var i=a("5ab1");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("20c6a063",i,!0,{sourceMap:!1,shadowMode:!1})},"11a1":function(t,e,a){"use strict";var i=a("6da4"),o=a.n(i);o.a},"15f3":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("c5f6");var i={name:"UniCountdown",props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#FFFFFF"},borderColor:{type:String,default:"#000000"},color:{type:String,default:"#000000"},splitorColor:{type:String,default:"#000000"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0}},data:function(){return{timer:null,syncFlag:!1,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}},watch:{day:function(t){this.changeFlag()},hour:function(t){this.changeFlag()},minute:function(t){this.changeFlag()},second:function(t){this.changeFlag()}},created:function(t){this.startData()},beforeDestroy:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,e,a,i){return 60*t*60*24+60*e*60+60*a+i},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.seconds,e=0,a=0,i=0,o=0;t>0?(e=Math.floor(t/86400),a=Math.floor(t/3600)-24*e,i=Math.floor(t/60)-24*e*60-60*a,o=Math.floor(t)-24*e*60*60-60*a*60-60*i):this.timeUp(),e<10&&(e="0"+e),a<10&&(a="0"+a),i<10&&(i="0"+i),o<10&&(o="0"+o),this.d=e,this.h=a,this.i=i,this.s=o},startData:function(){var t=this;this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.seconds<=0||(this.countDown(),this.timer=setInterval(function(){t.seconds--,t.seconds<0?t.timeUp():t.countDown()},1e3))},changeFlag:function(){this.syncFlag||(this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.startData(),this.syncFlag=!0)}}};e.default=i},"29f9":function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.getCombinationList=n,e.getCombinationLisRemove=l,e.getCombinationLisPink=s,e.getCombinationPoster=r;var o=i(a("04c2"));function n(t){return(0,o.default)({url:"/api/combination/list",method:"get",data:t})}function l(t,e){return(0,o.default)({url:"/api/combination/remove"+e,method:"get",data:t})}function s(t,e){return(0,o.default)({url:"/api/combination/pink/"+e,method:"get",data:t})}function r(t){return(0,o.default)({url:"/api/combination/poster",method:"post",data:t})}},"2f05":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/.lyy-c[data-v-7dea0c78]{width:100%;background:#fff}.lyy-c .lyy-c-word[data-v-7dea0c78]{font-size:%?28?%;color:#666;line-height:%?50?%}.lyy-c .lyy-c-p[data-v-7dea0c78]{padding:%?39?% %?30?%}.lyy-wrap[data-v-7dea0c78]{background-color:#f4f4f4}.lyy-hx[data-v-7dea0c78]{height:%?14?%}.image1[data-v-7dea0c78]{width:%?200?%;height:%?33?%;background:url(http://lxscimg.liuniu946.com/2019-11-02_5dbd0e10a2160.png) 50% no-repeat;background-size:%?200?% auto}.lyy-b[data-v-7dea0c78]{width:100%;background-color:#fff}.lyy-b .lyy-b-p[data-v-7dea0c78]{padding:%?30?% %?45?%}.lyy-b .lyy-b-p .lyy-b-word2[data-v-7dea0c78],.lyy-b .lyy-b-p .lyy-b-word3[data-v-7dea0c78]{font-size:%?28?%;font-weight:700}.lyy-b .lyy-b-p .lyy-b-word2[data-v-7dea0c78]{color:#fc5b62}.lyy-b .lyy-b-p .lyy-b-word3[data-v-7dea0c78]{color:#1d2023}.lyy-b .lyy-b-p .lyy-b-jz[data-v-7dea0c78]{width:100%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-bottom:%?20?%}.lyy-b .lyy-b-p .lyy-b-jz .lyy-y[data-v-7dea0c78]{width:%?80?%;height:%?80?%;margin:0 %?15?%;border-radius:%?40?%;overflow:hidden}.lyy-b .lyy-b-p .lyy-b-jz .lyy-y .user-list-img[data-v-7dea0c78]{width:100%;height:100%}.lyy-b .lyy-b-p .lyy-b-jz .lyy-y-word[data-v-7dea0c78]{margin-top:%?10?%;font-size:%?28?%;text-align:center;width:%?110?%}.lyy-b .lyy-b-p .lyy-b-jz .lyy-b-but[data-v-7dea0c78]{width:%?550?%;height:%?80?%;background:#fc5b62;border-radius:%?100?%;text-align:center;color:#fff;line-height:%?80?%;font-size:%?32?%}.lyy-b .lyy-b-p .lyy-b-jz .cmy-user-box .user-list[data-v-7dea0c78]{display:inline-block;line-height:1}.lyy-b .lyy-b-p .lyy-b-word[data-v-7dea0c78]{text-align:center;font-size:%?26?%;color:#1d2023}.lyy-a[data-v-7dea0c78]{width:100%;background-color:#fff}.lyy-a .lyy-a-p[data-v-7dea0c78]{padding:%?22?% %?30?%}.lyy-a .lyy-a-p .lyy-a-f[data-v-7dea0c78]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-f2[data-v-7dea0c78]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-tu[data-v-7dea0c78]{width:%?122?%;height:%?122?%}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z[data-v-7dea0c78]{padding-left:%?30?%;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .money-box[data-v-7dea0c78]{-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .money-box .lyy-a-tu2[data-v-7dea0c78]{background:#fff;border:%?1?% solid #fc5b62}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .money-box .lyy-a-tu2 .lyy-a-tu3[data-v-7dea0c78]{background-color:#fc5b62;padding:2px 4px 0 4px;text-align:center;height:%?26?%}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .money-box .lyy-a-tu2 .lyy-a-tu3 .lyy-a-tu5[data-v-7dea0c78]{width:%?20?%;height:%?20?%;display:block}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .money-box .lyy-a-tu2 .lyy-a-tu4[data-v-7dea0c78]{margin-left:2px;font-size:10px;color:#fc5b62;padding:0 %?10?%;text-align:center}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .lyy-a-word[data-v-7dea0c78]{line-height:%?56?%}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .lyy-a-word .lyy-a-word3[data-v-7dea0c78]{font-size:%?28?%;font-weight:700;color:#fc5b62}.lyy-a .lyy-a-p .lyy-a-f .lyy-a-z .lyy-a-word2[data-v-7dea0c78]{font-size:%?30?%;color:#1d2023}',""])},"4c78":function(t,e,a){"use strict";var i=a("08b2"),o=a.n(i);o.a},"5ab1":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/.uni-countdown[data-v-690c4eaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;padding:%?2?% 0}.uni-countdown__splitor[data-v-690c4eaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;line-height:%?48?%;padding:%?5?%;font-size:%?24?%}.uni-countdown__number[data-v-690c4eaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?52?%;height:%?48?%;line-height:%?48?%;margin:%?5?%;text-align:center;font-size:%?24?%}',""])},"636c":function(t,e,a){"use strict";function i(t){var e=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;return!1!==e.test(t)||(console.log(t),!1)}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;"string"==typeof t&&(t=(+t).toFixed(2)),"number"==typeof t&&(t=t.toFixed(2));var e=t.split(""),a=e.reverse().map(function(t,e,a){return e%3==0&&e/3>1&&e!=a.length?t+",":t});return a=a.reverse().join(""),a}function n(t){var e=(new Date).getTime(),a=t-e;a<0&&(a*=-1);var i=Math.floor(a/1e3/60/60%24),o=Math.floor(a/1e3/60%60),n=Math.floor(a/1e3%60);return{hours:i,minutes:o,seconds:n}}Object.defineProperty(e,"__esModule",{value:!0}),e.isCardNo=i,e.getMoneyStyle=o,e.timeComputed=n,a("28a5")},"6da4":function(t,e,a){var i=a("2f05");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("003e394a",i,!0,{sourceMap:!1,shadowMode:!1})},"74bc":function(t,e,a){"use strict";a.r(e);var i=a("dd36"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=o.a},"945e":function(t,e,a){"use strict";a.r(e);var i=a("b621"),o=a("74bc");for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);a("11a1");var l,s=a("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"7dea0c78",null,!1,i["a"],l);e["default"]=r.exports},a029:function(t,e,a){"use strict";a.r(e);var i=a("fa1c"),o=a("cd3d");for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);a("4c78");var l,s=a("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"690c4eaa",null,!1,i["a"],l);e["default"]=r.exports},b621:function(t,e,a){"use strict";var i,o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"box"},[a("v-uni-view",{staticClass:"lyy-a"},[a("v-uni-view",{staticClass:"lyy-a-p"},[a("v-uni-view",{staticClass:"lyy-a-f"},[a("v-uni-view",[a("v-uni-image",{staticClass:"lyy-a-tu",attrs:{src:t.goods.image}})],1),a("v-uni-view",{staticClass:"lyy-a-z"},[a("v-uni-view",{staticClass:"lyy-a-word lyy-a-word2"},[t._v(t._s(t.goods.title))]),a("v-uni-view",{staticClass:"flex money-box"},[a("v-uni-view",{staticClass:"lyy-a-f lyy-a-word margin-r-20"},[a("v-uni-view",{staticClass:"lyy-a-word3"},[t._v("￥"+t._s(t.goods.price))])],1),a("v-uni-view",{staticClass:"lyy-a-tu2 lyy-a-f padding-c-20 border-radius-all"},[a("v-uni-view",{staticClass:"lyy-a-tu3"},[a("v-uni-image",{staticClass:"lyy-a-tu5",attrs:{src:"http://lxscimg.liuniu946.com/2019-11-02_5dbd110b5928a.png"}})],1),a("v-uni-view",{staticClass:"lyy-a-tu4 flex-shrink-false"},[t._v(t._s(t.goods.people)+"人拼")])],1)],1)],1)],1)],1)],1),a("v-uni-view",{staticClass:"lyy-hx"}),a("v-uni-view",{staticClass:"lyy-b padding-t-20"},[a("v-uni-view",{staticClass:"lyy-b-p"},[a("v-uni-view",{staticClass:"lyy-b-jz flex"},[a("v-uni-view",{staticClass:"image1"},[a("v-uni-view",{staticClass:"lyy-b-word"},[t._v("剩余时间")])],1)],1),a("v-uni-view",{staticClass:"lyy-b-jz flex"},[0==t.pinkBool?a("uni-countdown",{attrs:{color:"#FFFFFF","splitor-color":"#FC5B62","background-color":"#FC5B62","border-color":"#FC5B62","show-day":!1,hour:t.stopTime.stopTimeH,minute:t.stopTime.stopTimeM,second:t.stopTime.stopTimeS}}):t._e()],1),a("v-uni-view",{staticClass:"lyy-b-jz flex"},[a("span",{staticClass:"lyy-b-word2"},[t._v(t._s(t.pinkT.people))]),a("span",{staticClass:"lyy-b-word3"},[t._v("人成团，还差"+t._s(t.peopleNub)+"人")])]),a("v-uni-view",{staticClass:"lyy-b-jz flex"},[a("v-uni-view",{staticClass:"cmy-user-box"},[a("v-uni-view",{staticClass:"user-list"},[a("v-uni-view",{staticClass:"lyy-y bg-gray"},[a("v-uni-image",{staticClass:"user-list-img",attrs:{src:t.pinkT.avatar}})],1),a("v-uni-view",{staticClass:"lyy-y-word clamp"},[t._v(t._s(t.pinkT.nickname))])],1),t._l(t.people,function(e,i){return a("v-uni-view",{key:i,staticClass:"user-list"},[a("v-uni-view",{staticClass:"lyy-y bg-gray"},[a("v-uni-image",{staticClass:"user-list-img",attrs:{src:e.avatar}})],1),a("v-uni-view",{staticClass:"lyy-y-word clamp"},[t._v(t._s(e.nickname))])],1)}),t._l(t.peopleNub,function(e,i){return a("v-uni-view",{key:i,staticClass:"user-list"},[a("v-uni-view",{staticClass:"lyy-y bg-gray"}),a("v-uni-view",{staticClass:"lyy-y-word clamp"},[t._v("待邀请")])],1)})],2)],1),a("v-uni-view",{staticClass:"lyy-b-jz flex"},[1==t.status&&0==t.pinkBool?a("v-uni-view",{staticClass:"lyy-b-but",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.invitation.apply(void 0,arguments)}}},[t._v("邀请好友参团")]):t._e(),0==t.status&&0==t.pinkBool?a("v-uni-view",{staticClass:"lyy-b-but",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBuy.apply(void 0,arguments)}}},[t._v("立即加入")]):t._e(),-1==t.pinkBool?a("v-uni-view",{staticClass:"lyy-b-but bg-gray"},[t._v("拼团失败")]):t._e(),1==t.pinkBool?a("v-uni-view",{staticClass:"lyy-b-but"},[t._v("拼团成功")]):t._e()],1)],1)],1),a("v-uni-view",{staticClass:"lyy-hx"}),a("v-uni-view",{staticClass:"lyy-c"},[a("v-uni-view",{staticClass:"lyy-c-p"},[a("v-uni-view",{staticClass:"lyy-c-word"},[a("v-uni-view",[t._v("拼团规则：")]),a("v-uni-view",[t._v("1.点击商品进入商品详情，通过超值拼团进入订单支付 页，用户付款成功后，按页面提示分享给微信好友。")]),a("v-uni-view",[t._v("2.好友通过分享，加入超值拼团，完成订单支付，待达成 拼团人数后，拼团成功。")])],1)],1)],1)],1)},n=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return n}),a.d(e,"a",function(){return i})},c412:function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.getProducts=n,e.goodsDetail=l,e.cartAdd=s,e.collectAdd=r,e.collectDel=c,e.searchKeyword=u,e.groomList=d,e.seckillGoods=y,e.groupGoods=f;var o=i(a("04c2"));function n(t){return(0,o.default)({url:"/api/products",method:"get",data:t})}function l(t,e){return(0,o.default)({url:"/api/product/detail/"+e,method:"get",data:t})}function s(t){return(0,o.default)({url:"/api/cart/add",method:"post",data:t})}function r(t){return(0,o.default)({url:"/api/collect/add",method:"post",data:t})}function c(t){return(0,o.default)({url:"/api/collect/del",method:"post",data:t})}function u(t){return(0,o.default)({url:"/api/search/keyword",method:"get",data:t})}function d(t,e){return(0,o.default)({url:"/api/groom/list/"+e,method:"get",data:t})}function y(t,e){return(0,o.default)({url:"/api/seckill/detail/"+e,method:"get",data:t})}function f(t,e){return(0,o.default)({url:"/api/combination/detail/"+e,method:"get",data:t})}},cd3d:function(t,e,a){"use strict";a.r(e);var i=a("15f3"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=o.a},dd36:function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a481");var o=i(a("a029")),n=a("29f9"),l=(a("c412"),a("636c")),s=(a("2f62"),{computed:{peopleNub:function(){return this.pinkT.people-1-this.people.length}},data:function(){return{gp_id:0,goods:{},pinkT:{},people:[],status:0,gid:0,user_info:{},stopTime:{stopTimeH:0,stopTimeM:0,stopTimeS:0},pinkBool:0,userBool:0,spread:"",userInfo:{}}},onLoad:function(t){this.gp_id=t.id,t.spread&&(this.spread=t.spread,uni.setStorageSync("spread",option.spread))},onShow:function(){this.getData()},components:{uniCountdown:o.default},methods:{goBuy:function(){uni.navigateTo({url:"/pages/order/createOrder?pinkId="+this.gp_id+"&type=pink&pid="+this.goods.product_id+"&gid="+this.goods.id+"&merid="+this.goods.mer_id})},invitation:function(){var t=this;0!=t.userBool?uni.navigateTo({url:"/pages/groupBooking/inviteImg?id="+this.pinkT.id+"&spread="+this.userInfo.uid,success:function(t){},fail:function(t){console.log(t)},complete:function(){}}):uni.showModal({title:"提示",content:"该拼团已经结束！",showCancel:!1,success:function(t){},fail:function(){},complete:function(){}})},shareDate:function(){var t=this,e=uni.getStorageSync("weichatBrowser")||"";if(e){url=url.replace("?from=singlemessage","");var a={link:url,imgUrl:t.goodsObjact.image,desc:t.goodsObjact.store_info,title:t.goodsObjact.store_name,success:function(){}};t.weichatObj.updateAppMessageShareData(a),t.weichatObj.updateTimelineShareData(a)}},getData:function(){var t=this,e=this;(0,n.getCombinationLisPink)({},this.gp_id).then(function(a){var i=a.data;e.goods=i.store_combination,e.pinkT=i.pinkT,e.timeComputed(1e3*e.pinkT.stop_time),e.people=i.pinkAll,e.userBool=i.userBool,i.pinkT.uid==i.userInfo.uid&&(e.status=1),e.userInfo=i.userInfo,e.pinkBool=i.pinkBool,t.shareDate()})},timeComputed:function(t){var e=this,a=(0,l.timeComputed)(t);e.stopTime.stopTimeH=a.hours,e.stopTime.stopTimeM=a.minutes,e.stopTime.stopTimeS=a.seconds}}});e.default=s},fa1c:function(t,e,a){"use strict";var i,o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-countdown"},[t.showDay?a("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.d))]):t._e(),t.showDay?a("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("天")]):t._e(),a("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.h))]),a("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"时"))]),a("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.i))]),a("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"分"))]),a("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.s))]),t.showColon?t._e():a("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("秒")])],1)},n=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return n}),a.d(e,"a",function(){return i})}}]);