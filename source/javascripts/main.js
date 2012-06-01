$.fn.present = function(options) {
  options = options || {};
  var slides = $('article', this),
      current = 0;

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

  go(current);

  function prevSlide() {
    go(Math.max(0, --current));
  };

  function nextSlide() {
    go(Math.min(slides.length - 1, ++current));
  };

  function go(n) {
    current = n;
    slides.hide().eq(n).show()
  };
}

$(function() {
  $('#presentation').present({
    prevBtn: '.btn.prev',
    nextBtn: '.btn.next',
  });
});
