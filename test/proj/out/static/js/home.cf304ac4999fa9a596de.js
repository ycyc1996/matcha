(window.webpackJsonp=window.webpackJsonp||[]).push([["home"],{"../../dist/src/isomorphic/controller.js":
/*!*********************************************************************************!*\
  !*** /Users/yangyichen/Desktop/Github/matcha/dist/src/isomorphic/controller.js ***!
  \*********************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){this.ssr=!1,this.pageId=0,this.store=null,console.log("constructor"),console.log(e)};t.default=r},"../../isomorphic/controller.js":
/*!************************************************************************!*\
  !*** /Users/yangyichen/Desktop/Github/matcha/isomorphic/controller.js ***!
  \************************************************************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! ../dist/src/isomorphic/controller */"../../dist/src/isomorphic/controller.js"),o=n.n(r);t.default=o.a},"./src/home/controller.js":
/*!********************************!*\
  !*** ./src/home/controller.js ***!
  \********************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var r=n(/*! @babel/runtime/regenerator */"../../node_modules/@babel/runtime/regenerator/index.js"),o=n.n(r),s=n(/*! @babel/runtime/helpers/asyncToGenerator */"../../node_modules/@babel/runtime/helpers/asyncToGenerator.js"),c=n.n(s),a=n(/*! @babel/runtime/helpers/classCallCheck */"../../node_modules/@babel/runtime/helpers/classCallCheck.js"),u=n.n(a),i=n(/*! @babel/runtime/helpers/assertThisInitialized */"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js"),l=n.n(i),m=n(/*! @babel/runtime/helpers/inherits */"../../node_modules/@babel/runtime/helpers/inherits.js"),f=n.n(m),p=n(/*! @babel/runtime/helpers/possibleConstructorReturn */"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"),d=n.n(p),h=n(/*! @babel/runtime/helpers/getPrototypeOf */"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js"),b=n.n(h),g=n(/*! @babel/runtime/helpers/defineProperty */"../../node_modules/@babel/runtime/helpers/defineProperty.js"),y=n.n(g),j=n(/*! matcha/isomorphic/controller */"../../isomorphic/controller.js"),v=n(/*! ./model */"./src/home/model.js"),E=n(/*! ./view */"./src/home/view.jsx");function O(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=b()(e);if(t){var o=b()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return d()(this,n)}}var w=function(e){f()(n,e);var t=O(n);function n(){var e;u()(this,n);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return e=t.call.apply(t,[this].concat(s)),y()(l()(e),"name","home page!!!!!!!"),y()(l()(e),"ssr",!0),y()(l()(e),"pageId",10001),y()(l()(e),"View",E.default),y()(l()(e),"Model",{initialState:v.initialState,actions:v.actions}),y()(l()(e),"afterRender",c()(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:setTimeout((function(){e.store.getDispatchers().UPDATE_MESSAGES(["hello world!  —— "+new Date,"hi yichenyang!  —— "+new Date,"yo matcha!  —— "+new Date])}),1e3);case 1:case"end":return t.stop()}}),t)})))),y()(l()(e),"submitForm",c()(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("1213"),alert(JSON.stringify(e.store.getState().form));case 2:case"end":return t.stop()}}),t)})))),e}return n}(j.default)},"./src/home/model.js":
/*!***************************!*\
  !*** ./src/home/model.js ***!
  \***************************/
/*! exports provided: initialState, actions */function(e,t,n){"use strict";n.r(t),n.d(t,"initialState",(function(){return i})),n.d(t,"actions",(function(){return l}));var r=n(/*! @babel/runtime/helpers/toConsumableArray */"../../node_modules/@babel/runtime/helpers/toConsumableArray.js"),o=n.n(r),s=n(/*! @babel/runtime/helpers/defineProperty */"../../node_modules/@babel/runtime/helpers/defineProperty.js"),c=n.n(s);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var i={count:0,form:{name:"",age:""},messages:[]},l={INCREMENT_COUNT:function(e){return u(u({},e),{},{count:e.count+1})},RESET_COUNT:function(e){return u(u({},e),{},{count:0})},UPDATE_FORM_DATA:function(e,t){return u(u({},e),{},{form:u(u({},e.form),t)})},UPDATE_MESSAGES:function(e,t){return u(u({},e),{},{messages:o()(t)})}}},"./src/home/view.jsx":
/*!***************************!*\
  !*** ./src/home/view.jsx ***!
  \***************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! react */"./node_modules/react/index.js"),o=n.n(r),s=function(e){var t=e.messages,n=void 0===t?[]:t;return o.a.createElement("ul",null,n.map((function(e){return o.a.createElement("li",{key:e},e)})))};t.default=function(e){var t=e.state,n=e.dispatchers,r=e.ctrl;console.log(r);return o.a.createElement("div",{id:"app-root"},o.a.createElement("h1",null,"my home"),o.a.createElement("h2",null,"count: ",t.count),o.a.createElement("div",{onClick:function(){console.log("click"),n.INCREMENT_COUNT()}},"click me!!!!"),o.a.createElement("br",null),o.a.createElement(s,{messages:t.messages}),o.a.createElement("br",null),o.a.createElement("input",{type:"text",value:t.form.name,onChange:function(e){return n.UPDATE_FORM_DATA({name:e.target.value})}}),o.a.createElement("br",null),o.a.createElement("input",{type:"text",value:t.form.age,onChange:function(e){return n.UPDATE_FORM_DATA({age:e.target.value})}}),o.a.createElement("br",null),o.a.createElement("button",{onClick:r.submitForm},"submit"))}}}]);
//# sourceMappingURL=home.cf304ac4999fa9a596de.js.map