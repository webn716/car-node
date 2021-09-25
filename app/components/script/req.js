var krystal = {};
krystal.globalUrl='/api/';
//筛选排序功能
krystal.sortFilter = (function(){
	'use strict';
	var tool={};
	var funs={
		init:function(){
			var arrHeaders = document.querySelectorAll('.header-filter');
		}
	};

	return {
		start:function(){
			funs.init();
		}
	};
})();
krystal.ajaxReq = (function(){

	var tool={};
	var funs={
		init:function(opt){
			console.log('ajaxReq');
				var param = {
					url : opt.url || 'http://localhost:3000/listData',
					method : opt.method || 'GET',
					async : opt.async || false,
					timeout : 1000,
					error : function(){
						opt && opt.error && opt.error();
					},
					success : function(rs){
						opt && opt.success && opt.success(JSON.parse(rs));
					}
				};
				this.ajax(param);
		},
		/**
		 * ajax通用方法
		 * @param param
		 */
		ajax:function(param){
			var XMLHttpReq;
			try {
				XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
			}
			catch(e) {
				try {
					XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
				}
				catch(e) {
					XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
				}
			}
			XMLHttpReq.ajaxRunError = true;
			if(param.withCredentials){
				try {
					//需要远端服务器设置Access-Control-Allow-Credentials: true
					XMLHttpReq.withCredentials = true;
				}catch(e) {

				}
			}
			try {
				XMLHttpReq.open(param.method, param.url, param.async);
				if(param.timeout){
					var source = param.source ? param.source : null;
					setTimeout(function(){
						if(XMLHttpReq.ajaxRunError){
							XMLHttpReq.onreadystatechange = function(){};
							XMLHttpReq.abort();
							param.error.call(source);
						}
					}, param.timeout);
				}
				XMLHttpReq.onreadystatechange = function(){
					var source = param.source ? param.source : null;
					if (XMLHttpReq.readyState == 4) {
						if (XMLHttpReq.status == 200) {
							XMLHttpReq.ajaxRunError = false;
							var result = XMLHttpReq.responseText;
							param.success.call(source,result);
						}else{
							param.error.call(source);
						}
					}
				}; //指定响应函数
				XMLHttpReq.send(null);
			} catch(e) {}
		}
	};

	return {
		start:function(opt){
			funs.init(opt);
		}
	};
})();

//获取url中的参数  
function getUrlParam(name) {  
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
	var r = encodeURI(window.location.search).substr(1).match(reg); //匹配目标参数  
	if (r != null) return unescape(r[2]); return null; //返回参数值             
  }  

// function getToken(){
// 	var url=window.location.href;
// 	if(url.indexOf("login")>0||url.indexOf("register")>0||url.indexOf("forgetPassword")>0||url.indexOf("userAgreement")>0){
// 		return
// 	}
// 	var token=window.localStorage.getItem("token");
// 	if(token&&token!=""){
// 		return token;
// 	}else{
// 		window.location.href = '/login.html'
// 	}
// }
module.exports={
	sortFilter:krystal.sortFilter,
	ajaxReq:krystal.ajaxReq,
	globalUrl:krystal.globalUrl,
	// token:getToken(),
	longitude:-999,
	Latitude:-999,
	tolen:'',
	place:'',
	getUrlParam,
}
