(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-sign-index"],{1418:function(t,e,a){"use strict";var n=a("85cc"),i=a.n(n);i.a},2951:function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"title-box"},[a("v-uni-view",{staticClass:" title-conetnt  position-relative"},[a("v-uni-view",{staticClass:"title-img"},[a("v-uni-image",{attrs:{src:"/static/img/img08.png",mode:"aspectFit"}})],1),a("v-uni-view",{staticClass:"title-content-box"},[a("v-uni-view",{staticClass:"title-text"},[t._v("已连续签到")]),a("v-uni-view",{staticClass:"title-day-text"},[a("v-uni-text",{staticClass:"title-day"},[t._v(t._s(t.actionDay))]),a("v-uni-text",[t._v("天")])],1),a("v-uni-view",{staticClass:"title-button",class:{signAction:t.signTrue},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),!t.signTrue&&t.integral()}}},[t._v(t._s(t.signTrue?"已签到":"立即签到"))])],1)],1),a("v-uni-view",{staticClass:"title-tip"},[a("v-uni-text",[t._v("共获得"+t._s(t.sum_integral)+"积分,总签到"+t._s(t.allSign)+"天")])],1)],1),a("calendar",{staticClass:"sign-date-box",attrs:{checks:t.signList,checksClass:"",checkTextShow:!0,checksIcon:"/static/img/img07.png"}})],1)},c=[];a.d(e,"b",function(){return i}),a.d(e,"c",function(){return c}),a.d(e,"a",function(){return n})},"2ab0":function(t,e,a){"use strict";a.r(e);var n=a("2951"),i=a("cf0f");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("1418");var r,o=a("f0c5"),s=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"63cbf21d",null,!1,n["a"],r);e["default"]=s.exports},"31ca":function(t,e,a){"use strict";a.r(e);var n=a("d736"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);e["default"]=i.a},3362:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/uni-page-body[data-v-63cbf21d]{background:#f8f8f8}.sign-date-box[data-v-63cbf21d]{margin:%?25?%;border-radius:%?15?%;margin-top:%?-70?%}.title-box[data-v-63cbf21d]{background-color:#5dbc7c;padding-top:%?120?%;color:#fff;height:%?590?%}.title-box .title-conetnt[data-v-63cbf21d]{height:%?350?%;width:%?350?%;margin:0 auto;text-align:center}.title-box .title-conetnt .title-img[data-v-63cbf21d]{position:absolute;top:0;left:0;height:100%;width:100%}.title-box .title-conetnt .title-img uni-image[data-v-63cbf21d]{height:100%;width:100%}.title-box .title-conetnt .title-content-box[data-v-63cbf21d]{position:absolute;width:100%}.title-box .title-conetnt .title-content-box .title-day-text[data-v-63cbf21d]{padding:%?20?%;font-size:%?26?%}.title-box .title-conetnt .title-content-box .title-day-text .title-day[data-v-63cbf21d]{font-size:%?60?%}.title-box .title-conetnt .title-content-box .title-text[data-v-63cbf21d]{font-size:%?26?%;padding-top:%?100?%}.title-box .title-conetnt .title-content-box .title-button[data-v-63cbf21d]{background-color:#fe7e51;border-radius:%?99?%;width:%?200?%;height:%?64?%;margin:0 auto;line-height:%?64?%;text-align:center;font-size:%?28?%}.title-box .title-conetnt .title-content-box .title-button.signAction[data-v-63cbf21d]{background-color:#909399}.title-tip[data-v-63cbf21d]{color:#fff;font-size:%?26?%;padding-top:%?20?%;text-align:center;margin-top:%?-40?%}body.?%PAGE?%[data-v-63cbf21d]{background:#f8f8f8}',""])},"3c5e":function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"calendar__wrap"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"current-date"},[t._v(t._s(t.currentDate))])],1),a("v-uni-view",{staticClass:"body"},[a("v-uni-view",{staticClass:"weeks"},t._l(t.weeks,function(e){return a("v-uni-view",{key:e,staticClass:"week__item"},[t._v(t._s(e))])}),1),a("v-uni-view",{staticClass:"day__list"},t._l(t.dateData,function(e,n){return a("v-uni-view",{key:n,staticClass:"day__item"},["checked"===e?a("v-uni-view",{staticClass:"checked-box",class:[t.checksClass]},[t.checksIcon?a("v-uni-image",{attrs:{src:t.checksIcon,mode:"aspectFit"}}):a("v-uni-text",{staticClass:"checked iconfont iconfavor"}),t.checkTextShow?a("v-uni-view",{staticClass:"check_text"},[t._v(t._s(n))]):t._e()],1):a("v-uni-text",{staticClass:"current-box",class:[e===t.day?t.actionClass?t.actionClass:"current":""]},[t._v(t._s(e))])],1)}),1)],1)],1)},c=[];a.d(e,"b",function(){return i}),a.d(e,"c",function(){return c}),a.d(e,"a",function(){return n})},"408c":function(t,e,a){"use strict";a.r(e);var n=a("3c5e"),i=a("31ca");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("ea72");var r,o=a("f0c5"),s=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"14659788",null,!1,n["a"],r);e["default"]=s.exports},"64a8":function(t,e,a){var n=a("a20c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("1daea233",n,!0,{sourceMap:!1,shadowMode:!1})},"75fc":function(t,e,a){"use strict";a.r(e);var n=a("a745"),i=a.n(n);function c(t){if(i()(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}var r=a("774e"),o=a.n(r),s=a("c8bb"),d=a.n(s);function l(t){if(d()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return c(t)||l(t)||u()}a.d(e,"default",function(){return f})},8541:function(t,e,a){"use strict";var n=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a481");var i=n(a("e814"));a("28a5");var c=n(a("408c")),r=a("a064"),o={components:{calendar:c.default},data:function(){return{money:"",year:"",day:"",signList:[],actionDay:0,allSign:0,sum_integral:0,signTrue:!1}},onLoad:function(){this.signUser(),this.getData(),this.loadList()},methods:{getData:function(t){var e=t?new Date(t):new Date;this.year=e.getFullYear(),this.month=e.getMonth()+1,this.day=e.getDate()},signUser:function(){var t=this;(0,r.signUser)({all:1}).then(function(e){var a=e.data;t.actionDay=a.sign_num,t.allSign=a.sum_sgin_day,t.sum_integral=a.sum_integral})},integral:function(){var t=this;(0,r.integral)({}).then(function(e){t.signTrue=!0,t.actionDay++,t.signList.push(t.day),uni.showToast({title:"签到成功",duration:2e3,position:"top"})}).catch(function(t){console.log(t)})},loadList:function(){var t=this,e=this,a=(this.day,[]);(0,r.signList)({page:1,limit:31}).then(function(n){a=n.data.map(function(t,a){var n=t.add_time.split("-"),c=(0,i.default)(n[2].replace(/^0/i,"")),r=n[0],o=+n[1];if(e.year==r&&e.month==o)return c}),t.signList=a,a[0]==t.day&&(t.signTrue=!0)})}}};e.default=o},"85cc":function(t,e,a){var n=a("3362");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("31f1e238",n,!0,{sourceMap:!1,shadowMode:!1})},a064:function(t,e,a){"use strict";var n=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.signList=c,e.integral=r,e.signUser=o;var i=n(a("04c2"));function c(t){return(0,i.default)({url:"/api/sign/list",method:"get",data:t})}function r(t){return(0,i.default)({url:"/api/sign/integral",method:"post",data:t})}function o(t){return(0,i.default)({url:"/api/sign/user",method:"post",data:t})}},a20c:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/.calendar__wrap[data-v-14659788]{background-color:#fff;color:#333}.calendar__wrap .header[data-v-14659788]{padding:0 %?24?%}.calendar__wrap .header .current-date[data-v-14659788]{text-align:center;font-size:%?34?%;padding:%?32?% 0}.calendar__wrap .body .weeks[data-v-14659788]{display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?32?%;padding:%?10?% 0;background-color:#f4f7ff}.calendar__wrap .body .weeks .week__item[data-v-14659788]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.calendar__wrap .body .day__list[data-v-14659788]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.calendar__wrap .body .day__list .day__item[data-v-14659788]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:14.285%;text-align:center;padding:%?30?% 0;font-size:%?34?%;color:#909399}.calendar__wrap .body .day__list .day__item .checked-box[data-v-14659788],.calendar__wrap .body .day__list .day__item .current-box[data-v-14659788]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-radius:100%;box-sizing:border-box;position:relative}.calendar__wrap .body .day__list .day__item .check_text[data-v-14659788],.calendar__wrap .body .day__list .day__item .checked-box[data-v-14659788],.calendar__wrap .body .day__list .day__item .current-box[data-v-14659788],.calendar__wrap .body .day__list .day__item uni-image[data-v-14659788]{width:%?56?%;height:%?56?%;line-height:%?56?%}.calendar__wrap .body .day__list .day__item .check_text[data-v-14659788],.calendar__wrap .body .day__list .day__item uni-image[data-v-14659788]{position:absolute;top:0;left:0}.calendar__wrap .body .day__list .day__item .checked[data-v-14659788]{font-size:%?40?%;background-color:#3f9dff;color:#fff}.calendar__wrap .body .day__list .day__item .current[data-v-14659788]{padding:%?12?%;background-color:#5dbc7c;color:#fff;font-size:%?28?%}',""])},cf0f:function(t,e,a){"use strict";a.r(e);var n=a("8541"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);e["default"]=i.a},d736:function(t,e,a){"use strict";var n=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("6762"),a("2fdb");var i=n(a("75fc")),c={props:{checks:{type:Array,default:function(){return[]}},checksClass:{type:String,default:""},checksIcon:{type:String},checkTextShow:{type:Boolean,default:!1},actionClass:{type:String,default:""}},data:function(){var t=this.getDate(),e=t.year,a=t.month,n=t.day,i=this.getDateData(e,a);return{year:e,month:a,day:n,dateData:i,weeks:["日","一","二","三","四","五","六"]}},computed:{currentDate:function(){return"".concat(this.year,"-").concat(this.format(this.month))}},watch:{checks:function(t){var e=this.getDate(),a=e.year,n=e.month,i=this.getDateData(a,n);this.dateData=i}},methods:{getDate:function(t){var e=t?new Date(t):new Date,a=e.getFullYear(),n=e.getMonth()+1,i=e.getDate();return{year:a,month:n,day:i}},getDateData:function(t,e){var a=new Date("${year}/${month}/1"),n=a.getDay(),c=[].concat((0,i.default)(this.getEmptys(n)),(0,i.default)(this.getDays(n)));return c},getEmptys:function(t){var e=[];if(t)for(var a=0;a<t;a++)e.push("");return e},getLastDay:function(){var t=this.getDate(),e=t.year,a=t.month;a+=1,a>11&&(e+=1,a=1);var n=new Date("".concat(e,"/").concat(a,"/1")).getTime(),i=864e5,c=new Date(n-i).getDate();return c},getDays:function(){for(var t=this.getLastDay(),e=[],a=1;a<=t;a++)e.push(this.checks.includes(a)?"checked":a);return e},format:function(t){return t<10?"0".concat(t):t}}};e.default=c},ea72:function(t,e,a){"use strict";var n=a("64a8"),i=a.n(n);i.a}}]);