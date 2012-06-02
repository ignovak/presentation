$.fn.present = function(options) {
  options = options || {};
  var slides = $('article', this),
      slidesNum = slides.length,
      currentPage;

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

  parseHash();

  function prevSlide() {
    go(Math.max(0, currentPage - 1));
  };

  function nextSlide() {
    go(Math.min(slidesNum - 1, currentPage + 1));
  };

  function go(page) {
    var delay = options.fadeDelay || 0;
    slides.eq(currentPage || 0).fadeOut(delay, function() {
      currentPage = page;
      slides.eq(page).fadeIn(delay);
    });
    if (window.location.hash !== page) {
      window.location.hash = page;
    };
  };

  function parseHash(e) {
    var page = parseInt(window.location.hash.slice(1)) || 0;
    if (page >= 0 && page <= slidesNum && page != currentPage) {
      go(page);
    };
  }
}

$(function() {
  $('#presentation').present({
    prevBtn: '.btn.prev',
    nextBtn: '.btn.next',
    // fadeDelay: 300
  });
});
