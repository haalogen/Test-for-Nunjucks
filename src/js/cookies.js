//здесь будут клиентские функции, которые работают с куками(история, закладки, язык и пр.)

var options = {};
options.path = "/";

window.onload = function() {
	var alias = location.pathname.split('/');
	alias = alias[alias.length - 1];
	if (getCookie('bookmarks') == undefined) {
		setCookie('bookmarks', '{"bookmarks":[]}');
	}
	setHistory(alias);
	updateBookmarks(alias);
	printHistory();
}

function setStakeholdersFilter(stakeholders) {
	setCookie('stakeholders', stakeholders);
}

function setLangRu() {
	setCookie('lang', 'ru', options);
	location.reload();
}

function setLangEn() {
	setCookie('lang', 'en', options);
	location.reload();
}

function setHistory(alias) {
	if (getCookie('history') == undefined) {
		setCookie('history', '{"history":[]}');
	}
	var temp = getCookie('history');
	temp = JSON.parse(temp);
	temp = temp.history;
	if (temp.indexOf(alias) != -1)
		temp.splice(alias, 1);
	temp.push(alias);
	setCookie('history', JSON.stringify({
		"history": temp
	}));
}

function printHistory(divid = 'history') {
	if (document.getElementById(divid)) {
		var historyText = 'Пусто';
		var history = getCookie('history');
		history = JSON.parse(history);
		history = history.history;
		if (history) {
			historyText = '<ul>';
		}
		for (var i = 1; i < history.length; i++) {
			historyText += '<li>' + history[i] + '<li>';
		}
		historyText += '</ul>';
		document.getElementById(divid).innerHTML = historyText;
	}
}


function setBookmark(alias) {
	var temp = getCookie('bookmarks');
	temp = JSON.parse(temp);
	temp = temp.bookmarks;
	temp.push(alias);
	setCookie('bookmarks', JSON.stringify({
		"bookmarks": temp
	}), '{"options":{"expires":60000}}');
	location.reload();
}

function deleteBookmark(alias) {
	var temp = getCookie('bookmarks');
	temp = JSON.parse(temp);
	temp = temp.bookmarks;
	temp.splice(alias, 1);
	setCookie('bookmarks', JSON.stringify({
		"bookmarks": temp
	}));
	location.reload();
}

function updateBookmarks(alias) {
	var temp = getCookie('bookmarks');
	temp = JSON.parse(temp);
	temp = temp.bookmarks;
	var button = document.getElementById('bookmarks');
	if (temp.indexOf(alias) != -1) {
		button.setAttribute("onclick", "deleteBookmark('" + alias + "')");
		button.innerText = 'Удалить закладку';
	} else {
		button.setAttribute("onclick", "setBookmark('" + alias + "')");
		button.innerText = 'Добавить закладку';
	}
}

function setCookie(name, value, options) {
	options = options || {};
	var expires = undefined;
	console.log(options);
	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
		console.log(options.expires);
	}

	value = encodeURIComponent(value);
	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function getCookie(name) {
	var matches = document.cookie.match(
		new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
