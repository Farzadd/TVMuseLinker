var modelInjected = false;
var watchNowHtml = '<div class="title">TV Linker</div><div class="section"><a target="_blank" rel="nofollow" data-source="flexify" href="%FLEXIFYLINK%" data-original-title="" title=""><div class="icon" style="padding-top: 20px;"><img class="lazy" src="https://flixify.com/assets/img/logo-298x40.png"></div><div class="price">Free</div></a></div>';
var sideBarHtml = '<a class="" target="_blank" rel="nofollow" href="%FLEXIFYLINK%" data-original-title="" title=""><div class="icon btn-amazon" style="background-color: #333 !important;"><img class="lazy" src="https://flixify.com/assets/img/logo-298x40.png" style="display: inline;"></div></a>';

var showName = $('.summary a')[0].text.trim().toLowerCase();
showName = showName.replace(/&/g, "and").replace(/\(|\)|'|\.|\:/g, "").replace(/\s/g, '-');

const pageUrl = window.location.href;
const season = /seasons\/(\d)*/g.exec(pageUrl)[1];
const episode = /episodes\/(\d)*/g.exec(pageUrl)[1];

var flexifyLink = 'https://flixify.com/shows/' + showName + '/season-' + season + '/episode-' + episode + '?pl=1';

watchNowHtml = watchNowHtml.replace("%FLEXIFYLINK%", flexifyLink);
sideBarHtml = sideBarHtml.replace("%FLEXIFYLINK%", flexifyLink);

$('#info-wrapper .sources').html(sideBarHtml);

$('body').on('DOMNodeInserted', 'div', function () {
      if ($("#watch-now-modal .streaming-links").length != 0 && !modelInjected) {
		  modelInjected = true;
		  $("#watch-now-modal .streaming-links").prepend(watchNowHtml);
	  }
});