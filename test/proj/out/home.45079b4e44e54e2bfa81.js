exports.ids=[1],exports.modules=[,,function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return C}));var r=n(13),o=n.n(r),c=n(15),a=n.n(c),u=n(7),i=n.n(u),s=n(3),l=n.n(s),f=n(8),m=n.n(f),p=n(9),g=n.n(p),E=n(10),h=n.n(E),y=n(4),v=n.n(y),O=n(5),b=n(18),d=n.n(b);function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){v()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var P={count:0,form:{name:"",age:""},messages:[]},T={INCREMENT_COUNT:function(e){return w(w({},e),{},{count:e.count+1})},RESET_COUNT:function(e){return w(w({},e),{},{count:0})},UPDATE_FORM_DATA:function(e,t){return w(w({},e),{},{form:w(w({},e.form),t)})},UPDATE_MESSAGES:function(e,t){return w(w({},e),{},{messages:d()(t)})}},A=n(12),S=n.n(A),_=function(e){var t=e.messages,n=void 0===t?[]:t;return S.a.createElement("ul",null,n.map((function(e){return S.a.createElement("li",{key:e},e)})))},j=function(e){var t=e.state,n=e.dispatchers,r=e.ctrl;console.log(r);return S.a.createElement("div",{id:"app-root"},S.a.createElement("h1",null,"my home"),S.a.createElement("h2",null,"count: ",t.count),S.a.createElement("div",{onClick:function(){console.log("click"),n.INCREMENT_COUNT()}},"click me!!!!"),S.a.createElement("br",null),S.a.createElement(_,{messages:t.messages}),S.a.createElement("br",null),S.a.createElement("input",{type:"text",value:t.form.name,onChange:function(e){return n.UPDATE_FORM_DATA({name:e.target.value})}}),S.a.createElement("br",null),S.a.createElement("input",{type:"text",value:t.form.age,onChange:function(e){return n.UPDATE_FORM_DATA({age:e.target.value})}}),S.a.createElement("br",null),S.a.createElement("button",{onClick:r.submitForm},"submit"))};function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var o=h()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g()(this,n)}}var C=function(e){m()(n,e);var t=R(n);function n(){var e;i()(this,n);for(var r=arguments.length,c=new Array(r),u=0;u<r;u++)c[u]=arguments[u];return e=t.call.apply(t,[this].concat(c)),v()(l()(e),"name","home page!!!!!!!"),v()(l()(e),"ssr",!0),v()(l()(e),"pageId",10001),v()(l()(e),"View",j),v()(l()(e),"Model",{initialState:P,actions:T}),v()(l()(e),"afterRender",a()(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:setTimeout((function(){e.store.getDispatchers().UPDATE_MESSAGES(["hello world!  —— "+new Date,"hi yichenyang!  —— "+new Date,"yo matcha!  —— "+new Date])}),1e3);case 1:case"end":return t.stop()}}),t)})))),v()(l()(e),"submitForm",a()(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("1213"),alert(JSON.stringify(e.store.getState().form));case 2:case"end":return t.stop()}}),t)})))),e}return n}(O.a)},,,function(e,t,n){"use strict";var r=n(6),o=n.n(r);t.a=o.a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){this.ssr=!1,this.pageId=0,this.store=null,console.log("constructor"),console.log(e)};t.default=r}];
//# sourceMappingURL=home.45079b4e44e54e2bfa81.js.map