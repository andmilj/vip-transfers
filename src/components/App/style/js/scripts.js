export function initScroll() {
  const $root = $('html, body');
  $('a.anchor').click(function(e) {
    const href = $.attr(this, 'href');
    if (typeof ($(href)) !== 'undefined' && $(href).length > 0) {
      let anchor = '';

      if (href.indexOf('#') !== -1) {
        anchor = href.substring(href.lastIndexOf('#'));
      }

      if (anchor.length > 0) {
        const offset = $('body').hasClass('home') ? $('header').height() : 0;
        $root.animate({
          scrollTop: $(anchor).offset().top - offset,
        }, 500);
        e.preventDefault();
      }
    }
  });
}

export function initTabs() {
  $('.single').hide().first().show();

  $('.categories a').on('click', function (e) {
    e.preventDefault();
    $(this).closest('li').addClass('active').siblings().removeClass('active');
    $($(this).attr('href')).show().siblings('.single').hide();
  });

  $('.categories li.active a').trigger('click');

  const hash = $.trim( window.location.hash );
  if (hash) $('.categories a[href$="' + hash + '"]').trigger('click');
}

export function initUniform(nodes) {
  $(nodes)
    .find('input[type=radio], input[type=checkbox],input[type=number], select')
    .uniform();
}

export function initSlickNav() {
  $('.main-nav').slicknav({
    prependTo: '.header .wrap',
    label: '',
  });
}

export function initResponsiveTables() {
  let switched = false;

  function setCellHeights(original, copy) {
    const tr = original.find('tr');
    const trCopy = copy.find('tr');
    const heights = [];

    tr.each(function(index) {
      const self = $(this);
      const tx = self.find('th, td');

      tx.each(function() {
        const height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });
    });

    trCopy.each(function(index) {
      $(this).height(heights[index]);
    });
  }

  function splitTable(original) {
    original.wrap('<div class="table-wrapper" />');

    const copy = original.clone();
    copy.find('td:not(:first-child), th:not(:first-child)').css('display', 'none');
    copy.removeClass('responsive');

    original.closest('.table-wrapper').append(copy);
    copy.wrap('<div class="pinned" />');
    original.wrap('<div class="scrollable" />');

    setCellHeights(original, copy);
  }

  function unsplitTable(original) {
    original.closest('.table-wrapper').find('.pinned').remove();
    original.unwrap();
    original.unwrap();
  }

  const updateTables = function() {
    if (($(window).width() < 767) && !switched ) {
      switched = true;
      $('table.responsive').each(function(i, element) {
        splitTable($(element));
      });
      return true;
    } else if (switched && ($(window).width() > 767)) {
      switched = false;
      $('table.responsive').each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };

  $(window).on('redraw', function() {
    switched = false;
    updateTables();
  }); // An event to listen for
  $(window).on('resize', updateTables);

  updateTables();
}
