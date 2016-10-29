(function($) {
  "use strict";
  var scroll_offset = 50;

  $('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: scroll_offset+1
  });

  $('#nav a').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - scroll_offset)
    }, 400, 'swing');
    event.preventDefault();
  });

  $('.collapse ul li a').click(function(){
    $('.navbar-toggler:visible').click();
  });

})(jQuery);
