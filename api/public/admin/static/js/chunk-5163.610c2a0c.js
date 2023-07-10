(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5163"],{"1gFr":function(t,e,a){"use strict";var i=a("9G9M");a.n(i).a},"9G9M":function(t,e,a){},E61J:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(a("JRSX")),s=r(a("RihV")),n=a("SPtI"),o=a("7Qib");function r(t){return t&&t.__esModule?t:{default:t}}e.default={name:"StatisticsAgeAndSexList",components:{PlotDonut:i.default,PlotPie:s.default},data:function(){return{listLoading:!1,options:[],provinceOptions:[],platformsOptions:[],analyze_loading:!1,genderType:0,genderTypeData:[{value:0,lable:this.$t("statistics.user.active_user_number")},{value:1,lable:this.$t("statistics.user.new_number_of_users")}],genderDate:1,genderData:[],agesData:[],gender:[{value:1,lable:this.$t("statistics.visit.yesterday")},{value:7,lable:this.$t("statistics.visit.recently",{number:7})},{value:30,lable:this.$t("statistics.visit.recently",{number:30})}],genderShowDate:"",province_loading:!1,provinceType:0,provinceTypeData:[{value:0,lable:this.$t("statistics.user.active_user_number")},{value:1,lable:this.$t("statistics.user.new_number_of_users")}],provinceDate:1,provinceData:[],cityData:[],province:[{value:1,lable:this.$t("statistics.visit.yesterday")},{value:7,lable:this.$t("statistics.visit.recently",{number:7})},{value:30,lable:this.$t("statistics.visit.recently",{number:30})}],provinceShowDate:"",platforms_loading:!1,platformsType:0,platformsTypeData:[{value:0,lable:this.$t("statistics.user.active_user_number")},{value:1,lable:this.$t("statistics.user.new_number_of_users")}],platformsDate:1,platformsData:[],devicesData:[],platforms:[{value:1,lable:this.$t("statistics.visit.yesterday")},{value:7,lable:this.$t("statistics.visit.recently",{number:7})},{value:30,lable:this.$t("statistics.visit.recently",{number:30})}],platformsShowDate:""}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,this.genderShowDate=(0,o.getBeforeDate)(this.genderDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),this.provinceShowDate=(0,o.getBeforeDate)(this.provinceDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),this.platformsShowDate=(0,o.getBeforeDate)(this.platformsDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),(0,n.age_and_sex)().then(function(e){t.platformsOptions=t.provinceOptions=t.options=e.data,t.genderData=t.options.visit_uv.genders,t.agesData=t.options.visit_uv.ages,t.provinceData=t.provinceOptions.visit_uv.province,t.cityData=t.provinceOptions.visit_uv.city,t.platformsData=t.platformsOptions.visit_uv.platforms,t.devicesData=t.platformsOptions.visit_uv.devices,t.listLoading=!1})},getGender:function(){var t=this;this.analyze_loading=!0,this.genderShowDate=(0,o.getBeforeDate)(this.genderDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),(0,n.age_and_sex)({date:this.genderDate}).then(function(e){t.options=e.data,0===t.genderType?(t.genderData=t.options.visit_uv.genders,t.agesData=t.options.visit_uv.ages):(t.genderData=t.options.visit_uv_new.genders,t.agesData=t.options.visit_uv_new.ages),t.analyze_loading=!1})},getProvince:function(){var t=this;this.province_loading=!0,this.provinceShowDate=(0,o.getBeforeDate)(this.provinceDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),(0,n.age_and_sex)({date:this.provinceDate}).then(function(e){t.provinceOptions=e.data,0===t.provinceType?(t.provinceData=t.provinceOptions.visit_uv.province,t.cityData=t.provinceOptions.visit_uv.city):(t.provinceData=t.provinceOptions.visit_uv_new.province,t.cityData=t.provinceOptions.visit_uv_new.city),t.province_loading=!1})},getPlatforms:function(){var t=this;this.platforms_loading=!0,this.platformsShowDate=(0,o.getBeforeDate)(this.platformsDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),(0,n.age_and_sex)({date:this.platformsDate}).then(function(e){t.platformsOptions=e.data,0===t.platformsType?(t.platformsData=t.platformsOptions.visit_uv.platforms,t.devicesData=t.platformsOptions.visit_uv.devices):(t.platformsData=t.platformsOptions.visit_uv_new.platforms,t.devicesData=t.platformsOptions.visit_uv_new.devices),t.platforms_loading=!1})},setDate:function(t){"genderType"===t?(this.analyze_loading=!0,0===this.genderType?(this.genderData=this.options.visit_uv.genders,this.agesData=this.options.visit_uv.ages):(this.genderData=this.options.visit_uv_new.genders,this.agesData=this.options.visit_uv_new.ages),this.analyze_loading=!1):"genderDate"===t?(this.genderShowDate=(0,o.getBeforeDate)(this.genderDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),this.getGender()):"provinceType"===t?(this.province_loading=!0,0===this.provinceType?(this.provinceData=this.provinceOptions.visit_uv.province,this.cityData=this.provinceOptions.visit_uv.city):(this.provinceData=this.provinceOptions.visit_uv_new.province,this.cityData=this.provinceOptions.visit_uv_new.city),this.province_loading=!1):"provinceDate"===t?(this.provinceShowDate=(0,o.getBeforeDate)(this.provinceDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),this.getProvince()):"platformsType"===t?(this.platforms_loading=!0,0===this.platformsType?(this.platformsData=this.platformsOptions.visit_uv.platforms,this.devicesData=this.platformsOptions.visit_uv.devices):(this.platformsData=this.platformsOptions.visit_uv_new.platforms,this.devicesData=this.platformsOptions.visit_uv_new.devices),this.platforms_loading=!1):"platformsDate"===t&&(this.platformsShowDate=(0,o.getBeforeDate)(this.platformsDate)+this.$t("common.to")+(0,o.getBeforeDate)(1),this.getPlatforms())}}}},HlQm:function(t,e,a){"use strict";var i=a("w+mM");a.n(i).a},JRSX:function(t,e,a){"use strict";a.r(e);var i=a("rNAP"),s=a("hXVX");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("1gFr");var o=a("KHd+"),r=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);r.options.__file="Donut.vue",e.default=r.exports},"P+xe":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("ma/q");e.default={props:{charData:{type:Array,default:function(){return{data:[]}}},width:{type:Number,default:1200},height:{type:Number,default:500},id:{type:String,required:!0},title:{type:String,default:null}},data:function(){return{donutPlot:null,ds:null,dv:null}},watch:{charData:function(t,e){this.drawChart(t)}},methods:{drawChart:function(){var t=this.charData;this.donutPlot&&this.donutPlot.destroy(),this.donutPlot=new i.Donut(this.id,{height:this.height,width:this.width,title:{visible:!0,text:this.title},forceFit:!0,radius:.8,padding:"auto",data:t,angleField:"value",colorField:"name",statistic:{visible:!1}}),this.donutPlot.render()}}}},RihV:function(t,e,a){"use strict";a.r(e);var i=a("XztG"),s=a("tT1R");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("HlQm");var o=a("KHd+"),r=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);r.options.__file="Pie.vue",e.default=r.exports},SPtI:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.behavior=function(t){return(0,i.default)({url:"statistic/behavior",method:"GET",params:t})},e.keep=function(t){return(0,i.default)({url:"statistic/keep",method:"GET",params:t})},e.source=function(t){return(0,i.default)({url:"statistic/source",method:"GET",params:t})},e.age_and_sex=function(t){return(0,i.default)({url:"statistic/age_and_sex",method:"GET",params:t})},e.pay=function(t){return(0,i.default)({url:"statistic/pay",method:"GET",params:t})};var i=function(t){return t&&t.__esModule?t:{default:t}}(a("t3Un"))},XHIC:function(t,e,a){"use strict";a.r(e);var i=a("n2e/"),s=a("u2PB");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("aLUY");var o=a("KHd+"),r=Object(o.a)(s.default,i.a,i.b,!1,null,"3cd94e5e",null);r.options.__file="user.vue",e.default=r.exports},XztG:function(t,e,a){"use strict";var i=function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:this.id}})},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},aLUY:function(t,e,a){"use strict";var i=a("jgKa");a.n(i).a},aRPo:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("ma/q");e.default={props:{charData:{type:Array,default:function(){return{data:[]}}},width:{type:Number,default:1200},height:{type:Number,default:500},id:{type:String,required:!0},title:{type:String,default:null}},data:function(){return{Pie:null,ds:null,dv:null}},watch:{charData:function(t,e){this.drawChart(t)}},methods:{drawChart:function(){var t=this.charData;this.Pie&&this.Pie.destroy(),this.Pie=new i.Pie(this.id,{forceFit:!0,width:this.width,height:this.height,title:{visible:!0,text:this.title},radius:.8,data:t,angleField:"value",colorField:"name",label:{visible:!0,type:"inner"}}),this.Pie.render()}}}},hXVX:function(t,e,a){"use strict";a.r(e);var i=a("P+xe"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e.default=s.a},jgKa:function(t,e,a){},"n2e/":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"dashboard-editor-container"},[a("el-row",[a("el-col",{directives:[{name:"loading",rawName:"v-loading",value:t.analyze_loading,expression:"analyze_loading"}],staticStyle:{"padding-bottom":"20px"},attrs:{span:24}},[a("el-card",{attrs:{shadow:"hover"}},[a("div",{staticClass:"title"},[a("h3",[t._v(t._s(t.$t("statistics.user.sex_age")))]),t._v(" "),a("div",[a("el-select",{attrs:{placeholder:t.$t("common.select")},on:{change:function(e){t.setDate("genderType")}},model:{value:t.genderType,callback:function(e){t.genderType=e},expression:"genderType"}},t._l(t.genderTypeData,function(t){return a("el-option",{key:t.value,attrs:{label:t.lable,value:t.value}})})),t._v(" "),a("el-select",{attrs:{placeholder:t.$t("common.select")},on:{change:function(e){t.setDate("genderDate")}},model:{value:t.genderDate,callback:function(e){t.genderDate=e},expression:"genderDate"}},t._l(t.gender,function(t){return a("el-option",{key:t.value,attrs:{label:t.lable,value:t.value}})})),t._v(" "),a("span",{staticClass:"date"},[t._v(t._s(t.genderShowDate))])],1)]),t._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("plot-donut",{attrs:{"char-data":t.genderData,id:"c1"}})],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("plot-donut",{attrs:{"char-data":t.agesData,id:"c2"}})],1)],1)],1)],1),t._v(" "),a("el-col",{directives:[{name:"loading",rawName:"v-loading",value:t.province_loading,expression:"province_loading"}],staticStyle:{"padding-bottom":"20px"},attrs:{span:24}},[a("el-card",{attrs:{shadow:"hover"}},[a("div",{staticClass:"title"},[a("h3",[t._v(t._s(t.$t("statistics.user.regional_distribution")))]),t._v(" "),a("div",[a("el-select",{attrs:{placeholder:t.$t("common.select")},on:{change:function(e){t.setDate("provinceType")}},model:{value:t.provinceType,callback:function(e){t.provinceType=e},expression:"provinceType"}},t._l(t.provinceTypeData,function(t){return a("el-option",{key:t.value,attrs:{label:t.lable,value:t.value}})})),t._v(" "),a("el-select",{attrs:{placeholder:t.$t("common.select")},on:{change:function(e){t.setDate("provinceDate")}},model:{value:t.provinceDate,callback:function(e){t.provinceDate=e},expression:"provinceDate"}},t._l(t.province,function(t){return a("el-option",{key:t.value,attrs:{label:t.lable,value:t.value}})})),t._v(" "),a("span",{staticClass:"date"},[t._v(t._s(t.provinceShowDate))])],1)]),t._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("plot-pie",{attrs:{"char-data":t.provinceData,id:"c3"}})],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("plot-pie",{attrs:{"char-data":t.cityData,id:"c4"}})],1)],1)],1)],1),t._v(" "),a("el-col",{directives:[{name:"loading",rawName:"v-loading",value:t.platforms_loading,expression:"platforms_loading"}],staticStyle:{"padding-bottom":"20px"},attrs:{span:24}},[a("el-card",{attrs:{shadow:"hover"}},[a("div",{staticClass:"title"},[a("h3",[t._v(t._s(t.$t("statistics.user.terminal_distribution")))]),t._v(" "),a("div",[a("el-select",{attrs:{placeholder:t.$t("common.select")},on:{change:function(e){t.setDate("platformsType")}},model:{value:t.platformsType,callback:function(e){t.platformsType=e},expression:"platformsType"}},t._l(t.platformsTypeData,function(t){return a("el-option",{key:t.value,attrs:{label:t.lable,value:t.value}})})),t._v(" "),a("el-select",{attrs:{placeholder:t.$t("common.select")},on:{change:function(e){t.setDate("platformsDate")}},model:{value:t.platformsDate,callback:function(e){t.platformsDate=e},expression:"platformsDate"}},t._l(t.platforms,function(t){return a("el-option",{key:t.value,attrs:{label:t.lable,value:t.value}})})),t._v(" "),a("span",{staticClass:"date"},[t._v(t._s(t.platformsShowDate))])],1)]),t._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("plot-donut",{attrs:{"char-data":t.platformsData,id:"c5"}})],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("plot-pie",{attrs:{"char-data":t.devicesData,id:"c6"}})],1)],1)],1)],1)],1)],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},rNAP:function(t,e,a){"use strict";var i=function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:this.id}})},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},tT1R:function(t,e,a){"use strict";a.r(e);var i=a("aRPo"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e.default=s.a},u2PB:function(t,e,a){"use strict";a.r(e);var i=a("E61J"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e.default=s.a},"w+mM":function(t,e,a){}}]);