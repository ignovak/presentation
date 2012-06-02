$.fn.present = function(options) {
  options = options || {};
  var $sheet = $('.slides-wrapper', this),
      slides = $('article', this),
      slidesNum = slides.length,
      currentPage,
      targetPage,
      fadeDelay = options.fadeDelay || 0,
      maxFontSize = 36;

  $(document).on('keydown', function(e) {
    switch (e.which) {
      case 33:
      case 37:
        prevSlide();
        break;
      case 32:
      case 34:
      case 39:
        nextSlide();
        break;
      case 36:
        go(0);
        break;
      case 35:
        go(slidesNum - 1);
    }
  });
  $(options.prevBtn).on('click', prevSlide);
  $(options.nextBtn).on('click', nextSlide);
  $(window).on('hashchange', parseHash);
  $(window).on('resize', resizeFont);

  parseHash();

  function prevSlide() {
    go(Math.max(0, currentPage - 1));
  };

  function nextSlide() {
    go(Math.min(slidesNum - 1, currentPage + 1));
  };

  function parseHash(e) {
    var page = parseInt(window.location.hash.slice(1)) || 0;
    if (page >= 0 && page <= slidesNum) {
      go(page);
    };
  };

  function go(page) {
    if (page == currentPage) return;

    targetPage = page;
    slides.eq(currentPage || 0).fadeOut(fadeDelay, showPage);
  };

  function showPage() {
    currentPage = targetPage;
    slides.eq(currentPage).fadeIn(fadeDelay);

    if (window.location.hash !== currentPage) {
      window.location.hash = currentPage;
    };

    $(options.prevBtn).show();
    $(options.nextBtn).show();
    if (currentPage == 0) {
      $(options.prevBtn).hide();
    } else if (currentPage == slidesNum - 1) {
      $(options.nextBtn).hide();
    };

    resizeFont();
  };

  function resizeFont() {
    var $page = slides.eq(currentPage);
    var fontSize = parseInt($page.css('font-size'));
    while (isSmall()) {
      fontSize *= 1.1;
      $page.css('font-size', ~~fontSize + 'px')
    };
    while (isLarge()) {
      fontSize /= 1.1;
      $page.css('font-size', ~~fontSize + 'px')
    };

    function isSmall() {
      return fontSize < maxFontSize ||
             $sheet.height() > $page.outerHeight(true) ||
             $sheet.width() > $page.outerWidth(true)
    };

    function isLarge() {
      return fontSize > maxFontSize ||
             $sheet.height() < $page.outerHeight(true) ||
             $sheet.width() < $page.outerWidth(true)
    };
  };

};

$(function() {
  $('#presentation').present({
    prevBtn: '.btn.prev',
    nextBtn: '.btn.next',
    // fadeDelay: 300
  });
});
