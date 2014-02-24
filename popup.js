document.addEventListener('DOMContentLoaded', function () {	
	var data = chrome.extension.getBackgroundPage().newsItem;
	$('#tab_rss').find("*").remove();
	if(data.error){
		$("#message").text(data.error);
		$("#content").hide();
	} else {
			$("#message").hide();
			var feeds = $.parseJSON(data.items);
			var news = $("<ul id='ul_rss'>推荐新闻:</ul>"); 
			for(var i = 0; i < feeds.length; i++)
            {
                var item = feeds[i];
                var htmlLi = "<li class='bottom-border-dashed'>";
                htmlLi += '<span id="label-' + item.id + '"><a>靠谱</a></span>'
                    + '<a href="'
                    + item.url
                    + '">'
                    + item.title
                    + '</a>';
                htmlLi += "</li>";               
                var li = $(htmlLi);
                li.find("a").attr("target", "_blank").addClass("blue");
                news.append(li);
            }          
            $('#tab_rss').append(news);
			for (var i = 0; i< feeds.length; i++)
			{
				var item = feeds[i];
				var lid = 'label-' + item.id;
				document.getElementById(lid).addEventListener('click', clickEvent, false);
			}
	}
});

function clickHandler(su, tid) {
	$.post("http://localhost:8088/recom/log", {
        "su" : su,
        "topicId" : tid,
    },
	function (data) {
        if (data.success == true) {
		}
	});
	var lid = 'label-' + tid;
	document.getElementById(lid).firstChild.innerHTML = '不靠谱';
};

function clickEvent(e) {
	var tid = e.target.getAttribute('id');
	var data = chrome.extension.getBackgroundPage().newsItem;
	var su = data.url;
	if (su) {
		clickHandler(su, tid);
	}
}
