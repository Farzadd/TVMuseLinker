var regResults = /href=&quot;([^&|#]+)\&quot\;/gi;
var regHost = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
var validLinks = [];

// http://www.tvmuse.com/tv-shows/*/season_*/episode_*/*

$("#table_search").html("");
$("[id^=div_com_]").each(onEachComment);

function onEachComment(index, element)
{
	if ($(element).find("a")[0]) {
		sendAction("2h", new Array($(element).attr("id").replace("div_com_", "")));
	}
}

// Code borrowed from TVMuse JS files
function sendAction(action, otherParams)
{
	var xmlHttp = new XMLHttpRequest();
	if (xmlHttp == null)
  	{
  		alert ("Your browser does not support AJAX!");
  		return;
  	}
	
  	var url = '/ajax.php';
  	var params = "action=" + action + "&sri=" + Math.random();

	if (otherParams)
		for (i = 0; i < otherParams.length; i++)
			params = params + '&o_item' + i + '=' + encodeURIComponent(otherParams[i]);

	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", params.length);
	xmlHttp.setRequestHeader("Connection", "close");
	
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var urls = xmlHttp.responseText.match(regResults);
			for (i = 0; i < urls.length; i++)
			{
				var url = urls[i].replace("href=&quot;", "").replace("&quot;", "");
                var host = url.match(regHost)[1];
				$("#table_search").html($("#table_search").html() + "<li><a href=\"" + url + "\" class=\"list outer cfix\"> <span class=\"c1\"> <em class=\"i_search\">&nbsp;</em> </span> <span class=\"c2 o_hidden\"> <span class=\"block mb_05 nowrap\"><span class=\"bigger bold underline\">" + host + "</span> &nbsp;<span class=\"dark\">by <span class=\"bold\">TVMuse Linker</span></span></span>  </span>  </a>  </li>");
				validLinks.push(url);
			}
		}
	}
	
	xmlHttp.send(params);
	
	return false;
}