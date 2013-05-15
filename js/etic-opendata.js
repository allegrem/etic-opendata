(function() {
  var activateNavItem, allDetails, hideDetails, hideLabels, hideTlNav, label, labelInitialWidth, mainNav, showDetails, showLabels, showTlNav, smoothScrollTo, tl, tlNav;

  smoothScrollTo = function(e, callback) {
    return $('html, body').stop().animate({
      scrollTop: $(e).offset().top
    }, 1000, callback);
  };

  $('nav li, a.scroll-to').click(function(e) {
    var target, _ref;

    e.preventDefault();
    target = (_ref = $(this).attr('href')) != null ? _ref : $(this).find('a').attr('href');
    return smoothScrollTo(target);
  });

  activateNavItem = function(anchor) {
    $('nav li').removeClass('selected');
    return $("nav a[href=" + anchor + "]").parent().addClass('selected');
  };

  mainNav = $('nav.main-nav');

  mainNav.css('left', "-" + (mainNav.width() + 10) + "px").addClass('hidden');

  labelInitialWidth = Math.max.apply(Math, (function() {
    var _i, _len, _ref, _results;

    _ref = mainNav.find('span');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      label = _ref[_i];
      _results.push($(label).width());
    }
    return _results;
  })());

  showLabels = function() {
    return mainNav.find('span').stop().css('margin-left', "7px").animate({
      width: labelInitialWidth + 7
    }, 500);
  };

  hideLabels = function() {
    return mainNav.find('span').stop().animate({
      width: '0px'
    }, 700, function() {
      return $(this).css('margin-left', '0px');
    });
  };

  mainNav.mouseenter(showLabels);

  mainNav.mouseleave(hideLabels);

  tl = $('.timeline');

  allDetails = tl.children('p');

  hideDetails = function(elements, hide) {
    if (elements == null) {
      elements = allDetails;
    }
    if (hide == null) {
      hide = false;
    }
    return $(elements).each(function(i, el) {
      var e;

      e = $(el);
      if (hide) {
        e.hide();
      } else {
        e.stop().slideUp();
      }
      return e.prev().addClass('hidden');
    });
  };

  showDetails = function(elements) {
    if (elements == null) {
      elements = allDetails;
    }
    return $(elements).each(function(i, el) {
      return $(el).stop().slideDown().prev().removeClass('hidden');
    });
  };

  tl.find('h3').click(function(e) {
    var isClosed;

    if (!$('.toggle').hasClass('toggle-off')) {
      isClosed = $(this).hasClass('hidden');
      hideDetails();
      if (isClosed) {
        return showDetails($(this).next());
      }
    }
  });

  $('#tlCondensed1').click(function() {
    tl.find('h3').css('cursor', 'pointer');
    return smoothScrollTo($('#frame15'), hideDetails);
  });

  $('#tlCondensed2').click(function() {
    tl.find('h3').css('cursor', 'auto');
    return showDetails();
  });

  tlNav = tl.find('nav');

  showTlNav = function() {
    return tlNav.stop().animate({
      right: '0'
    }, 700).removeClass('hidden');
  };

  hideTlNav = function(hide) {
    var time;

    if (hide == null) {
      hide = false;
    }
    time = hide ? 0 : 700;
    return tlNav.stop().animate({
      right: "-" + (tlNav.width() + 40) + "px"
    }, time).addClass('hidden');
  };

  hideDetails(null, true);

  hideTlNav(true);

  $(window).scroll(function(e) {
    var offset05, offset10, offset15, offset20, offset30, offset40, scrollTop;

    scrollTop = $(this).scrollTop();
    offset05 = $('#frame05').offset().top - 5;
    offset10 = $('#frame10').offset().top - 5;
    offset15 = $('#frame15').offset().top - 5;
    offset20 = $('#frame20').offset().top - 5;
    offset30 = $('#frame30').offset().top - 5;
    offset40 = $('#frame40').offset().top - 5;
    if (scrollTop < offset10) {
      activateNavItem('#frame00');
    } else if (scrollTop < offset20) {
      activateNavItem('#frame10');
    } else if (scrollTop < offset30) {
      activateNavItem('#frame20');
    } else if (scrollTop < offset40) {
      activateNavItem('#frame30');
    } else {
      activateNavItem('#frame40');
    }
    if (scrollTop > offset05 && mainNav.hasClass('hidden')) {
      mainNav.stop().animate({
        left: '0px'
      }, 1000).removeClass('hidden');
      setTimeout(hideLabels, 5000);
    }
    if (((offset15 - $(window).height() * 0.05) < scrollTop && scrollTop < (offset20 - $(window).height() * 0.3)) && tlNav.hasClass('hidden')) {
      return showTlNav();
    } else if ((scrollTop < (offset15 - $(window).height() * 0.05) || scrollTop > (offset20 - $(window).height() * 0.3)) && !tlNav.hasClass('hidden')) {
      return hideTlNav();
    }
  });

}).call(this);
