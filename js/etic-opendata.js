(function() {
  var activateNavItem, actors, actorsCategories, actorsDetailsTarget, actorsDiv, actorsNav, actorsPositions, actorsTarget, allDetails, allLegalDetails, attributeNameToText, attributeToText, carteActeurs, carteArguments, categorieToShortText, categorieToText, createAttributeFilter, fadeSvg, hideActorsNav, hideDetails, hideLabels, hideLegalDetails, hideMapNav, hideTlNav, initAttributeView, label, labelInitialWidth, legal, listDataAttribute, mainNav, mapNav, pinActorsColumnTitles, positionToShortText, positionToText, showActorsNav, showDetails, showLabels, showLegalDetails, showMapNav, showTlNav, smoothScrollTo, tl, tlNav, unpinActorsColumnTitles,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  smoothScrollTo = function(e, callback) {
    return $('html, body').stop().animate({
      scrollTop: $(e).offset().top
    }, 1000, callback);
  };

  $('nav.main-nav li, a.scroll-to').click(function(e) {
    var target, _ref;

    e.preventDefault();
    target = (_ref = $(this).attr('href')) != null ? _ref : $(this).find('a').attr('href');
    return smoothScrollTo(target);
  });

  activateNavItem = function(anchor) {
    $('nav li').removeClass('selected');
    return $("nav a[href=" + anchor + "]").parent().addClass('selected');
  };

  carteActeurs = $("#carte-acteurs");

  carteArguments = $("#carte-arguments");

  carteActeurs.css({
    position: 'absolute',
    top: carteArguments.position().top - 40,
    left: 0,
    opacity: 0
  });

  mapNav = $(".map nav");

  showMapNav = function() {
    return mapNav.stop().animate({
      right: '0'
    }, 700).removeClass('hidden');
  };

  hideMapNav = function(hide) {
    var time;

    if (hide == null) {
      hide = false;
    }
    time = hide ? 0 : 700;
    return mapNav.stop().animate({
      right: "-" + (mapNav.width() + 50) + "px"
    }, time).addClass('hidden');
  };

  $(document).ready(function() {
    return hideMapNav(true);
  });

  fadeSvg = function(obj, step) {
    var count, i;

    count = 0;
    return i = setInterval(function() {
      obj.css('opacity', obj.css('opacity') - step);
      count++;
      if (count > 11) {
        return clearInterval(i);
      }
    }, 1);
  };

  $('#mapArgumentsBtn').click(function() {
    fadeSvg(carteActeurs, -0.08);
    return fadeSvg(carteArguments, 0.08);
  });

  $('#mapActorsBtn').click(function() {
    fadeSvg(carteActeurs, 0.08);
    return fadeSvg(carteArguments, -0.08);
  });

  $(".cycleText").tooltip({
    title: "Survolez une bulle ou une flèche pour faire apparaitre les points chauds de la controverse.",
    container: 'body',
    placement: 'top'
  }).tooltip('hide');

  $(".timeline h3").tooltip({
    title: "Cliquez sur une date pour révéler plus de détails.",
    container: 'body',
    placement: 'right'
  }).tooltip('hide').click(function() {
    return $(".timeline h3").tooltip('destroy');
  });

  $(".timeline nav").tooltip({
    title: "Cliquez ici pour désactiver l'affichage condensé et révéler tous les détails.",
    container: 'body',
    placement: 'bottom'
  }).tooltip('hide');

  $("#actorsViewChoice").tooltip({
    title: "Cliquez ici pour basculer vers l'affichage des acteurs par position dans la controverse.",
    container: 'body',
    placement: 'bottom'
  }).tooltip('hide');

  $("#actorsSelectAttributes").tooltip({
    title: "Cliquez sur les différents boutons pour n'afficher que les catégories qui vous intéressent.",
    container: 'body',
    placement: 'bottom'
  }).tooltip('hide');

  $(document).ready(function() {
    return $(".actors > .actor:first").tooltip({
      title: "Survolez un acteur pour révéler plus d'informations",
      container: 'body',
      placement: 'right',
      trigger: 'click'
    }).tooltip('show').mouseleave(function() {
      return $(".actors .actor").tooltip('destroy');
    });
  });

  $(".legal h3").tooltip({
    title: "Cliquez sur le titre d'une section pour révéler plus de détails.",
    container: 'body',
    placement: 'bottom'
  }).tooltip('hide').click(function() {
    return $(".legal h3").tooltip('destroy');
  });

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

  legal = $('.legal');

  allLegalDetails = legal.find('p');

  hideLegalDetails = function(elements, hide) {
    if (elements == null) {
      elements = allLegalDetails;
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

  showLegalDetails = function(elements, callback) {
    if (elements == null) {
      elements = allLegalDetails;
    }
    if (callback == null) {
      callback = null;
    }
    return $(elements).each(function(i, el) {
      return $(el).stop().slideDown(300, callback).prev().removeClass('hidden');
    });
  };

  legal.find('h3').click(function(e) {
    var $this;

    hideLegalDetails();
    $this = $(this);
    if ($this.hasClass('hidden')) {
      return showLegalDetails($this.next(), function() {
        return smoothScrollTo($this);
      });
    }
  });

  hideLegalDetails(null, true);

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
      right: "-" + (tlNav.width() + 50) + "px"
    }, time).addClass('hidden');
  };

  hideDetails(null, true);

  hideTlNav(true);

  actorsDiv = $('.actors');

  actorsTarget = actorsDiv.find('.row-fluid');

  actors = actorsDiv.find('.actor');

  categorieToText = function(categorie) {
    switch (categorie) {
      case 'public':
        return 'Public';
      case 'prive':
        return 'Privé';
      case 'citoyens':
        return 'Citoyens';
    }
  };

  categorieToShortText = function(categorie) {
    switch (categorie) {
      case 'public':
        return 'Pub';
      case 'prive':
        return 'Priv';
      case 'citoyens':
        return 'Cit';
    }
  };

  positionToText = function(position) {
    switch (position) {
      case 'contributeur':
        return 'Contributeur';
      case 'reutilisateur':
        return 'Réutilisateur';
      case 'observateur':
        return 'Observateur';
      case 'reticent':
        return 'Réticent';
    }
  };

  positionToShortText = function(position) {
    switch (position) {
      case 'contributeur':
        return 'Contr';
      case 'reutilisateur':
        return 'Réut';
      case 'observateur':
        return 'Obs';
      case 'reticent':
        return 'Rét';
    }
  };

  attributeToText = function(attribute, value) {
    switch (attribute) {
      case 'categorie':
        return categorieToText(value);
      case 'position':
        return positionToText(value);
    }
  };

  attributeNameToText = function(attributeName) {
    switch (attributeName) {
      case 'categorie':
        return 'Catégorie';
      case 'position':
        return 'Position';
    }
  };

  listDataAttribute = function(attribute, elements) {
    var attributeValues;

    attributeValues = [];
    elements.each(function(i, e) {
      var a, v;

      a = $(e).data(attribute);
      if (__indexOf.call((function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = attributeValues.length; _i < _len; _i++) {
          v = attributeValues[_i];
          _results.push(v.code);
        }
        return _results;
      })(), a) < 0) {
        return attributeValues.push({
          code: a,
          name: attributeToText(attribute, a)
        });
      }
    });
    return attributeValues;
  };

  actorsCategories = listDataAttribute('categorie', actors);

  actorsPositions = listDataAttribute('position', actors);

  initAttributeView = function(attributeName, attributeList, animationDuration) {
    var $filtersDiv, actorsColumns, attributeListLength, el, i, spanValue, _i, _ref;

    if (animationDuration == null) {
      animationDuration = 2000;
    }
    attributeListLength = attributeList.length;
    spanValue = Math.ceil(12 / attributeListLength);
    actorsTarget.find("h2, div").remove();
    actorsColumns = [];
    for (i = _i = 0, _ref = attributeListLength - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      el = $("<div class='span" + spanValue + " actor-column' data-" + attributeName + "='" + attributeList[i].code + "'>\n	<h2>" + attributeList[i].name + "</h2>\n</div>");
      actorsColumns.push(el);
      actorsTarget.append(el);
    }
    actors.find('.label').show();
    actors.find(".label-" + attributeName).hide();
    $filtersDiv = actorsDiv.find('#actorsSelectAttributes');
    $filtersDiv.find('.toggle.toggle-off').each(function(i, e) {
      return $(e).find('input').first().trigger('click', 0);
    });
    actors.each(function(i, a) {
      var aCopy, aLeft, aTop, columnNb, _j, _ref1, _results;

      columnNb = null;
      a = $(a);
      _results = [];
      for (i = _j = 0, _ref1 = attributeListLength - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        if (attributeList[i].code === a.data(attributeName)) {
          aCopy = a.clone();
          a.css({
            position: 'absolute'
          });
          aCopy.css({
            position: 'static',
            visibility: 'hidden'
          });
          actorsColumns[i].append(aCopy);
          aTop = aCopy.position().top;
          aLeft = aCopy.position().left;
          a.stop().animate({
            top: aTop,
            left: aLeft
          }, animationDuration, function() {
            a = aCopy.clone();
            actorsColumns[i].append(a);
            a.css({
              position: 'static'
            });
            return aCopy.remove();
          });
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    return $filtersDiv.animate({
      right: "-" + ($filtersDiv.width() * 1.8) + "px"
    }, function() {
      $filtersDiv.delay(animationDuration / 2).find('div').show();
      $filtersDiv.find(".filter-" + attributeName).hide();
      return $filtersDiv.animate({
        right: '0px'
      });
    });
  };

  actorsDetailsTarget = actorsDiv.find('#actor-details');

  actors.mouseenter(function() {
    actorsDetailsTarget.html($(this).html());
    actorsDetailsTarget.find('.label, p').show();
    return actorsDetailsTarget.stop().animate({
      bottom: 0
    });
  });

  actors.mouseleave(function() {
    return actorsDetailsTarget.stop().animate({
      bottom: $(window).height() * -0.25
    });
  });

  $('#actorsView1').click(function(e) {
    return initAttributeView('categorie', actorsCategories);
  });

  $('#actorsView2').click(function(e) {
    return initAttributeView('position', actorsPositions);
  });

  actorsNav = actorsDiv.find('nav');

  showActorsNav = function() {
    return actorsNav.stop().animate({
      right: '0'
    }, 700).removeClass('hidden');
  };

  hideActorsNav = function(hide) {
    var time;

    if (hide == null) {
      hide = false;
    }
    time = hide ? 0 : 700;
    return actorsNav.stop().animate({
      right: "-" + (actorsNav.width() + 100) + "px"
    }, time).addClass('hidden');
  };

  pinActorsColumnTitles = function() {
    return actorsDiv.find('h2').addClass('pin');
  };

  unpinActorsColumnTitles = function() {
    return actorsDiv.find('h2').removeClass('pin');
  };

  actors.each(function(i, a) {
    var $a;

    $a = $(a);
    return $a.find('h3').append("\ <span class='label label-position'>" + (positionToShortText($a.data('position'))) + "</span>\n\ <span class='label label-categorie'>" + (categorieToShortText($a.data('categorie'))) + "</span>");
  });

  createAttributeFilter = function(attribute, attributeList) {
    var $target, $toggle, code, name, _i, _len, _ref, _results;

    $target = $("<div class='filter-" + attribute + "'><p>" + (attributeNameToText(attribute)) + "</p></div>");
    actorsDiv.find('#actorsSelectAttributes').append($target);
    _results = [];
    for (_i = 0, _len = attributeList.length; _i < _len; _i++) {
      _ref = attributeList[_i], code = _ref.code, name = _ref.name;
      $toggle = $("<div class=\"toggle\">\n    <label class=\"toggle-radio\" for=\"actors_" + attribute + "_" + code + "\">" + (name.toUpperCase()) + " <i class=\"icon-circle\"></i></label>\n    <input id=\"actors_" + attribute + "_" + code + "\" type=\"radio\" checked=\"checked\">\n    <label class=\"toggle-radio\" for=\"actors_" + attribute + "_" + code + "\"><i class=\"icon-circle\"></i> " + (name.toUpperCase()) + "</label>\n    <input id=\"actors_" + attribute + "_" + code + "\" type=\"radio\">\n</div><br />");
      $target.append($toggle);
      _results.push((function(code) {
        return $toggle.find("#actors_" + attribute + "_" + code).click(function(e, duration) {
          if (duration == null) {
            duration = 500;
          }
          $target = actorsDiv.find("[data-" + attribute + "=" + code + "]:not(.actor-column)");
          if ($target.first().hasClass('filtered')) {
            return $target.fadeTo(duration, 1).removeClass('filtered');
          } else {
            return $target.fadeTo(duration, 0.3).addClass('filtered');
          }
        });
      })(code));
    }
    return _results;
  };

  createAttributeFilter('categorie', actorsCategories);

  createAttributeFilter('position', actorsPositions);

  actors.find('p').hide();

  initAttributeView('categorie', actorsCategories, 0);

  hideActorsNav(true);

  actorsDetailsTarget.css({
    bottom: $(window).height() * -0.25
  });

  actorsDiv.find('#actorsSelectAttributes .filter-categorie').hide();

  $(window).scroll(function(e) {
    var firstActorTitle, offset05, offset07, offset09, offset10, offset15, offset20, offset25, offset30, offset40, scrollTop;

    scrollTop = $(this).scrollTop();
    offset05 = $('#frame05').offset().top - 5;
    offset07 = $('#frame07').offset().top - 5;
    offset09 = $('#frame09').offset().top - 5;
    offset10 = $('#frame10').offset().top - 5;
    offset15 = $('#frame15').offset().top - 5;
    offset20 = $('#frame20').offset().top - 5;
    offset25 = $('#frame25').offset().top - 5;
    offset30 = $('#frame30').offset().top - 5;
    offset40 = $('#frame40').offset().top - 5;
    if (scrollTop < offset07) {
      activateNavItem('#frame00');
    } else if (scrollTop < offset10) {
      activateNavItem('#frame07');
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
    if (((offset09 - $(window).height() * 0.05) < scrollTop && scrollTop < (offset10 - $(window).height() * 0.3)) && mapNav.hasClass('hidden')) {
      showMapNav();
    } else if ((scrollTop < (offset09 - $(window).height() * 0.05) || scrollTop > (offset10 - $(window).height() * 0.3)) && !mapNav.hasClass('hidden')) {
      hideMapNav();
    }
    if (((offset15 - $(window).height() * 0.05) < scrollTop && scrollTop < (offset20 - $(window).height() * 0.3)) && tlNav.hasClass('hidden')) {
      showTlNav();
    } else if ((scrollTop < (offset15 - $(window).height() * 0.05) || scrollTop > (offset20 - $(window).height() * 0.3)) && !tlNav.hasClass('hidden')) {
      hideTlNav();
    }
    if (((offset25 - $(window).height() * 0.05) < scrollTop && scrollTop < (offset30 - $(window).height() * 0.3)) && actorsNav.hasClass('hidden')) {
      showActorsNav();
    } else if ((scrollTop < (offset25 - $(window).height() * 0.05) || scrollTop > (offset30 - $(window).height() * 0.3)) && !actorsNav.hasClass('hidden')) {
      hideActorsNav();
    }
    firstActorTitle = actorsDiv.find('h2').first();
    if (((firstActorTitle.position().top < scrollTop && scrollTop < offset30 - 120)) && !firstActorTitle.hasClass('pin')) {
      return pinActorsColumnTitles();
    } else if ((scrollTop > offset30 - 120 || scrollTop < offset25 + 40) && firstActorTitle.hasClass('pin')) {
      return unpinActorsColumnTitles();
    }
  });

}).call(this);
