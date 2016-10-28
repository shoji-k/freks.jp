(function($) {
  "use strict";

  $('#navbarContent a').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 400);
    event.preventDefault();
  });

})(jQuery);
