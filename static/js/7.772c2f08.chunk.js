(this["webpackJsonpdiscord-clone"]=this["webpackJsonpdiscord-clone"]||[]).push([[7,11],{115:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(12),c=n(8);function s(e,t){var n=Object(c.useState)(0),s=Object(a.a)(n,2),r=s[0],i=s[1],l=Object(c.useState)(!1),o=Object(a.a)(l,2),u=o[0],j=o[1],b=Object(c.useState)(0),d=Object(a.a)(b,2),h=d[0],O=d[1];return{handleTouchStart:function(e){i(e.targetTouches[0].clientX)},handleTouchMove:function(e){j(!0),O(e.targetTouches[0].clientX)},handleTouchEnd:function(){u&&(r-h>150&&e&&e(),r-h<150&&t&&t()),O(0),i(0),j(!1)}}}},116:function(e,t,n){"use strict";var a=n(8),c=n(128),s=n(6);t.a=function(e){var t=e.isVisible,n=e.isLeft,r=e.className,i=e.children,l=e.hide,o=n?"left-sidebar":"right-sidebar",u=Object(a.useRef)();return Object(c.useTransition)(t,{key:function(e){return e},from:{transform:n?"translate3d(-100%,0,0)":"translate3d(100%,0,0)"},enter:{transform:"translate3d(0%,0,0)"},leave:{transform:n?"translate3d(-100%,0,0)":"translate3d(100%,0,0)"},expires:0})((function(e,t,n,a){return t&&Object(s.jsx)(c.animated.div,{className:r?"".concat(r," ").concat(o):"".concat(o),onClick:l,children:Object(s.jsx)(c.animated.div,{className:"content-wrapper",ref:u,onClick:function(e){e.stopPropagation(),(e.target.closest("li")||e.target.closest("button"))&&l()},style:e,children:i})})}))}},141:function(e,t,n){"use strict";n.r(t);var a=n(15),c=n(12),s=n(56),r=n(8),i=n(36),l=n.n(i),o=n(115),u=n(114),j=n(102),b=n(116),d=n(118),h=(n(124),n(6)),O=["close","children"];t.default=function(e){var t=e.close,n=e.children,i=Object(s.a)(e,O),m=Object(r.useState)(!0),p=Object(c.a)(m,2),f=p[0],x=p[1],v=Object(r.useCallback)((function(){x(!1)}),[]),w=Object(r.useCallback)((function(){x(!0)}),[]),g=Object(o.a)(v,w),y=g.handleTouchStart,N=g.handleTouchMove,C=g.handleTouchEnd;return l.a.createPortal(Object(h.jsxs)("div",{className:"settings mobile",onTouchEnd:C,onTouchMove:N,onTouchStart:y,children:[Object(h.jsx)(b.a,{isLeft:!0,className:"sidebar-region",hide:v,isVisible:f,children:Object(h.jsx)("div",{className:"sidebar-scroller",children:Object(h.jsx)(u.a,Object(a.a)({},i))})}),Object(h.jsx)("div",{className:"content-region",children:Object(h.jsx)("div",{className:"content-transition-wrapper",children:Object(h.jsxs)("div",{className:"content-scroller",children:[Object(h.jsx)("main",{className:"content",children:n}),Object(h.jsx)("div",{className:"actions",children:Object(h.jsx)(j.a,{svg:d.a,onClick:t,className:"close-btn"})})]})})})]}),document.querySelector("body"))}},159:function(e,t,n){"use strict";var a=n(8),c=n(54),s=n(108),r=n(102),i=(n(135),n(126)),l=n(6);t.a=function(e){var t=e.showSettings,n=Object(a.useContext)(c.a).user;return Object(l.jsx)("section",{className:"user-info-panel",children:Object(l.jsxs)("div",{className:"ctn",children:[Object(l.jsx)(s.a,{img:n.photoURL,color:n.color}),Object(l.jsx)("div",{className:"name-tag",children:Object(l.jsx)("div",{className:"username-wrapper",children:n.displayName})}),Object(l.jsx)("div",{className:"btn-ctn",children:Object(l.jsx)(r.a,{svg:i.a,onClick:t})})]})})}},160:function(e,t,n){"use strict";n(8);var a=n(108),c=(n(161),n(6));t.a=function(e){var t=e.channel;return Object(c.jsxs)("div",{className:"channel-info-card default_transition",children:[Object(c.jsx)("header",{children:Object(c.jsxs)("div",{className:"channel-main-info",children:[Object(c.jsx)(a.a,{img:t.icon,channelName:t.name}),Object(c.jsx)("div",{className:"channel-name-wrapper",children:t.name})]})}),Object(c.jsx)("div",{className:"content",children:Object(c.jsx)("div",{className:"channel-desc-wrapper",children:t.description})})]})}},161:function(e,t,n){},162:function(e,t,n){"use strict";n(8);var a=n(6);t.a=function(e){var t=e.icon,n=e.text,c=e.className,s=e.style,r=e.onClick;return Object(a.jsxs)("button",{type:"button",className:c?"".concat(c," nav-btn"):"nav-btn",style:s,onClick:r,children:[Object(a.jsx)("div",{className:"icon-wrapper",children:Object(a.jsx)("img",{src:t,alt:n})}),Object(a.jsx)("div",{className:"text-wrapper",children:n})]})}},163:function(e,t,n){"use strict";n(8);var a=n(16),c=n(157),s=(n(136),n(137)),r=n(138),i=n(123),l=n(139),o=n(6);t.a=function(e){var t=e.beginCreateChannel,n=e.isCreateChannel,u=e.visitingChannel,j=Object(a.e)();return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("nav",{id:"main-nav",children:[Object(o.jsx)(s.a,{visitingChannel:u}),Object(o.jsxs)("div",{className:"scroller",children:[Object(o.jsx)(c.a,{}),Object(o.jsxs)("div",{className:"btn-ctn",children:[Object(o.jsx)(r.a,{svg:i.a,active:n,onClick:t,tooltipText:"Create a channel"}),Object(o.jsx)(r.a,{svg:l.a,active:j.location.pathname.includes("explore"),onClick:function(){return j.push("/explore")},tooltipText:"Explore public channels"})]})]})]})})}},168:function(e,t,n){"use strict";t.a=n.p+"static/media/arrow-left-s-line.27e63cb8.svg"},169:function(e,t,n){"use strict";t.a=n.p+"static/media/arrow-right-s-line.5e3e4e57.svg"},170:function(e,t,n){},183:function(e,t,n){"use strict";n(8);var a=n.p+"static/media/search-line.9477a86b.svg",c=n(62),s=n(127),r=n(6);t.a=function(e){var t=e.query,n=e.onSearch,i=e.handleChange,l=e.cancelSearch;return Object(r.jsxs)("div",{className:"container",style:{backgroundImage:"url(".concat(c.a,")")},children:[Object(r.jsx)("h3",{children:"Find your community on bread"}),Object(r.jsx)("div",{className:"subheader",children:"From gaming, to music, to learning, there's a place for you"}),Object(r.jsx)("div",{className:"search",children:Object(r.jsxs)("div",{className:"searchBar",children:[Object(r.jsx)("div",{className:"input-wrapper",children:Object(r.jsx)("input",{type:"text",value:t,onKeyUp:function(e){"Enter"===e.key&&n()},onChange:i})}),t?Object(r.jsx)("img",{src:s.a,alt:"cancel search",className:"icon-btn",onClick:l}):Object(r.jsx)("img",{src:a,alt:"search"})]})})]})}},184:function(e,t,n){"use strict";var a=n(0),c=n.n(a),s=n(2),r=n(12),i=n(8),l=n(18),o=n(30),u=n(141),j=n(15),b=n(43),d=n(54),h=n(166),O=n(142),m=n(143),p=n(144),f=n(117),x=n(112),v=n(6),w=function(){var e=Object(i.useContext)(d.a),t=e.user,n=e.setUser,a=Object(i.useContext)(o.a).setError,u=Object(i.useContext)(d.a).channelList,w=Object(i.useState)(),g=Object(r.a)(w,2),y=g[0],N=g[1],C=Object(b.a)(),k=C.inputValues,S=C.handleChange,T=C.resetInputValues,_=Object(i.useCallback)((function(){N({title:"Change your username",subheader:"Enter a new username and your existing password",fields:[{label:"username",name:"new_username",type:"text"},{label:"current password",name:"current_password",type:"password"}],inputsToSubmit:"new_username"})}),[]),E=Object(i.useCallback)(Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.l)("displayName",k.new_username,n,u);case 2:case"end":return e.stop()}}),e)}))),[k.new_username,n,u]),M=Object(i.useCallback)((function(){N({title:"Enter an email address",subheader:"Enter a new email address and your existing password",fields:[{label:"email",name:"new_email",type:"email"},{label:"current password",name:"current_password",type:"password"}],inputsToSubmit:"new_email"})}),[]),L=Object(i.useCallback)(Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.l)("email",k.new_email,n);case 2:case"end":return e.stop()}}),e)}))),[k.new_email,n]),A=Object(i.useCallback)((function(){N({title:"Enter an email address",subheader:"Enter your current password and a new password",fields:[{label:"current password",name:"current_password",type:"password"},{label:"new password",name:"new_password",type:"password"},{label:"confirm new password",name:"confirm_password",type:"password"}],inputsToSubmit:"new_password"})}),[]),F=Object(i.useCallback)(Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.l)("password",k.new_password);case 2:case"end":return e.stop()}}),e)}))),[k.new_password]),R=Object(i.useCallback)((function(){N({title:"Delete Account",subheader:"Are you sure you want to delete your account? This will immediately log you out of your account and you will not be able to log in again. Forever.",fields:[{label:"password",name:"password",type:"password"}],actionBtnText:"Delete Account",inputsToSubmit:"delete",cleanUp:function(){return""}})}),[]),V=Object(i.useCallback)((function(){return Object(l.g)(u,a)}),[u,a]),P=Object(i.useCallback)((function(){switch(null===y||void 0===y?void 0:y.inputsToSubmit){case"new_username":return E;case"new_email":return L;case"new_password":return F;case"delete":return V}}),[E,F,L,V,null===y||void 0===y?void 0:y.inputsToSubmit]);return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("section",{className:"my_account",children:[Object(v.jsx)("header",{children:Object(v.jsx)("h2",{children:"My Account"})}),Object(v.jsxs)("div",{className:"inner-content",children:[Object(v.jsxs)("div",{className:"field-list",children:[Object(v.jsx)(h.a,{item:"username",display:t.displayName,onClick:_}),Object(v.jsx)(h.a,{item:"email",display:t.email,onClick:M})]}),Object(v.jsx)(O.a,{}),Object(v.jsx)(m.a,{editPassword:A}),Object(v.jsx)(O.a,{}),Object(v.jsx)(p.a,{deleteAcc:R})]})]}),y&&Object(v.jsx)(f.a,{close:function(){N(),T()},children:Object(v.jsx)(x.a,Object(j.a)(Object(j.a)({close:function(){N(),T()},handleChange:S,className:"settings-popup"},y),{},{submitAction:P(),isMobile:!0,inputValues:k,setError:a}))})]})},g=n(158),y=n(58);t.a=function(e){var t=e.close,n=Object(i.useContext)(o.a).SetError,a=Object(i.useReducer)((function(e,t){if("swap_to"===t.type)switch(t.payload){case"my account":return"my account";case"user profile":return"user profile";case"log out":!function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(l.f)();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),n(e.t0.message);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}()();break;default:throw new y.a("that doesn't exist!")}}),"my account"),j=Object(r.a)(a,2),b=j[0],d=j[1];return Object(v.jsx)(u.default,{close:t,categories:["user settings","none"],btnList:[N("my account","user settings"),N("user profile","user settings"),N("log out","none")],dispatch:d,children:b&&{"my account":Object(v.jsx)(w,{editProfile:function(){return d({type:"swap_to",payload:"user profile"})}}),"user profile":Object(v.jsx)(g.a,{isMobile:!0})}[b]})};function N(e,t){return{text:e,category:t}}},376:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),s=n(2),r=n(12),i=n(8),l=n(38),o=n(30),u=n(42),j=n(115),b=n(114),d=n(159),h=n(160),O=n(162),m=n(183),p=n(63),f=n(163),x=n(116),v=n(156),w=n(184),g=n(168),y=n(169),N=(n(170),n(6));t.default=function(e){var t=e.finishLoading,n=Object(i.useContext)(o.a).setError,a=Object(i.useState)([]),C=Object(r.a)(a,2),k=C[0],S=C[1],T=Object(i.useRef)(null),_=Object(i.useState)(),E=Object(r.a)(_,2),M=E[0],L=E[1],A=Object(i.useRef)(),F=Object(i.useState)(!1),R=Object(r.a)(F,2),V=R[0],P=R[1],D=Object(i.useRef)(),U=Object(i.useState)(!0),q=Object(r.a)(U,2),B=q[0],I=q[1],J=Object(i.useState)(!1),X=Object(r.a)(J,2),G=X[0],H=X[1];Object(i.useEffect)((function(){return t()}),[t]);var K=Object(i.useCallback)(function(){var e=Object(s.a)(c.a.mark((function e(t,a){var s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,I(!0),e.next=4,Object(u.k)(t,a);case 4:(s=e.sent)&&"init"===t&&(T.current=s[0].id),S(s),I(!1),D.current&&(D.current.scrollTop=0),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),n(e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,n){return e.apply(this,arguments)}}(),[n]);Object(i.useEffect)((function(){K("init")}),[K,n]);var z=Object(i.useCallback)(Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(I(!0),e.prev=1,M){e.next=8;break}return L(""),P(!1),e.next=7,K("init");case 7:return e.abrupt("return",e.sent);case 8:return e.next=10,Object(u.m)(M);case 10:t=e.sent,A.current=M,I(!1),P(!0),S(t),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(1),console.error(e.t0),n(e.t0.message);case 21:case"end":return e.stop()}}),e,null,[[1,17]])}))),[M,K,n]),Q=Object(i.useCallback)((function(){H(!0)}),[]),W=Object(i.useCallback)((function(){H(!1)}),[]),Y=Object(j.a)(W,Q),Z=Y.handleTouchStart,$=Y.handleTouchMove,ee=Y.handleTouchEnd,te=Object(i.useState)(!1),ne=Object(r.a)(te,2),ae=ne[0],ce=ne[1],se=Object(i.useState)(!1),re=Object(r.a)(se,2),ie=re[0],le=re[1];return Object(N.jsxs)(N.Fragment,{children:[ae&&Object(N.jsx)(v.a,{isMobile:!0,close:function(){return ce(!1)}}),ie&&Object(N.jsx)(w.a,{close:function(){return le(!1)}}),Object(N.jsxs)("div",{className:"explore-view mobile",onTouchStart:Z,onTouchMove:$,onTouchEnd:ee,children:[Object(N.jsxs)(x.a,{isLeft:!0,className:"nav-ctn mobile",hide:W,isVisible:G,children:[Object(N.jsx)(f.a,{beginCreateChannel:function(){return ce(!0)},isCreateChannel:ae}),Object(N.jsxs)("nav",{className:"sidebar view-sidebar",children:[Object(N.jsx)("header",{children:Object(N.jsx)("h2",{children:"Discover"})}),Object(N.jsx)(b.a,{btnList:[{text:"Home",isDefault:!0},{text:"Gaming"},{text:"Technology"}]}),Object(N.jsx)(d.a,{showSettings:function(){return le(!0)}})]})]}),Object(N.jsxs)("main",{children:[Object(N.jsx)("header",{children:Object(N.jsx)(m.a,{onSearch:z,handleChange:function(e){return L(e.target.value)},cancelSearch:function(){P(!1),L(""),K("init")},query:M})}),Object(N.jsxs)("div",{className:"content",children:[V?Object(N.jsx)("div",{className:"text-wrapper",children:Object(N.jsxs)("h3",{children:["Search results for: \u201c",A.current,"\u201d"]})}):Object(N.jsx)("div",{className:"page-navigation",children:Object(N.jsxs)("div",{className:"btn-ctn",children:[Object(N.jsx)(O.a,{icon:g.a,text:"Prev",className:k?k.find((function(e){return e.id===T.current}))?"default_transition inactive":"default_transition":"default_transition inactive",onClick:function(){return K("prev",k[0].id)}}),Object(N.jsx)(O.a,{icon:y.a,text:"Next",className:k?k.length%20!==0||0===k.length?"flex-reverse default_transition inactive":"flex-reverse default_transition":"flex-reverse default_transition inactive",onClick:function(){return K("next",k[k.length-1].id)}})]})}),Object(N.jsx)("div",{className:"publicChannels-ctn",children:B?Object(N.jsx)(p.a,{}):Object(N.jsx)("div",{className:"scroller",ref:D,children:Object(N.jsx)("div",{className:"scroller-content",children:Object(N.jsx)("ol",{children:k&&k.map((function(e){return Object(N.jsx)(l.b,{to:"/channels/".concat(e.id),children:Object(N.jsx)(h.a,{channel:e})},e.id)}))})})})})]})]})]})]})}}}]);
//# sourceMappingURL=7.772c2f08.chunk.js.map