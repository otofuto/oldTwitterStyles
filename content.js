window.onload = () => {
	var lnk = document.createElement("link");
	lnk.setAttribute("rel", "stylesheet");
	lnk.setAttribute("href", "https://otft.info/css/twitter.css");
	document.head.appendChild(lnk);
	changeElements();
	currentUrl = location.href;
	setInterval(() => {
		if (currentUrl != location.href) {
			currentUrl = location.href;
			changeElements();
		}
	}, 100);

}

function changeElements() {
	console.log('changeElements');
	if (location.href.indexOf("notifications") > 0) {
		var si = setInterval(() => {
			if (document.querySelector('div[aria-label="タイムライン: 通知"]') != null) {
				clearInterval(si);
				var target = document.querySelector('div[aria-label="タイムライン: 通知"]').querySelector('div');
				function likeToFav() {
					var elms = target.getElementsByTagName("span");
					Array.from(elms)
					.filter(elm => elm.innerText.endsWith("をいいねしました"))
					.forEach(elm => {
						elm.innerText = elm.innerText.replace("をいいねしました", "をお気に入りに追加しました");
					});
				}
				var mo = new MutationObserver(likeToFav);
				mo.observe(target, {childList: true});
				likeToFav();
			}
		}, 200);
	} else if (location.href.indexOf("/i/timeline") > 0) {
		let cnt = 0;
		var si = setInterval(() => {
			if (document.querySelectorAll('h2[role="heading"]').length == 2) {
				clearInterval(si);
				var spn = document.querySelectorAll('h2[role="heading"]')[1].querySelector('span');
				if (spn != null && spn.innerText == "いいねしました") {
					spn.innerText = "お気に入りしました";
				}
			}
			if (cnt > 50)
				clearInterval(si);
			cnt++;
		});
	} else {
		let cnt = 0;
		var si2 = setInterval(() => {
			if (document.querySelector('[role="tablist"]') != null) {
				clearInterval(si2);
				var tablist = document.querySelector('[role="tablist"]');
				Array.from(tablist.getElementsByTagName('span'))
				.find(elm => elm.innerText == "いいね")
				.innerText = "お気に入り";
			}
			if (cnt > 50)
				clearInterval(si2);
			cnt++;
		}, 200);
		var si = setInterval(() => {
			var target = null;
			if (document.querySelector('div[aria-label="タイムライン: ホームタイムライン"]') != null) {
				target = document.querySelector('div[aria-label="タイムライン: ホームタイムライン"]').querySelector('div');
			} else if (document.querySelector('div[aria-label="タイムライン: 話題を検索"]') != null) {
				target = document.querySelector('div[aria-label="タイムライン: 話題を検索"]').querySelector('div');
			} else if (document.querySelector('nav[aria-label="プロフィールタイムライン"]') != null) {
				target = document.querySelector('nav[aria-label="プロフィールタイムライン"]').nextElementSibling.querySelector('div').querySelector('div');
			}
			if (target != null) {
				clearInterval(si);
				function delPro() {
					var elms = document.getElementsByTagName("span");
					Array.from(elms)
					.filter(elm => elm.innerText.endsWith("によるプロモーション") || elm.innerText == "プロモーション")
					.forEach(elm => {
						var tweet = elm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
						var trend = elm.parentNode.parentNode.parentNode.parentNode.parentNode;
						if (trend.getAttribute("data-testid") == "tweet") {
							tweet.style.display = "none";
							console.log("delete promotion");
						}
					});
				}
				var mo = new MutationObserver(delPro);
				mo.observe(target, {childList: true});
				delPro();
			}
		}, 200);
	}
}