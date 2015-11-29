import $ from 'jquery';

const assignBootstrapMode = () => {
  const width = $( window ).width();
  let mode = '';
  if (width < 768) {
    mode = 'mode-xs';
  } else if (width < 992) {
    mode = 'mode-sm';
  } else if (width < 1200) {
    $('.dropdown-submenu .dropdown-menu li a').on('touchstart', function(e) {
      e.preventDefault();
      window.location.href = $(this).attr('href');
    });
  } else if (width > 1200) {
    mode = 'mode-lg';
  }
  $('body').removeClass('mode-xs').removeClass('mode-sm').removeClass('mode-md').removeClass('mode-lg').addClass(mode);
};

const init = () => {
  $(document).ready(() => {
    assignBootstrapMode();
    $(window).resize(() => {
      assignBootstrapMode();
    });
  });
  /*-----------------------------------------------------------------------------------*/
  /*	STICKY HEADER
  /*-----------------------------------------------------------------------------------*/

  $(document).ready(() => {
    const menu = $('.navbar');
    const pos = menu.offset();

    $(window).scroll(function() {
      if ($(this).scrollTop() > pos.top + menu.height() && menu.hasClass('default') && $(this).scrollTop() > 200) {
        menu.fadeOut('fast', function() {
          $(this).removeClass('default').addClass('fixed').fadeIn('fast');
        });
      } else if ($(this).scrollTop() <= pos.top + 200 && menu.hasClass('fixed')) {
        menu.fadeOut(0, function() {
          $(this).removeClass('fixed').addClass('default').fadeIn(0);
        });
      }
    });
  });

  $(document).ready(() => {
    $('.navbar .nav li a').on('click', () => {
      $('.navbar .navbar-collapse.in').collapse('hide');
    });
  });
  /*-----------------------------------------------------------------------------------*/
  /*	PARALLAX MOBILE
  /*-----------------------------------------------------------------------------------*/

  $(document).ready(() => {
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i)) {
      $('.parallax').addClass('mobile');
    }
  });
};

export default init;
