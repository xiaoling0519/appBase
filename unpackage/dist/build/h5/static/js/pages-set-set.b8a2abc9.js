(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-set"],{"72cb":function(t,e,n){"use strict";n.r(e);var i=n("bb34"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"7a47":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("uni-list",[n("uni-list-item",{attrs:{title:"个人资料"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/userinfo/userinfo")}}}),n("uni-list-item",{attrs:{title:"修改密码"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/set/password")}}}),n("uni-list-item",{attrs:{title:"实名认证"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/address/address")}}}),n("uni-list-item",{attrs:{title:"收货地址"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/address/address")}}})],1),n("uni-list",{staticClass:"margin-t-20"},[n("uni-list-item",{attrs:{title:"消息推送","switch-checked":!0,"show-switch":!0,"show-arrow":!1,"switch-color":"#5dbc7c"},on:{switchChange:function(e){arguments[0]=e=t.$handleEvent(e),t.switchChange.apply(void 0,arguments)}}})],1),n("uni-list",{staticClass:"margin-t-20"},[n("uni-list-item",{attrs:{title:"清除缓存"}}),n("uni-list-item",{attrs:{title:"检查更新"}},[n("template",{slot:"right"},[t._v("当前版本 1.0.3")])],2)],1),n("v-uni-view",{staticClass:"list-cell log-out-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toLogout.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("退出登录")])],1)],1)},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},"88cf":function(t,e,n){"use strict";var i=n("d6de"),a=n.n(i);a.a},"99d4":function(t,e,n){"use strict";n.r(e);var i=n("7a47"),a=n("72cb");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("88cf");var s,l=n("f0c5"),c=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"46e3d7ad",null,!1,i["a"],s);e["default"]=c.exports},bb34:function(t,e,n){"use strict";var i=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("cebc")),o=i(n("b6ea")),s=i(n("62be")),l=n("f02f"),c=n("2f62"),u={components:{uniList:o.default,uniListItem:s.default},data:function(){return{}},methods:(0,a.default)({},(0,c.mapMutations)("user",["logout"]),{navTo:function(t){uni.navigateTo({url:t})},toLogout:function(){var t=this;uni.showModal({content:"确定要退出登录么",success:function(e){e.confirm&&((0,l.logout)({}).then(function(t){uni.navigateBack()}).catch(function(t){console.log(t)}),t.logout())}})},switchChange:function(t){console.log(t);var e=t.value?"打开":"关闭";this.$api.msg("".concat(e,"消息推送"))}})};e.default=u},d6de:function(t,e,n){var i=n("f4fe");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("0ec30674",i,!0,{sourceMap:!1,shadowMode:!1})},f02f:function(t,e,n){"use strict";var i=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.userEdit=o,e.logout=s,e.registerReset=l,e.binding=c;var a=i(n("04c2"));function o(t){return(0,a.default)({url:"/api/user/edit",method:"post",data:t})}function s(t){return(0,a.default)({url:"/api/logout",method:"get",data:t})}function l(t){return(0,a.default)({url:"/api/register/reset",method:"post",data:t})}function c(t){return(0,a.default)({url:"/api/binding",method:"post",data:t})}},f4fe:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/*颜色*/\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 功能栏字体大小 */\n/*功能栏左侧小图标*/uni-page-body[data-v-46e3d7ad]{background:#f8f8f8}.list-cell[data-v-46e3d7ad]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;position:relative;background:#fff;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.list-cell.log-out-btn[data-v-46e3d7ad]{margin-top:%?40?%}.list-cell.log-out-btn .cell-tit[data-v-46e3d7ad]{color:#dd524d;text-align:center;margin-right:0}.list-cell .cell-tit[data-v-46e3d7ad]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133;margin-right:%?10?%}.list-cell .cell-tip[data-v-46e3d7ad]{font-size:%?28?%;color:#909399}.list-cell uni-switch[data-v-46e3d7ad]{-webkit-transform:translateX(%?16?%) scale(.84);transform:translateX(%?16?%) scale(.84)}body.?%PAGE?%[data-v-46e3d7ad]{background:#f8f8f8}',""])}}]);