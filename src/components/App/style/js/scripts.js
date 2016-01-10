function init() {
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

export default init;
