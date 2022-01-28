window.onload = () => {
	var lnk = document.createElement("link");
	lnk.setAttribute("rel", "stylesheet");
	lnk.setAttribute("href", "https://otft.info/css/twitter_dev.css");
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
	if (document.querySelector('a.r-14lw9ot.r-1xce0ei img') != null) {
		document.body.style.backgroundImage = "url('" + document.querySelector('a.r-14lw9ot.r-1xce0ei img').src + "')";
		document.body.style.backgroundSize = '25%';
	} else if (document.querySelector('div[data-testid="SideNav_AccountSwitcher_Button"] img') != null) {
		document.body.style.backgroundImage = "url('" + document.querySelector('div[data-testid="SideNav_AccountSwitcher_Button"] img').src.replace('x96', '400x400') + "')";
		document.body.style.backgroundSize = '25%';
	}
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
					Array.from(document.querySelectorAll('[data-testid="placementTracking"]'))
					.forEach(elm => {
						elm.parentNode.parentNode.style.display = 'none';
					});
				}
				var mo = new MutationObserver(delPro);
				mo.observe(target, {childList: true});
				delPro();
			}
		}, 200);
	}
}