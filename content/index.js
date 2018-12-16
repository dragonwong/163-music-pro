(function() {
  main();
  window.onhashchange = () => {
    location.reload();
  };
})();

function main() {
  // 判断主内容 iframe
  if (document.body.id.startsWith('auto-id-')) {
    // iframe 里
    handleCoverImg();
    handleControl();
    handleMoreLyric();
    handleBacktop();
  } else {
    handleHeader();
    if (!location.hash.startsWith('#/song')) {
      $('#g_iframe').style.top = '70px';
    }
  }
}

function handleBacktop() {
  const $backTop = $('#g_backtop');
  $backTop.title = '回到顶部';
  $backTop.innerHTML = '<svg class="feather feather-navigation-2 sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 19 21 12 17 5 21 12 2"></polygon></svg>';
}

// 处理头部导航栏
function handleHeader() {
  const $findMusic = $('#g-topbar ul.m-nav.j-tflag>li>span>a[data-module="discover"]');
  const $myMusic = $('#g-topbar ul.m-nav.j-tflag>li>span>a[data-module="my"]');
  const $friend = $('#g-topbar ul.m-nav.j-tflag>li>span>a[data-module="friend"]');
  const $store = $('#g-topbar ul.m-nav.j-tflag>li>span>a[data-module="store"]');
  const $musician = $('#g-topbar ul.m-nav.j-tflag>li>span>a[data-module="musician"]');

  $findMusic.title = '发现音乐';
  $findMusic.innerHTML = '<svg class="feather feather-music sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"></path><polyline points="9 17 9 5 21 3 21 15"></polyline></svg>';
  $myMusic.title = '我的音乐';
  $myMusic.innerHTML = '<svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
  $friend.title = '朋友';
  $friend.innerHTML = '<svg class="feather feather-compass sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>';
  $store.title = '商城';
  $store.innerHTML = '<svg class="feather feather-shopping-bag sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';
  $musician.title = '音乐人';
  $musician.innerHTML = '<svg class="feather feather-mic sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';

  const $searchLable = $('#g_search .ph.j-flag');
  $searchLable.innerHTML = '搜索...';
}

// 处理专辑封面图片和歌词
function handleCoverImg() {
  // 放大图片
  const $coverImg = $('.u-cover.u-cover-6.f-fl>img');
  if ($coverImg) {
    $coverImg.src = remoteSizeFromImageUrl($coverImg.src);
  }

  const $lycifo = $('.m-lycifo');
  const $lycifoBgImg = document.createElement('DIV');

  $lycifoBgImg.classList.add('m-lycifo-bg');
  $lycifoBgImg.classList.add('img');
  $lycifoBgImg.style = `background-image: url(${$coverImg.src})`;
  $lycifo.appendChild($lycifoBgImg);

  // 处理歌词
  const $lycifoBgColor = document.createElement('DIV');
  $lycifoBgColor.classList.add('m-lycifo-bg');
  $lycifoBgColor.classList.add('color');
  $lycifo.appendChild($lycifoBgColor);
}

// 处理控制按钮
function handleControl() {
  const $buttonPlay = $('[data-res-action="play"]');
  const $buttonAdd = $('[data-res-action="addto"]');
  const $buttonFav = $('[data-res-action="fav"]');
  const $buttonShare = $('[data-res-action="share"]');
  const $buttonDownload = $('[data-res-action="download"]');
  const $buttonComment = $('[data-res-action="comment"]');

  $buttonPlay.title = '播放';
  $buttonFav.title = '收藏';
  $buttonShare.title = '分享';
  $buttonDownload.title = '下载';
  $buttonComment.title = '评论';

  $buttonPlay.innerHTML = '<svg class="feather feather-play-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>';
  $buttonAdd.innerHTML = '<svg class="feather feather-plus-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
  $buttonFav.innerHTML = '<svg class="feather feather-folder-plus sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>';
  $buttonShare.innerHTML = '<svg class="feather feather-share sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>';
  $buttonDownload.innerHTML = '<svg class="feather feather-download-cloud sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>';
  $buttonComment.innerHTML = '<svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
}

// 处理更多歌词
function handleMoreLyric() {
  const $moreLyric = $('#flag_more');
  if ($moreLyric) {
    const $buttonMoreLyric = $('#flag_ctrl');
    $buttonMoreLyric.remove();
    const $lyricContent = $('#lyric-content');
    $lyricContent.innerHTML += $moreLyric.innerHTML;
    $moreLyric.remove();
  } else {
    // console.info('no more')
  }
}

// 去除图片url上的大小参数
function remoteSizeFromImageUrl(url) {
  const index = url.indexOf('?');
  if (index) {
    url = url.slice(0, index);
  }
  return url;
}

function $(selector) {
  return document.querySelector(selector)
}
function $$(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
}
