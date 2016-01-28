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
  $('.categories li:first').addClass('active');

  $('.categories a').on('click', function (e) {
    e.preventDefault();
    $(this).closest('li').addClass('active').siblings().removeClass('active');
    $($(this).attr('href')).show().siblings('.single').hide();
  });

  const hash = $.trim( window.location.hash );
  if (hash) $('.categories a[href$="' + hash + '"]').trigger('click');
}

export function initUniform(nodes) {
  $(nodes)
    .find('input[type=radio], input[type=checkbox],input[type=number], select')
    .uniform();
}
