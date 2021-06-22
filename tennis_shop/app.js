$(function () {
  //=========================================================
  //スライドショー開始
  //=========================================================
  //現在のページ数（デフォルトは1ページ目）
  var currentItemNum = 1;
  //slider_listのDOM（スライドコンテナ）
  var $slideContainer = $('.js-slide-container');
  //スライドする要素の数
  var slideItemNum = $('.js-slide-item').length;
  //スライドする要素の横幅
  var slideItemWidth = $('.js-slide-item-img').innerWidth();
  // スライドコンテナの横幅
  var slideContainerWidth = slideItemWidth * slideItemNum;
  //変化に書ける時間（ミリ秒指定なので0.5秒）
  var DURATION = 500;
  //スライドコンテナの横幅をスライドする要素の横幅×数に変更
  $slideContainer.attr('style', 'width:' + slideContainerWidth + 'px;');
  //次へ進むボタンをクリックした場合
  $('.js-slide-next').on('click', function () {
    //現在表示されている要素が全ての要素数より少ない場合
    if (currentItemNum < slideItemNum) {
      //container自体を右へスライド一枚分ずらす
      $slideContainer.animate({left: '-=' + slideItemWidth + 'px'}, DURATION);
      currentItemNum++;
    }
  });
  //前へ戻るボタンをクリックした場合
  $('.js-slide-prev').on('click', function () {
    //現在表示されている要素が2以上の場合
    if (currentItemNum > 1) {
      //container自体を左へスライド一枚分ずらす
      $slideContainer.animate({left: '+=' + slideItemWidth + 'px'}, DURATION);
      currentItemNum--;
    }
  });
  //=========================================================
  //スライドショー終了
  //=========================================================

  //=========================================================
  //スムーズスクロール開始
  //=========================================================
  //headerの高さを取得
  var headerHeight = $('header').innerHeight();
  console.log(headerHeight);
  // a[href^=”#”]は、#で始まるリンクをクリックした時
  $('a[href^="#"]').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    console.log(position);
    //positionをheaderのheight分ずらす（headerがfixedになっているため、
    //普通のままだとheaderにかぶるから
    position = position - headerHeight;
    $("html, body").animate({scrollTop: position}, speed, "swing");
    return false;
  });
  //=========================================================
  //スムーズスクロール終了
  //=========================================================

  //=========================================================
  //ハンバーガーメニュー開始
  //=========================================================
  $('.js-toggle-sp-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.js-toggle-sp-menu-target').toggleClass('active');
  });
  //ハンバーガーメニューを閉じやすいように改良
  $('.menu a[href]').on('click', function () {
    $('.js-toggle-sp-menu').trigger('click');
  });
  //=========================================================
  //ハンバーガーメニュー終了
  //=========================================================

  //=========================================================
  //モダール開始
  //=========================================================
  $('.js-show-modal').on('click', function () {
    console.log('Clicked');
    var modalWidth = $('.js-show-modal-target').width();
    var windowWidth = $(window).width();

    // $('.js-show-modal-target').attr('style', 'margin-left:' + (windowWidth / 2 - modalWidth / 2) + 'px');
    $('.js-show-modal-target').show();
    $('.js-show-modal-cover').show();
  });

  $('.js-hide-modal').on('click', function () {
    $('.js-show-modal-target').hide();
    $('.js-show-modal-cover').hide();
  });
  //=========================================================
  //モーダル終了
  //=========================================================

  //=========================================================
  //Ajaxでのお問い合わせ機能開始
  //=========================================================
  $('.submit-btn').on('click', function (e) {
    e.preventDefault();
    //データ取得
    var name = $('.js-post-name').val();
    var email = $('.js-post-email').val();
    var message = $('.js-post-message').val();
    $.ajax({
      type: "POST",
      url: "./index.html",
      dataType: 'text',
      data: {
        name: name,
        email: email,
        message: message
      }
    }).done(function (data, status) {
      // console.log(data);
      $('.suc-msg').html()
      console.log(status);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    });


  });

});
