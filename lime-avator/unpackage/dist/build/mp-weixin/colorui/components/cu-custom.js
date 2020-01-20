(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"117b":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,e=this.bgImage,a="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(a="".concat(a,"background-image:url(").concat(e,");")),a}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){if(getCurrentPages().length<2&&"undefined"!==typeof __wxConfig){var n="/"+__wxConfig.pages[0];return t.redirectTo({url:n})}t.navigateBack({delta:1})}}};n.default=e}).call(this,e("543d")["default"])},"3b4b":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})},7263:function(t,n,e){"use strict";e.r(n);var a=e("3b4b"),u=e("87b7");for(var r in u)"default"!==r&&function(t){e.d(n,t,function(){return u[t]})}(r);var o=e("2877"),c=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports},"87b7":function(t,n,e){"use strict";e.r(n);var a=e("117b"),u=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7263"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);                
