function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
/*
	if(getDomainFromUrl(tab.url).toLowerCase() == "www.sohu.com"){
		chrome.pageAction.show(tabId);
	}
	*/
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var newsItem = {};
newsItem.error = "加载中...";
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	if(request.type !== "cmt_recom")
		return;
	newsItem = request;
	newsItem.firstAccess = "获取中...";
	if(!newsItem.error){
			$.ajax({  
        type: "get",  
        url: "http://localhost:8088/recom/url",  
		data: {
			url: newsItem.url
		},
		jsonp: "callback",
		jsonpCallback: "success_jsonpCallback",
        success: function(data){
			newsItem.items = data;
        },
		error: function(){
			alert('获取数据失败');
        }		
          
    });
	}
});
