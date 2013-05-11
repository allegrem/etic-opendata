(function() {
  var activateNavItem, hideLabels, label, labelInitialWidth, nav, offset05, offset10, offset20, offset30, showLabels;

  offset05 = $('#frame05').offset().top - 5;

  offset10 = $('#frame10').offset().top - 5;

  offset20 = $('#frame20').offset().top - 5;

  offset30 = $('#frame30').offset().top - 5;

  nav = $('nav');

  labelInitialWidth = Math.max.apply(Math, (function() {
    var _i, _len, _ref, _results;

    _ref = nav.find('span');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      label = _ref[_i];
      _results.push($(label).width());
    }
    return _results;
  })());

  nav.css('left', "-" + (nav.width() + 10) + "px").addClass('hidden');

  $('nav li').click(function(e) {
    e.preventDefault();
    return $('html, body').stop().animate({
      scrollTop: $($(this).find('a').attr('href')).offset().top
    }, 1000);
  });

  activateNavItem = function(anchor) {
    $('nav li').removeClass('selected');
    return $("nav a[href=" + anchor + "]").parent().addClass('selected');
  };

  showLabels = function() {
    return nav.find('span').stop().css('margin-left', "7px").animate({
      width: labelInitialWidth + 7
    }, 700);
  };

  hideLabels = function() {
    return nav.find('span').stop().animate({
      width: '0px'
    }, 700, function() {
      return $(this).css('margin-left', '0px');
    });
  };

  nav.mouseenter(showLabels);

  nav.mouseleave(hideLabels);

  $(window).scroll(function(e) {
    var scrollTop;

    scrollTop = $(this).scrollTop();
    if (scrollTop < offset10) {
      activateNavItem('#frame00');
    } else if (scrollTop < offset20) {
      activateNavItem('#frame10');
    } else if (scrollTop < offset30) {
      activateNavItem('#frame20');
    } else {
      activateNavItem('#frame30');
    }
    if (scrollTop > offset05 && nav.hasClass('hidden')) {
      nav.stop().animate({
        left: '0px'
      }, 1000).removeClass('hidden');
      return setTimeout(hideLabels, 5000);
    }
  });

}).call(this);
