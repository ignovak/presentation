$.fn.present = function(options) {
  options = options || {};
  var $sheet = $(this),
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
      case 34:
      case 39:
        nextSlide();
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

    resizeFont();
  };

  function resizeFont() {
    var $page = slides.eq(currentPage);
    var factor = Math.min($sheet.height() / $page.outerHeight(true),
                          $sheet.width() / $page.outerWidth(true));
    var prevFontSize = parseInt($page.css('font-size'));
    var fontSize = Math.min(~~(prevFontSize * factor), maxFontSize);
    $page.css('font-size', fontSize + 'px');
  };

};

$(function() {
  $('#presentation').present({
    prevBtn: '.btn.prev',
    nextBtn: '.btn.next',
    // fadeDelay: 300
  });
});
