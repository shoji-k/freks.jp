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

  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery);
