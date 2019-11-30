$(function () {
  (function () { // fly header
    var $header = $(".header");

    if (!$header.length) {
      return;
    }

    $('<div />', {
      'class': 'header__helper'
    }).insertAfter($header);

    $(window).on("load scroll", function () {
      var st = $(this).scrollTop();

      $("body")[st > 10 ? 'addClass' : 'removeClass']('header-fly');
    });
  }());

  (function () { // fly menu
    var $flyMenu = $(".js-fly-menu");
    var $stopper = $(".js-menu-stopper");
    var params = {
      menuHeight: 0,
      start: 0,
      stop: 0
    };

    if (!$flyMenu.length) {
      return;
    }

    function setParams() {
      var menuHeight = $flyMenu.outerHeight();
      params.start = $flyMenu.parent().offset().top - 150;
      params.stop = $stopper.offset().top - params.start - parseInt(menuHeight) - 150;
    }

    setParams();
    $(window).on("load resize", function () {
      setParams();
      fly($(this).scrollTop());
    });

    $(window).on("scroll", function (e) {
      fly($(this).scrollTop());
    });

    function fly(scrollTop) {
      setParams();
      $flyMenu.css("top", Math.max(0, Math.min(scrollTop - params.start, params.stop)));
    }
  }());

  (function () { // open details
    var $council = $(".js-council-details");

    if (!$council.length) {
      return;
    }

    $council.on("click", function (e) {
      e.preventDefault();

      var id = $(this).data("council-id");
      var $item = $(".council__details").filter('[data-council-id="' + id + '"]');
      var $visible = $(".council__details:visible").not($item);

      if ($item.length) {
        $item.slideDown($visible.length ? 0 : 400);
        $(".council__details:visible").not($item).slideUp(0);

        $("html:not(:animated), body:not(:animated)").animate({
          scrollTop: $(".council").offset().top - $(".header").outerHeight() - 20
        }, {
          step: function () {
            $(window).trigger("resize");
            $(window).trigger("scroll");
          }
        });
      }
    });
  })();

  $("body").on("click", ".js-details-close", function () {
    var $parent = $(this).closest(".council__details");

    $parent.slideUp({
      step: function () {
        $(window).trigger("resize");
        $(window).trigger("scroll");
      }
    });
  });

  if ($(".ask-sign").length) {
    $(".ask-sign").each(function () {
      var html = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill-rule="evenodd" d="M8 16c-4.422 0-8-3.579-8-8 0-4.422 3.579-8 8-8 4.422 0 8 3.578 8 8 0 4.422-3.579 8-8 8zM8 1.25A6.746 6.746 0 0 0 1.25 8 6.746 6.746 0 0 0 8 14.75c3.731 0 6.75-3.02 6.75-6.75 0-3.731-3.02-6.75-6.75-6.75zm.625 7.686v1.017a.625.625 0 0 1-1.25 0V8.391c0-.346.28-.626.625-.626a1.25 1.25 0 0 0 0-2.5c-.689 0-1.25.561-1.25 1.251a.625.625 0 0 1-1.25 0c0-1.379 1.121-2.5 2.5-2.5 1.378 0 2.5 1.121 2.5 2.5a2.504 2.504 0 0 1-1.875 2.42zM8 11.047a.781.781 0 1 1 0 1.563.781.781 0 0 1 0-1.563z"/></svg>';

      $(this).html(html);
    });
  }

  if ($("[data-dropdown]").length) {
    $("[data-dropdown]").each(function () {
      var html = $(this).data('dropdown');

      $('<div />', {
        'html': html,
        'class': 'dropdown'
      }).appendTo(this);

      $(this).addClass("js-dropdown-mouseevent");
    });
  }

  if ($(".has-level-1").length || $(".has-level-2").length) {
    $(".has-level-1 > a, .has-level-2 > a").on("click", function (e) {
      if (Modernizr.mq('(max-width: 1023px')) {
        e.preventDefault();

        var $parent = $(this).closest('li');

        $parent.siblings(".opened").removeClass("opened").find("> ul").slideUp();
        $parent.toggleClass("opened").find("> ul").slideToggle();
      }
    });
  }

  if ($("[data-scrollto]").length) {
    $("[data-scrollto]").on("click", function (e) {
      var $elem = $($(this).data("scrollto"));

      if (!$elem.length) {
        return;
      }

      $("body:not(:animated), html:not(:animated)").animate({
        scrollTop: $elem.offset().top - $(".header").outerHeight() - 20
      }, 800);
    });
  }

  if ($(".js-main-menu-toggle").length) {
    $(".js-main-menu-toggle").on("click", function (e) {
      e.preventDefault();

      $(".header__menu").slideToggle();
      $(this).toggleClass('_opened');
    });
  }

  if ($(".js-top-menu-toggle").length) {
    $(".js-top-menu-toggle").on("click", function (e) {
      e.preventDefault();

      $(".top-menu").slideToggle();
      $(this).toggleClass('_opened');
    });
  }

  if ($(".js-collapse-toggle").length) {
    $(".js-collapse-toggle").on("click", function (e) {
      if (Modernizr.mq('(min-width: 768px') && $(this).closest('.footer').length) {
        return;
      }

      e.preventDefault();

      $(this)
        .closest(".js-collapser")
        .toggleClass('_opened')
        .find(".js-collapse-body")
        .slideToggle();
    });
  }

  (function () {
    var $slider = $(".features__aside-slider");

    if (!$slider.length) {
      return;
    }

    var $children = $slider.children()
    $children.eq(0).addClass('active');

    if ($children.length < 2) {
      return;
    }

    var html = '<ul class="features__aside-pager">';
    $children.each(function (i) {
      html += '<li class="' + (i === 0 ? 'active' : '') + '"></li>';
    })
    html += '</ul>';

    var $pager = $(html).insertAfter($slider);

    setInterval(function () {
      var $current = $children.filter('.active');
      var $next = $current.next();

      var $currentP = $pager.children().filter('.active');
      var $nextP = $currentP.next();

      if (!$next.length) {
        $next = $children.eq(0);
        $nextP = $pager.children().eq(0);
      }

      $next.addClass('active');
      $current.removeClass('active');

      $nextP.addClass('active');
      $currentP.removeClass('active');
    }, 8000);
  }());

  if ($("[data-tab]").length) {
    $("[data-tab]").on("click", function (e) {
      var $tab = $(this).closest('.js-tabs').find($($(this).data('tab')));

      if ($tab.length) {
        e.preventDefault();

        $tab.addClass('active').siblings('.active').removeClass('active');
        $(this).addClass('active').siblings('.active').removeClass('active');
      }
    })
  }

  (function () { // dropdown
    var $dropMouseEvent = $(".js-dropdown-mouseevent");

    if (!$dropMouseEvent.length) {
      return;
    }

    $dropMouseEvent.each(function () {
      var $parent = $(this).parent();
      var timer = null;
      var clsName = 'show-dropdown';

      $parent.on({
        mouseenter: function (e) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          $parent.addClass(clsName);
        },
        mouseleave: function (e) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          timer = setTimeout(function () {
            $parent.removeClass(clsName);
          }, 50);
        }
      });
    });
  }());

  (function () { // dropdown
    var $dropClick = $(".js-dropdown-click");

    if (!$dropClick.length) {
      return;
    }

    $dropClick.each(function () {
      var $parent = $(this).parent();
      var timer = null;
      var clsName = 'show-dropdown';
      var $inputHidden = $("input[type=hidden]", $parent);
      var $value = $(".js-value", $parent);

      $(this).on("click", function (e) {
        e.preventDefault();

        $parent.toggleClass(clsName);
      });

      $("[data-value]", $parent).on("click", function (e) {
        e.preventDefault();

        $inputHidden.val($(this).data("value")).change();
        $value.html($(this).html());
        $parent.removeClass(clsName);
      });

      $parent.on({
        mouseenter: function () {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        },
        mouseleave: function () {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          timer = setTimeout(function () {
            $parent.removeClass(clsName);
          }, 500);
        }
      });
    });
  }());

  (function () { // work places
    var $slider = $(".work-places__slider-list");

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1023,
          arrows: false,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 767,
          arrows: false,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 479,
          arrows: false,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        },
      ]
    });
  })();

  (function () { // promo slider
    var $promo = $(".promo__slider");

    if (!$promo.length) {
      return;
    }

    $promo.slick({
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 8000,
      responsive: [{
        breakpoint: 767,
        settings: {
          dots: false,
          arrows: false,
        }
      }, ]
    });
  }());

  (function () { // history success
    var $slider = $(".history-success__slider-list");

    if (!$slider.length) {
      return;
    }

    $slider.slick({
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1023,
          arrows: false,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        },
      ]
    });
  })();

  var $pageUpButton = $(".up-page");

  $(window).on("scroll", function () {
    var st = $(window).scrollTop();
    var pageHeight = $("body").outerHeight();

    if (pageHeight > $(window).height() * 1.5) {
      $pageUpButton[st > (pageHeight - $(window).height()) / 2 ? 'addClass' : 'removeClass']('show');
    }
  });

  $pageUpButton.on("click", function () {
    $("body:not(:animated), html:not(:animated)").animate({
      scrollTop: 0
    }, 800);
  });

  $(".input-transparent").on("input change", function () {
    var value = $(this).val();
    var $parent = $(this).parent();

    $parent[value.length > 0 ? 'addClass' : 'removeClass']('filled');
  });

  $("body").on("input change", ".error", function () {
    $(this).removeClass("error");
  });

  $("form").on("submit", function (e) {
    if (!validate($(this))) {
      return false;
    }
  });

  $(".colorbox-diplom").colorbox({
    maxWidth: "90%",
    rel: 'colorbox-diplom',
    maxHeight: "90%",
  });
});

function validate(form) {
  var $elementsForRequire = $(".require-field:visible", form).add($("input[type=hidden].require-field", form)),
    flag = true;

  $elementsForRequire.each(function () {
    if (!this.value) {
      $(this).addClass("error");
      flag = false;
    } else {
      if (this.type == "email" && !isEmail(this.value)) {
        $(this).addClass("error");
        flag = false;
      }
    }
  });

  return flag;
}

function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}