(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-seckill-seckill"],{"08b2":function(t,e,i){var o=i("5ab1");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("20c6a063",o,!0,{sourceMap:!1,shadowMode:!1})},"0f6f":function(t,e,i){"use strict";i.r(e);var o=i("959e"),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);e["default"]=a.a},"15f3":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("c5f6");var o={name:"UniCountdown",props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#FFFFFF"},borderColor:{type:String,default:"#000000"},color:{type:String,default:"#000000"},splitorColor:{type:String,default:"#000000"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0}},data:function(){return{timer:null,syncFlag:!1,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}},watch:{day:function(t){this.changeFlag()},hour:function(t){this.changeFlag()},minute:function(t){this.changeFlag()},second:function(t){this.changeFlag()}},created:function(t){this.startData()},beforeDestroy:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,e,i,o){return 60*t*60*24+60*e*60+60*i+o},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.seconds,e=0,i=0,o=0,a=0;t>0?(e=Math.floor(t/86400),i=Math.floor(t/3600)-24*e,o=Math.floor(t/60)-24*e*60-60*i,a=Math.floor(t)-24*e*60*60-60*i*60-60*o):this.timeUp(),e<10&&(e="0"+e),i<10&&(i="0"+i),o<10&&(o="0"+o),a<10&&(a="0"+a),this.d=e,this.h=i,this.i=o,this.s=a},startData:function(){var t=this;this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.seconds<=0||(this.countDown(),this.timer=setInterval(function(){t.seconds--,t.seconds<0?t.timeUp():t.countDown()},1e3))},changeFlag:function(){this.syncFlag||(this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.startData(),this.syncFlag=!0)}}};e.default=o},"4c78":function(t,e,i){"use strict";var o=i("08b2"),a=i.n(o);a.a},"4dfd":function(t,e,i){"use strict";var o,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-load-more"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.status&&t.showIcon,expression:"status === 'loading' && showIcon"}],staticClass:"uni-load-more__img"},[i("v-uni-view",{staticClass:"load1 load"},[i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load2 load"},[i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load3 load"},[i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}}),i("v-uni-view",{staticClass:"item",style:{background:t.color}})],1)],1),i("v-uni-text",{staticClass:"uni-load-more__text",style:{color:t.color}},[t._v(t._s("more"===t.status?t.contentText.contentdown:"loading"===t.status?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return n}),i.d(e,"a",function(){return o})},"51e9":function(t,e,i){"use strict";i.r(e);var o=i("952b"),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);e["default"]=a.a},"546c":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-load-more[data-v-fbe50cc4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-load-more__text[data-v-fbe50cc4]{font-size:%?28?%;color:#999}.uni-load-more__img[data-v-fbe50cc4]{height:24px;width:24px;margin-right:10px}.uni-load-more__img>.load[data-v-fbe50cc4]{position:absolute}.uni-load-more__img>.load .item[data-v-fbe50cc4]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#999;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-fbe50cc4 1.56s ease infinite;animation:load-data-v-fbe50cc4 1.56s ease infinite}.uni-load-more__img>.load .item[data-v-fbe50cc4]:first-child{-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.uni-load-more__img>.load .item[data-v-fbe50cc4]:nth-child(2){-webkit-transform:rotate(180deg);transform:rotate(180deg);top:11px;right:0}.uni-load-more__img>.load .item[data-v-fbe50cc4]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.uni-load-more__img>.load .item[data-v-fbe50cc4]:nth-child(4){top:11px;left:0}.load1[data-v-fbe50cc4],.load2[data-v-fbe50cc4],.load3[data-v-fbe50cc4]{height:24px;width:24px}.load2[data-v-fbe50cc4]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-fbe50cc4]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.load1 .item[data-v-fbe50cc4]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 .item[data-v-fbe50cc4]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 .item[data-v-fbe50cc4]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 .item[data-v-fbe50cc4]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 .item[data-v-fbe50cc4]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 .item[data-v-fbe50cc4]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 .item[data-v-fbe50cc4]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 .item[data-v-fbe50cc4]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 .item[data-v-fbe50cc4]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 .item[data-v-fbe50cc4]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 .item[data-v-fbe50cc4]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 .item[data-v-fbe50cc4]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-fbe50cc4{0%{opacity:1}to{opacity:.2}}",""])},5833:function(t,e,i){var o=i("546c");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("561cca79",o,!0,{sourceMap:!1,shadowMode:!1})},"5ab1":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/.uni-countdown[data-v-690c4eaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;padding:%?2?% 0}.uni-countdown__splitor[data-v-690c4eaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;line-height:%?48?%;padding:%?5?%;font-size:%?24?%}.uni-countdown__number[data-v-690c4eaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?52?%;height:%?48?%;line-height:%?48?%;margin:%?5?%;text-align:center;font-size:%?24?%}',""])},"636c":function(t,e,i){"use strict";function o(t){var e=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;return!1!==e.test(t)||(console.log(t),!1)}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;"string"==typeof t&&(t=(+t).toFixed(2)),"number"==typeof t&&(t=t.toFixed(2));var e=t.split(""),i=e.reverse().map(function(t,e,i){return e%3==0&&e/3>1&&e!=i.length?t+",":t});return i=i.reverse().join(""),i}function n(t){var e=(new Date).getTime(),i=t-e;i<0&&(i*=-1);var o=Math.floor(i/1e3/60/60%24),a=Math.floor(i/1e3/60%60),n=Math.floor(i/1e3%60);return{hours:o,minutes:a,seconds:n}}Object.defineProperty(e,"__esModule",{value:!0}),e.isCardNo=o,e.getMoneyStyle=a,e.timeComputed=n,i("28a5")},"75fc":function(t,e,i){"use strict";i.r(e);var o=i("a745"),a=i.n(o);function n(t){if(a()(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var s=i("774e"),c=i.n(s),l=i("c8bb"),r=i.n(l);function d(t){if(r()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return c()(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return n(t)||d(t)||u()}i.d(e,"default",function(){return f})},"885a":function(t,e,i){"use strict";var o=i("c890"),a=i.n(o);a.a},"952b":function(t,e,i){"use strict";var o=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("28a5");var a=o(i("75fc")),n=i("b0c2"),s=o(i("a029")),c=o(i("99c1")),l=i("636c"),r={components:{uniCountdown:s.default,uniLoadMore:c.default},data:function(){return{indexList:[],showTime:"",showTImeId:"",stop:!1,show:!1,status:0,topNavWidth:"25%",classIndex:0,itemWidht:0}},computed:{scrollLeft:function(){return this.classIndex>1?this.itemWidht*(this.classIndex-1.5):0}},onLoad:function(t){this.getClass()},methods:{swiperChange:function(t){this.classIndex=t.target.current,this.getList(this.classIndex,"tabChange")},numClassWidht:function(){var t=this;uni.createSelectorQuery().select(".seckillBox").fields({size:!0},function(e){t.itemWidht=Math.floor(e.width/750*187.5)}).exec()},tabClass:function(t){this.classIndex=t},navProduct:function(t,e){if(1==t.status){var i=t.dataList[e];uni.navigateTo({url:"/pages/product/product?id="+i.id+"&type=1&stoptime="+this.indexList[this.classIndex].stop})}},getList:function(t,e){var i=this,o=this.indexList[t];console.log(o,e),"tabChange"===e&&!0===o.loaded||"noMore"!==o.loadingType&&"loading"!==o.loadingType&&(o.loadingType="loading",(0,n.getList)({page:o.page,limit:o.limit},o.id).then(function(t){var e;(e=o.dataList).push.apply(e,(0,a.default)(t.data)),o.page++,o.limit==t.data.length?o.loadingType="more":o.loadingType="noMore",i.$set(o,"loaded",!0)}).catch(function(t){console.log(t)}))},getClass:function(){var t=this;(0,n.getClass)({}).then(function(e){var i=e.data;t.indexList=i.seckillTime.map(function(e,i){e.page=1,e.limit=6,e.dataList=[],e.loadingType="more";var o=e;if(1===o.status)t.timeComputed(1e3*o.stop,o);else{var a=o.time.split(":"),n=a[0],s=a[1],c=new Date;c.setHours(n,s,0),t.timeComputed(c.getTime(),o)}return e}),t.classIndex=i.seckillTimeIndex,t.$nextTick(function(){t.getList(t.classIndex)}),t.indexList.length<=4?t.topNavWidth=100/t.indexList.length+"%":t.$nextTick(function(){t.numClassWidht()})}).catch(function(t){console.log(t)})},timeComputed:function(t,e){var i=(0,l.timeComputed)(t);console.log(i),e.stopTimeH=i.hours,e.stopTimeM=i.minutes,e.stopTimeS=i.seconds}}};e.default=r},"959e":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"uni-load-more",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=o},"99c1":function(t,e,i){"use strict";i.r(e);var o=i("4dfd"),a=i("0f6f");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("e84e");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"fbe50cc4",null,!1,o["a"],s);e["default"]=l.exports},a029:function(t,e,i){"use strict";i.r(e);var o=i("fa1c"),a=i("cd3d");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("4c78");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"690c4eaa",null,!1,o["a"],s);e["default"]=l.exports},b025:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/.seckillBox[data-v-2f40c2ae],uni-page-body[data-v-2f40c2ae]{min-height:100%;height:100%}.class-box[data-v-2f40c2ae]{white-space:nowrap;height:60px}.class-box .item[data-v-2f40c2ae]{text-align:center;display:inline-block;color:#606266;padding:11.5px 5px;background-color:#fff;line-height:1}.class-box .item .time[data-v-2f40c2ae]{font-size:16px;padding-bottom:3px}.class-box .item .time.action[data-v-2f40c2ae]{color:#dd524d}.class-box .item .status[data-v-2f40c2ae]{font-size:12px;margin:0 auto;width:60px;padding:3px 0}.class-box .item .status.action[data-v-2f40c2ae]{color:#fff;border-radius:99px;background-color:#dd524d}.title-box[data-v-2f40c2ae]{margin-top:10px;padding:10px;background-color:#fff}.title-box .title-box-left[data-v-2f40c2ae]{font-size:15px;color:#606266}.title-box .title-box-right .tip[data-v-2f40c2ae]{font-size:15px;color:#999;padding-right:5px}.title-box .title-box-right[data-v-2f40c2ae] .uni-countdown__number{border-radius:3px;width:22px}.title-box .title-box-right[data-v-2f40c2ae] .uni-countdown__number,.title-box .title-box-right[data-v-2f40c2ae] .uni-countdown__splitor{height:20px;line-height:18px}.list-Box[data-v-2f40c2ae]{height:calc(100% - 60px)}.list-Box .list[data-v-2f40c2ae]{height:calc(100% - 55px)}.goodsList-item[data-v-2f40c2ae]{background-color:#fff;padding:%?30?%;border-bottom:1px solid #ebeef5}.goodsList-item uni-image[data-v-2f40c2ae]{-webkit-flex-shrink:0;flex-shrink:0;border-radius:%?15?%;height:%?180?%;width:%?180?%}.goodsList-item .slider[data-v-2f40c2ae]{margin-top:%?15?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.goodsList-item .slider .slider-box[data-v-2f40c2ae]{width:%?196?%;border-radius:99px;border:1px solid #fe9398;height:%?16?%}.goodsList-item .slider .slider-box .slider-action[data-v-2f40c2ae]{background-color:#fe9398;height:100%}.goodsList-item .slider .sales-nub[data-v-2f40c2ae]{color:#909399;font-size:%?24?%;padding-left:%?20?%}.goodsList-item .goodsList-content[data-v-2f40c2ae]{margin-left:%?20?%;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1;height:%?180?%;position:relative}.goodsList-item .goodsList-content .title[data-v-2f40c2ae]{font-size:%?28?%;color:#303133;font-weight:500;width:0;min-width:100%}.goodsList-item .goodsList-content .goods-money[data-v-2f40c2ae]{position:absolute;left:0;bottom:0;width:100%}.goodsList-item .goodsList-content .goods-money .money-box .money[data-v-2f40c2ae]{font-size:%?42?%;color:#dd524d;font-weight:700}.goodsList-item .goodsList-content .goods-money .money-box .otMoney-box[data-v-2f40c2ae]{font-size:%?24?%}.goodsList-item .goodsList-content .goods-money .money-box .otMoney-box .otMoney[data-v-2f40c2ae]{color:#909399;padding-right:%?20?%;text-decoration:line-through}.goodsList-item .goodsList-content .goods-money .money-box .otMoney-box .sales[data-v-2f40c2ae]{color:#909399}.goodsList-item .goodsList-content .goods-money .cart[data-v-2f40c2ae]{font-size:%?28?%;border-radius:99px;padding:%?15?% %?30?%;line-height:1;color:#fff;background-color:#999}.goodsList-item .goodsList-content .goods-money .cart.seckill-action[data-v-2f40c2ae]{border:1px solid #dd524d;background-color:#dd524d}',""])},b0c2:function(t,e,i){"use strict";var o=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.getClass=n,e.getList=s;var a=o(i("04c2"));function n(t){return(0,a.default)({url:"/api/seckill/index",method:"get",data:t})}function s(t,e){return(0,a.default)({url:"/api/seckill/list/"+e,method:"get",data:t})}},ba09:function(t,e,i){"use strict";var o,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"seckillBox"},[i("v-uni-scroll-view",{staticClass:"class-box flex b-t",attrs:{"scroll-x":"true","scroll-left":t.scrollLeft,"scroll-with-animation":!0}},t._l(t.indexList,function(e,o){return i("v-uni-view",{key:o,staticClass:"item",style:{width:t.topNavWidth},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabClass(o)}}},[i("v-uni-view",{staticClass:"time",class:{action:o==t.classIndex}},[t._v(t._s(e.time))]),i("v-uni-view",{staticClass:"status",class:{action:o==t.classIndex}},[t._v(t._s(e.state))])],1)}),1),i("v-uni-swiper",{staticClass:"list-Box",attrs:{current:t.classIndex,duration:"500"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.swiperChange.apply(void 0,arguments)}}},t._l(t.indexList,function(e,o){return i("v-uni-swiper-item",{staticClass:"list-item"},[i("v-uni-view",{staticClass:" b-b position-relative"},[i("v-uni-view",{staticClass:"title-box flex "},[i("v-uni-view",{staticClass:"title-box-left"},[1==e.status?i("v-uni-text",[t._v("抢购中先下先得哦！")]):t._e(),2==e.status?i("v-uni-text",[t._v("精品好货即将开抢！")]):t._e(),0==e.status?i("v-uni-text",[t._v("本场已结束，下次早点来哦！")]):t._e()],1),i("v-uni-view",{staticClass:"title-box-right flex"},[1==e.status?i("v-uni-text",{staticClass:"tip"},[t._v("距离结束")]):t._e(),2==e.status?i("v-uni-text",{staticClass:"tip"},[t._v("距离开始")]):t._e(),1==e.status||2==e.status?i("uni-countdown",{attrs:{color:"#F9F9F8","background-color":"#666666","show-day":!1,hour:e.stopTimeH,minute:e.stopTimeM,second:e.stopTimeS}}):t._e()],1)],1)],1),i("v-uni-scroll-view",{staticClass:"list",attrs:{"scroll-y":"true"},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.getList(t.classIndex)}}},[t._l(e.dataList,function(o,a){return i("v-uni-view",{key:a,staticClass:"goodsList-item flex"},[i("v-uni-image",{attrs:{src:o.image,"lazy-load":!0,mode:"scaleToFill"}}),i("v-uni-view",{staticClass:"goodsList-content"},[i("v-uni-view",{staticClass:"title clamp"},[i("v-uni-text",[t._v(t._s(o.title))])],1),i("v-uni-view",{staticClass:"slider flex"},[i("v-uni-view",{staticClass:"slider-box"},[i("v-uni-view",{staticClass:"slider-action",style:{width:o.percent+"%"}})],1),i("v-uni-view",{staticClass:"sales-nub"},[t._v("已抢"+t._s(o.percent+"%"))])],1),i("v-uni-view",{staticClass:"goods-money flex"},[i("v-uni-view",{staticClass:"money-box"},[i("v-uni-view",{staticClass:"money"},[i("v-uni-text",{staticClass:"font-size-sm"},[t._v("￥")]),t._v(t._s(o.price))],1),i("v-uni-view",{staticClass:"otMoney-box"},[i("v-uni-text",{staticClass:"otMoney"},[t._v("￥"+t._s(o.ot_price))])],1)],1),i("v-uni-view",{staticClass:"cart",class:{"seckill-action":1==e.status},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navProduct(e,a)}}},[t._v(t._s(1==e.status?"去抢购":2==e.status?"未开始":"已结束"))])],1)],1)],1)}),i("uni-load-more",{attrs:{status:e.loadingType}})],2)],1)}),1)],1)},n=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return n}),i.d(e,"a",function(){return o})},c890:function(t,e,i){var o=i("b025");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("cf583820",o,!0,{sourceMap:!1,shadowMode:!1})},cd3d:function(t,e,i){"use strict";i.r(e);var o=i("15f3"),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);e["default"]=a.a},dfc6:function(t,e,i){"use strict";i.r(e);var o=i("ba09"),a=i("51e9");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("885a");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"2f40c2ae",null,!1,o["a"],s);e["default"]=l.exports},e84e:function(t,e,i){"use strict";var o=i("5833"),a=i.n(o);a.a},fa1c:function(t,e,i){"use strict";var o,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-countdown"},[t.showDay?i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.d))]):t._e(),t.showDay?i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("天")]):t._e(),i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.h))]),i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"时"))]),i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.i))]),i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"分"))]),i("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.s))]),t.showColon?t._e():i("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("秒")])],1)},n=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return n}),i.d(e,"a",function(){return o})}}]);