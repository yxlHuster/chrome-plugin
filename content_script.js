var msg = {
		type: "cmt_recom",
		url: document.URL
	};
chrome.runtime.sendMessage(msg);
