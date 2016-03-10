/**
 * Co-op Front-end Toolkit Scripts
 */

$(function() {
  // Mobile menu
  $('.mobile-menu-toggle').on('click', function() {
    $('#navigation, .mobile-menu-toggle').toggleClass('open');
    if ($('.mobile-menu-toggle').hasClass('open')) {
      $('.mobile-menu-toggle .mobile-menu-text').text('Close');
    }
    else {
      $('.mobile-menu-toggle .mobile-menu-text').text('Menu');
    }
  });

  // Tabs
  $('.tabs').on('click', '.tabs-nav a', function(e) {
    e.preventDefault();
    $(this).addClass('active').parent('li').siblings().find('a').removeClass('active');
    $($(this).attr('href')).addClass('active').siblings().removeClass('active');
  }).addClass('init').find('.tabs-nav li:first a').trigger('click');

  // Toggles
  $('.toggle-trigger').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('open');
    if ($(this).parent().hasClass('accordion')) {
      $(this).siblings('.toggle-trigger').removeClass('open');
    }
  }).addClass('init');
});

