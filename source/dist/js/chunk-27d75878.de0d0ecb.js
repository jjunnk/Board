(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27d75878"],{1681:function(t,e,a){},7463:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-sheet",[a("v-textarea",{model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),a("v-btn",{on:{click:t.read}},[t._v("read")]),a("v-btn",{on:{click:t.write}},[t._v("write")])],1)},r=[],s=(a("96cf"),a("1da1")),o=a("bc3a"),i=a.n(o),u={data:function(){return{text:"",url:""}},methods:{write:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$firebase.storage().ref().child("xxx.text").putString("abcd");case 2:return a=e.sent,e.next=5,a.ref.getDownloadURL();case 5:n=e.sent,t.url=n;case 7:case"end":return e.stop()}}),e)})))()},read:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(t.url);case 2:a=e.sent,console.log(a),t.text=a.data;case 5:case"end":return e.stop()}}),e)})))()}}},c=u,l=a("2877"),h=a("6544"),p=a.n(h),d=a("8336"),w=a("8dd9"),x=a("a844"),g=Object(l["a"])(c,n,r,!1,null,null,null);e["default"]=g.exports;p()(g,{VBtn:d["a"],VSheet:w["a"],VTextarea:x["a"]})},a844:function(t,e,a){"use strict";a("1681");var n=a("8654"),r=a("58df");const s=Object(r["a"])(n["a"]);e["a"]=s.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...n["a"].options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout(()=>{this.autoGrow&&this.calculateInputHeight()},0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"},genInput(){const t=n["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){n["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})}}]);
//# sourceMappingURL=chunk-27d75878.de0d0ecb.js.map